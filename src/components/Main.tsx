import React from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import FolderIcon from '@mui/icons-material/Folder';
import ArticleIcon from '@mui/icons-material/Article';
import Checkbox from '@mui/material/Checkbox';


function createData(name: string, calories:number, fat:number, carbs:number, protein:number) {
    return { name, calories, fat, carbs, protein };
  }
  
const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
  ];


const Main = () => {
    

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell style={{ backgroundColor: 'pink' }}>
              <Checkbox  />
            </TableCell>
            {/* <TableCell style={{ backgroundColor: '#FFDD99' }}> NAME</TableCell> */}
            <TableCell style={{ backgroundColor: 'yellow' }}>SIZE</TableCell>
            <TableCell style={{ backgroundColor: 'orange' }}>TYPE</TableCell>
            {/* <TableCell style={{ backgroundColor: 'aqua' }}>MODIFIED DATE / TIME</TableCell> */}
            
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell >
                <Checkbox  />
              </TableCell>
              {/* <ArticleIcon style={{ color: '#0096FF' }} /> */}
              {/* <TableCell component="th" scope="row">
                <FolderIcon style={{ color: '#FFDD99' }} />
                
                &nbsp; {row.name}
              </TableCell> */}
              <TableCell >{row.calories}</TableCell>
              <TableCell >{row.fat}</TableCell>
              {/* <TableCell >{row.carbs}</TableCell> */}
              
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default Main