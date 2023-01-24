import { useRouter } from "next/router";
import { useState, useEffect } from 'react';

const LoadingScreen = () => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    router.events.on('routeChangeStart', () => setLoading(true));
    router.events.on('routeChangeComplete', () => setLoading(false));
    router.events.on('routeChangeError', () => setLoading(false));

    return () => {
      router.events.off('routeChangeStart', () => setLoading(true));
      router.events.off('routeChangeComplete', () => setLoading(false));
      router.events.off('routeChangeError', () => setLoading(false));
    };
  }, [router.events]);

  if(!loading) return null;
  return (
    <div className="h-[100vh] w-full flex flex-col justify-center items-center fixed top-0 overflow-hidden bg-white left-0 z-[60]" >
      <div className="loadingSpinner"></div>
      <p className="text-lg">Please wait...</p>
    </div>
  );
};

export default LoadingScreen;