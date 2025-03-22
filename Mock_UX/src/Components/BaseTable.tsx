

import  {useState, useEffect, ChangeEvent, MouseEvent} from 'react';
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
import LaunchRoundedIcon from '@mui/icons-material/LaunchRounded';
import EmployeeDetails from './EmployeeDetails';
import { formatDate } from '../actions/formatDateString';

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
    const [loading, setLoading]=useState<boolean>(false);
    const [detailsOpen, setDetailsOpen]=useState<boolean>(false);
    const [employeeId, setEmployeeId]= useState<number>(1)
    const [employeeName, setEmployeeName]=useState<string>("");
    const[ startDate, setStartDate]=useState<string>("");



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

      const handleOpenDialgoue=(id:number, name:string)=>{
        setEmployeeId(id);
        setDetailsOpen(true);
        setEmployeeName(name);
      }

      const handleCloseDialgoue=()=>{
        setDetailsOpen(false);
      }
    


      const paginatedData = filteredRows.slice(
		page * rowsPerPage,
		page * rowsPerPage + rowsPerPage
	);

    useEffect(()=>{
        setLoading(true);
      const fetchEmployeeData= async()=>{
        const employees=await fetchEmployees();
      
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
        setPage(0)
    }, [rows]);


    useEffect(() => {
        setPage(0); 
    }, [filteredRows])

    const applyNameFilter=()=>{
        let prefilteredrows;
        if (nameFilter=="" && startDate==""){
            prefilteredrows=rows;
        }
        else{
            prefilteredrows=filteredRows.filter(item =>
                item.name.toLowerCase().includes(nameFilter.toLocaleLowerCase()))
        };
   

       
        setFilteredRows(prefilteredrows);
    }
    

    useEffect(()=>{applyNameFilter()},[nameFilter])

    const handleFilterChange=(e: ChangeEvent<HTMLInputElement>, field:string)=>{
        const dirtyInput=e.target.value;
        const cleanInput=DOMPurify.sanitize(dirtyInput)
        if(field="name"){setNameFilter(cleanInput)}
        if (field="startDate"){setStartDate(cleanInput)};
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
               sx={{ input: { color: 'white' } }}
                size="small"
                value={nameFilter ||""}
                onChange={(e:ChangeEvent<HTMLInputElement>) =>
                  handleFilterChange(e, "name")
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
            <StyledTableCell align="right">{formatDate(row.DateOfBirth)}</StyledTableCell>
            <StyledTableCell align="right">{formatDate(row.StartDate)}</StyledTableCell>
            <StyledTableCell align="right"   sx={{
                      color: row.active ? "green" : "#6E2E35",
                      fontWeight: "bold",
                  }}>
{row.active? "Yes":"No"}</StyledTableCell>
            <StyledTableCell align="center" onClick={(_e)=>{handleOpenDialgoue(row.id, row.name)}}><LaunchRoundedIcon/></StyledTableCell>
          </StyledTableRow>
        ))}
      </TableBody>
    </Table>


    <TablePagination
  rowsPerPageOptions={[5, 10, 20]}
  component="div"
  count={filteredRows.length}
  rowsPerPage={rowsPerPage}
  page={page}
  onPageChange={handleChangePage}
  onRowsPerPageChange={handleChangeRowsPerPage}
/>
  </TableContainer>)}


  <EmployeeDetails open={detailsOpen} onClose={handleCloseDialgoue} employeeID={employeeId} employeeName={employeeName}/>
    
  </>
    
    
    );

}





