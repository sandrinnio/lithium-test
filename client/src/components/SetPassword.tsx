import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { yupResolver } from "@hookform/resolvers/yup";
import { Container, Typography, TextField, Button } from "@material-ui/core";
import { IUserFormInput, setPasswordSchema, useStyles } from "../utils";

export const SetPassword = () => {
  const { heading, submitButton } = useStyles();

  const [error, setError] = useState("");

  const [searchParams] = useSearchParams();
  searchParams.get("token");

  const resetPasswordToken = searchParams.get("token");

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IUserFormInput>({
    resolver: yupResolver(setPasswordSchema),
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/");
    }
  }, [navigate]);

  const onSubmit = async (setPasswordData: IUserFormInput) => {
    try {
      await axios.put(
        `${process.env.REACT_APP_API_URL}/users/set-password?resetPasswordToken=${resetPasswordToken}`,
        setPasswordData
      );
      navigate("/sign-in");
    } catch (error) {
      console.error(error);
      setError("Something went wrong. Please try again later.");
    } finally {
      reset();
    }
  };

  return (
    <Container maxWidth="xs">
      <Typography className={heading} variant="h3">
        Set Password
        {error && <p style={{ color: "red" }}>{error}</p>}
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <TextField
          {...register("password")}
          variant="outlined"
          margin="normal"
          label="Password"
          helperText={errors.password?.message}
          error={!!errors.password?.message}
          type="password"
          fullWidth
          required
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={submitButton}
        >
          Set Password
        </Button>
      </form>
      <hr />
      <>
        Go back to{" "}
        <Link className="text-link" to="/sign-in">
          Sign in
        </Link>
      </>
    </Container>
  );
};
