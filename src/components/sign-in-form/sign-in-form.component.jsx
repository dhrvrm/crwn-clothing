import { useState, useContext } from "react";

import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";
import {
  signInAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
  signInGooglePopup,
} from "../../utils/firebase/firebase.utils";

import { UserContext } from "../../context/user.context";

import "./sign-in-form.styles.scss";

const defaultFormFields = {
  email: "",
  password: "",
};

const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;

  const { setCurrentUser } = useContext(UserContext);

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const signInWithGoogle = async () => {
    const { user } = await signInGooglePopup();
    await createUserDocumentFromAuth(user);

    setCurrentUser(user);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const { user } = await signInAuthUserWithEmailAndPassword(
        email,
        password
      );

      setCurrentUser(user);

      resetFormFields();
    } catch (error) {
      switch (error.code) {
        case "auth/wrong-password":
          alert("Incorrect Password.");
          break;
        case "auth/invalid-credential":
          alert("Incorrect Credentials.");
          break;
        case "auth/too-many-requests":
          alert("Too many attempts, Try Again later.");
          break;

        case "auth/user-not-found":
          alert("No User associated with this email.");
          break;

        default:
          console.log("Error in Sign in ", error.message);
      }
    }
  };
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value });
  };
  return (
    <div className="sign-in-container">
      <h2>Already have an Account</h2>
      <span>Sign in with your email and password </span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Email"
          type="email"
          name="email"
          onChange={handleChange}
          value={email}
          required
        />
        <FormInput
          label="Password"
          type="password"
          name="password"
          onChange={handleChange}
          value={password}
          required
        />
        <div className="buttons-container">
          <Button type="submit">Sign In</Button>
          <Button
            type="button"
            buttonType={"google"}
            onClick={signInWithGoogle}
          >
            Sign In with Google
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignInForm;
