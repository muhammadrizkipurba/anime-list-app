import Layout from "../components/layout/index";
import AnimeLists from "@/components/ui/animeLists";

type HomeProps = {
  popularAnimes: AnimeData[];
};

const Home = ({ popularAnimes }: HomeProps) => {
  return (
    <Layout>
      <AnimeLists popularAnimes={popularAnimes} />
    </Layout>
  );
};

export default Home;

export async function getStaticProps() {
  // Fetch popular animes
  const res = await fetch(`https://api.jikan.moe/v4/anime?page=1&limit=8&order_by=popularity`)
  const popularAnimes = await res.json();

  // Pass data to the page via props
  return { props: { popularAnimes: popularAnimes.data } }
}
