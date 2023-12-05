import { Close, Feed, FmdGood, Menu, Verified } from "@mui/icons-material";
import {
  Avatar,
  Badge,
  Box,
  Chip,
  Stack,
  Typography,
  styled,
  useTheme,
} from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";
import LeftBarXS from "../HomePage/LeftBarXS";

const StyledBox = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
});

const ProfileAuthenticated = () => {
  const Theme = useTheme();
  const [navBar, setNavBar] = useState(false);
  const {
    username,
    fullname,
    profilepictureurl,
    postcount,
    followers,
    following,
    location,
    bio,
    animeInterest,
    verified
  } = useSelector((state) => state.auth);
  return (
    <Box display="flex" flexDirection="column" gap="20px" position="relative">
        <Box
          sx={{
            display: { xs: "block", sm: "none", cursor: "pointer" },
          }}
          position="fixed"
          top={15}
          left={15}
          onClick={() => setNavBar(!navBar)}
        >
          {navBar ? <Close /> : <Menu />}
        </Box>
      <Box
        sx={{
          backgroundColor: Theme.palette.primary.other,
          padding: "20px",
          borderRadius: Theme.shape.borderRadius,
        }}
      >
        <Box display="flex" flexDirection="column" alignItems="center" gap={1}>
          <Badge color="success" overlap="circular" badgeContent="online">
            <Avatar alt="Remy Sharp" src={profilepictureurl} />
          </Badge>
          <Typography variant="p" fontWeight={100} display="flex" gap={0.5} alignItems="center">
            {username} {verified && <Verified />}
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
              <Typography>{followers}</Typography>
              <Typography>Followers</Typography>
            </StyledBox>
            <StyledBox>
              <Typography>{following}</Typography>
              <Typography>Following</Typography>
            </StyledBox>
          </Stack>
          <Typography display="flex" gap={1} alignItems="center">
            <Feed /> {bio}
          </Typography>
        </Box>
        <Typography fontWeight={700} variant="h5" paddingTop={2}>
          Location:
        </Typography>
        <Typography display="flex" alignItems="center" gap={1} paddingTop={1}>
          <FmdGood /> {location}
        </Typography>
        <Typography fontWeight={700} variant="h5" paddingTop={2}>
          Anime Interests:
        </Typography>
        <Box display="flex" gap={1} flexWrap="wrap" paddingTop={1}>
          <Chip label="One Piece" />
          <Chip label="Dragon Ball" />
          <Chip label="Naruto" />
          <Chip label="Demon Slayer" />
          <Chip label="Attack on Titans" />
          <Chip label="Something" />
          <Chip label="Something on Titans" />
          <Chip label="Death Note" />
          <Chip label="Jujustu kaisen" />
        </Box>
      </Box>
      <Box
        sx={{
          backgroundColor: Theme.palette.primary.other,
          padding: "20px",
          borderRadius: Theme.shape.borderRadius,
        }}
      >
        <Box>
          <Box display="flex" justifyContent="space-between">
            <Typography fontWeight={700}>Profile Summary</Typography>
            <Typography>Joined recently.</Typography>
          </Box>
          <Box display="flex" justifyContent="space-between">
            <Typography>Total Posts</Typography>
            <Typography>{postcount}</Typography>
          </Box>
          <Box display="flex" justifyContent="space-between">
            <Typography>Total Communities</Typography>
            <Typography>0</Typography>
          </Box>
        </Box>
      </Box>
      {navBar && (
        <Box position="absolute" zIndex={2} top={30} sx={{display: {xs: "block", sm: "none"}}}>
          <LeftBarXS />
        </Box>
      )}
    </Box>
  );
};

export default ProfileAuthenticated;
