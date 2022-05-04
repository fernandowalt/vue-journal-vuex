<template>
  <h1 v-if="authStatus === 'authenticating'">{{ authStatus }}</h1>
  <router-view v-else />
</template>

<script>
import useAuth from "./modules/auth/composible/useAuth";

export default {
  setup() {
    const { checkAuthStatus, authStatus } = useAuth();

    checkAuthStatus();

    return {
      authStatus,
    };
  },
};
</script>
