import { Box } from "@mui/material";
import { useSelector } from "react-redux";
import ProfileNotAuthenicated from "./ProfileNotAuthenicated";
import ProfileAuthenticated from "./ProfileAuthenticated";

const ProfileDetails = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  return (
    <Box flex={4} padding="25px">
      {isAuthenticated ? <ProfileAuthenticated /> : <ProfileNotAuthenicated />}
    </Box>
  );
};
export default ProfileDetails;
