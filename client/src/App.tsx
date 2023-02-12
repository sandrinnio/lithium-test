import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { SignIn, SignUp } from "./components";

export const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/sign-in" element={<SignIn />} />
      </Routes>
    </Router>
  );
};
