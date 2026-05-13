import EQUIPMENT from '/js/constants/EQUIPMENT.js';
import CHARACTERS from '/js/constants/CHARACTERS.js';
import { calculateCombatStatsByCharacter } from '/js/utils.js';

export const correctHealth = (characterRef, prevMax) => {
  const character = CHARACTERS(characterRef, true);
  const combatStats = calculateCombatStatsByCharacter(character);

  if (
    combatStats.maxHealth <= character.combatStats.currentHealth ||
    prevMax === character.combatStats.currentHealth ||
    prevMax === undefined
  ) {
    characterRef.overrides.combatStats.currentHealth = combatStats.maxHealth;
  }

  return characterRef;
};

const decideEquipmentSlot = (slotsIn, character) => {
  if (slotsIn === 'oneHand') {
    const mainHand = character.equipment.mainHand;
    const offHand = character.equipment.offHand;

    if (!mainHand) {
      slotsIn = 'mainHand';
    } else if (!offHand) {
      slotsIn = 'offHand';
    } else {
      slotsIn = 'mainHand';
    }
  }

  if (slotsIn === 'twoHand') {
    slotsIn = 'mainHand';
  }

  return slotsIn;
};

export const dismantle = (itemRef) => {
  const index = $.inventory.findIndex(({ uuid }) => uuid === itemRef.uuid);
  if (index === -1) return;
  $.inventory.splice(index, 1);
  $.inventory = [...$.inventory];
};

export const equip = (equipmentRef) => {
  const characterIndex = Number($.page.params.characterIndex) || 0;
  if (characterIndex === undefined) return;

  const equipment = EQUIPMENT(equipmentRef, true);

  const characterRef = $.characters[characterIndex];
  const character = CHARACTERS(characterRef, true);
  let slotsIn = decideEquipmentSlot(equipment.slotsIn, character);
  const slot = character.equipment[slotsIn];
  const mainHand = character.equipment.mainHand
    ? EQUIPMENT(character.equipment.mainHand, true)
    : {};

  const index = $.inventory.findIndex((item) => item === equipmentRef);
  $.inventory.splice(index, 1);

  if (slot !== null) {
    $.inventory.push(slot);
  }

  if (equipment.slotsIn === 'twoHand' && character.equipment.offHand) {
    $.inventory.push(character.equipment.offHand);
    characterRef.overrides.equipment.offHand = null;
  }

  if (
    (slotsIn === 'mainHand' || slotsIn === 'offHand') &&
    equipment.slotsIn !== 'twoHand' &&
    mainHand?.slotsIn === 'twoHand' &&
    character.equipment.mainHand !== null
  ) {
    $.inventory.push(character.equipment.mainHand);
    characterRef.overrides.equipment.mainHand = null;

    if (equipment.slotsIn !== 'offHand') slotsIn = 'mainHand';
  }

  characterRef.overrides.equipment[slotsIn] = equipmentRef;

  correctHealth(characterRef, calculateCombatStatsByCharacter(character).maxHealth);

  // Fresh array references so Vibe's afterUpdate sees the change and
  // recomputes derived state (BrawlerDetailContent's setupCharacter, the
  // Armory's <!-- each inventory -->, etc.).
  $.characters = [...$.characters];
  $.inventory = [...$.inventory];
};

export const unequip = (equipmentRef, slot) => {
  const characterIndex = Number($.page.params.characterIndex);
  if (characterIndex === undefined) return;

  const characterRef = $.characters[characterIndex];
  const character = CHARACTERS(characterRef, true);

  $.inventory.push(equipmentRef);
  characterRef.overrides.equipment[slot] = null;

  correctHealth(characterRef, calculateCombatStatsByCharacter(character).maxHealth);

  $.characters = [...$.characters];
  $.inventory = [...$.inventory];
};

export const slotsInPrettyName = (slotsIn) =>
  ({
    twoHand: 'Two-Handed',
    oneHand: 'One-Handed',
    mainHand: 'Main-Hand',
    offHand: 'Off-Hand',
    accessory: 'Accessory',
    trinket: 'Trinket',
    armor: 'Armor',
  })[slotsIn];
