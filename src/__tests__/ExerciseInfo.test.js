import { render, screen, fireEvent } from '@testing-library/react';
import ExerciseInfo from '../components/ExerciseInfo';
import { BrowserRouter } from 'react-router-dom';

it('renders and allows users to try push-ups', () => {
    render(
        <BrowserRouter>
            <ExerciseInfo exerciseName={'pushups'} />
        </BrowserRouter>
    );
    const moreInfoButton = screen.getByText("More Info");
    expect(moreInfoButton).toBeInTheDocument();
    // screen.debug();

    fireEvent.click(moreInfoButton);
    // screen.debug();
    const description = screen.getByText("Push-Ups");
    const button = screen.getByText("Attempt Now!");
    expect(description).toBeInTheDocument();
    expect(button).toBeInTheDocument();
});

it('renders and locks users out of attempting the exercise', () => {
    render(
        <BrowserRouter>
            <ExerciseInfo exerciseName={'locked'} />
        </BrowserRouter>
    );
    const moreInfoButton = screen.getByText("More Info");
    expect(moreInfoButton).toBeInTheDocument();
    // screen.debug();

    fireEvent.click(moreInfoButton);
    // screen.debug();
    const description = screen.getByText("This Exercise is Locked");
    const button = screen.queryByText("Attempt Now!");
    expect(description).toBeInTheDocument();
    expect(button).toBeNull();
});