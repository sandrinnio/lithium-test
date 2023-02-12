import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { SignUp } from "./components/SignUp";

export const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignUp />} />
      </Routes>
    </Router>
  );
};
