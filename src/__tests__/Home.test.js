import { checkUnlocked } from '../Home.js';

it('exercise unlocked base on cumulative calories burnt', () => {
    expect(checkUnlocked(49, 'situps')).toBe(false);
});

it('exercise unlocked base on cumulative calories burnt', () => {
    expect(checkUnlocked(50, 'situps')).toBe(true);
});

it('exercise unlocked base on cumulative calories burnt', () => {
    expect(checkUnlocked(0, 'pushups')).toBe(true);
});