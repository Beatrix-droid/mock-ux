
import './App.css'
import BaseTable from './Components/BaseTable'
import Box from '@mui/material/Box';
import ResponsiveAppBar from './Components/NavBar'
import ErrorBoundary from './Shared/ErrorBoundary';


function App() {


  return (
    <>
    <ErrorBoundary
    fallback={<h1>Oops! Something went wrong.</h1>}>
    <Box sx={{display:"flex", 	flexDirection: "column",}}>
    <Box sx={{width:"100vw", margin:"auto", position: "sticky", top: 0, paddingBottom:"2%"}}>
    <ResponsiveAppBar/>
    </Box>

    <Box sx={{overflowY:"auto", width:"80vw", height:"90vh"}}>
    
    <BaseTable/>
    </Box>
    </Box>
    </ErrorBoundary>
    </>
  )
}

export default App
