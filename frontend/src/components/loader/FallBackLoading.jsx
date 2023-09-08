import { RotateLoader } from "react-spinners";

const FallbackLoading = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <RotateLoader color="#000000" />
    </div>
  );
};

export default FallbackLoading;
