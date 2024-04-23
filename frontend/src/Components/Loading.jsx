import { useTheme } from "@mui/material";
import { RotateLoader } from "react-spinners";

const Loading = () => {
    const Theme = useTheme()
  return (
    <div
      style={{
        height: "100vh",
        width: "30%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <RotateLoader color={Theme.palette.primary.text} />
    </div>
  );
};

export default Loading;
