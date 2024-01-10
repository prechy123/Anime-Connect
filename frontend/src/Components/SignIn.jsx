import { LockOutlined } from "@mui/icons-material";
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
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ThemeModeSigninSignUp from "./HelperComponents/ThemeModeSigninSignUp";
import { ClipLoader } from "react-spinners";
import Cookies from "js-cookie";
import expirationTime from "../../calculate/expirationTime";
import { PulseLoader } from "react-spinners";
import { useTheme } from "@emotion/react";

// const BASE_URL = "http://localhost:4000";

const BASE_URL = "https://weeebs.onrender.com"

const Signin = () => {
  const Navigate = useNavigate();
  const theme = useTheme();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState();
  const [success, setSuccess] = useState(false);

  const closeAlert = (err) => {
    setErrors(errors.filter((error) => error !== err));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    const data = new FormData(event.currentTarget);
    const formData = {
      email: data.get("email"),
      password: data.get("password"),
    };
    const api = await fetch(`${BASE_URL}/users/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    const response = await api.json();
    setLoading(false);
    if (response.message === "logged in successfully") {
      setSuccess(true);
      setTimeout(() => {
        Navigate("/");
      }, 2000);
      const userDetails = JSON.stringify(response.user);
      Cookies.set("user", userDetails, {
        expires: expirationTime(),
        sameSite: "None",
        secure: true,
      });
    } else {
      if (response.message) {
        setErrors([response.message]);
      } else {
        setErrors(response.error);
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
            Sign In
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
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
              {loading ? <PulseLoader color={theme.palette.primary.text}/> : "Sign In"}
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link
                  to="/signup"
                  variant="body2"
                  style={{
                    color: theme.palette.primary.text,
                    textDecoration: "none",
                  }}
                >
                  Don't have an account? Sign up
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
      <Box position="absolute" bottom={20} right={20}>
        <ThemeModeSigninSignUp />
      </Box>
    </>
  );
};

export default Signin;
