import { LockOutlined, ThumbDownAlt, ThumbUpAlt } from "@mui/icons-material";
import {
  Alert,
  AlertTitle,
  Avatar,
  Box,
  Button,
  Checkbox,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import ThemeModeSigninSignUp from "./HelperComponents/ThemeModeSigninSignUp";
import { ClipLoader, PulseLoader } from "react-spinners";
import { useTheme } from "@emotion/react";

import BASE_URL from "../utils";
import expirationTime from "../../calculate/expirationTime";
// signup
const SignUp = () => {
  const theme = useTheme()
  const Navigate = useNavigate();
  const [loading, setLoading] = useState(false)
  const [userNameStatus, setUserNameStatus] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState();
  const [showPassword, setShowPassword] = useState(false)

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
      if (response.message === "Account created successfully") {
        const loginApi = await fetch(`${BASE_URL}/users/signin`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password
          }),
        });
        const loginResponse = await loginApi.json();
        setLoading(false);
        if (loginResponse.message === "logged in successfully") {
          setSuccess(true);
          setTimeout(() => {
            Navigate("/");
          }, 2000);
          const userDetails = JSON.stringify(loginResponse.user);
          Cookies.set("weeebsuser", userDetails, {
            expires: expirationTime(),
            sameSite: "None",
            secure: true,
          });
        } else {
          setLoading(false);
          if (loginResponse.message) {
            setErrors([loginResponse.message]);
          } else {
            setErrors(loginResponse.error);
          }
        }
      } else {
        setLoading(false);
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
        <Stack margin="0 auto" sx={{
          width: {
            xs: '80%',
            md: '50%'
          }
        }}>
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
                  color="secondary"
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
                  // type="password"
                  type={showPassword ? "text" : "password"}
                  id="password"
                  autoComplete="new-password"
                  color="secondary"
                />
              </Grid>
              <Grid item xs={12}>
                <Checkbox
                  color="secondary"
                  onClick={() => setShowPassword(!showPassword)}
                />
                <Typography variant="p">
                  {showPassword ? "hide" : "view"} password
                </Typography>
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="secondary"
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
      {success && (
        <Stack gap={1} position="absolute" top={20} right={20} zIndex={2}>
          <Alert severity="success">
            <AlertTitle>Success</AlertTitle>
            This is an success alert —{" "}
            <strong>
              Log in Successfully - redirecting to home page{" "}
              <ClipLoader
                color="secondary"
                size={20}
                aria-label="Loading Spinner"
                data-testid="loader"
              />
            </strong>
          </Alert>
        </Stack>
      )}
      <Box position="absolute" bottom={0} right={0}>
        <ThemeModeSigninSignUp />
      </Box>
    </>
  );
};

export default SignUp;
