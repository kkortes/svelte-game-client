<script lang="ts">
  let interval = setInterval(() => {});

  $effect(() => {
    interval = setInterval(() => {
      if (app.serverTimestampSnapshot)
        app.serverTimestamp =
          app.serverTimestampSnapshot + (performance.now() - app.syncPerformanceNow);
    }, 250);

    return () => clearInterval(interval);
  });
</script>
