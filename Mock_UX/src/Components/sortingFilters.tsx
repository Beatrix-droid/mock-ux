
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import {MenuItem, ListItemText, ListItemIcon, Divider, Select } from "@mui/material";
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { Employee } from "../actions/fetchAllEmployees";
import {memo} from "react";

interface SortingFilterProps{
    sortHandler:(tableColumnName: keyof Employee, descending:boolean)=>void;
    tableColumnName:keyof Employee;
}
 function SortingFilters({sortHandler, tableColumnName}:SortingFilterProps){
  console.log("rendered")
  return( 
    
    <>
    {["id", "DateOfBirth", "StartDate"].includes(tableColumnName) &&(  <Select
        IconComponent={FilterAltOutlinedIcon}
        sx={{
          boxShadow: "none",
          ".MuiOutlinedInput-notchedOutline": { border: 0 },
          "& .MuiSelect-icon": { 
            color: "white !important", // Ensure icon color is white
          },
          "& .MuiSelect-iconOpen": {
            transform: "none !important",
          
          },
        }}
      >
        <MenuItem
          onClick={(_e) => {
            sortHandler(tableColumnName, false);
          }}
        >
          <ListItemIcon>
            <ArrowUpwardIcon />
          </ListItemIcon>
          <ListItemText>Low-High</ListItemText>
        </MenuItem>
        <Divider />

        <MenuItem
          onClick={(_e) => {
            sortHandler(tableColumnName, true);
          }}
        >
          <ListItemIcon>
            <ArrowDownwardIcon />
          </ListItemIcon>
          <ListItemText>High-Low</ListItemText>
        </MenuItem>
      </Select>
      )}
  
      {["name", "active"].includes(tableColumnName) &&(    <Select
            IconComponent={FilterAltOutlinedIcon}
            sx={{
            boxShadow: "none",
            ".MuiOutlinedInput-notchedOutline": { border: 0 },
            "& .MuiSelect-icon": { 
                color: "white !important", // Ensure icon color is white
              },
            "& .MuiSelect-iconOpen": {
                transform: "none !important",
            },
            }}
            >
            <MenuItem>
            <ListItemText
                onClick={(_e) => {
                sortHandler(tableColumnName, false);
                }}
            >
                A-Z
            </ListItemText>
            </MenuItem>
            <MenuItem>
            <ListItemText
                onClick={(_e) => {
                sortHandler(tableColumnName, true);
                }}
            >
                Z-A
            </ListItemText>
            </MenuItem>
            </Select>)}
      </>
    )
}

export default memo (SortingFilters);