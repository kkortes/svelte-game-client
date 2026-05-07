export default {
  isBleeding: {
    singleWord: 'bleed',
    icon: 'bleeding',
    text: 'BLEEDING',
    animation: 'animate-bounce',
  },
  isStunned: {
    singleWord: 'stun',
    icon: 'stunned',
    text: 'STUNNED',
    animation: 'animate-spin',
  },
  isVulnerable: {
    singleWord: 'vulnerable',
    icon: 'vulnerable',
    text: 'VULNERABLE',
    animation: 'animate-pulse',
  },
  isWounded: {
    singleWord: 'wound',
    icon: 'wounded',
    text: 'WOUNDED',
    convertsInto: 'isBleeding',
    animation: 'animate-pulse',
  },
  isConcussed: {
    singleWord: 'concussion',
    icon: 'concussed',
    text: 'CONCUSSED',
    convertsInto: 'isStunned',
    animation: 'animate-pulse',
  },
  isExposed: {
    singleWord: 'exposed',
    icon: 'exposed',
    text: 'EXPOSED',
    convertsInto: 'isVulnerable',
    animation: 'animate-pulse',
  },
};
