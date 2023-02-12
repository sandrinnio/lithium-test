import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Container, Typography } from "@material-ui/core";
import { useStyles } from "../utils";

export const Verify = () => {
  const { heading } = useStyles();

  const navigate = useNavigate();

  const [error, setError] = useState("");

  const [searchParams] = useSearchParams();
  searchParams.get("token");

  const verifyString = searchParams.get("token");

  const verifyUser = async () => {
    try {
      const { data } = await axios.put(
        `${process.env.REACT_APP_API_URL}/users/verification?verifyString=${verifyString}`
      );
      if (data.user.verified) {
        localStorage.setItem("token", data.token);
        navigate("/");
      } else {
        navigate("/sign-up");
      }
    } catch (error) {
      console.error(error);
      setError("Something went wrong. Please try again later.");
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/");
    }
    verifyUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container maxWidth="lg">
      <Typography className={heading} variant="h3">
        Verify Email
        {error && <p style={{ color: "red" }}>{error}</p>}
      </Typography>
    </Container>
  );
};
