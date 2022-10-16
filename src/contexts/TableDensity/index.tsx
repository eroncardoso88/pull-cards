import {
  createContext,
  useState,
  FunctionComponent,
  useContext,
  useCallback,
  ReactNode
} from 'react'

interface ITableDensity {
  dense: boolean
  toggleDensity: () => void
  children: ReactNode;
}

const TableDensityContext = createContext<ITableDensity>(null)

export const TableDensityProvider: FunctionComponent<ITableDensity> = ({ children }) => {
  const [dense, setDense] = useState<boolean>(false)

  const toggleDensity = useCallback(() => {
    setDense(!dense)
  }, [dense])

  return (
    <TableDensityContext.Provider
      value={{
        dense,
        toggleDensity,
      }}
    >
      {children}
    </TableDensityContext.Provider>
  )
}

export const useTableDensityContext = (): ITableDensity => {
  const context = useContext(TableDensityContext)
  if (!context) {
    throw new Error(
      'useTableDensityContext must be used within a TableDensityProvider',
    )
  }
  return context
}
