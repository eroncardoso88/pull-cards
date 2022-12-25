import { Box, Paper, Typography, Grid, Button, Modal, Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import { FunctionComponent, useState, useCallback } from "react";
import TextField from "@mui/material/TextField";
import { translates } from "@/utils/translates";
import { modalStyle } from "./index";

interface IEditorList {
  instance: {
    row: any;
  status: "edit" | "create";
  };
  fields: any[];
  stateFields: any;
  cancel: (id: string) => void;
  send: (isCreate: boolean, fieldValues: any) => void;
  helperKeysData: any
  helperKeys: any[]
}

export const EditorList: FunctionComponent<IEditorList> = ({
  instance,
  fields,
  stateFields,
  cancel,
  send,
  helperKeys,
  helperKeysData
}) => {
  const [fieldValues, setFieldValues] = useState({
    ...stateFields,
    id: instance.row.id,
  });
  const [isDirty, setIsDirty] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [multiSelectValue, setMultiSelectValue] = useState([])
  const changeValueHandler = useCallback(
    (value, field) => {
      const newValue = { ...fieldValues };
      newValue[field] = value;
      setFieldValues(newValue);
      setIsDirty(true);
    },
    [fieldValues]
  );

  const getFieldOptions = (nameField, fields) => {
    console.log(`nameField `, nameField)
    console.log(`helperKeys `, helperKeys)
    const reqReplaceIndex = helperKeys.findIndex(key => key.shouldDownload === nameField ||  key.replaceKeyReq === nameField )
    console.log(`reqReplaceIndex `, reqReplaceIndex)
    if (reqReplaceIndex === -1) return []
    console.log(`elem `, helperKeysData[reqReplaceIndex])
    const dataReplace = helperKeysData[reqReplaceIndex].data.map(elem => ({id: elem.id.toString(), description: elem[helperKeys[reqReplaceIndex].replaceKeyRes], extraValue: elem[helperKeys[reqReplaceIndex].extraValue] || ""}))
    return dataReplace
    // return dataReplace[helperKeys[reqReplaceIndex].replaceKeyRes] 
  }

  const getFieldIsMultiple = (nameField) => {
    const reqReplaceIndex = helperKeys.findIndex(key => key.shouldDownload === nameField ||  key.replaceKeyReq === nameField )
    if (reqReplaceIndex === -1) return false;
    return helperKeys[reqReplaceIndex].isMultiSelect;
  }


  return (
    <>
      <Paper
        sx={{
          width: "100%",
          my: { xs: 1, sm: 3 },
          padding: { xs: 1, sm: 2 },
          opacity: 0.9,
          overflowX: "auto",
          maxWidth: "97.5vw",
        }}
        elevation={3}
        onClick={() => console.log(fieldValues, stateFields, instance)}
      >
      {!(instance.status === "create") ? (
          <Typography variant="h6">
            Editando o campo de id: {instance.row.id}
          </Typography>
        ) : (
          <Typography variant="h6">Novo campo</Typography>
        )}
        <Grid container spacing={2} sx={{ mt: { xs: 1, sm: 2 } }}>
          {fields
            .filter((field) => field.nameField !== "id" && field.nameField !== "createdAt")
            .filter((field) => field.type === "smallText")
            .map((field) => (
              <Grid item key={field.nameField} xs={12} sm={4}>
                <TextField
                  label={translates(field.nameField)}
                  variant="standard"
                  sx={{ width: "100%" }}
                  value={fieldValues[field.nameField]}
                  onChange={(evt) =>
                    changeValueHandler(evt.target.value, field.nameField)
                  }
                />
              </Grid>
            ))}
          {fields
            .filter((field) => field.nameField !== "id")
            .filter((field) => field.type === "translatedSelect")
            .map((field) => (
              <Grid item key={field.nameField} xs={12} sm={4}>
                <FormControl sx={{ width: "100%" }}>
                  <InputLabel>{translates(field.nameField)}</InputLabel>
                  <Select
                    label={translates(field.nameField)}
                    variant="standard"
                    multiple={getFieldIsMultiple(field.nameField)}
                    sx={{ width: "100%" }}
                    value={getFieldIsMultiple(field.nameField) ? multiSelectValue : fieldValues[field.nameField]}
                    onChange={(evt) =>
                      getFieldIsMultiple(field.nameField) ? (
                        setMultiSelectValue(evt.target.value),
                        changeValueHandler(evt.target.value.toString(), field.nameField)
                      ) : (
                        changeValueHandler(evt.target.value, field.nameField)
                      )
                    }
                  >
                    {getFieldOptions(field.nameField, fields).map(item => (
                      item.extraValue ? (
                        <MenuItem value={item.id} key={item.id}>[{item.description}|{item.extraValue}]</MenuItem>
                        ) : (
                          <MenuItem value={item.id} key={item.id}>{item.description}</MenuItem>
                      )
                    ))}

                  </Select>
                </FormControl>
              </Grid>
            ))}
          {fields
            .filter((field) => field.nameField !== "id")
            .filter((field) => field.type === "bigText")
            .map((field) => (
              <Grid item key={field.nameField} xs={12} sm={12}>
                {<TextField
                  label={translates(field.nameField)}
                  sx={{ width: "100%" }}
                  multiline
                  maxRows={6}
                  minRows={3}
                  value={fieldValues[field.fieldName]}
                />}
              </Grid>
            ))}
        </Grid>
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
            onClick={() =>
              !isDirty ? cancel(instance.row.id) : setShowCancelModal(true)
            }
          >
            Cancelar
          </Button>
          <Button
            variant="contained"
            color="success"
            onClick={() =>
              !isDirty ? cancel(instance.row.id) : setShowConfirmModal(true)
            }
          >
            Enviar
          </Button>
        </Box>
      </Paper>
      <Modal
        open={showCancelModal}
        onClose={() => setShowCancelModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Cancelar
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Você trabalhou neste item. Tem certeza que deseja cancelar?
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
                setShowCancelModal(false);
              }}
            >
              Não
            </Button>
            <Button
              variant="contained"
              onClick={() => {
                cancel(instance.row.id);
                setShowCancelModal(false);
              }}
            >
              Sim
            </Button>
          </Box>
        </Box>
      </Modal>
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
            Tem certeza que deseja salvar?
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
              send(instance.status === "create", fieldValues);
                setShowConfirmModal(false);
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
