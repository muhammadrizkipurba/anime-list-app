import { NextPage } from "next";
import Head from "next/head";
import { useState, useEffect } from 'react';
import Link from "next/link";
import { FieldValues, useForm } from "react-hook-form";
import { useRouter } from 'next/router';
import { ConnectedProps, connect } from 'react-redux';

import TextInput from "@/components/ui/TextInput";
import Notification from "@/components/ui/Notification";
import { signUpValidation, SignUpPayload } from '@/lib/hooks/useValidation';
import { useAuth } from "@/lib/hooks/useAuth";
import { useUser } from "@/lib/hooks/useUser";
import { initialState as ReduxState } from "@/redux/reducers/index";

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
  password_confirm?: string | null;
};

type PropsFromRedux = ConnectedProps<typeof connector>;

const Signup = ({reduxState} : PropsFromRedux) => {
  const { auth } = reduxState;
  const router = useRouter();
  const { signUp } = useAuth();
  const { createUser } = useUser();

  const [loading, setLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<Errors>({name: null, email: null, password: null});
  const [alertMessage, setAlertMessage] = useState<AlertMessage | null>(null);
  
  const { register, getValues, handleSubmit, watch, setValue } = useForm();
  const [name, email, password, password_confirm] = watch(["name", "email", "password", "password_confirm"]);
  
  useEffect(() => {
    const { isAuthenticated } = auth;
    if(isAuthenticated) {
      router.push("/");
    };

    return () => {};
  }, []);

  const formValidation = (payload: SignUpPayload) => {
    const result = signUpValidation(payload);
    return result;
  };

  const onSubmit = async() => {
    setAlertMessage(null);
    setLoading(true);
    const {name, email, password, password_confirm}: FieldValues = getValues();

    const payload: SignUpPayload = {
      name,
      email,
      password,
      favorite_animes: [] // default value
    };

    // Form Validation
    const { isValid, errors } = formValidation({...payload, password_confirm});
    if(isValid) {
      // Create new user firebase authentication
      const response: any = await signUp(payload);
      if (response && response.uid) {
        // Save user data to firestore doc
        await createUser({...payload, id: response.uid}).then(() => {
          setAlertMessage({
            isError: false,
            title: "Signup success",
            text: "Your email has been registered successfully.",
          });
          setTimeout(() => {
            setLoading(false);
            router.push("/signin");
          }, 2000)
        }).catch(err => {
          console.log(err);
          setAlertMessage({
            isError: true,
            title: "Internal server error",
            text: "Please try again later."
          });
          setLoading(false);
        });
      } else {
        setAlertMessage({
          isError: true,
          title: "Authorization error",
          text: response,
        });
        setLoading(false);
      }
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
    <div className="max-w-7xl mx-auto px-6">
      <Head>
        <title>Sign up</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="w-full h-[100vh] flex items-center justify-center">
      <div className="w-full md:w-[500px]">
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

          <div className="mb-6">
            <TextInput 
              id="password_confirm" 
              type="password" 
              value={password_confirm} 
              label="Confirm password" 
              error={errors?.password_confirm}
              onChange={onChangeHandler}
              register={register}
              disabled={loading}
            />
          </div>

          {alertMessage && 
            <div className="my-8">
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

const mapStateToProps = (state: typeof ReduxState) => {
  return {
    reduxState: state,
  };
};

const connector = connect(mapStateToProps, {});

export default connector(Signup);
