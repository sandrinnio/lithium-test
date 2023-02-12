import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Typography } from "@material-ui/core";
import { IUser, useStyles } from "./utils";

export const App = () => {
  const { heading } = useStyles();

  const [user, setUser] = useState<IUser>();

  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) {
      navigate("/sign-in");
    } else {
      setUser(JSON.parse(user));
    }
  }, [navigate]);

  return (
    <Container maxWidth="lg">
      <Typography className={heading} variant="h3">
        {user && (
          <>
            <p>
              Hey {user.firstName} {user.lastName}!
            </p>
            <p>
              {user.verified
                ? "Your email is verified."
                : "Your email is not verified."}
            </p>
          </>
        )}
      </Typography>
    </Container>
  );
};
