import { Button } from "@mui/material"
import { Link } from "react-router-dom"

const NotFound = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100wh', alignItems: 'center', justifyContent: 'center', height: "100vh" }}>
      <div>
        404 - Page not Found.
      </div>
      <div>
        <Button> <Link to={'/'}>Back to Homepage</Link></Button>
      </div>
    </div>
  )
}

export default NotFound