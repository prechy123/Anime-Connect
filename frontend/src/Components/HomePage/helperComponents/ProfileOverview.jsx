import {
  Avatar,
  Badge,
  Box,
  Button,
  ButtonGroup,
  Stack,
  Typography,
  styled,
  useTheme,
} from "@mui/material";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const StyledBox = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
});

const ProfileOverview = () => {
  const Theme = useTheme()
  const {
    isAuthenticated,
    username,
    fullname,
    profilepictureurl,
    postcount,
    followers,
    following,
  } = useSelector((state) => state.auth);
  return (
    <>
      {isAuthenticated ? (
        <Box display="flex" flexDirection="column" alignItems="center" gap={1}>
          <Badge color="success" overlap="circular" badgeContent="online">
            <Avatar alt="Remy Sharp" src={profilepictureurl} />
          </Badge>
          <Typography variant="p" fontWeight={100}>
            {username}
          </Typography>
          <Typography variant="h5" fontWeight={500}>
            {fullname}
          </Typography>
          <Stack
            direction="row"
            gap={3}
            sx={{ display: { sm: "none", md: "flex" } }}
          >
            <StyledBox>
              <Typography>{postcount}</Typography>
              <Typography>Post</Typography>
            </StyledBox>
            <StyledBox>
              <Typography>{followers}</Typography>
              <Typography>Followers</Typography>
            </StyledBox>
            <StyledBox>
              <Typography>{following}</Typography>
              <Typography>Following</Typography>
            </StyledBox>
          </Stack>
        </Box>
      ) : (
        <ButtonGroup
          variant="contained"
          aria-label="signup or signin"
          fullWidth
        >
          <Button color="secondary">
            <Link to="/signup" style={{textDecoration: "none", color: Theme.palette.primary.text}}>SIGNUP</Link>
          </Button>
          <Button variant="outlined" color="secondary" href="/signin">
            <Link to="/signin" style={{textDecoration: "none", color: Theme.palette.primary.text}}>SIGNIN</Link>
          </Button>
        </ButtonGroup>
      )}
    </>
  );
};
//ddd
export default ProfileOverview;
