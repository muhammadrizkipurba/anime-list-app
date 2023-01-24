import { SignInPayload } from "@/lib/hooks/useValidation";
import { setReducerAuth } from "./index";

export const userSignIn = (payload: SignInPayload) => {};

export const userSignUp = (payload: SignInPayload) => {};

export const userSignOut = () => {
  setReducerAuth({
    isAuthenticated: false,
    user: null,
  });
};
