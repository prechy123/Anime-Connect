import { Box, Fab } from "@mui/material";

const themes = [
  "#E52165",
  "#6C5B7B",
  "#C06C84",
  "#c4a35a",
  "#36343b",
  "#F9D423",
  "#9DE0AD",
];

const ColourPicker = ({ setSelectedColour }) => {
  return (
    <Box sx={{ display: "flex", gap: "10px" }}>
      {themes.map((theme) => (
        <>
          <Fab
            sx={{
              backgroundColor: theme,
              "&:hover": {
                backgroundColor: theme,
              },
            }}
            aria-label={theme}
            onClick={() => setSelectedColour(theme)}
          />
        </>
      ))}
    </Box>
  );
};

export default ColourPicker;
