import * as React from 'react';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { ReactNode } from 'react';
import { breadCrumbDataType } from '../util';




const BreadCrumb: React.FC<{
    breadCrumbData: breadCrumbDataType[];
    setCurrentDirectory: React.Dispatch<React.SetStateAction<string>>; 
}> = ({breadCrumbData, setCurrentDirectory}) => {

    const breadcrumbs: ReactNode[] =[]
    breadCrumbData.forEach((data,index)=>{
        breadcrumbs.push(
            <Link underline="hover" key={index} color="inherit"  onClick={()=>setCurrentDirectory(data.path)}>
                {data.label}
            </Link>
        )
    })


  return (
    <Stack spacing={2} style={{marginLeft:'20px'}}>
      <Breadcrumbs
        separator={<NavigateNextIcon fontSize="small" />}
        aria-label="breadcrumb"
      >
        {breadcrumbs}
      </Breadcrumbs>
    </Stack>
  );
}
export default BreadCrumb