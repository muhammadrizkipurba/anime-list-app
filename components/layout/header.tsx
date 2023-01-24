import Link from "next/link";

const Header = () => {
  return (
    <nav className="py-8">
      <div className="flex justify-between">
        <Link href='/'>
          <h1 className="text-4xl font-bold text-center">
            Simple Anime Lists App
          </h1>
        </Link>
        <div className="flex items-center gap-6">
          <Link href="/signin" className="px-4 py-2">Sign in</Link>
          <Link href="/signup" className="bg-blue-700 px-4 py-2 rounded-xl text-white">Sign up</Link>
        </div>
      </div>
    </nav>
  );
};

export default Header;
