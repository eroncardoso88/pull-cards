import { trpc } from '@/utils/trpc'
import type { NextPage } from 'next'
import Head from 'next/head'
import { z } from "zod";
import EnhancedTable from '@/components/Table';

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


  return (
    <div className="h-screen w-screen flex flex-col">
      <button onClick={() => clickGetAll()}>
        Load Combination Subject
      </button>
      <div>
        {
          dataCombinationSubject && 
          dataCombinationSubject.length > 0 && (
            <>
              <EnhancedTable 
                columns={Object.keys(dataCombinationSubject[0])}
                data={dataCombinationSubject}
                title={"Assuntos dos jogos"}
              />
            </>
        )}
      </div>
    </div>
  )
}

export default CombinationSubject
