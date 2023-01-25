export type SignInPayload = {
  email: string;
  password: string;
};
export type SignUpPayload = {
  id?: string;
  name: string;
  email: string;
  password: string;
  password_confirm?: string;
  favorite_animes: []; // default value = []
};

export const signInValidation = (payload: SignInPayload) => {
  let isValid;
  let errors: any = {};

  const { email, password } = payload;
  const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if(!email) {
    errors.email = "Email is required!";
  } else {
    if(!regex.test(email)) errors.email = "Invalid email address"
  };

  if(!password) errors.password = "Password is required!"

  isValid = Object.keys(errors).length === 0;
  return {isValid, errors};
};

export const signUpValidation = (payload: SignUpPayload) => {
  let isValid;
  let errors: any = {};

  const { name, email, password, password_confirm } = payload;
  const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  
  if(!name) errors.name = "Name is required!"
  
  if(!email) {
    errors.email = "Email is required!";
  } else {
    if(!regex.test(email)) errors.email = "Invalid email address"
  };

  if(!password) errors.password = "Password is required!"
  if(!password_confirm) errors.password_confirm = "Please confirm your password"
  if(password && password_confirm && password !== password_confirm) {
    errors.password_confirm = "Password does not match!"
  };

  isValid = Object.keys(errors).length === 0;
  return {isValid, errors};
};