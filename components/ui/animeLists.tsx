import axios from "axios";
import { connect, ConnectedProps } from "react-redux";
import { useState, useCallback, useEffect } from "react";

import SearchInput from "./searchInput";
import AnimeCard from "./animeCard";

import { initialState as ReduxState } from "@/redux/reducers/index";
import {
  setReducerSearchQuery,
  setReducerSearchResult,
  setReducerPagination,
} from "@/redux/actions";
import Pagination from "./pagination";

type Pagination = {
  last_visible_page: number;
  has_next_page: boolean;
  current_page: number;
  items: {
    count: number;
    total: number;
    per_page: number;
  };
};

type SearchAnimeParams = {
  query: string;
  page: number;
};

type ComponentProps = {
  popularAnimes: AnimeData[];
};

type PropsFromRedux = ConnectedProps<typeof connector>;

type AnimeListsProps = ComponentProps & PropsFromRedux;

const AnimeLists = ({
  popularAnimes,
  reduxState,
  setReducerSearchQuery,
  setReducerSearchResult,
  setReducerPagination,
}: AnimeListsProps) => {
  const {searchQuery} = reduxState;
  const [loading, setLoading] = useState<boolean>(false);

  const [query, setQuery] = useState<string>("");
  const [animesLists, setAnimesLists] = useState<AnimeData[] | []>([]);
  const [activePage, setActivePage] = useState<number>(1);
  const [pagination, setPagination] = useState<Pagination | null>(null);

  const pageLimit =
    pagination && pagination.items.per_page ? pagination.items.per_page : 10;
  const totalData =
    pagination && pagination.items.total ? pagination.items.total : 0;

  const fetchSearchAnimes = useCallback(
    async ({ query, page }: SearchAnimeParams) => {
      const response = await axios.get(
        `https://api.jikan.moe/v4/anime?page=${page}&limit=8&q=${query}`
      );
      return response.data;
    },
    []
  );

  useEffect(() => {
    const { searchQuery, searchResult, pagination } = reduxState;
    if (searchQuery) setQuery(searchQuery);
    if (searchResult) setAnimesLists(searchResult);
    if (pagination) setPagination(pagination);
  }, []);

  const onSearch = async ({ query, page }: SearchAnimeParams) => {
    setLoading(true);
    const result = await fetchSearchAnimes({ query, page });

    setAnimesLists(result.data);
    setPagination(result.pagination);
    setActivePage(result.pagination.current_page);

    setReducerSearchQuery(query);
    setReducerSearchResult(result.data);
    setReducerPagination(result.pagination);
    setLoading(false);
  };

  const setPaginate = (pageNumber: number) => {
    setActivePage(pageNumber);
    onSearch({ query, page: pageNumber });
  };

  const onClickPrevPage = () => {
    const currentPage = activePage - 1;
    if (activePage !== 1) {
      setActivePage(currentPage);
      onSearch({ query, page: currentPage });
    }
  };

  const onClickNextPage = () => {
    if (activePage !== Math.ceil(totalData / pageLimit)) {
      const currentPage = activePage + 1;
      setActivePage(currentPage);
      onSearch({ query, page: currentPage });
    }
  };

  // console.log(activePage)

  return (
    <div>
      <SearchInput
        searchQuery={query}
        setSearchQuery={setQuery}
        onSearch={() => onSearch({ query, page: 1 })}
        disabled={loading}
      />
      {loading ? (
        <div className="flex flex-col items-center justify-center">
          <div className="loadingSpinner"></div>
          <p className="mt-5">Please wait...</p>
        </div>
      ) : animesLists.length > 0  ? (
        <div className="mb-20">
          <h2 className="text-2xl font-semibold mt-20">
            {animesLists.length === 0 ? `Can not found any animes with title "${searchQuery}"` : `Search result of "${searchQuery}"`}
          </h2>
          <div className="flex gap-0 overflow-x-scroll md:grid md:anime-list-grid mt-8 mb-12">
            {animesLists.length > 0 &&
              animesLists.map((anime: AnimeData) => (
                <AnimeCard key={anime.mal_id} data={anime} />
              ))}
          </div>
          <div>
            <Pagination
              data={animesLists}
              currentPage={activePage}
              limit={pageLimit}
              totalData={totalData}
              setPaginate={setPaginate}
              onClickPrevPage={onClickPrevPage}
              onClickNextPage={onClickNextPage}
            />
          </div>
        </div>
      ): null }

      {/* Popular Animes */}
      <h2 className="text-2xl font-semibold">Popular Animes</h2>
      <div data-test-id="popularAnimes_wrapper" className="flex gap-5 overflow-x-scroll md:grid md:anime-list-grid mt-8 mb-20">
        {popularAnimes.map((anime: AnimeData) => (
          <AnimeCard key={anime.mal_id} data={anime} />
        ))}
      </div>
    </div>
  );
};

const mapDispatchToProps = {
  setReducerSearchQuery,
  setReducerSearchResult,
  setReducerPagination,
};

const mapStateToProps = (state: typeof ReduxState) => {
  return {
    reduxState: state,
  };
};

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(AnimeLists);
