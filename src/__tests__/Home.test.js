import { checkUnlocked } from '../Home.js';

it('exercise unlocked base on cumulative calories burnt', () => {
    expect(checkUnlocked(49, 'situps')).toBe(false);
});
