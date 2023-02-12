import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Container, Typography, TextField, Button } from "@material-ui/core";
import { ISignInFormInput, signInSchema, useStyles } from "../utils";

export const SignIn = () => {
  const { heading, submitButton } = useStyles();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ISignInFormInput>({
    resolver: yupResolver(signInSchema),
  });

  const onSubmit = (data: ISignInFormInput) => {
    console.log("data: ", data);
  };

  return (
    <Container maxWidth="xs">
      <Typography className={heading} variant="h3">
        Sign In Form
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
    </Container>
  );
};
