import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import TodoCount from "../TodoCount";

it("should render correctly", () => {
  render(<TodoCount count={3} />);

  expect(screen.getByText(/3 Todos/i)).toBeInTheDocument();
});

it("should use custom label", () => {
  render(<TodoCount count={5} label={"Äpfel"} />);

  expect(screen.getByText(/5 Äpfel/i));
});
