import { InputBase, styled, useTheme } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const Search = styled("div")(({ theme }) => ({
  marginTop: "10px",
  padding: "0 10px",
  borderRadius: theme.shape.borderRadius,
  width: "100%",
  outline: "1px solid #808080",
  display: "flex",
  alignItems: "center",
  gap: "5px",
  transition: "outline 0.2s ease-in-out",
  "&:focus-within": {
    outline: "1px solid #ffffff",
  },
}));
const SearchBar = ({ searchContent, setSearchContent }) => {
  const theme = useTheme();
  return (
    <Search
      aria-label="Search for a profile"
      sx={{
        position: "fixed",
        width: { xs: "60%", sm: "300px", md: "400px", lg: "40%" },
        backgroundColor: theme.palette.primary.main,
        zIndex: 1,
      }}
    >
      <SearchIcon />
      <InputBase
        placeholder="Search Profile"
        fullWidth
        onChange={(e) => setSearchContent(e.target.value)}
        value={searchContent}
      />
    </Search>
  );
};

export default SearchBar;
