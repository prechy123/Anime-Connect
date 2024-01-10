import { useTheme } from "@emotion/react";
import { ArrowForward, Close } from "@mui/icons-material";
import { Box, Button, Chip, TextField, Typography } from "@mui/material";
import Cookies from "js-cookie";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import expirationTime from "../../../../calculate/expirationTime";
import { isAuth } from "../../../redux/reducers/auth/authSlice";

const BASE_URL = "http://localhost:4000";

// const BASE_URL = "https://weeebs.onrender.com"

const EditProfile = ({ setEditPage, setChangePP }) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const {
    // username,
    // fullname,
    location,
    bio,
    animeInterest,
  } = useSelector((state) => state.auth);
  const [newAnimeName, setNewAnimeName] = useState("");
  const [animeList, setAnimeList] = useState(animeInterest);
  const [theLocation, setTheLocation] = useState(location);
  const [theBio, setTheBio] = useState(bio);

  const handleRemoveAnimeList = (selectedAnime) => {
    setAnimeList(animeList.filter((anime) => anime !== selectedAnime));
  };

  const handleAddAnime = () => {
    if (newAnimeName.length > 0) {
      const animeExists = animeList.includes(newAnimeName);
      if (!animeExists) {
        setAnimeList([...animeList, newAnimeName]);
        setNewAnimeName("");
      } else {
        setNewAnimeName("ALREADY EXISTS");
      }
    }
  };

  const handleSubmitChange = async () => {
    let user = JSON.parse(Cookies.get("user"));
    user.location = theLocation;
    user.bio = theBio;
    user.animeInterest = animeList;
    const userDetails = JSON.stringify(user);
    Cookies.set("user", userDetails, {
      expires: expirationTime(),
      sameSite: "None",
      secure: true,
    });
    const formData = {
      userId: user._id,
      location: theLocation,
      bio: theBio,
      animeInterest: animeList,
    };
    dispatch(
      isAuth({
        isAuthenticated: true,
        email: user.email,
        fullname: user.fullname,
        profilePictureUrl: user.profilepictureurl,
        username: user.username,
        postcount: user.postcount,
        followers: user.followers,
        following: user.following,
        location: user.location,
        bio: user.bio,
        animeInterest: user.animeInterest,
        verified: user.verified,
      })
    );
    await fetch(`${BASE_URL}/users/updateprofile`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    setEditPage(false)

  };
  return (
    <Box
      sx={{
        width: "100%",
        height: "70vh",
        overflowY: "scroll",
        position: "absolute",
        top: "20%",
        zIndex: "2",
        backgroundColor: theme.palette.primary.main,
        borderRadius: "20px",
        padding: "20px",
        boxShadow: "10px 10px 10px " + theme.palette.primary.other,
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          paddingBottom: "20px",
        }}
      >
        <Typography>Edit Profile</Typography>
        <Close sx={{ cursor: "pointer" }} onClick={() => setEditPage(false)} />
      </Box>
      <Box>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => setChangePP(true)}
        >
          Change Profile Picture
        </Button>
        <Box
          sx={{
            display: "flex",
            placeItems: "center",
            justifyContent: "space-around",
            flexWrap: "wrap",
            marginTop: "20px",
          }}
        >
          <TextField
            id="standard-basic"
            label="Change Location"
            multiline
            rows={2}
            variant="standard"
            color="secondary"
            onChange={(e) => setTheLocation(e.target.value)}
            value={theLocation}
          />
          <TextField
            id="standard-basic"
            label="Change Bio"
            multiline
            rows={4}
            variant="standard"
            color="secondary"
            onChange={(e) => setTheBio(e.target.value)}
            value={theBio}
          />
        </Box>
        <Box
          display="flex"
          gap={1}
          flexWrap="wrap"
          paddingTop={1}
          marginTop={2}
        >
          {animeList.map((animeItem, index) => (
            <Box key={index} sx={{ display: "flex", placeItems: "center" }}>
              <Chip label={animeItem} />
              <Close
                onClick={() => handleRemoveAnimeList(animeItem)}
                sx={{ cursor: "pointer" }}
              />
            </Box>
          ))}
          <Box sx={{ display: "flex", placeItems: "center" }}>
            <TextField
              id="standard-basic"
              label="Add Anime"
              variant="standard"
              color="secondary"
              onChange={(e) => setNewAnimeName(e.target.value)}
              value={newAnimeName}
            />
            <Button
              variant="contained"
              color="secondary"
              onClick={handleAddAnime}
            >
              Add
            </Button>
          </Box>
        </Box>
        <Button
          variant="contained"
          color="secondary"
          sx={{ marginTop: "20px" }}
          onClick={handleSubmitChange}
        >
          Submit Change <ArrowForward sx={{ paddingLeft: "7px" }} />
        </Button>
      </Box>
    </Box>
  );
};

export default EditProfile;
