import { page } from '$app/stores';
import type { EquipmentRef, EquipmentType, EquipmentSlot, Equipment } from '@/types/equipment';
import { get } from 'svelte/store';
import app from '@/app.svelte';
import type { Character, CharacterRef } from '@/types/character';
import EQUIPMENT from '@/constants/EQUIPMENT';
import CHARACTERS from '@/constants/CHARACTERS';
import { calculateCombatStatsByCharacter } from '@/ts/utils';

export const correctHealth = (characterRef: Required<CharacterRef>, prevMax?: number) => {
  const character = CHARACTERS(characterRef, true);
  const combatStats = calculateCombatStatsByCharacter(character);

  // Case 1: new current health is more than new max health, damage to 100%
  // Case 2: previous max health is equal to current health, keep it full
  // Case 3: no previous max health provided, assume full health (eg. level up / recruit)
  if (
    combatStats.maxHealth <= character.combatStats.currentHealth ||
    prevMax === character.combatStats.currentHealth ||
    prevMax === undefined
  ) {
    characterRef.overrides.combatStats.currentHealth = combatStats.maxHealth;
  }

  return characterRef;
};

const decideEquipmentSlot = (slotsIn: EquipmentType, character: Character) => {
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

export const dismantle = (itemRef: EquipmentRef) => {
  const index = app.inventory.findIndex(({ uuid }) => uuid === itemRef.uuid);
  if (index === -1) return;
  app.inventory.splice(index, 1);
};

export const equip = (equipmentRef: EquipmentRef) => {
  const characterIndex = Number(get(page)?.params.characterIndex) || 0;
  if (characterIndex === undefined) return;

  const equipment = EQUIPMENT(equipmentRef, true);

  const characterRef = app.characters[characterIndex];
  const character = CHARACTERS(characterRef, true);
  let slotsIn = decideEquipmentSlot(equipment.slotsIn, character);
  const slot = character.equipment[slotsIn];
  const mainHand = character.equipment.mainHand
    ? EQUIPMENT(character.equipment.mainHand, true)
    : ({} as Equipment);

  const index = app.inventory.findIndex((item) => item === equipmentRef);
  // Remove item from inventory (equipment)
  app.inventory.splice(index, 1);

  // If something is already in the slot, push it to inventory
  if (slot !== null) {
    app.inventory.push(slot);
  }

  // If two handed weapon is being equipped, check if offHand needs to go to inventory
  if (equipment.slotsIn === 'twoHand' && character.equipment.offHand) {
    app.inventory.push(character.equipment.offHand);
    characterRef.overrides.equipment.offHand = null;
  }

  // If oneHanded weapon is being equipped, check if mainHand is two hand (thus need to go to inventory)
  if (
    (slotsIn === 'mainHand' || slotsIn === 'offHand') &&
    equipment.slotsIn !== 'twoHand' &&
    mainHand?.slotsIn === 'twoHand' &&
    character.equipment.mainHand !== null
  ) {
    app.inventory.push(character.equipment.mainHand);
    characterRef.overrides.equipment.mainHand = null;

    if (equipment.slotsIn !== 'offHand') slotsIn = 'mainHand';
  }

  // Replace whatever is in the slot
  characterRef.overrides.equipment[slotsIn] = equipmentRef;

  correctHealth(characterRef, calculateCombatStatsByCharacter(character).maxHealth);
};

export const unequip = (equipmentRef: EquipmentRef, slot: EquipmentSlot) => {
  const characterIndex = Number(get(page)?.params.characterIndex);
  if (characterIndex === undefined) return;

  const characterRef = app.characters[characterIndex];
  const character = CHARACTERS(characterRef, true);

  app.inventory.push(equipmentRef);
  characterRef.overrides.equipment[slot] = null;

  correctHealth(characterRef, calculateCombatStatsByCharacter(character).maxHealth);
};

export const slotsInPrettyName = (slotsIn: EquipmentType | string) =>
  ({
    twoHand: 'Two-Handed',
    oneHand: 'One-Handed',
    mainHand: 'Main-Hand',
    offHand: 'Off-Hand',
    accessory: 'Accessory',
    trinket: 'Trinket',
    armor: 'Armor'
  })[slotsIn];
