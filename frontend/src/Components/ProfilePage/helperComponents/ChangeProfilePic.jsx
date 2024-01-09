import { useTheme } from "@emotion/react";
import { Close } from "@mui/icons-material";
import { Avatar, Box, Typography } from "@mui/material";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { isAuth } from "../../../redux/reducers/auth/authSlice";
import expirationTime from "../../../../calculate/expirationTime";

const pictures = [
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqNoLHz3tQGYL84ybdtb6Zq3JtHTwJhh0quQ&usqp=CAU?w=248&fit=crop&auto=format",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSahoRie1F15hsww5an0Hz-6mXOpq3v9r9WPJGdhygthVtUkJa7",
  "https://i.pinimg.com/474x/f8/6f/c4/f86fc4f39be083b5705a40de4c998b47.jpg",
  "https://static.animecorner.me/2023/01/solo-lebelling-1024x576.png",
  "https://s.yimg.com/ny/api/res/1.2/CJ8hvAh_mfhcY6bnuxR4pg--/YXBwaWQ9aGlnaGxhbmRlcjt3PTY0MDtoPTM2MA--/https://media.zenfs.com/en/comingsoon_net_477/323e9b8be6d915e1b06d4563060a23eb",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDJSQ6KvypSjlIFPw9iNAmduQvBBSqMV2MGg&usqp=CAU",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTuM0uQ4-VHbJeQlM3MU-_PhqdHQigIPAimiw&usqp=CAU",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgh28kQ0nYn7u264E0NTw_JRNaSoq0UF2fJA&usqp=CAU",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEO5Oi8ca3ogQvpWESY9BtY2ktdJMXPmnO5w&usqp=CAU",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTd_M_OKSw3pUqcZ1g9vJa14A9B3Pf3FvdTJg&usqp=CAU",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRuvqdK5tJn0SXuYoQH3jW1DZYGUt681HwUMQ&usqp=CAU",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSoaNHNpcnPrDKK-Z8AvCXW2LwManHWaQDEWA&usqp=CAU",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQhH-fxe7AA3tY4LuxaumGgkZG-TzTnteISeA&usqp=CAU",
  "https://e1.pxfuel.com/desktop-wallpaper/115/924/desktop-wallpaper-cool-badass-anime-drawings-badass-anime-characters.jpg",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBy-oYPEw8VLEa5QPcqo6NurLf1uABDPWAPA&usqp=CAU",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4crT3koyc81nVYo8iyJzaBoEdzpW2SGjP2w&usqp=CAU",
];

const BASE_URL = "http://localhost:4000";

// const BASE_URL = "https://weeebs.onrender.com"

const ChangeProfilePic = ({ setChangePP }) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const handlePictureUpdate = async (pictureUrl) => {
    let user = JSON.parse(Cookies.get("user"));
    const formData = {
      userId: user._id,
      pictureUrl,
    };
    const api = await fetch(`${BASE_URL}/users/changeprofilepicture`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    const response = await api.json();
    if (response.message === "Updated successfully") {
      user.profilepictureurl = pictureUrl;
      const userDetails = JSON.stringify(user);
      Cookies.set("user", userDetails, {
        expires: expirationTime(),
        sameSite: "None",
        secure: true,
      });
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
    }
  };
  return (
    <Box
      sx={{
        width: "100%",
        position: "absolute",
        top: "20%",
        zIndex: "2",
        backgroundColor: theme.palette.primary.main,
        borderRadius: "20px",
        padding: "20px",
        boxShadow: "10px 10px 10px " + theme.palette.primary.other
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          paddingBottom: "20px",
        }}
      >
        <Typography>Select New Profile Picture</Typography>
        <Close sx={{ cursor: "pointer" }} onClick={() => setChangePP(false)} />
      </Box>
      <Box sx={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
        {pictures.map((picture, index) => (
          <Box
            sx={{ cursor: "pointer" }}
            key={index}
            onClick={() => handlePictureUpdate(picture)}
          >
            <PictureBadge link={picture} />
          </Box>
        ))}
      </Box>
    </Box>
  );
};

const PictureBadge = (prop) => {
  return <Avatar alt="ss" src={prop.link} sx={{ width: 66, height: 66 }} />;
};
export default ChangeProfilePic;
