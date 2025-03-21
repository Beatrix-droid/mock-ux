

import {useState, useEffect} from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { TablePagination } from '@mui/material';
import Paper from '@mui/material/Paper';
import {fetchEmployees, Employee} from '../actions/fetchAllEmployees';



const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: "#243347",
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));



  
export default function BaseTable(){

    const [rows, setRows]=useState<Employee[]>([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const handleChangePage = (
        event: React.MouseEvent<HTMLButtonElement> | null,
        newPage: number,
      ) => {
        setPage(newPage);
      };
    
      const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
      ) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
      };


      const paginatedData = rows.slice(
		page * rowsPerPage,
		page * rowsPerPage + rowsPerPage
	);

    useEffect(()=>{
      const fetchEmployeeData= async()=>{
        const employees=await fetchEmployees();
        console.log("fetched data is");
        console.log(employees)
        if (Array.isArray(employees)){
            setRows(employees);
        }
        else{
            console.error("An error occured fetching employees: "+ employees); // error returned in the function
        }
      }
      fetchEmployeeData();
    
    },[])



    
    return (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
              <StyledTableCell align="right">Employee Id</StyledTableCell>
                <StyledTableCell align="center">Name</StyledTableCell>
                <StyledTableCell align="right">Date of Birth</StyledTableCell>
                <StyledTableCell align="right">Start Date</StyledTableCell>
                <StyledTableCell align="right">Status</StyledTableCell>
                <StyledTableCell align="center">Action</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedData.map((row) => (
                <StyledTableRow key={row.name}>
               
                  <StyledTableCell align="center">{row.id}</StyledTableCell>
                  <StyledTableCell align="center">{row.name}</StyledTableCell>
                  <StyledTableCell align="right">{row.DateOfBirth}</StyledTableCell>
                  <StyledTableCell align="right">{row.StartDate}</StyledTableCell>
                  <StyledTableCell align="right">{row.active.toString()}</StyledTableCell>
                  <StyledTableCell align="right">PlaceHolder</StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>


          <TablePagination
        rowsPerPageOptions={[5, 10, 20]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
        </TableContainer>
      );

}





