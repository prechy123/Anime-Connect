import { Box, Divider, Stack } from "@mui/material";
import NavListItems from "../HomePage/helperComponents/NavListItems";
import ThemeMode from "../HomePage/helperComponents/ThemeMode";

const ProfileLeftBar = () => {
  return (
    <>
      <Box flex={1.5} p={2} sx={{ display: { xs: "none", sm: "block" } }}>
        <Box
          position="fixed"
          p={2}
          sx={{ width: { sm: "170px", md: "200px", lg: "250px", xl: "12.5%" } }}
        >
          <Stack
            direction="column"
            divider={<Divider orientasignintion="horizontal" flexItem />}
            spacing={2}
          >
            <NavListItems />
            <ThemeMode />
          </Stack>
        </Box>
      </Box>
    </>
  );
};

export default ProfileLeftBar;
