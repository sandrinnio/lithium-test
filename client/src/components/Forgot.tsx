import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { yupResolver } from "@hookform/resolvers/yup";
import { Container, Typography, TextField, Button } from "@material-ui/core";
import { IUserFormInput, forgotSchema, useStyles } from "../utils";

export const Forgot = () => {
  const { heading, submitButton } = useStyles();

  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IUserFormInput>({
    resolver: yupResolver(forgotSchema),
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/");
    }
  }, [navigate]);

  const onSubmit = async (forgotData: IUserFormInput) => {
    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL}/users/reset-password`,
        forgotData
      );
      setMessage("Reset link sent to your email");
    } catch (error) {
      console.error(error);
      setError("Wrong credentials provided");
    } finally {
      reset();
    }
  };

  return (
    <Container maxWidth="xs">
      <Typography className={heading} variant="h3">
        Reset Password
        {message && <p style={{ color: "green" }}>{message}</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <TextField
          {...register("email")}
          variant="outlined"
          margin="normal"
          label="Email"
          helperText={errors.email?.message}
          error={!!errors.email?.message}
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
          Send Reset Link
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
