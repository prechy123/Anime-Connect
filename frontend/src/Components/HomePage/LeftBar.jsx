import { Box, Divider, Stack } from "@mui/material";
import ProfileOverview from "./helperComponents/ProfileOverview";
import NavListItems from "./helperComponents/NavListItems";
import ThemeMode from "./helperComponents/ThemeMode";

const LeftBar = () => {
  return (
    <Box
      flex={1.5}
      p={2}
      sx={{ display: { xs: "none", sm: "block" } }}
    >
      <Box position="fixed" p={2} sx={{width: {sm: "170px",md: "200px", lg: "250px", xl: "12.5%"}}}>
        <Stack
          direction="column"
          divider={<Divider orientation="horizontal" flexItem />}
          spacing={2}
        >
          <ProfileOverview />
          <NavListItems />
          <ThemeMode />
        </Stack>
      </Box>
    </Box>
  );
};

export default LeftBar;
