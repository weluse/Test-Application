import { render, screen } from "@testing-library/react";

import TodoModel, { filter } from "../../models/todo";
import TodoList from "../TodoList";

interface IRenderOptions {
  todoList?: TodoModel[];
  filterOrder?: filter;
}

const renderTodoList = ({
  todoList = [
    {
      createdAt: new Date().toISOString(),
      id: "1",
      text: "Tests schreiben",
      complete: false,
    },
    {
      createdAt: new Date().toISOString(),
      id: "2",
      text: "Aufräumen",
      complete: false,
    },
  ],
  filterOrder = filter.all,
}: IRenderOptions = {}) => {
  render(<TodoList todoList={todoList} filterOrder={filterOrder} />);
};

it("should render correctly", () => {
  render(<TodoList todoList={[]} filterOrder={filter.all} />);

  expect(screen.getByText(/0 Todos/i));
});

it("should render with custom renderer correctly", () => {
  renderTodoList({ todoList: [] });

  expect(screen.getByText(/0 Todos/i));
});

it("should render list with all items correctly", () => {
  renderTodoList({
    filterOrder: filter.all,
    todoList: [
      {
        createdAt: new Date().toISOString(),
        id: "1",
        text: "Tests schreiben",
        complete: true,
      },
      {
        createdAt: new Date().toISOString(),
        id: "2",
        text: "Aufräumen",
        complete: false,
      },
    ],
  });

  expect(screen.getByText(/2 Todos/i));

  expect(screen.getByText(/Tests schreiben/i));
  expect(screen.getByText(/Aufräumen/i));
});

it("should show active items only", () => {
  renderTodoList({
    filterOrder: filter.active,
    todoList: [
      {
        createdAt: new Date().toISOString(),
        id: "1",
        text: "Tests schreiben",
        complete: false,
      },
      {
        createdAt: new Date().toISOString(),
        id: "2",
        text: "Aufräumen",
        complete: true,
      },
    ],
  });

  expect(screen.getByText(/1 Todos/i));

  expect(screen.getByText(/Tests schreiben/i));
  expect(screen.queryByText(/Aufräumen/i)).toBeNull();
});

it("should show completed items only", () => {
  renderTodoList({
    filterOrder: filter.completed,
    todoList: [
      {
        createdAt: new Date().toISOString(),
        id: "1",
        text: "Tests schreiben",
        complete: false,
      },
      {
        createdAt: new Date().toISOString(),
        id: "2",
        text: "Aufräumen",
        complete: true,
      },
    ],
  });

  expect(screen.getByText(/1 Todos/i));

  expect(screen.queryByText(/Tests schreiben/i)).toBeNull();
  expect(screen.getByText(/Aufräumen/i));
});
