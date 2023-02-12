import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  makeStyles,
  Container,
  Typography,
  TextField,
  Button,
} from "@material-ui/core";

interface IFormInput {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
}

const schema = yup.object().shape({
  email: yup.string().required().email(),
  firstName: yup.string().required().min(2).max(25),
  lastName: yup.string().required().min(2).max(25),
  password: yup.string().required().min(6).max(32),
});

const useStyles = makeStyles((theme) => ({
  heading: {
    textAlign: "center",
    margin: theme.spacing(10, 0, 4),
  },
  submitButton: {
    marginTop: theme.spacing(4),
  },
}));

export const SignUp = () => {
  const { heading, submitButton } = useStyles();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: IFormInput) => {
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
    </Container>
  );
};