const audioFiles = [
  '/static/audio/Fire & Shimmer.wav',
  '/static/audio/Special Lootbox 13.wav',
  '/static/audio/Stinger - Ominous Timpani.wav',
  '/static/audio/Victory Stinger 1.wav',
  '/static/audio/abilities/cheesyTactics/Food Use - Buff Style 1.wav',
  '/static/audio/abilities/cheesyTactics/Food Use - Buff Style 2.wav',
  '/static/audio/abilities/demoralizingShout/Fantasy Game Buff (1).wav',
  '/static/audio/abilities/lacerate/SOW1 - Combo - Double Slash 1.wav',
  '/static/audio/ambient/Pure Desert Wind.wav',
  '/static/audio/ambient/Summer Day In Nature.wav',
  '/static/audio/armor/Armor Layer (1).wav',
  '/static/audio/armor/Armor Layer (2).wav',
  '/static/audio/armor/Armor Layer (3).wav',
  '/static/audio/armor/Armor Layer (4).wav',
  '/static/audio/armor/Armor Layer (5).wav',
  '/static/audio/armor/Armor Layer (6).wav',
  '/static/audio/block/Axe Chop 1.wav',
  '/static/audio/block/Axe Chop 2.wav',
  '/static/audio/block/Axe Chop 3.wav',
  '/static/audio/block/Axe Chop 4.wav',
  '/static/audio/block/Axe Chop 5.wav',
  '/static/audio/block/Axe Chop 6.wav',
  '/static/audio/bow/Target Impact - Default (1).wav',
  '/static/audio/dodge/Swing Whoosh (1).wav',
  '/static/audio/dodge/Swing Whoosh (10).wav',
  '/static/audio/dodge/Swing Whoosh (2).wav',
  '/static/audio/dodge/Swing Whoosh (3).wav',
  '/static/audio/dodge/Swing Whoosh (4).wav',
  '/static/audio/dodge/Swing Whoosh (5).wav',
  '/static/audio/dodge/Swing Whoosh (6).wav',
  '/static/audio/dodge/Swing Whoosh (7).wav',
  '/static/audio/dodge/Swing Whoosh (8).wav',
  '/static/audio/dodge/Swing Whoosh (9).wav',
  '/static/audio/slam/Hammer Maul 1.wav',
  '/static/audio/slam/Hammer Maul 2.wav',
  '/static/audio/slam/Hammer Maul 3.wav',
  '/static/audio/slam/Hammer Maul 4.wav',
  '/static/audio/slam/Slap Style Layer (1).wav',
  '/static/audio/slam/Slap Style Layer (2).wav',
  '/static/audio/slam/Slap Style Layer (3).wav',
  '/static/audio/slash/Simple Cut 1.wav',
  '/static/audio/slash/Simple Cut 2.wav',
  '/static/audio/slash/Simple Cut 3.wav',
  '/static/audio/stab/Spear Stab 1.wav',
  '/static/audio/stab/Spear Stab 2.wav',
  '/static/audio/stab/Spear Stab 3.wav',
  '/static/audio/sword/swoosh.mp3',
];

export const AUDIO = {};

audioFiles.forEach(path => {
  const filename = path.split('/').pop().replace(/\.(wav|mp3)$/, '');
  AUDIO[filename] = path;
});

export default AUDIO;
