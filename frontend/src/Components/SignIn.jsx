import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useTheme } from "@emotion/react";
import { ClipLoader } from "react-spinners";
import { PulseLoader } from "react-spinners";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { LockOutlined } from "@mui/icons-material";
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
  InputAdornment,
  IconButton
} from "@mui/material";
import expirationTime from "../../calculate/expirationTime";
import ThemeModeSigninSignUp from "./HelperComponents/ThemeModeSigninSignUp";

import BASE_URL from "../utils";

const Signin = () => {
  const Navigate = useNavigate();
  const theme = useTheme();

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState();
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const closeAlert = (err) => {
    setErrors(errors.filter((error) => error !== err));
  };

  const toggleShowPassowrd = () => {
    setShowPassword(!showPassword);
  }

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
      Cookies.set("weeebsuser", userDetails, {
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
                  label="Email or Username"
                  name="email"
                  autoComplete="email"
                  color="secondary"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  id="password"
                  autoComplete="new-password"
                  color="secondary"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={toggleShowPassowrd} edge="end">
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="secondary"
              sx={{ mt: 3, mb: 2, cursor: loading && "wait" }}
            >
              {loading ? (
                <PulseLoader color={theme.palette.primary.text} />
              ) : (
                "Sign In"
              )}
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
                  Dont have an account? Sign up
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

export default Signin;
