
import {useState, useEffect} from 'react';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import Box from '@mui/material/Box';
import { EmployeeShifts } from '../actions/fetchEmployeeShift';
import { fetchEmployeeShifts } from '../actions/fetchEmployeeShift';
import ShiftCard from './shiftCard';


export interface EmployeeDetailsProps {
    open: boolean;
    onClose: (open:boolean) => void;
    employeeID:number;
    employeeName:string;
  }

export default function EmployeeDetails({open, onClose, employeeID, employeeName}:EmployeeDetailsProps)
{
    const [shifts, setShifts]=useState<EmployeeShifts[]>([])
    const handleClose = () => {
        onClose(open);
      };
    
 

    useEffect(()=>{

         const fetchEmployeeData= async()=>{
              const fetchedShifts=await fetchEmployeeShifts(employeeID);
            
              if (Array.isArray(fetchedShifts)){
                  setShifts(fetchedShifts);
              
                }
              else{
                  console.error("An error occured fetching employee shifts: "+ fetchedShifts); // error returned in the function
              }
              
            }
            if(open)
              {
                fetchEmployeeData()
              }
            
    },[open]);



    return(   <Dialog onClose={handleClose} open={open}>
        <DialogTitle>{employeeName}'s Upcoming Shifts:</DialogTitle>
       
          {shifts.map((shift) => (
            <Box sx={{width:"80%", margin:"auto"}}  key={shift.Id} >
         <ShiftCard location={shift.Location} role={shift.Role} employeeId={shift.PersonId} start={shift.Start} end={shift.End}/>
         </Box>
          ))}
          
        
        
        <Button variant="contained" sx={{backgroundColor:"#6E2E35",
                     padding: "2%",
                      borderRadius: "8px",
                      width: "80%",
                      color: "white",
                      boxShadow: "0px 1px 6px 0px rgba(0, 0, 0, 0.15)",
                      margin: "auto",
                      marginBottom:"10%"}} onClick={handleClose}>Close</Button>
                     
      </Dialog>)
}