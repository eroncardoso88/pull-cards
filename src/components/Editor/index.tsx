import { trpc } from "@/utils/trpc";
import EnhancedTable, { BaseRecord } from "@/components/Table";
import {
  Alert,
  AlertTitle,
  Box,
  Button,
  Snackbar,
  Typography,
  Modal
} from "@mui/material";
import { EditorList } from "@/components/Editor/EditorList";
import { FunctionComponent, useEffect, useRef, useState } from "react";
import { uuid } from "uuidv4";
import { fieldsCategorizer } from "@/utils/fieldCategorizer";

export enum CurrentAction {
  initial = "initial",
  view = "view",
  edit = "edit",
  create = "create",
}

type CurrentActionType = {
  status: CurrentAction;
  row: any;
};


export const modalStyle = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: "3.5px",
  boxShadow: 24,
  p: 4,
};

type Subject = "deck" | "card" | "user" | "combination-subject" | "combination-type" | "combination-info" | "combination" |"analysis";

interface IForgeignData {
  shouldDownload: Subject;
  replaceKeyReq: string;
  replaceKeyRes: string;
}

interface IEditor {
  subject: Subject
  referenceField: any;
  mainKey: string;
  title: string;
  helperKeys: IForgeignData[]
}

const Editor: FunctionComponent<IEditor> = ({subject, referenceField, mainKey, title, helperKeys = []}) => {
  const { data: dataEditor, isLoading: isLoadingEditor, refetch } = trpc.useQuery([
    `${subject}.list-${subject}`,
  ]);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [currentClicked, setCurrentClicked] = useState(referenceField);
  const [currentAction, setCurrentActions] = useState<CurrentActionType[]>([
    { status: CurrentAction.initial, row: {} },
  ]);
  const [alertCreate, setAlertCreate] = useState(false);
  const [alertEdit, setAlertEdit] = useState(false);
  const { mutate: mutateCreate, isSuccess: isSuccessCreate, error: errorCreate } = trpc.useMutation([`${subject}.create-${subject}`], {
    onSuccess: (success) => {
      console.log("success ", success);
    },
  });

  const { mutate: mutateEdit, isSuccess: isSuccessEdit, error: errorEdit } = trpc.useMutation([`${subject}.edit-${subject}`], {
    onSuccess: (success) => {
      console.log("success ", success);
    },
  });

  const { mutate: mutateDisable, isSuccess: isSuccessDisable, error: errorDisable } = trpc.useMutation([`${subject}.disableone-${subject}`], {
    onSuccess: (success) => {
      console.log("success ", success);
    },
  });

  let helpeyKeyOne
  if (helperKeys[0]) {
    helpeyKeyOne = trpc.useQuery([`${helperKeys[0]?.shouldDownload}.list-${helperKeys[0]?.shouldDownload}`])
  }

  let helpeyKeyTwo
  if (helperKeys[1]) {
    helpeyKeyTwo = trpc.useQuery([`${helperKeys[1]?.shouldDownload}.list-${helperKeys[1]?.shouldDownload}`])
  }

  const clickGetAll = () => {
    console.log({ dataEditor });
  };

  const clickView = (row) => {
    setCurrentActions([
      ...currentAction,
      {
        status: CurrentAction.view,
        row: row,
      },
    ]);
  };

  const clickCreate = () => {
    if (currentAction.some((item) => item.status === CurrentAction.create))
      setAlertCreate(true);
    setCurrentActions([
      ...currentAction,
      {
        status: CurrentAction.create,
        row: { id: uuid() },
      },
    ]);
  };

  const getSelectedFieldOption = (row) => {
    Object.keys(row).forEach(key => {
      helperKeys.forEach((helperKey, index) => {
        if (key === helperKey.replaceKeyReq) {
          row[helperKey.shouldDownload] = row[key].toString()
        }
      })
    })
    return row
  }

  const clickEdit = (row) => {
    if (currentAction.some((item) => item.row.id === row.id)) {
      setAlertEdit(true);
      return false;
    }

    setCurrentActions([
      ...currentAction,
      {
        status: CurrentAction.edit,
        row: getSelectedFieldOption(row),
      },
    ]);
  };

  const clickDelete = (data) => {
    setCurrentClicked(data)
    setShowConfirmModal(true)
    
  };

  const cancelHandler = (id) => {
    setCurrentActions([...currentAction.filter((item) => item.row.id !== id)]);
  };

  const saveDataHandler = async (isCreate, row) => {
    console.log(`row `, row)
    console.log(`isCreate `, isCreate)
    let mutation = isCreate ? mutateCreate: mutateEdit;
    helperKeys[0] && !row[helperKeys[0].replaceKeyReq] ? row[helperKeys[0].replaceKeyReq] = row[helperKeys[0].shouldDownload] : null
    helperKeys[1] && !row[helperKeys[1].replaceKeyReq] ? row[helperKeys[1].replaceKeyReq] = row[helperKeys[1].shouldDownload] : null

    try {
      const res = await mutation({
        id: !isCreate ? row.id : 0,
        ...row
      })
      await setCurrentActions([...currentAction.filter(item => item.row.id !== row.id)]) 
      setTimeout(() => {
        refetch()
      }, 1500)

    } catch (e) {
      alert(e)
    }
  };

  return (
    <>
      <Box>
        {dataEditor && (
          <>
            <EnhancedTable
              columns={Object.keys(dataEditor[0] || referenceField)}
              data={dataEditor || referenceField}
              title={title}
              helperKeysData={[helpeyKeyOne, helpeyKeyTwo]}
              helperKeys={helperKeys}
              actions={{
                edit: {
                  callback: (row) => clickEdit(row),
                },
                view: {
                  callback: (row) => clickView(row),
                },
                delete: {
                  callback: (id) => clickDelete(id),
                },
                create: {
                  callback: () => clickCreate(),
                },
              }}
            />
          </>
        )}
        <Button
          onClick={() => clickGetAll()}
          variant="contained"
          color="primary"
          type="button"
        >
          <Typography variant="button">Log Data</Typography>
        </Button>

        {currentAction
          .filter((item) =>
            [CurrentAction.edit, CurrentAction.create].includes(item.status)
          )
          .map((instance) => {
            return (
              <EditorList
                key={instance.row.id}
                instance={instance}
                fields={fieldsCategorizer(referenceField)}
                helperKeysData={[helpeyKeyOne, helpeyKeyTwo]}
                helperKeys={helperKeys}  
                stateFields={
                  instance.status === CurrentAction.edit
                    ? instance.row
                    : referenceField
                }
                cancel={(id) => cancelHandler(id)}
                send={(isCreate, row) => saveDataHandler(isCreate, row)}
              />
            );
          })}
      </Box>
      <Snackbar
        open={alertCreate}
        autoHideDuration={4000}
        onClose={() => setAlertCreate(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity="warning" onClose={() => setAlertCreate(false)}>
          <AlertTitle>Já está criando</AlertTitle>
          Você já está criando conteúdo. É permitido criar mais de um por vez,
          porém faça com atenção para evitar problemas.
        </Alert>
      </Snackbar>
      <Snackbar
        open={alertEdit}
        autoHideDuration={4000}
        onClose={() => setAlertEdit(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity="error" onClose={() => setAlertEdit(false)}>
          <AlertTitle>Já em edição</AlertTitle>
          Você já está editando este conteúdo. Procure na lista de edições
          criações o respectivo registro.
        </Alert>
      </Snackbar>
      <Modal
        open={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Salvar
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Tem certeza que deseja excluir { currentClicked[mainKey] }? Esta ação pode acarretar em consequências nos seus dados relacionados.
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              gap: "0 10px",
              mt: { sx: 1, sm: 3 },
            }}
          >
            <Button
              variant="outlined"
              onClick={() => {
                setShowConfirmModal(false);
              }}
            >
              Não
            </Button>
            <Button
              variant="contained"
              color="success"
              onClick={() => {
                setShowConfirmModal(false);
                mutateDisable(currentClicked.id)
                setTimeout(() => {
                  refetch()
                }, 1500)
              }}
            >
              Sim
            </Button>
          </Box>
        </Box>
      </Modal>

    </>
  );
};

export default Editor;
