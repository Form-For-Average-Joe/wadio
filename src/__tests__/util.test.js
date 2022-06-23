import { getCaloriesBurnt } from '../util.js';

it('calories burnt for 60 pushups in 60s at hellish difficulty, female 25yo 60kg', () => {
  expect(getCaloriesBurnt(60, 60, 'pushups', 0, '1', 25, 60)).toBe("42.3");
});
