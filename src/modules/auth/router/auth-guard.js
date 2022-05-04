import store from "@/store";

const isAuthenticatedGuard = async (to, from, next) => {
  const { ok } = await store.dispatch("auth/checkAuthentication");

  ok ? next() : next({ name: "login-1" });
};

export default isAuthenticatedGuard;