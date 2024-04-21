import { Button, ButtonGroup, useTheme } from "@mui/material";
import { Link } from "react-router-dom";

const ProfileNotAuthenicated = () => {
  const Theme = useTheme();
  return (
    <>
      <ButtonGroup variant="contained" aria-label="signup or signin" fullWidth>
        <Button color="secondary" href="/signup">
          {/* <Link
                to="/signup"
                style={{
                  textDecoration: "none",
                  color: Theme.palette.primary.text,
                }}
              > */}
          SIGNUP
          {/* </Link> */}
        </Button>
        <Button variant="outlined" color="secondary" href="/signin">
          {/* <Link
                to="/signin"
                style={{
                  textDecoration: "none",
                  color: Theme.palette.primary.text,
                }}
              > */}
          SIGNIN
          {/* </Link> */}
        </Button>
      </ButtonGroup>
    </>
  );
};

export default ProfileNotAuthenicated;
