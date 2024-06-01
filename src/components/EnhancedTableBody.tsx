import React, { useEffect } from 'react'
import { createData, Order, Data,stableSort, getComparator } from '../util';
import { TableContainer, TableCell, Table, TableBody, TableRow, TablePagination, Paper, FormControlLabel, Checkbox,Box , Switch } from '@mui/material';
import EnhancedTableHead from './EnhancedTableHead';
import EnhancedTableToolbar from './EnhancedTableToolbar';
import FolderIcon from '@mui/icons-material/Folder';
import ArticleIcon from '@mui/icons-material/Article';


const EnhancedTableBody:
  React.FC<{
  visibleRows: Data[];
  emptyRows: number;
  dense: boolean
  isSelected: (id: number) => boolean ;
  handleClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>, id: number) => void ;
  handleDoubleClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>, id: number, name: string) => void;
  }> = ({
    visibleRows,
    emptyRows,
    dense,
    isSelected,
    handleClick,
    handleDoubleClick
  }) => {
  // const EnhancedTableBody = () => {
   
// console.log(props.visibleRows)



   
    
  return (
           <TableBody>
             {visibleRows.map((row, index) => {
              const isItemSelected = isSelected(row.id);
              const labelId = `enhanced-table-checkbox-${index}`;

              return (
                <TableRow
                  hover
                  onDoubleClick={row.type === 'folder' ? (event) =>  handleDoubleClick(event, row.id, row.name): undefined}
                  // onDoubleClick={(event) =>  setCurrentDirectory(prevPath => prevPath + '.'+ row.name +'.children[0]')}
                  aria-checked={isItemSelected}
                  tabIndex={-1}
                  key={row.id}
                  selected={isItemSelected}
                  sx={{ cursor: 'pointer' }}
                >
                  <TableCell padding="checkbox"
                  onClick={(event) => handleClick(event, row.id)}
                  role="checkbox"
                  >
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
                      {row.type === 'folder'?
                      <FolderIcon style={{ color: '#FFDD99' }} />:
                      <ArticleIcon style={{ color: '#0096FF' }} />
                      }
                       &nbsp;

                    {row.name}
                  </TableCell>
                  <TableCell >{row.size}</TableCell>
                  <TableCell >{row.type}</TableCell>
                  <TableCell >{row.modified}</TableCell>
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
        
  )
}

export default EnhancedTableBody