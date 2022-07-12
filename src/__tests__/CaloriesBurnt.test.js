import { render, screen } from '@testing-library/react';
import CaloriesBurnt from '../components/CaloriesBurnt';

test('renders react component', () => {
    render(<CaloriesBurnt cal={1402} />);
    const currentCal = screen.getByText("1402.0");
    const requiredCal = screen.getByText("598")
    expect(currentCal).toBeInTheDocument();
    expect(requiredCal).toBeInTheDocument();
});

test('renders react component', () => {
    render(<CaloriesBurnt cal={0} />);
    const currentCal = screen.getByText("0");
    const requiredCal = screen.getByText("1000")
    expect(currentCal).toBeInTheDocument();
    expect(requiredCal).toBeInTheDocument();
});

test('renders react component', () => {
    render(<CaloriesBurnt cal={5882} />);
    const currentCal = screen.getByText("5882.0");
    const requiredCal = screen.getByText("0")
    expect(currentCal).toBeInTheDocument();
    expect(requiredCal).toBeInTheDocument();
});