<script>
  import { page } from '$app/stores';

  $: ({
    status,
    error: { message }
  } = $page);
</script>

<h1>{status}: {message}</h1>
