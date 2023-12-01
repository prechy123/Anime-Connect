import {
  LockOutlined,
  ThumbDownAlt,
  ThumbUpAlt,
} from "@mui/icons-material";
import {
  Alert,
  AlertTitle,
  Avatar,
  Box,
  Button,
  Grid,
  Link,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
// import ThemeModeSigninSignUp from "./HomePage/helperComponents/ThemeModeSignInSignUp";
import ThemeMode from "./HomePage/helperComponents/ThemeMode";

const SignUp = () => {
  const Navigate = useNavigate();
  const [userNameStatus, setUserNameStatus] = useState(false);
  const [errors, setErrors] = useState();

  const closeAlert = (err) => {
    setErrors(errors.filter((error) => error !== err));
  };
  const checkUserName = (userName) => {
    if (userName) {
      fetch(`http://localhost:4000/users/checkUserName?username=${userName}`, {
        credentials: "include",
      })
        .then((response) => response.json())
        .then((data) => {
          const status = data.message;
          if (status === "exist") {
            setUserNameStatus(true);
          } else {
            setUserNameStatus(false);
          }
        })
        .catch((error) => console.error("Error:", error));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // console.log({
    //   firstName: data.get("firstName"),
    //   lastName: data.get("lastName"),
    //   userName: data.get("userName"),
    //   email: data.get("email"),
    //   password: data.get("password"),
    // });
    if (!userNameStatus) {
      const formData = {
        username: data.get("userName"),
        fullname: data.get("firstName") + " " + data.get("lastName"),
        email: data.get("email"),
        password: data.get("password"),
      };
      const api = await fetch("http://localhost:4000/users/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const response = await api.json();
      console.log(response);
      if (response.message === "Account created successfully") {
        Navigate("/signin");
      } else {
        if (response.message) {
          setErrors([response.message]);
        } else {
          setErrors(response.error);
        }
      }
    }
  };
  return (
    <>
      <Box
        display="flex"
        alignItems="center"
        bgcolor={"primary.main"}
        color={"primary.text"}
        height="100vh"
      >
        <Stack width="40%" margin="0 auto">
          <Typography component="h1" variant="h5" margin="0 auto">
            WEEEDS.com
          </Typography>
          <Avatar sx={{ m: 1, bgcolor: "primary.main", margin: "0 auto" }}>
            <LockOutlined />
          </Avatar>
          <Typography component="h1" variant="h5" margin="0 auto">
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12} display="flex" alignItems="center" gap={2}>
                <TextField
                  required
                  fullWidth
                  id="userName"
                  label="Username"
                  name="userName"
                  onChange={(e) => {
                    checkUserName(e.target.value);
                  }}
                />
                {userNameStatus ? (
                  <ThumbDownAlt color="error" />
                ) : (
                  <ThumbUpAlt color="success" />
                )}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="#" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Stack>
      </Box>
      {errors && (
        <Stack gap={1} position="absolute" top={20} right={20} zIndex={2}>
          {errors.map((error, index) => (
            <Alert
              severity="error"
              key={index}
              onClick={() => closeAlert(error)}
            >
              <AlertTitle>Error</AlertTitle>
              This is an error alert — <strong>{error}</strong>
            </Alert>
          ))}
        </Stack>
      )}
      {/* <ThemeModeSigninSignUp /> */}
      <ThemeMode />
    </>
  );
};

export default SignUp;
