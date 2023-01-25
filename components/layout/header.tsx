import Link from "next/link";
import { connect, ConnectedProps } from "react-redux";
import { HeartIcon } from "@heroicons/react/24/outline";
import { ArrowRightOnRectangleIcon } from "@heroicons/react/24/solid";

import { initialState as ReduxState } from "@/redux/reducers/index";
import { setReducerAuth } from '@/redux/actions/index';

type PropsFromRedux = ConnectedProps<typeof connector>;

const Header = ({ authState, setReducerAuth }: PropsFromRedux) => {
  const { isAuthenticated, user } = authState;

  const signOutHandler = async() => {
    await setReducerAuth({
      isAuthenticated: false,
      user: null
    });
  };

  return (
    <nav className="py-8">
      <div className="flex justify-between flex-col-reverse lg:flex-row">
        <Link href="/">
          <h1 className="text-2xl md:text-3xllg:text-4xl font-bold text-center mt-10 lg:mt-0">
            Simple Anime Lists App
          </h1>
        </Link>
        {isAuthenticated ? (
          <div className="group relative mx-auto md:mx-0">
            <button
              className="flex items-center justify-center lg:justify-end gap-2 flex-wrap w-[170px]"
            >
              <div className="h-10 w-10 flex items-center justify-center rounded-full bg-blue-600">
                <p className="text-white font-semibold">
                  {user.name.charAt(0)}
                </p>
              </div>
              <div>
                <p className="text-left text-md font-semibold">{user.name}</p>
                <p className="text-left text-sm">{user.email}</p>
              </div>
            </button>

            {/* Dropdown menu */}
            <ul className="absolute hidden text-gray-700 pt-5 group-hover:block transition-all ease-in-out duration-300 w-full">
              <li className="">
                <Link
                  className="rounded-t bg-blue-50 hover:bg-blue-100 py-2 px-3 block whitespace-no-wrap transition-all duration-300 ease-in-out"
                  href="/profile"
                >
                  <div className="flex items-center gap-1">
                    <HeartIcon height={16} />
                    <span className="text-md ml-1">Favorite animes</span>
                  </div>
                </Link>
              </li>
              <li className="">
                <a
                  className="bg-blue-50 hover:bg-blue-100 py-2 px-3 block whitespace-no-wrap rounded-b transition-all duration-300 ease-in-out"
                  role="button"
                  onClick={signOutHandler}
                >
                  <div className="flex items-center gap-1">
                    <ArrowRightOnRectangleIcon height={16} />
                    <span className="text-md ml-1">Sign out</span>
                  </div>
                </a>
              </li>
            </ul>
          </div>
        ) : (
          <div className="flex items-center justify-center lg:justify-end gap-6">
            <Link href="/signin" className="px-4 py-2">
              Sign in
            </Link>
            <Link
              href="/signup"
              className="bg-blue-700 px-4 py-2 rounded-xl text-white"
            >
              Sign up
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

const mapDispatchToProps = {
  setReducerAuth,
};

const mapStateToProps = (state: typeof ReduxState) => {
  const { auth } = state;
  return {
    authState: auth,
  };
};

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(Header);
