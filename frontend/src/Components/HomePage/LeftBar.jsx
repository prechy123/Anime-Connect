import { Box, Divider, Stack } from "@mui/material";
import ProfileOverview from "./helperComponents/ProfileOverview";
import NavListItems from "./helperComponents/NavListItems";

const LeftBar = () => {
  return (
    <Box
      flex={1.5}
      p={2}
      sx={{ display: { xs: "none", sm: "block" } }}
    >
      {/* <Box position="fixed"> */}
        <Stack
          direction="column"
          divider={<Divider orientation="horizontal" flexItem />}
          spacing={2}
        >
          <ProfileOverview />
          <NavListItems />
        </Stack>
      {/* </Box> */}
    </Box>
  );
};

export default LeftBar;
