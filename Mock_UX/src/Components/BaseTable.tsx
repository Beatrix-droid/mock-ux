

import React, {useState, useEffect, ChangeEvent, MouseEvent} from 'react';
import { styled } from '@mui/material/styles';
import CircularProgress from '@mui/material/CircularProgress';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { TablePagination, TextField } from '@mui/material';
import Paper from '@mui/material/Paper';
import {fetchEmployees, Employee} from '../actions/fetchAllEmployees';
import Box from '@mui/material/Box';
import SortingFilters from './sortingFilters';
import DOMPurify from 'dompurify';


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
    const [nameFilter, setNameFilter]=useState<string>("");
    const[filteredRows, setFilteredRows]=useState<Employee[]>([]);
    const [loading, setLoading]=useState<Boolean>(false);
  

    const handleChangePage = (
        event: MouseEvent<HTMLButtonElement> | null,
        newPage: number,
      ) => {
        setPage(newPage);
      };
    
      const handleChangeRowsPerPage = (
        event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
      ) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
      };

    


      const paginatedData = filteredRows.slice(
		page * rowsPerPage,
		page * rowsPerPage + rowsPerPage
	);

    useEffect(()=>{
        setLoading(true);
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
        setLoading(false);
      }
      fetchEmployeeData();
    
    },[])

    useEffect(() => {
        setFilteredRows(rows);
    }, [rows]);

    const applyNameFilter=()=>{
        let filteredRows=[...rows];
        console.log("filter value is")
        console.log(filteredRows);
        if (nameFilter==""){
            filteredRows=rows;
        } 

        else{
            filteredRows= rows.filter(item =>
            item.name.toLowerCase().includes(nameFilter.toLocaleLowerCase())
        );
        setFilteredRows(filteredRows);
    }
    }

    useEffect(()=>{applyNameFilter()},[nameFilter])

    const handleFilterChange=(e: ChangeEvent<HTMLInputElement>)=>{
        const dirtyInput=e.target.value;
        const cleanInput=DOMPurify.sanitize(dirtyInput)
       setNameFilter(cleanInput);
    }

    const sortTableData=(key:keyof Employee, descending:boolean)=>{
        let sortedData = [...filteredRows];

        sortedData.sort((a, b) => {
            const valueA = a[key];
            const valueB = b[key];
    
          
            if (valueA == null) return 1;
            if (valueB == null) return -1;
    
            
            if (typeof valueA === "number" && typeof valueB === "number") {
                return valueA - valueB;
            }
            if (key==="active"){
                return valueA.toString().localeCompare(valueB.toString());
            }
    
            if (typeof valueA === "string" && typeof valueB === "string") {
                return valueA.localeCompare(valueB);
            }
    
            return 0;
        });
    
        if (descending) {
            sortedData.reverse();
        }
        setFilteredRows(sortedData)
	};

 
    


    
    return (

<>{loading &&(  <Box sx={{ display: 'flex' }}>
      <CircularProgress />
    </Box>)}

{!loading && rows.length>0 && (<TableContainer component={Paper}>
    <Table sx={{ minWidth: 700}} aria-label="customized table">
      <TableHead>
     
        <TableRow>
        <StyledTableCell align="center">
          <Box>Employee Id
        <SortingFilters
              tableColumnName="id"
              sortHandler={sortTableData}
              />
              </Box>
              </StyledTableCell>
          
          <StyledTableCell align="center">
              <Box>Name
          <SortingFilters
              tableColumnName="name"
              sortHandler={sortTableData}
              />
              <TextField
                size="small"
                value={nameFilter ||""}
                onChange={(e:ChangeEvent<HTMLInputElement>) =>
                  handleFilterChange(e)
                }
                onKeyDown={(e) => e.key === "Enter" && applyNameFilter()}/>
              </Box>
              </StyledTableCell>

          <StyledTableCell align="right">
          <Box>Date of Birth
          <SortingFilters
              tableColumnName="DateOfBirth"
              sortHandler={sortTableData}
              />
              </Box>


          </StyledTableCell>
          <StyledTableCell align="right">
              <Box>
                  Start Date
          <SortingFilters
              tableColumnName="StartDate"
              sortHandler={sortTableData}
              />
              </Box>
          </StyledTableCell>
          <StyledTableCell align="right">Status
          <SortingFilters
              tableColumnName="active"
              sortHandler={sortTableData}/>

          </StyledTableCell>
        
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
            <StyledTableCell align="right"   sx={{
                      color: row.active ? "green" : "red",
                      fontWeight: "bold",
                  }}>
{row.active? "Yes":"No"}</StyledTableCell>
            <StyledTableCell align="center">PlaceHolder</StyledTableCell>
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
  </TableContainer>)}
    
  </>
    
    
    );

}





