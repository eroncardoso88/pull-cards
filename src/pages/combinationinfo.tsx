import { trpc } from '@/utils/trpc'
import type { NextPage } from 'next'
import Head from 'next/head'
import { z } from "zod";
import EnhancedTable, { BaseRecord } from '@/components/Table';
import { Alert, AlertTitle, Box, Button, Snackbar, Typography } from '@mui/material';
import { Editor } from '@/components/Editor';
import { useState } from 'react';
import { uuid } from 'uuidv4';
import { fieldsCategorizer } from '@/utils/fieldCategorizer';

export type CreateUserInput = z.TypeOf<typeof createUserSchema>

export enum CurrentAction {
  initial = "initial",
  view = "view",
  edit = "edit",
  create = "create"
}

type CurrentActionType = {
  status: CurrentAction,
  row: any 
}


export const referenceField = {
  "id": 1,
  "cardSequenceEnum": "",
  "combinationInfoId": ""
}

const CombinationInfo: NextPage = (props) => {
  const { data: dataCombinationInfo, isLoading: isLoadingCombinationInfo } = trpc.useQuery(["combination-info.list-combination-info"])
  const [currentId, setCurrentId] = useState()
  const [currentAction, setCurrentAction] = useState<CurrentActionType[]>([{status: CurrentAction.initial, row: {}}])
  const [alertCreate, setAlertCreate] = useState(false)
  const [alertEdit, setAlertEdit] = useState(false)
  const { mutate, isSuccess, error } = trpc.useMutation(["combination-info.create-combination-info"], {
    onSuccess: (success) => {
      console.log('success ', success)
    }
  })

  const clickGetAll = () => {
    console.log({dataCombinationInfo})
  }

  const clickView = (row) => {
    console.log('click view');
    
    setCurrentAction([...currentAction, {
      status: CurrentAction.view,
      row: row
    }])
  }

  const clickCreate = () => {
    if (currentAction.some(item => item.status === CurrentAction.create)) setAlertCreate(true)
    setCurrentAction([...currentAction, {
      status: CurrentAction.create,
      row: {id: uuid()}
    }])
  }

  const clickEdit = (row) => {
    console.log('click Edit', row.id);
    if (currentAction.some(item => item.row.id === row.id)) {
      setAlertEdit(true)
      return false;
    }
    
    setCurrentAction([...currentAction, {
      status: CurrentAction.edit,
      row: row
    }])  
  }

  const clickDelete = (id) => {
    console.log('editing', id)
  }

  const cancelHandler = (id) => {
    console.log('cancelHandler!', id);
    
    setCurrentAction([...currentAction.filter(item => item.row.id !== id)]) 
  }

  const saveDataHandler = (isCreate, row) => {
    console.log({isCreate})
    console.log({row})

  }

  return (
    <>
    <Box>
        {
          dataCombinationInfo && (
            <>
              <EnhancedTable 
                columns={Object.keys(dataCombinationInfo[0] || referenceField)}
                data={dataCombinationInfo || referenceField}
                title={"Assuntos dos jogos"}
                actions={{
                  edit: {
                    callback: (row) => clickEdit(row)
                  },
                  view: {
                    callback: (row) => clickView(row)
                  },
                  delete: {
                    callback: (id) => clickDelete(id)
                  },
                  create: {
                    callback: () => clickCreate()
                  },

                }}
              />
            </>
        )}
        <Button onClick={() => clickGetAll()} variant="contained" color="primary" type="button">
          <Typography variant="button">
            Log Data
          </Typography>
        </Button>
        
        {currentAction.filter(item => [CurrentAction.edit, CurrentAction.create].includes(item.status)).map(instance => {
          return (
            <Editor 
              key={instance.row.id} 
              instance={instance} 
              fields={fieldsCategorizer(referenceField)} 
              stateFields={instance.status === CurrentAction.edit ? instance.row : referenceField}
              cancel={(id) => cancelHandler(id)}
              send={(isCreate, row) => saveDataHandler(isCreate, row)}
            />
          )
        })
        }
    </Box>
    <Snackbar open={alertCreate} autoHideDuration={4000} onClose={() => setAlertCreate(false)} anchorOrigin={{vertical: 'top', horizontal: 'center'}}>
        <Alert severity="warning" onClose={() => setAlertCreate(false)}>
          <AlertTitle>Já está criando</AlertTitle>
          Você já está criando conteúdo. É permitido criar mais de um por vez, porém faça com atenção para evitar problemas.
        </Alert>
      </Snackbar>
      <Snackbar open={alertEdit} autoHideDuration={4000} onClose={() => setAlertEdit(false)} anchorOrigin={{vertical: 'top', horizontal: 'center'}}>
        <Alert severity="error" onClose={() => setAlertEdit(false)}>
          <AlertTitle>Já em edição</AlertTitle>
          Você já está editando este conteúdo. Procure na lista de edições criações o respectivo registro.
        </Alert>
      </Snackbar>
    </>
  )
}

export default CombinationInfo
