import React, { useEffect } from 'react'
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import Paper from '@mui/material/Paper';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';

import data from '../data.json'

import { Data, createData, Order, getComparator, stableSort, fileDetail, breadCrumbDataType } from '../util';
import EnhancedTableHead from './EnhancedTableHead';
import EnhancedTableToolbar from './EnhancedTableToolbar';
import EnhancedTableBody from './EnhancedTableBody';
import BreadCrumb from './BreadCrumb';


const Main2 = () => {
  const [order, setOrder] = React.useState<Order>('asc');
  const [orderBy, setOrderBy] = React.useState<keyof Data>('size');
  const [selected, setSelected] = React.useState<readonly number[]>([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [rows, setRows] = React.useState<Data[]>([])
  const [currentDirectory, setCurrentDirectory] = React.useState<string>('app.children[0]')
  const [breadCrumbData, setBreadCrumbData] = React.useState<breadCrumbDataType[]>(
    [{  level: 0, label: 'app', path:'app.children[0]'  }]
  )
  const [directoryLevel,setDirectoryLevel] = React.useState<number>(0)

function getValueByPath<T>(obj: any, path: string): fileDetail {
  const parts: string[] = path.split('.');
  let value: any = obj;
  for (const part of parts) {
  
    if(part === "children[0]")
    {
      value = value["children"];
      value = value[0]
    }
    else value = value[part];
    
  }
  return value;
}


  useEffect(()=>{
    let driveData: fileDetail = getValueByPath<string>(data, currentDirectory)
  let i=1;
  let driveDataArray : Data[]= []
  for(let document in driveData){
    driveDataArray.push(createData(i, document, driveData[document].size?? "1001MB" , driveData[document].type, 2023))
    
    i++
  }
  setRows(driveDataArray)

  },[currentDirectory])

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof Data,
  ) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  useEffect(()=>{
    console.log(breadCrumbData)
  },[breadCrumbData])

  const handleDoubleClick= (event: React.MouseEvent<unknown>, id: number, name: string)=>{
    let newPath = currentDirectory + '.'+ name +'.children[0]'
    setDirectoryLevel(prev=>{
      let newId = prev+1
      setBreadCrumbData(prev => [...prev,{level: newId,label:name, path: newPath}])
      return newId
    }) 
    setCurrentDirectory(prevPath => prevPath + '.'+ name +'.children[0]')
    
  }

  const handleClick = (event: React.MouseEvent<unknown>, id: number) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected: readonly number[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
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

  const handleChangeDense = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDense(event.target.checked);
  };

  const isSelected = (id: number) => selected.indexOf(id) !== -1;

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const visibleRows = React.useMemo(
    () =>
      stableSort(rows, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage,
      ),
    [order, orderBy, page, rowsPerPage,rows],
  );


  return (
    <Box sx={{ width: '100%' }}>
      {
        rows.length==0?
         "Loading....":
         <>
         <Paper sx={{ width: '100%', mb: 2 }}>
         <EnhancedTableToolbar numSelected={selected.length} />
         <BreadCrumb breadCrumbData={breadCrumbData} setCurrentDirectory={setCurrentDirectory} setBreadCrumbData={setBreadCrumbData} />
         <TableContainer>
           <Table
             sx={{ minWidth: 750 }}
             aria-labelledby="tableTitle"
             size={dense ? 'small' : 'medium'}
           >
             <EnhancedTableHead
               numSelected={selected.length}
               order={order}
               orderBy={orderBy}
               onSelectAllClick={handleSelectAllClick}
               onRequestSort={handleRequestSort}
               rowCount={rows.length}
             />
             <EnhancedTableBody 
             visibleRows={visibleRows} 
             isSelected={isSelected} 
             handleDoubleClick={handleDoubleClick}
             handleClick={handleClick}
             emptyRows={emptyRows}
             dense={dense}
             />
           </Table>
         </TableContainer>
         <TablePagination
           rowsPerPageOptions={[5, 10, 25]}
           component="div"
           count={rows.length}
           rowsPerPage={rowsPerPage}
           page={page}
           onPageChange={handleChangePage}
           onRowsPerPageChange={handleChangeRowsPerPage}
         />
       </Paper>
       <FormControlLabel
         control={<Switch checked={dense} onChange={handleChangeDense} />}
         label="Dense padding"
       /> </>
      }
      
    </Box>
  )
}

export default Main2