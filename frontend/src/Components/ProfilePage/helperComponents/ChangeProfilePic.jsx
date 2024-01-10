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
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBUHRZKloSUYkbASIMTViARFeYKv4YmvEXew&usqp=CAU",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmwaEiTfQ5zcDjZKzz9pAwJy1tBBiadZU2Qw&usqp=CAU",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0uvs5zGfhjAct5Bx9kbdyEGs84oe2RW__vA&usqp=CAU",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyZnJAYfI820Gi3GE2yub6MtNC8S6l1GF87A&usqp=CAU",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1LNmMLLnUt6IFb8M1gEL41XvTC2-a_s1QGA&usqp=CAU",
  "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQlgtZNufw4zfFjyVoThGuqQ5wuEyHQMNzRzQWDMgzzAJvBwi4-varon8RWTjtw",
  "https://imgix.ranker.com/user_node_img/69/1374288/original/1374288-photo-u30?auto=format&q=60&fit=crop&fm=pjpg&dpr=2&crop=faces&h=90&w=90",
  "https://imgix.ranker.com/user_node_img/812/16236115/original/16236115-photo-u33?auto=format&q=60&fit=crop&fm=pjpg&dpr=2&crop=faces&h=90&w=90",
  "https://imgix.ranker.com/user_node_img/83/1647832/original/naruto-uzumaki-comic-book-characters-photo-u10?auto=format&q=60&fit=crop&fm=pjpg&dpr=2&crop=faces&h=90&w=90",
  "https://imgix.ranker.com/user_node_img/4261/85210186/original/85210186-photo-u-532136536?auto=format&q=60&fit=crop&fm=pjpg&dpr=2&crop=faces&h=90&w=90",
  "https://imgix.ranker.com/user_node_img/156/3118353/original/3118353-photo-u37?auto=format&q=60&fit=crop&fm=pjpg&dpr=2&crop=faces&h=90&w=90",
  "https://imgix.ranker.com/user_node_img/816/16306156/original/16306156-photo-u49?auto=format&q=60&fit=crop&fm=pjpg&dpr=2&crop=faces&h=90&w=90",
  "https://imgix.ranker.com/user_node_img/101/2019374/original/2019374-photo-u-769352644?auto=format&q=60&fit=crop&fm=pjpg&dpr=2&crop=faces&h=90&w=90",
  "https://imgix.ranker.com/user_node_img/101/2019374/original/2019374-photo-u-769352644?auto=format&q=60&fit=crop&fm=pjpg&dpr=2&crop=faces&h=90&w=90",
  "https://imgix.ranker.com/user_node_img/46/915269/original/915269-photo-u48?auto=format&q=60&fit=crop&fm=pjpg&dpr=2&crop=faces&h=90&w=90",
  "https://imgix.ranker.com/user_node_img/97/1937749/original/1937749-photo-u55?auto=format&q=60&fit=crop&fm=pjpg&dpr=2&crop=faces&h=90&w=90",
  "https://imgix.ranker.com/user_node_img/816/16306143/original/pain-fictional-characters-photo-u1?auto=format&q=60&fit=crop&fm=pjpg&dpr=2&crop=faces&h=90&w=90",
  "https://imgix.ranker.com/user_node_img/3384/67662266/original/67662266-photo-u36?auto=format&q=60&fit=crop&fm=pjpg&dpr=2&crop=faces&h=90&w=90",
  "https://imgix.ranker.com/user_node_img/4269/85372020/original/85372020-photo-u24?auto=format&q=60&fit=crop&fm=pjpg&dpr=2&crop=faces&h=90&w=90",
  "https://imgix.ranker.com/user_node_img/52/1037677/original/1037677-photo-u47?auto=format&q=60&fit=crop&fm=pjpg&dpr=2&crop=faces&h=90&w=90",
  "https://imgix.ranker.com/user_node_img/97/1927781/original/rock-lee-u12?auto=format&q=60&fit=crop&fm=pjpg&dpr=2&crop=faces&h=90&w=90",
  "https://imgix.ranker.com/user_node_img/117/2328105/original/2328105-photo-u92?auto=format&q=60&fit=crop&fm=pjpg&dpr=2&crop=faces&h=90&w=90",
  "https://imgix.ranker.com/user_node_img/4373/87454780/original/shoto-todoroki-u1?auto=format&q=60&fit=crop&fm=pjpg&dpr=2&crop=faces&h=90&w=90",
  "https://imgix.ranker.com/user_node_img/1677/33533812/original/33533812-photo-u15?auto=format&q=60&fit=crop&fm=pjpg&dpr=2&crop=faces&h=90&w=90",
  "https://imgix.ranker.com/user_node_img/535/10697581/original/10697581-photo-u31?auto=format&q=60&fit=crop&fm=pjpg&dpr=2&crop=faces&h=90&w=90",
  "https://imgix.ranker.com/user_node_img/98/1944988/original/1944988-photo-u33?auto=format&q=60&fit=crop&fm=pjpg&dpr=2&crop=faces&h=90&w=90",
  "https://imgix.ranker.com/user_node_img/72/1431432/original/1431432-photo-u-1988225046?auto=format&q=60&fit=crop&fm=pjpg&dpr=2&crop=faces&h=90&w=90",
  "https://imgix.ranker.com/user_node_img/3384/67676465/original/67676465-photo-u37?auto=format&q=60&fit=crop&fm=pjpg&dpr=2&crop=faces&h=90&w=90",
  "https://imgix.ranker.com/user_node_img/80/1583343/original/1583343-photo-u17?auto=format&q=60&fit=crop&fm=pjpg&dpr=2&crop=faces&h=90&w=90",
  "https://imgix.ranker.com/user_node_img/70/1397873/original/1397873-photo-u27?auto=format&q=60&fit=crop&fm=pjpg&dpr=2&crop=faces&h=90&w=90",
  "https://imgix.ranker.com/user_node_img/59/1163696/original/1163696-photo-u71?auto=format&q=60&fit=crop&fm=pjpg&dpr=2&crop=faces&h=90&w=90",
  "https://imgix.ranker.com/user_node_img/4269/85376365/original/85376365-photo-u-1054687522?auto=format&q=60&fit=crop&fm=pjpg&dpr=2&crop=faces&h=90&w=90",
  "https://imgix.ranker.com/user_node_img/4261/85210188/original/85210188-photo-u14?auto=format&q=60&fit=crop&fm=pjpg&dpr=2&crop=faces&h=90&w=90",
  "https://imgix.ranker.com/user_node_img/4261/85214970/original/85214970-photo-u9?auto=format&q=60&fit=crop&fm=pjpg&dpr=2&crop=faces&h=90&w=90",
  "https://imgix.ranker.com/user_node_img/4373/87454778/original/katsuki-bakugo-u28?auto=format&q=60&fit=crop&fm=pjpg&dpr=2&crop=faces&h=90&w=90",
  "https://imgix.ranker.com/user_node_img/4269/85375180/original/85375180-photo-u1924676350?auto=format&q=60&fit=crop&fm=pjpg&dpr=2&crop=faces&h=90&w=90",
  "https://imgix.ranker.com/user_node_img/3168/63358699/original/63358699-photo-u23?auto=format&q=60&fit=crop&fm=pjpg&dpr=2&crop=faces&h=90&w=90",
  "https://imgix.ranker.com/user_node_img/812/16235871/original/16235871-photo-u24?auto=format&q=60&fit=crop&fm=pjpg&dpr=2&crop=faces&h=90&w=90",
  "https://imgix.ranker.com/user_node_img/99/1973044/original/1973044-photo-u49?auto=format&q=60&fit=crop&fm=pjpg&dpr=2&crop=faces&h=90&w=90",
  "https://imgix.ranker.com/user_node_img/91/1803710/original/1803710-photo-u58?auto=format&q=60&fit=crop&fm=pjpg&dpr=2&crop=faces&h=90&w=90",
  "https://imgix.ranker.com/user_node_img/3832/76637798/original/76637798-photo-u44?auto=format&q=60&fit=crop&fm=pjpg&dpr=2&crop=faces&h=90&w=90",
  "https://imgix.ranker.com/user_node_img/72/1434716/original/1434716-photo-u-1311707186?auto=format&q=60&fit=crop&fm=pjpg&dpr=2&crop=faces&h=90&w=90",
  "https://imgix.ranker.com/user_node_img/3178/63543931/original/63543931-photo-u-839779112?auto=format&q=60&fit=crop&fm=pjpg&dpr=2&crop=faces&h=90&w=90",
  "https://imgix.ranker.com/user_node_img/4261/85214930/original/85214930-photo-u19?auto=format&q=60&fit=crop&fm=pjpg&dpr=2&crop=faces&h=90&w=90",
  "https://imgix.ranker.com/user_node_img/4373/87454790/original/toga-himiko-u20?auto=format&q=60&fit=crop&fm=pjpg&dpr=2&crop=faces&h=90&w=90",
  "https://imgix.ranker.com/user_node_img/4373/87454790/original/toga-himiko-u20?auto=format&q=60&fit=crop&fm=pjpg&dpr=2&crop=faces&h=90&w=90",
  "https://imgix.ranker.com/user_node_img/812/16235300/original/akamaru-fictional-characters-photo-u1?auto=format&q=60&fit=crop&fm=pjpg&dpr=2&crop=faces&h=90&w=90",
  "https://imgix.ranker.com/user_node_img/3682/73639230/original/killer-bee-u3?auto=format&q=60&fit=crop&fm=pjpg&dpr=2&crop=faces&h=90&w=90",
  "https://imgix.ranker.com/user_node_img/4261/85218236/original/85218236-photo-u23?auto=format&q=60&fit=crop&fm=pjpg&dpr=2&crop=faces&h=90&w=90",
  "https://imgix.ranker.com/user_node_img/3831/76614330/original/76614330-photo-u15?auto=format&q=60&fit=crop&fm=pjpg&dpr=2&crop=faces&h=90&w=90",
  "https://imgix.ranker.com/user_node_img/4373/87454806/original/dabi-u13?auto=format&q=60&fit=crop&fm=pjpg&dpr=2&crop=faces&h=90&w=90",
  "https://imgix.ranker.com/user_node_img/4375/87491046/original/87491046-photo-u-163712066?auto=format&q=60&fit=crop&fm=pjpg&dpr=2&crop=faces&h=90&w=90",
  "https://imgix.ranker.com/user_node_img/4261/85212350/original/85212350-photo-u32?auto=format&q=60&fit=crop&fm=pjpg&dpr=2&crop=faces&h=90&w=90",
  "https://imgix.ranker.com/user_node_img/4261/85210195/original/85210195-photo-u5?auto=format&q=60&fit=crop&fm=pjpg&dpr=2&crop=faces&h=90&w=90",
  "https://imgix.ranker.com/user_node_img/4261/85210031/original/85210031-photo-u29?auto=format&q=60&fit=crop&fm=pjpg&dpr=2&crop=faces&h=90&w=90",
  "https://imgix.ranker.com/user_node_img/115/2282986/original/2282986-photo-u33?auto=format&q=60&fit=crop&fm=pjpg&dpr=2&crop=faces&h=90&w=90",
  "https://imgix.ranker.com/user_node_img/50091/1001811820/original/king-photo-u1?auto=format&q=60&fit=crop&fm=pjpg&dpr=2&crop=faces&h=90&w=90",
  "https://imgix.ranker.com/user_node_img/812/16236662/original/16236662-photo-u13?auto=format&q=60&fit=crop&fm=pjpg&dpr=2&crop=faces&h=90&w=90",
  "https://imgix.ranker.com/user_node_img/4261/85215178/original/85215178-photo-u24?auto=format&q=60&fit=crop&fm=pjpg&dpr=2&crop=faces&h=90&w=90",
  "https://imgix.ranker.com/user_node_img/812/16236710/original/16236710-photo-u8?auto=format&q=60&fit=crop&fm=pjpg&dpr=2&crop=faces&h=90&w=90",
  "https://imgix.ranker.com/user_node_img/69/1362556/original/kenpachi-zaraki-fictional-characters-photo-u1?auto=format&q=60&fit=crop&fm=pjpg&dpr=2&crop=faces&h=90&w=90",
];

// const BASE_URL = "http://localhost:4000";

const BASE_URL = "https://weeebs.onrender.com";

const ChangeProfilePic = ({ setChangePP }) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const handlePictureUpdate = async (pictureUrl) => {
    let user = JSON.parse(Cookies.get("user"));
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
    const formData = {
      userId: user._id,
      pictureUrl,
    };
    await fetch(`${BASE_URL}/users/changeprofilepicture`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
  };
  return (
    <Box
      sx={{
        width: "100%",
        height: "50vh",
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
