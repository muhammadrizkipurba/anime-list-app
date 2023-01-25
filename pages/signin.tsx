import { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { FieldValues, useForm } from "react-hook-form";
import { connect } from "react-redux";
import { ConnectedProps } from "react-redux";

import TextInput from "@/components/ui/TextInput";
import Notification from "@/components/ui/Notification";
import { signInValidation, SignInPayload } from "@/lib/hooks/useValidation";
import { useAuth } from "@/lib/hooks/useAuth";
import { useUser } from "@/lib/hooks/useUser";
import { setReducerAuth } from "@/redux/actions/index";
import { initialState as ReduxState } from "@/redux/reducers/index";

type AlertMessage = {
  isError?: boolean;
  isWarning?: boolean;
  title: string;
  text: string;
};

type Errors = {
  email?: string | null;
  password?: string | null;
};

type PropsFromRedux = ConnectedProps<typeof connector>;

const Signin = ({reduxState, setReducerAuth}: PropsFromRedux) => {
  const { auth } = reduxState;
  const router = useRouter();
  const { signIn } = useAuth();
  const { getUserData } = useUser();
  const [loading, setLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<Errors>({ email: null, password: null });
  const [alertMessage, setAlertMessage] = useState<AlertMessage | null>(null);

  const { register, getValues, handleSubmit, watch, setValue } = useForm();
  const [email, password] = watch(["email", "password"]);

  useEffect(() => {
    const { isAuthenticated } = auth;
    if(isAuthenticated) {
      router.push("/");
    };

    return () => {};
  }, []);

  const formValidation = (payload: SignInPayload) => {
    const result = signInValidation(payload);
    return result;
  };

  const onSubmit = async () => {
    setAlertMessage(null);
    setLoading(true);
    const { email, password }: FieldValues = getValues();

    const payload: SignInPayload = {
      email,
      password,
    };

    // Form Validation
    const { isValid, errors } = formValidation(payload);
    if (isValid) {
      // Submit payload
      const response: any = await signIn(payload);
      if (response && response.uid) {
        const userData = await getUserData(response.uid);
        if (userData) {
          setReducerAuth({
            isAuthenticated: true,
            user: userData,
          });
          router.push("/");
          setLoading(false);
        } else {
          setAlertMessage({
            isError: true,
            title: "Authorization error",
            text: "Your account is not registered.",
          });
          setLoading(false);
        }
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
      setErrors(errors)
      setLoading(false);
    };
  };

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { target } = event;
    setValue(target.name, target.value);
    setErrors({ ...errors, [target.name]: null });
  };

  return (
    <div className="max-w-7xl mx-auto px-6">
      <Head>
        <title>Sign in</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="w-full h-[100vh] flex items-center justify-center">
        <div className="w-full md:w-[500px]">
          <div className="flex items-center justify-center mb-10">
            <h1 className="text-2xl font-semibold text-center mb-0 mr-4">
              Sign in
            </h1>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
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

            {alertMessage && (
              <div className="my-8">
                <Notification notification={alertMessage} />
              </div>
            )}
            {loading ? (
              <div className="w-full flex flex-col justify-center items-center z-[60] my-12">
                <div className="loadingSpinner"></div>
                <p className="text-lg mt-8">Please wait...</p>
              </div>
            ) : (
              <button
                type="submit"
                className="inline-block w-full py-4 bg-blue-600 text-white font-medium text-lg leading-snug uppercase rounded-lg shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
              >
                Sign in
              </button>
            )}

            <div className="text-center lg:text-left">
              <p className="text-sm font-semibold text-center mt-2 pt-1 mb-0">
                Don't have an account ?
                <Link
                  href="/signup"
                  className="text-red-600 hover:text-red-700 focus:text-red-700 transition duration-200 ease-in-out ml-2"
                >
                  Signup
                </Link>
              </p>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

const mapDispatchToProps = {
  setReducerAuth,
};

const mapStateToProps = (state: typeof ReduxState) => {
  return {
    reduxState: state,
  };
};

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(Signin);
