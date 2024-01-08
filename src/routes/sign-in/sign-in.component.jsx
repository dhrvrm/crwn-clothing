import React from "react";
import {
  createUserDocumentFromAuth,
  signInGooglePopup,
} from "../../utils/firebase/firebase.utils";

const SignIn = () => {
  const logGoogleUser = async () => {
    const { user } = await signInGooglePopup();
    const userDocRef = await createUserDocumentFromAuth(user);
  };
  return (
    <div>
      <button onClick={logGoogleUser}>SignIn with Google</button>
    </div>
  );
};

export default SignIn;
