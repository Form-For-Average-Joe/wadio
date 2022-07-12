import {render, screen} from '@testing-library/react';
import BodyStatsPanel from '../containers/BodyStatsPanel';

test('renders react component', () => {
  render(<BodyStatsPanel stats={{ weight: 55, height: 170 }} />);
  const divElement = screen.getByText("19.03");
  expect(divElement).toBeInTheDocument();
});

test('renders react component', () => {
  render(<BodyStatsPanel stats={{ weight: 65, height: 175 }} />);
  const divElement = screen.getByText("21.22");
  expect(divElement).toBeInTheDocument();
});

test('renders react component', () => {
  render(<BodyStatsPanel stats={{ weight: 45, height: 160 }} />);
  const divElement = screen.getByText("17.58");
  expect(divElement).toBeInTheDocument();
});