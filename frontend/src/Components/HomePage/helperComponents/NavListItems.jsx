import { Link, ListItemButton, Stack, Typography } from "@mui/material";

const NavListItems = () => {
  return (
    <Stack spacing={1}>
      <ListItemButton component={Link} to="/your-path">
        <Typography>Home</Typography>
      </ListItemButton>
      <ListItemButton component={Link} to="/your-path">
        <Typography>Communities</Typography>
      </ListItemButton>
      <ListItemButton component={Link} to="/your-path">
        <Typography>Notifications</Typography>
      </ListItemButton>
      <ListItemButton component={Link} to="/your-path">
        <Typography>Profile</Typography>
      </ListItemButton>
      <ListItemButton component={Link} to="/your-path">
        <Typography>Settings</Typography>
      </ListItemButton>
      <ListItemButton variant="outlined" sx={{outline: "1px solid red", borderRadius: "5px"}} component={Link} to="/your-path">
        <Typography>Log Out</Typography>
      </ListItemButton>
    </Stack>
  );
};

export default NavListItems;
