import { getCaloriesBurnt } from '../util.js';

it('calories burnt for 60 pushups in 60s at hellish difficulty, female 25yo 60kg', () => {
  expect(getCaloriesBurnt(60, 60, 'pushups', 0, '1', 25, 60)).toBe("42.3");
});

it('calories burnt for 30 situps in 30s at IPPT difficulty, male 35yo 80kg', () => {
  expect(getCaloriesBurnt(30, 30, 'pushups', 1, '0', 35, 80)).toBe("18.2");
});

it('calories burnt for 60 bicepcurls in 100s at heavenly difficulty, female 45yo 50kg', () => {
  expect(getCaloriesBurnt(60, 100, 'bicepcurls', 2, '1', 45, 50)).toBe("23.3");
});