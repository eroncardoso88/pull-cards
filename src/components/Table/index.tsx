import * as React from 'react';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import { visuallyHidden } from '@mui/utils';
import { translates } from '@/utils/translates';
import { Button } from '@mui/material';
import { useTableDensityContext } from '@/contexts/TableDensity';
import { Create } from '@mui/icons-material';
import { Visibility } from '@mui/icons-material';

export interface BaseRecord {
  id: string;
 }

 export const multipleValueFields = [
  "cardSequenceList"
 ]
interface IActions {
  edit?: {
    callback: (row: any) => void
  },
  view?: {
    callback: (row: any) => void
  },
  delete?: {
    callback: (id: string | number) => void
  },
  create?: {
    callback: () => void
  },
}

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

type Order = 'asc' | 'desc';

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key,
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string },
) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort<T>(array: readonly T[], comparator: (a: T, b: T) => number) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

interface HeadCell {
  id: string;
  numeric: boolean;
  disablePadding: boolean;
  label: string;
}

const generateHeadCells = (columns: Object, actions: IActions): HeadCell[] => {
  const headCells = Object.keys(columns).map(column => {
    return {
      id: columns[column],
      numeric: !isNaN(parseFloat(columns[column])),
      disablePadding: columns[column] === "id",
      label: translates(columns[column])
    }
  })
  if (
    Object.keys(actions).includes('edit') ||
    Object.keys(actions).includes('view') || 
    Object.keys(actions).includes('delete') 
  )
  console.log(headCells);
  
  return headCells.concat([{
    id: 'actions',
    numeric: false,
    disablePadding: false,
    label: "Ações"
  }])
}

interface EnhancedTableHeadProps {
  numSelected: number;
  onRequestSort: (event: React.MouseEvent<unknown>, property: keyof Data) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
  tableHeadCells: []
  actions: IActions
}

function EnhancedTableHead(props: EnhancedTableHeadProps) {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort, tableHeadCells, actions } =
    props;
  const createSortHandler =
    (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'select all data',
            }}
          />
        </TableCell>
        {generateHeadCells(tableHeadCells, actions).map((headCell, index) => (
          <TableCell
            key={headCell.id}
            align={index !== 0 ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

interface EnhancedTableToolbarProps {
  numSelected: number;
  title: string;
}

const EnhancedTableToolbar = (props: EnhancedTableToolbarProps) => {
  const { numSelected, title } = props;
  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: '1 1 100%' }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selecionados
        </Typography>
      ) : (
        <Typography
          sx={{ flex: '1 1 100%' }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          {title}
        </Typography>
      )}
      {numSelected > 0 ? (
        <Tooltip title="Delete múltiplo desativado.">
          <IconButton sx={{opacity: 0.5, cursor: 'default'}}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filtragem de dados desativada.">
          <IconButton sx={{opacity: 0.5, cursor: 'default'}}>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
};

interface IActionButtons {
  actions: IActions
  row: any
}

const ActionButtons:React.FunctionComponent<IActionButtons> = ({actions, row}) => {
  return (
    <Box sx={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', position: 'relative', left: '10px'}}>
      {actions.view && <IconButton onClick={() => actions.view?.callback(row)} color="inherit" sx={{padding: '0 5px', width: '27.5px'}}><Visibility width={10}/></IconButton>}
      {actions.edit && <IconButton onClick={() => actions.edit?.callback(row)} color="inherit" sx={{padding: '0 5px', width: '27.5px'}}><Create /></IconButton>}
      {actions.delete && <IconButton onClick={() => actions.delete?.callback(row)} color="inherit" sx={{padding: '0 5px', width: '27.5px'}}><DeleteIcon /></IconButton>}
    </Box>
  )
}


interface EnhancedTableProps {
  columns: []
  data: []
  actionCreate: () => void
  actionChangeDense: () => void
  actions: IActions
  helperKeysData: any
  helperKeys: any[]
}



export default function EnhancedTable({columns = [], data = [], title, actions, helperKeysData, helperKeys}: EnhancedTableProps) {
  const [order, setOrder] = React.useState<Order>('asc');
  const [orderBy, setOrderBy] = React.useState(columns[0]);
  const [selected, setSelected] = React.useState<readonly string[]>([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const {dense, toggleDensity} = useTableDensityContext()

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: any,
  ) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = data.map((n) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event: React.MouseEvent<unknown>, name: string) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected: readonly string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = () => {
    toggleDensity();
  };

  const getMultipleValueRow = (item, column) => {
    return item.split(',').map(item => {
      const reqReplaceIndex = helperKeys.findIndex(key => key.replaceKeyReq === column)
      const dataReplace = helperKeysData[reqReplaceIndex]?.data.find(elem => elem.id === item)
      return `[${dataReplace.name}|${dataReplace.info}]`
    })
  }

  const getRow = (item, column) => {
    if (multipleValueFields.includes(column)) return getMultipleValueRow(item, column);
    console.log(`item `, item)
    console.log(`column `, column)
    const reqReplaceIndex = helperKeys.findIndex(key => key.replaceKeyReq === column)
    console.log(`reqReplaceIndex `, reqReplaceIndex)
    console.log(`helperKeys `, helperKeys)
    if (reqReplaceIndex === -1) return item
    const dataReplace = helperKeysData[reqReplaceIndex]?.data.find(elem => elem.id === item)
    return dataReplace[helperKeys[reqReplaceIndex].replaceKeyRes] 
  }

  const isSelected = (name: string) => selected.indexOf(name) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0;

  return (
    <Box>
      <Paper sx={{ width: '100%', mb: 2, padding: {xs: "0 2px", sm: "0 10px"}, opacity: 0.9, overflowX: "auto", maxWidth: '97.5vw' }} elevation={7}>
        <EnhancedTableToolbar numSelected={selected.length} title={title}/>
        <TableContainer sx={{
          width: "auto",
          overflowX: "unset"
        }}>
          <Table
            sx={{ minWidth: 280 }}
            aria-labelledby="tableTitle"
            size={dense ? 'small' : 'medium'}
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={data.length}
              tableHeadCells={columns}
              actions={actions}
            />
            <TableBody>
              {stableSort(data, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.id);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.id}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox" onClick={(event) => handleClick(event, row.id)}>
                        <Checkbox
                          color="primary"
                          checked={isItemSelected}
                          inputProps={{
                            'aria-labelledby': labelId,
                          }}
                        />
                      </TableCell>
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                      >
                        {row.id}
                      </TableCell>
                      {columns.filter(column => column !== 'id').map(column => (
                        <TableCell key={column} align="right">{getRow(row[column], column)}</TableCell>
                      ))}

                      {
                        (
                          Object.keys(actions).includes('edit') ||
                          Object.keys(actions).includes('delete') ||
                          Object.keys(actions).includes('view')) && (
                            <TableCell key={'actions'} align="right" width={100}><ActionButtons actions={actions} row={row}/></TableCell>
                        )
                      }
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (dense ? 33 : 53) * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          sx={{overflow: "unset"}}
        />
      </Paper>
      <Box 
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "flex-row",
          alignItems: "center",
          justifyContent: "space-between"
        }}
      >
        <FormControlLabel
          control={<Switch checked={dense} onChange={() => handleChangeDense()} />}
          label="Adensar registros"
        />
        {actions.create && <Button onClick={() => actions.create?.callback()} variant="contained" color="primary" type="button">
          <Typography variant="button">
            Criar
          </Typography>
        </Button>}
      </Box>
    </Box>
  );
}
