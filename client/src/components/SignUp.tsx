import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Container, Typography, TextField, Button } from "@material-ui/core";
import { ISignUpFormInput, signUpSchema, useStyles } from "../utils";

export const SignUp = () => {
  const { heading, submitButton } = useStyles();

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ISignUpFormInput>({
    resolver: yupResolver(signUpSchema),
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/");
    }
  }, [navigate]);

  const onSubmit = (data: ISignUpFormInput) => {
    console.log("data: ", data);
  };

  return (
    <Container maxWidth="xs">
      <Typography className={heading} variant="h3">
        Sign Up Form
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
          {...register("firstName")}
          variant="outlined"
          margin="normal"
          label="First Name"
          helperText={errors.firstName?.message}
          error={!!errors.firstName?.message}
          fullWidth
          required
        />
        <TextField
          {...register("lastName")}
          variant="outlined"
          margin="normal"
          label="Last Name"
          helperText={errors.lastName?.message}
          error={!!errors.lastName?.message}
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
          Sign Up
        </Button>
      </form>
      <hr />
      <>
        Have an account?{" "}
        <Link className="text-link" to="/sign-in">
          Sign in
        </Link>
      </>
    </Container>
  );
};
