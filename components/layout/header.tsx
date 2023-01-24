import Link from "next/link";

const Header = () => {
  return (
    <nav className="py-8">
      <div className="flex justify-between flex-col-reverse lg:flex-row ">
        <Link href='/'>
          <h1 className="text-2xl md:text-3xllg:text-4xl font-bold text-center mt-10 lg:mt-0">
            Simple Anime Lists App
          </h1>
        </Link>
        <div className="flex items-center justify-center lg:justify-end gap-6">
          <Link href="/signin" className="px-4 py-2">Sign in</Link>
          <Link href="/signup" className="bg-blue-700 px-4 py-2 rounded-xl text-white">Sign up</Link>
        </div>
      </div>
    </nav>
  );
};

export default Header;
