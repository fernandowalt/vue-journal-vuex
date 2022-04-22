export default () => ({
  isLoading: true,
  entries: [
    {
      id: new Date().getTime(),
      date: new Date().toDateString(),
      text: "lorem lorem lorem",
      picture: null,
    },

    {
      id: new Date().getTime() + 100,
      date: new Date().toDateString(),
      text: "lorem lorem  +++lorem",
      picture: null,
    },
    {
      id: new Date().getTime() + 1000,
      date: new Date().toDateString(),
      text: "lorem lorem -----lorem",
      picture: null,
    },
  ],
});
