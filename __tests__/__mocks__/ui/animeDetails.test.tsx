import { render, screen } from "@testing-library/react";

import AnimeDetailsPage from "@/pages/anime/[animeId]";
import axios from "axios";

test("Anime details page displays anime details information", async () => {
  const response = await axios.get("https://api.jikan.moe/v4/anime/1");
  render(<AnimeDetailsPage data={response.data.data} />);

  const title = screen.getByRole("heading", { name: /Cowboy Bebop/i });
  const image = screen.getByRole("img", { name: /Cowboy Bebop/i });
  const genre = screen.getByRole("heading", { name: /Genre :/i });
  const synopsis = screen.getByRole("heading", { name: /Synopsis :/i });
  const background = screen.getByRole("heading", { name: /Background :/i });
  const producers = screen.getByRole("heading", { name: /Producers :/i });
  const licensors = screen.getByRole("heading", { name: /Licensors :/i });
  const studios = screen.getByRole("heading", { name: /Studios :/i });

  expect(title).toBeInTheDocument();
  expect(image).toBeInTheDocument();
  expect(genre).toBeInTheDocument();
  expect(synopsis).toBeInTheDocument();
  expect(background).toBeInTheDocument();
  expect(producers).toBeInTheDocument();
  expect(licensors).toBeInTheDocument();
  expect(studios).toBeInTheDocument();
});
