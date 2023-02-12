import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Typography } from "@material-ui/core";
import { useStyles } from "./utils";

export const App = () => {
  const { heading } = useStyles();

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/sign-in");
    }
  }, [navigate]);

  return (
    <Container maxWidth="xs">
      <Typography className={heading} variant="h3">
        Home
      </Typography>
    </Container>
  );
};
