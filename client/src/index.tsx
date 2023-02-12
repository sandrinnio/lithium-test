import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import { Verify, SignIn, SignUp, Forgot, SetPassword } from "./components";
import { App } from "./App";
import reportWebVitals from "./reportWebVitals";
import "./index.css";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <CssBaseline />
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/verify-email" element={<Verify />} />
        <Route path="/forgot" element={<Forgot />} />
        <Route path="/set-password" element={<SetPassword />} />
      </Routes>
    </Router>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
