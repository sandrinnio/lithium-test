import { makeStyles } from "@material-ui/core";
import * as yup from "yup";

export interface ISignUpFormInput {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
}

export interface ISignInFormInput {
  email: string;
  password: string;
}

export const signUpSchema = yup.object().shape({
  email: yup.string().required().email(),
  firstName: yup.string().required().min(2).max(25),
  lastName: yup.string().required().min(2).max(25),
  password: yup.string().required().min(6).max(32),
});

export const signInSchema = yup.object().shape({
  email: yup.string().required().email(),
  password: yup.string().required().min(6).max(32),
});

export const useStyles = makeStyles((theme) => ({
  heading: {
    textAlign: "center",
    margin: theme.spacing(10, 0, 4),
  },
  submitButton: {
    marginTop: theme.spacing(4),
  },
}));