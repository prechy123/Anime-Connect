import { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FallbackLoading from "./components/loader/FallBackLoading";
const Login = lazy(() => import("./components/Login"));
const Signup = lazy(() => import("./components/Signup"));

// import Login from "./components/Login";
// import Signup from "./components/Signup";

function App() {
  return (
    <Suspense fallback={<FallbackLoading />}>
      <Router>
        <Routes>
          <Route path="/signin" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </Router>
    </Suspense>
  );
}

export default App;
