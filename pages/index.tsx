import Layout from "../components/layout/index";
import AnimeLists from "@/components/ui/animeLists";
import axios from "axios";
import { NextPage } from 'next';
import { useState, useEffect } from 'react';

const Home: NextPage = () => {
  const [popularAnimes, setPopularAnimes] = useState<AnimeData[] | []>([]);
  
  useEffect(() => {
    axios.get(`https://api.jikan.moe/v4/anime?page=1&limit=8&order_by=popularity`)
    .then(response => {
      setPopularAnimes(response.data.data)
    }).catch(err => {
      console.log(err)
    })
  
    return () => {}
  }, []);
  
  return (
    <Layout>
      <AnimeLists popularAnimes={popularAnimes} />
    </Layout>
  );
};

export default Home;
