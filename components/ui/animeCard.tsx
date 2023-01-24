import React from "react";
import Link from "next/link";
import { connect, ConnectedProps } from "react-redux";
import { ArrowRightIcon, HeartIcon } from "@heroicons/react/24/solid";
import { HeartIcon as HeartIconOutline } from "@heroicons/react/24/outline";
import { initialState as ReduxState } from "@/redux/reducers/index";

import { updateFavoriteAnimes } from "@/redux/actions/user";

type ComponentProps = {
  data: AnimeData;
};

type PropsFromRedux = ConnectedProps<typeof connector>;

type AnimesCardProps = ComponentProps & PropsFromRedux;

const AnimeCard = ({
  data,
  reduxState,
  updateFavoriteAnimes,
}: AnimesCardProps) => {
  const {
    mal_id,
    type,
    title,
    images,
  } = data;

  const { auth } = reduxState;

  return (
    <div id="AnimeCard" data-test-id="AnimeCard" className="m-5 group">
      <div className="overflow-hidden relative rounded-lg bg-white shadow-md w-[300px] md:w-auto group-hover:scale-[1.06] group-hover:cursor-pointer duration-300">
        <div className="h-[420px] bg-overlay-black">
          <img
            src={images.webp.image_url}
            className="w-full object-fill h-full"
            alt={title}
          />
        </div>
        <div className="absolute bottom-0 w-full">
          <div className="p-4">
            <p className="mb-1 text-white">{type}</p>
            <h3 className="text-xl font-semibold text-white capitalize">
              {title}
            </h3>
          </div>
          <div className="p-4 mb-1 flex flex-wrap">
            <Link
              href={`/anime/${mal_id}`}
              className="grow flex rounded-lg justify-center py-2 items-center bg-yellow-400"
            >
              <span>Details</span>
              <ArrowRightIcon height={20} className="ml-2" />
            </Link>
            {auth.isAuthenticated ? (
              <button
                onClick={() => alert(mal_id)}
                className="py-1 bg-white ml-2 px-2 rounded-lg"
              >
                {auth.user.favorite_animes.includes(mal_id) ? (
                  <HeartIcon height={24} color="red" />
                ) : (
                  <HeartIconOutline height={24} color="black" />
                )}
              </button>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

const mapDispatchToProps = {
  updateFavoriteAnimes,
};

const mapStateToProps = (state: typeof ReduxState) => {
  return {
    reduxState: state,
  };
};

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(AnimeCard);
