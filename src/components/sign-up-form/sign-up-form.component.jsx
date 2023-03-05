import { useState } from "react";
import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";

import FormInput from "../form-input/form-input.component";
import Button from './../button/button.component';

import './sign-up-form.styles.scss';

const defaultFormFeilds = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignUpForm = () => {
  const [formFeilds, setFormFeilds] = useState(defaultFormFeilds);
  const { displayName, email, password, confirmPassword } = formFeilds;

  console.log(formFeilds);

  const resetFormFeilds = () => {
    setFormFeilds(defaultFormFeilds);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords dont match");
      return;
    }

    try {
      const { user } = await createAuthUserWithEmailAndPassword(
        email,
        password
      );

      await createUserDocumentFromAuth(user, { displayName });

      resetFormFeilds();
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        alert("Email already in use");
      } else {
        console.log(error);
      }
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormFeilds({ ...formFeilds, [name]: value });
  };

  return (
    <div className="sign-up-container">
    <h2>Don't have an account</h2>
      <span>Sign-up with your email and password</span>

      <form onSubmit={handleSubmit}>
        <FormInput
          label="Display name"
          type="text"
          required
          onChange={handleChange}
          name="displayName"
          value={displayName}
        />

        <FormInput
        label="Email"
          type="email"
          required
          onChange={handleChange}
          name="email"
          value={email}
        />

        <FormInput
        label="Password"
          type="password"
          required
          onChange={handleChange}
          name="password"
          value={password}
        />


        <FormInput
        label="Confirm Password"
          type="password"
          required
          onChange={handleChange}
          name="confirmPassword"
          value={confirmPassword}
        />

        <Button buttonType='submit' type="submit">Sign Up</Button>
      </form>
    </div>
  );
};

export default SignUpForm;
