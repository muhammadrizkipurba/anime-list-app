import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "@/lib/firebase/clientApp";

type AuthParams = {
  email: string;
  password: string;
};

const getErrorMessage = (msg: string) => {
  let errorMessage = "";

  if (msg.includes("auth/wrong-password")) {
    errorMessage = "Wrong email and password combination";
  }

  if (msg.includes("auth/user-not-found")) {
    errorMessage = "Your email is not registered. Please sign up.";
  }

  if (msg.includes("auth/email-already-in-use")) {
    errorMessage = "Email has been registered. Please use another email.";
  }

  return errorMessage;
};

const signUp = async ({ email, password }: AuthParams) => {
  try {
    const response = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const { user } = response;
    return {
      uid: user.uid,
      email: user.email,
    };
  } catch (error: any) {
    return getErrorMessage(error.message);
  }
};

const signIn = async ({ email, password }: AuthParams) => {
  try {
    const response = await signInWithEmailAndPassword(auth, email, password);
    if (response) {
      const { user } = response;
      return {
        uid: user.uid,
        email: user.email,
      };
    }
  } catch (error: any) {
    return getErrorMessage(error.message);
  }
};

export const useAuth = () => {
  return {
    signUp,
    signIn,
  };
};
