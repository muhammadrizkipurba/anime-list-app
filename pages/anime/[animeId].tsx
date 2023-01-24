import Layout from "@/components/layout";
import YoutubeEmbed from "@/components/ui/youtubeEmbed";
import { StarIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

type AnimeDetailsProps = {
  data: AnimeData | null;
};

export async function getStaticProps({
  params,
}: {
  params: { animeId: string };
}) {
  const { animeId } = params;
  let anime = null;
  try {
    const response = await fetch(
      `https://api.jikan.moe/v4/anime/${Number(animeId)}`
    );
    anime = await response.json();
  } catch (e) {
    console.log(e);
  }
  return { props: anime };
}

export async function getStaticPaths() {
  const response = await fetch(
    "https://api.jikan.moe/v4/anime?page=1&limit=20"
  );
  const animes = await response.json();

  const paths = animes.data.map((anime: AnimeData) => ({
    params: { animeId: anime.mal_id.toString() },
  }));

  // Pre-render only these paths at build time.
  return { paths, fallback: "blocking" };
}

const AnimeDetailsPage = ({ data }: AnimeDetailsProps) => {
  if (!data) {
    return (
      <Layout>
        <div className="h-[500px] flex justify-center items-center flex-col">
          <p>Sorry we couldn't find the anime details</p>
          <Link
            href="/"
            className="bg-blue-700 px-6 py-2 text-white rounded-xl mt-6"
          >
            Back to home
          </Link>
        </div>
      </Layout>
    );
  }

  const {
    mal_id,
    type,
    year,
    episodes,
    title,
    rating,
    images,
    trailer,
    title_japanese,
    background,
    synopsis,
    genres,
    score,
    producers,
    licensors,
    studios,
  } = data;

  return (
    <Layout>
      <div className="my-20">
        <div className="flex flex-col justify-center gap-10">
          <div className="w-full">
            <div className="flex gap-4 flex-wrap items-center">
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-semibold">
                {title} - {type} <span>( {year} )</span>
              </h1>
              {score && (
                <div className="flex items-center bg-yellow-50 px-4 gap-2 py-1 border rounded-lg border-yellow-200">
                  <StarIcon height={20} fill="#F7D803" />
                  <p className="text-lg font-semibold">{score}</p>
                </div>
              )}
            </div>
            {title_japanese && (
              <h1 className="text-lg md:text-xl lg:text-2xl mt-2">
                {title_japanese}
              </h1>
            )}
            {episodes && (
              <h3 className="text-sm lg:text-md py-2 mr-5 mt-5 font-semibold inline-flex flex-wrap rounded-xl">
                {episodes} episodes
              </h3>
            )}
            {rating && (
              <h3 className="text-sm lg:text-md py-2 px-5 mt-5 bg-blue-50 font-semibold text-blue-600 inline-flex flex-wrap rounded-xl">
                {rating}
              </h3>
            )}
            {trailer.youtube_id && (
              <div className="w-full h-max mt-10 rounded-lg overflow-hidden">
                <YoutubeEmbed youtubeId={trailer.youtube_id} />
              </div>
            )}
          </div>
          {trailer.youtube_id && (
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold mt-12">
              Details Information
            </h2>
          )}
          <div className="mt-3">
            <img
              src={images.jpg.large_image_url}
              className="w-full md:max-w-[500px] mx-auto object-contain h-auto mb-12"
              alt={title}
            />
            <div id="genre" className="mt-5">
              <h3 className="font-semibold">Genre :</h3>
              <div className="flex flex-wrap gap-2 mt-2">
                {genres.map((genre, idx) => {
                  return (
                    <span
                      key={`${mal_id}-${idx}`}
                      className="inline-flex flex-wrap items-center gap-1 rounded-lg bg-blue-50 px-4 py-1 font-semibold text-blue-600"
                    >
                      {genre.name}
                    </span>
                  );
                })}
              </div>
            </div>

            <div id="synopsis" className="mt-5">
              <h3 className="font-semibold">Synopsis :</h3>
              <p className="text-justify">{synopsis || "-"}</p>
            </div>

            <div id="background" className="mt-5">
              <h3 className="font-semibold">Background :</h3>
              <p className="text-justify">{background || "-"}</p>
            </div>

            <div id="producers" className="mt-5">
              <h3 className="font-semibold">Producers :</h3>
              <div className="flex items-center">
                {producers && producers.length > 0
                  ? producers.map((item, idx) => (
                      <p key={item.name} className="">
                        {item.name}
                        {idx !== licensors.length - 1 ? `,${" "}` : ""}
                      </p>
                    ))
                  : "-"}
              </div>
            </div>

            <div id="licensors" className="mt-5">
              <h3 className="font-semibold">Licensors :</h3>
              <div className="flex items-center">
                {licensors && licensors.length > 0
                  ? licensors.map((item, idx) => (
                      <p key={item.name} className="">
                        {item.name}
                        {idx !== licensors.length - 1 ? `, ${" "}` : ""}
                      </p>
                    ))
                  : "-"}
              </div>
            </div>

            <div id="studios" className="mt-5">
              <h3 className="font-semibold">Studios :</h3>
              <div className="flex items-center">
                {studios && studios.length > 0
                  ? studios.map((item, idx) => (
                      <p key={item.name} className="">
                        {item.name} 
                        {idx !== licensors.length - 1 ? `, ${" "}` : ""}
                      </p>
                    ))
                  : "-"}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AnimeDetailsPage;
