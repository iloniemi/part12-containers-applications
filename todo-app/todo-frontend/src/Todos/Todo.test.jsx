import { render, screen } from "@testing-library/react";
import Todo from "./Todo";
import { expect } from "vitest";


test('renders content', () => {
    const todo = {
        _id: 'asdfasdfwefsdfsefsfsdf',
        text: "run tests",
        done: false,
    }

    render(<Todo todo={todo} onClickComplete={() => {}} onClickDelete={() => {}} />);

    const element = screen.getByText('run tests');
    expect(element).toBeDefined();
});