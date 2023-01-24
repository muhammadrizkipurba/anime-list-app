import axios from "axios";
import { NextPage } from 'next';
import { useState, useEffect } from 'react';

import Layout from "@/components/layout/index";
import AnimeLists from "@/components/ui/animeLists";

const Home: NextPage = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [popularAnimes, setPopularAnimes] = useState<AnimeData[] | []>([]);
  
  useEffect(() => {
    setLoading(true);
    axios.get(`https://api.jikan.moe/v4/anime?page=1&limit=8&order_by=popularity`)
    .then(response => {
      setPopularAnimes(response.data.data)
      setLoading(false);
    }).catch(err => {
      console.log(err)
      setLoading(false);
    })
  
    return () => {}
  }, []);
  
  return (
    <Layout>
      { loading ? 
        <div className="h-[50vh] w-full flex flex-col justify-center items-center overflow-hidden bg-white left-0 z-[60]" >
          <div className="loadingSpinner"></div>
          <p className="text-lg">Please wait...</p>
        </div>
        : <AnimeLists popularAnimes={popularAnimes} />
      }
    </Layout>
  );
};

export default Home;
