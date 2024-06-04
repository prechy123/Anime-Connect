import { Box, Button } from "@mui/material"

const Messenger = ({setShowMessenger}) => {
  return (
    <Box sx={{backgroundColor: 'white', 
        width: '100%',
        height: '100%',
        color: 'black',
        display: 'flex',
        alignItems: 'center',
        borderRadius: '30px'
    }}>
        Currently In construction
        <Button variant="contained" onClick={() => setShowMessenger(prev => !prev)}>
            Go Back
        </Button>
    </Box>
  )
}

export default Messenger