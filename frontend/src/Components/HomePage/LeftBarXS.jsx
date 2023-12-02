import { Box, Divider, Stack, useTheme } from "@mui/material";
import ProfileOverview from "./helperComponents/ProfileOverview";
import NavListItems from "./helperComponents/NavListItems";
import ThemeMode from "./helperComponents/ThemeMode";

const LeftBarXS = () => {
    const Theme = useTheme()
  return (
    <>
      <Box flex={1.5} p={2} sx={{ display: "block" }}>
        <Box
          position="fixed"
          p={2}
          sx={{ width: "80%", background: Theme.palette.primary.main }}
        >
          <Stack
            direction="column"
            divider={<Divider orientasignintion="horizontal" flexItem />}
            spacing={2}
          >
            <ProfileOverview />
            <NavListItems />
            <ThemeMode />
          </Stack>
        </Box>
      </Box>
    </>
  );
};

export default LeftBarXS;
