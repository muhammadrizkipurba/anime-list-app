import { useState } from "react";
import { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { FieldValues, useForm } from "react-hook-form";

import { firestore } from "@/lib/firebase/clientApp";

import TextInput from "@/components/ui/TextInput";
import Notification from "@/components/ui/Notification";
import { signUpValidation, SignUpPayload } from '../lib/hooks/useValidation';
import { addDoc, collection } from "firebase/firestore";

type AlertMessage = {
  isError?: boolean;
  isWarning?: boolean;
  title: string;
  text: string;
};

type Errors = {
  name?: string | null;
  email?: string | null;
  password?: string | null;
};

const Signup: NextPage = () => {
  
  const [loading, setLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<Errors>({name: null, email: null, password: null});
  const [alertMessage, setAlertMessage] = useState<AlertMessage | null>(null);
  
  const { register, getValues, handleSubmit, watch, setValue } = useForm();
  const [name, email, password] = watch(["name", "email", "password"]);
  
  const formValidation = (payload: SignUpPayload) => {
    const result = signUpValidation(payload);
    return result;
  };

  const addNewUser = async (payload: SignUpPayload) => {
    try {
      await addDoc(collection(firestore, "users"), payload);
    } catch (err) {
      console.log(err);
      setAlertMessage({
        isError: true,
        title: "Internal Server Error!",
        text: "Please try again later",
      });
    }};

  const onSubmit = async() => {
    setAlertMessage(null);
    setLoading(true);
    const {email, password}: FieldValues = getValues();

    const payload: SignUpPayload = {
      name,
      email,
      password,
    };

    // Form Validation
    const { isValid, errors } = formValidation(payload);
    if(isValid) {
      // Submit payload
      addNewUser(payload)
    } else {
      // Show errors
      setErrors(errors);
    };
    
    setLoading(false);
  };

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {target} = event;
    setValue(target.name, target.value)
    setErrors({...errors, [target.name]: null});
  };

  return (
    <div className="max-w-7xl mx-auto px-4">
      <Head>
        <title>Sign up</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="w-full h-[100vh] flex items-center justify-center">
      <div className="md:w-[500px]">
        <div className="flex items-center justify-center mb-10">
          <h1 className="text-2xl font-semibold text-center mb-0 mr-4">Sign up</h1>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-6">
            <TextInput 
              id="name" 
              type="text" 
              value={name} 
              label="Name" 
              error={errors.name}
              onChange={onChangeHandler}
              register={register}
              disabled={loading}
            />
          </div>

          <div className="mb-6">
            <TextInput 
              id="email" 
              type="text" 
              value={email} 
              label="Email" 
              error={errors.email}
              onChange={onChangeHandler}
              register={register}
              disabled={loading}
            />
          </div>

          <div className="mb-6">
            <TextInput 
              id="password" 
              type="password" 
              value={password} 
              label="Password" 
              error={errors?.password}
              onChange={onChangeHandler}
              register={register}
              disabled={loading}
            />
          </div>

          {alertMessage && 
            <div className="mt-10">
              <Notification notification={alertMessage} />
            </div>
          }
          
          {loading ? 
            <div className="w-full flex flex-col justify-center items-center z-[60] my-12">
              <div className="loadingSpinner"></div>
              <p className="text-lg mt-8">Please wait...</p>
            </div>  
            : <button
              type="submit"
              className="inline-block w-full py-4 bg-blue-600 text-white font-medium text-lg leading-snug uppercase rounded-lg shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
            >
              Sign up
            </button>
          }

          <div className="text-center lg:text-left">
            <p className="text-sm font-semibold text-center mt-2 pt-1 mb-0">
              Already have an account ?
              <Link
                href="/signin"
                className="text-red-600 hover:text-red-700 focus:text-red-700 transition duration-200 ease-in-out ml-2"
              >
                Sign in
              </Link>
            </p>
          </div>
        </form>
      </div>
      </main>
    </div>
  );
};

export default Signup;
