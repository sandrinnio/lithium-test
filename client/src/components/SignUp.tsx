import {
  makeStyles,
  Container,
  Typography,
  TextField,
  Button,
} from "@material-ui/core";

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

  return (
    <Container maxWidth="xs">
      <Typography className={heading} variant="h3">
        Sign Up Form
      </Typography>
      <form>
        <TextField
          variant="outlined"
          margin="normal"
          label="Email"
          fullWidth
          required
        />
        <TextField
          variant="outlined"
          margin="normal"
          label="First Name"
          fullWidth
          required
        />
        <TextField
          variant="outlined"
          margin="normal"
          label="Last Name"
          fullWidth
          required
        />
        <TextField
          variant="outlined"
          margin="normal"
          label="Password"
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
