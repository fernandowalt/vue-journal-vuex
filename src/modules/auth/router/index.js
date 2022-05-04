export default {
  name: "auth",
  component: () =>
    import(
      /* webpackChunkName: "auth" */ "@/modules/auth/layouts/AuthLayout.vue"
    ),
  children: [
    {
      path: "",
      name: "login-1",
      component: () =>
        import(
          /* webpackChunkName: "login" */ "@/modules/auth/views/Login.vue"
        ),
    },
    {
      path: "/register",
      name: "register-1",
      component: () =>
        import(
          /* webpackChunkName: "registro" */ "@/modules/auth/views/Register.vue"
        ),
    },
  ],
};
