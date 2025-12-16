<script lang="ts">
  const logout = () => {
    document.cookie = 'token=; path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT;';
    app.token = undefined;
    app.overlay = '';
    window.location.href = '/';
  };
</script>

<Button primary onclick={logout}>Log out</Button>
