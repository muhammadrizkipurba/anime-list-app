import { render, screen } from "@testing-library/react";
import Layout from "@/components/layout/index";

test("Navigation bar", () => {
  render(<Layout children />);

  const heading = screen.getByRole("heading", {
    name: "Simple Anime Lists App",
  });

  const singinButton = screen.getByRole("link", {
    name: "Sign in"
  });

  const signupButton = screen.getByRole("link", {
    name: "Sign up"
  });

  expect(heading).toBeInTheDocument();
  expect(singinButton).toBeInTheDocument();
  expect(signupButton).toBeInTheDocument();
});