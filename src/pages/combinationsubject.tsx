import { trpc } from '@/utils/trpc'
import type { NextPage } from 'next'
import Head from 'next/head'
import { z } from "zod";
import EnhancedTable from '@/components/Table';
import { Box, Button, Typography } from '@mui/material';
export type CreateUserInput = z.TypeOf<typeof createUserSchema>

const CombinationSubject: NextPage = (props) => {
  const { data: dataCombinationSubject, isLoading: isLoadingCombinationSubject } = trpc.useQuery(["combination-subject.list-combination-subject"])
  
  const { mutate, isSuccess, error } = trpc.useMutation(["combination-subject.create-combination-subject"], {
    onSuccess: (success) => {
      console.log('success ', success)
    }
  })

  const clickSubmit = () => {

  }

  const clickGetAll = () => {
    console.log({dataCombinationSubject})
  }

  const clickCreate = () => {
    console.log('clickCreate!')
  }


  return (
    <Box>
        {
          dataCombinationSubject && 
          dataCombinationSubject.length > 0 && (
            <>
              <EnhancedTable 
                columns={Object.keys(dataCombinationSubject[0])}
                data={dataCombinationSubject}
                title={"Assuntos dos jogos"}
                actionCreate={() => clickCreate()}
              />
            </>
        )}
        <Button onClick={() => clickGetAll()} variant="contained" color="primary" type="button">
          <Typography variant="button">
            Log Data
          </Typography>
        </Button>
    </Box>
  )
}

export default CombinationSubject
