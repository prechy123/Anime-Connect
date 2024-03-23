import { useTheme } from "@emotion/react";
import { Close } from "@mui/icons-material";
import { Avatar, Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { RotateLoader } from "react-spinners";
import BASE_URL from "../../../utils";

const SearchProfile = ({ setSearchState, searchContent, setSearchContent }) => {
  const Theme = useTheme();
  const [loadingState, setLoadingstate] = useState(true);
  const [profiles, setProfiles] = useState([]);
  useEffect(() => {
    if (String(searchContent).length === 0) {
      setLoadingstate(true);
      return;
    }
    const timeout = setTimeout(() => {
      fetch(`${BASE_URL}/profile/getProfiles?username=${searchContent}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.success === true) {
            setLoadingstate(false);
            setProfiles(data.profiles);
          } else {
            setLoadingstate(true);
          }
        });
    }, 1500);
    return () => {
      clearTimeout(timeout);
    };
  }, [searchContent]);
  return (
    <Box
      sx={{
        width: {
          xs: "95%",
          sm: "65%",
          md: "50%",
        },
        position: "fixed",
        top: { xs: "10%", sm: "20%" },
        zIndex: "2",
        backgroundColor: Theme.palette.primary.main,
        borderRadius: "20px",
        padding: "20px",
        boxShadow: "10px 10px 10px " + Theme.palette.primary.other,
        minHeight: "50%",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          paddingBottom: "20px",
        }}
      >
        <Typography>Searched Profile</Typography>
        <Close
          sx={{ cursor: "pointer" }}
          onClick={() => {
            setSearchContent("");
            setSearchState(false);
          }}
        />
      </Box>
      <Box>
        <Box
          sx={{
            marginTop: "20px",
          }}
        >
          {loadingState ? (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "40px",
              }}
            >
              <RotateLoader />
              <Typography color="error">Ensure username is correct</Typography>
            </Box>
          ) : (
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr",
                gap: "10px",
                maxHeight: "40vh",
                overflowY: "scroll",
              }}
            >
              {profiles.map((profile) => (
                <Box
                  key={profile._id}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <Avatar
                    alt={profile.fullname}
                    src={profile.profilepictureurl}
                  />
                  <Typography
                    sx={{
                      borderBottom: "3px solid" + profile.theme,
                    }}
                  >
                    {profile.username}
                  </Typography>
                </Box>
              ))}
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default SearchProfile;
