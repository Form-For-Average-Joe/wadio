import {render, screen} from '@testing-library/react';
import BodyStatsPanel from '../containers/BodyStatsPanel';

test('renders react component', () => {
  render(<BodyStatsPanel stats={{ weight: 55, height: 170 }} />);
  const divElement = screen.getByText("19.03");
  expect(divElement).toBeInTheDocument();
});