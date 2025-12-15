<script lang="ts">
  import CHARACTERS from '@/constants/CHARACTERS';
  import { calculateCombatStatsByCharacter } from '@/ts/utils';

  let { IS_DEV } = ENV;
  IS_DEV = false;

  const MINUTES_TO_REFILL = 2;
  const SECONDS_TO_REFILL = 9;

  let timeToRefill = $state((IS_DEV ? SECONDS_TO_REFILL : MINUTES_TO_REFILL * 60) * 1000);

  const getMinuteDelayUntilNextRefill = () => {
    const now = new Date(app.serverTimestampSnapshot);
    const minutes = now.getMinutes();

    const nextMarkMinute = minutes + (MINUTES_TO_REFILL - (minutes % MINUTES_TO_REFILL));
    const nextMark = new Date(now);
    nextMark.setMinutes(nextMarkMinute, 0, 0);

    return nextMark;
  };

  const getSecondDelayUntilNextRefill = () => {
    const now = new Date(app.serverTimestampSnapshot);
    const seconds = now.getSeconds();

    const nextMarkSecond = seconds + (SECONDS_TO_REFILL - (seconds % SECONDS_TO_REFILL));
    const nextMark = new Date(now);
    nextMark.setSeconds(nextMarkSecond, 0);

    return nextMark;
  };

  $effect(() => {
    if (!app.serverTimestamp) return;
    const nextMark = IS_DEV ? getSecondDelayUntilNextRefill() : getMinuteDelayUntilNextRefill();
    timeToRefill = nextMark.getTime() - app.serverTimestamp;

    if (timeToRefill < 0) {
      app.characters.forEach((character) => {
        const { currentHealth, maxHealth } = calculateCombatStatsByCharacter(
          CHARACTERS(character, true)
        );
        const heal = Math.ceil(maxHealth * 0.33);
        character.overrides.combatStats.currentHealth = Math.min(currentHealth + heal, maxHealth);
      });

      app.serverTimestampSnapshot = app.serverTimestamp;
      app.syncPerformanceNow = performance.now();
    }
  });

  let fullTime = (IS_DEV ? SECONDS_TO_REFILL : MINUTES_TO_REFILL * 60) * 1000;
</script>

<Bar
  class="bg-gray-600"
  current={fullTime - timeToRefill}
  max={fullTime}
  isTime
  center
  isLoading={!app.serverTimestamp}
/>
