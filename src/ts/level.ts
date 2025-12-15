import app from '@/app.svelte';

const SCALING = 1.6;
const MAX_LEVEL = 25;

export const getLevelByExperience = (experience: number) => {
  return Math.min(Math.floor(Math.pow(experience / 100, 1 / SCALING)) + 1, MAX_LEVEL);
};

export const getExperienceByLevel = (level: number) => {
  return Math.pow(level - 1, SCALING) * 100;
};

export const getExperienceForNextLevel = (currentLevel: number) => {
  const xpCurrentLevel = getExperienceByLevel(currentLevel);
  const xpNextLevel = getExperienceByLevel(currentLevel + 1);
  return Math.floor(xpNextLevel - xpCurrentLevel);
};

export const getCurrentExperienceAtLevel = (experience: number) => {
  const currentLevel = getLevelByExperience(experience);
  const xpForCurrentLevel = getExperienceByLevel(currentLevel);
  return Math.ceil(experience - xpForCurrentLevel);
};

export const allowedNumberOfCharacters = () => {
  return Math.floor(app.accountRewards / 5) + 1;
};

export const getExperienceRangeForLevel = (level: number) => {
  const minXp = getExperienceByLevel(level) + 1;
  let maxXp = getExperienceByLevel(level + 1);

  if (level + 1 > MAX_LEVEL) {
    maxXp = Infinity;
  }

  return { minXp: Math.floor(minXp), maxXp: Math.floor(maxXp) };
};

export const getExperienceReward = (
  numberOfEnemies: number,
  minLevel: number,
  maxLevel: number,
  boss: boolean
) => {
  return 40 * numberOfEnemies * (boss ? 10 : 1) + 40 * Math.ceil((minLevel + maxLevel) / 2) * 0.2;
};
