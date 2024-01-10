import { LockOutlined, ThumbDownAlt, ThumbUpAlt } from "@mui/icons-material";
import {
  Alert,
  AlertTitle,
  Avatar,
  Box,
  Button,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ThemeModeSigninSignUp from "./HelperComponents/ThemeModeSigninSignUp";
import { PulseLoader } from "react-spinners";
import { useTheme } from "@emotion/react";

const BASE_URL = "http://localhost:4000"

// const BASE_URL = "https://weeebs.onrender.com"
// signup
const SignUp = () => {
  const theme = useTheme()
  const Navigate = useNavigate();
  const [loading, setLoading] = useState(false)
  const [userNameStatus, setUserNameStatus] = useState(false);
  const [errors, setErrors] = useState();

  const closeAlert = (err) => {
    setErrors(errors.filter((error) => error !== err));
  };
  const checkUserName = (userName) => {
    if (userName) {
      fetch(`${BASE_URL}/users/checkUserName?username=${userName}`, {
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
    setLoading(true)
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
      const api = await fetch(`${BASE_URL}/users/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const response = await api.json();
      setLoading(false)
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
          <Typography
            variant="h6"
            fontWeight={600}
            color="primary.text"
            margin="0 auto"
          >
            WEEEBS
            <Typography display="inline" color="secondary">
              .com
            </Typography>
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
                  color="secondary"
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
                  color="secondary"
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
                  color={userNameStatus ? "error" : "secondary"}
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
                  color="secondary"
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
                  color="secondary"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, cursor: loading && "wait" }}
            >
              {loading ? <PulseLoader color={theme.palette.primary.text} /> : "Sign Up"}
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link to="/signin" variant="body2" style={{color: theme.palette.primary.text, textDecoration: "none"}}>
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
      <Box position="absolute" bottom={20} right={20}>
        <ThemeModeSigninSignUp />
      </Box>
    </>
  );
};

export default SignUp;
