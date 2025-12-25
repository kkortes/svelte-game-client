<script lang="ts">
  import { page } from '$app/stores';
  
  const {
    status,
    error
  } = $page;
</script>

<h1>{status}: {error?.message}</h1>
