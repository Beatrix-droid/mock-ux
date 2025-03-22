
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { formatDate } from '../actions/formatDateString';


interface shiftCardProps{
    location:string;
    role:string;
    employeeId:number;
    start:string;
    end:string;
}

export default function ShiftCard({location, role, employeeId, start, end}:shiftCardProps) {
  return (
    <Card sx={{ backgroundColor:"#BDBDBD", margin:"2%", }}>
      <CardContent>

      <div style={{display: "inline-block", width:"50%"}}>
        <Typography>
          Location
        </Typography>
        <Typography  sx={{ color: 'text.secondary', fontSize:"14px" }}>
          {location}
        </Typography>
        <Typography>
          Role
        </Typography>
        <Typography sx={{ color: 'text.secondary', fontSize:"14px" }}>{role}</Typography>

        <Typography>
          Person ID
        </Typography>
        <Typography sx={{ color: 'text.secondary', fontSize:"14px"  }}>{employeeId}</Typography>
        </div>

        <div style={{display: "inline-block", alignItems:"right",  width:"50%"}}>
        <Typography sx={{textAlign:"right"}}>
          Start
        </Typography>
        <Typography  sx={{ color: 'text.secondary', fontSize:"14px", textAlign:"right" }}>
          {start.split("T")[1].slice(0,-3)}
        </Typography>
        <Typography  sx={{ color: 'text.secondary', fontSize:"14px", textAlign:"right" }}>
          {formatDate(start.split("T")[0])}
        </Typography>
        <Typography  sx={{textAlign:"right"}}>
          End
        </Typography>
        <Typography sx={{ color: 'text.secondary', fontSize:"14px", textAlign:"right" }}>{end.split("T")[1].slice(0,-3)}</Typography>
        <Typography sx={{ color: 'text.secondary', fontSize:"14px", textAlign:"right" }}>{formatDate(end.split("T")[0])}</Typography>
        </div>
     
      </CardContent>

    </Card>
  );
}