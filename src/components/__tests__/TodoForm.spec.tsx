import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import MockDate from "mockdate";

import TodoModel from "../../models/todo";
import TodoForm from "../TodoForm";

interface IRenderOptions {
  addTodo?: (todo: TodoModel) => void;
}

const renderTodoForm = ({ addTodo = () => {} }: IRenderOptions = {}) => {
  render(<TodoForm addTodo={addTodo} />);
};

beforeEach(() => {
  MockDate.set(new Date("2021-01-05"));
});

beforeAll(() => {
  // this file starts
});

afterEach(() => {
  MockDate.reset();
});

afterAll(() => {
  // after all tests
});

it("should render filters correctly", () => {
  renderTodoForm();

  expect(screen.getByRole("button", { name: /View all/i })).toHaveClass(
    "active"
  );
  expect(screen.getByRole("button", { name: /Active/i })).not.toHaveClass(
    "active"
  );
  expect(screen.getByRole("button", { name: /Completed/i })).not.toHaveClass(
    "active"
  );
});

it("should add a new todo", async () => {
  const addTodoMock = jest.fn();

  renderTodoForm({ addTodo: addTodoMock });

  expect(screen.getByPlaceholderText(/What needs to be done?/i));
  expect(addTodoMock).not.toHaveBeenCalled();

  await userEvent.type(
    screen.getByPlaceholderText(/What needs to be done?/i),
    "Mehr Tests schreiben"
  );

  expect(addTodoMock).not.toHaveBeenCalled();

  await userEvent.type(
    screen.getByPlaceholderText(/What needs to be done?/i),
    "{enter}"
  );

  expect(addTodoMock).toHaveBeenCalledTimes(1);
  expect(addTodoMock).toHaveBeenCalledWith({
    complete: false,
    createdAt: "2021-01-05T00:00:00.000Z",
    id: "1609804800000",
    text: "Mehr Tests schreiben",
  });
});

it("should NOT add empty todos", async () => {
  const addTodo = jest.fn();

  renderTodoForm({ addTodo });

  await userEvent.type(screen.getByRole("textbox"), "   {enter}");

  expect(addTodo).not.toHaveBeenCalled();
});
