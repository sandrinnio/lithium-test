import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { yupResolver } from "@hookform/resolvers/yup";
import { Container, Typography, TextField, Button } from "@material-ui/core";
import { ISignInFormInput, signInSchema, useStyles } from "../utils";

export const SignIn = () => {
  const { heading, submitButton } = useStyles();

  const [error, setError] = useState("");

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ISignInFormInput>({
    resolver: yupResolver(signInSchema),
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/");
    }
  }, [navigate]);

  const onSubmit = async (signInData: ISignInFormInput) => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API_URL}/users/sign-in`,
        signInData
      );
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      navigate("/");
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
        Sign In Form
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
          Sign In
        </Button>
      </form>
      <hr />
      <>
        No Account? <Link to="/sign-up">Sign up </Link>
      </>
    </Container>
  );
};
