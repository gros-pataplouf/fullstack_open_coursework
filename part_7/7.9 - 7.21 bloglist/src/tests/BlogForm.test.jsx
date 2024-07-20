import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import BlogForm from "../components/BlogForm";

const user = userEvent.setup();

const blog = {
  author: "TESTAUTHOR",
  title: "TESTTITLE",
  url: "http://test.com",
};

test("the form calls the event handler with the right details when a new blog is created.", async () => {
  const mockHandler = jest.fn();
  render(<BlogForm addBlog={mockHandler} />);
  expect(screen.getByTestId("create-button")).toBeInTheDocument();
  await user.click(screen.getByTestId("author-input"));
  await user.paste(blog.author);
  await user.click(screen.getByTestId("title-input"));
  await user.paste(blog.title);
  await user.click(screen.getByTestId("url-input"));
  await user.paste(blog.url);
  await user.click(screen.getByTestId("create-button"));
  expect(mockHandler.mock.calls[0][0]).toEqual(blog);
});
