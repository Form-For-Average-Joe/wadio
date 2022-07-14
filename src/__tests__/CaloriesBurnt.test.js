import { render, screen } from '@testing-library/react';
import CaloriesBurnt from '../components/CaloriesBurnt';

test('renders react component', () => {
    render(<CaloriesBurnt cal={1402} />);
    const currentCal = screen.getByText("1402");
    const requiredCal = screen.getByText("598")
    const caloriesBurntTest1 = {currentCal, requiredCal};
    expect(caloriesBurntTest1).toMatchSnapshot();
});

test('renders react component', () => {
    render(<CaloriesBurnt cal={0} />);
    const currentCal = screen.getByText("0");
    const requiredCal = screen.getByText("1000")
    const caloriesBurntTest2 = {currentCal, requiredCal};
    expect(caloriesBurntTest2).toMatchSnapshot();
});

test('renders react component', () => {
    render(<CaloriesBurnt cal={5882} />);
    const currentCal = screen.getByText("5882");
    const requiredCal = screen.getByText("0")
    const caloriesBurntTest3 = {currentCal, requiredCal};
    expect(caloriesBurntTest3).toMatchSnapshot();
});