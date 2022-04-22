<template>
  <div
    @click="$router.push({ name: 'entry', params: { id: 10 } })"
    class="entry-container mb-3 pointer p-2"
  >
    <div class="entry-title d-flex">
      <span class="text-success fs-5 fw-bold">15</span>
      <span class="mx-1 fs-5">julio</span>
      <span class="mx-2 fw-light">2022</span>
    </div>

    <div class="entry-description">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi aspernatur
      autem possimus fugit sed laudantium, dolorem architecto commodi aliquid
      sit repudiandae, ad error deserunt esse fuga obcaecati voluptate assumenda
      excepturi!
    </div>
  </div>
</template>

<script>
export default {
  name: "entry-list",
};
</script>

<style lang="scss" scoped>
.entry-container {
  border-bottom: 1px solid #2c3e50;
  transition: 0.2s all ease-in;

  &:hover {
    background-color: lighten($color: grey, $amount: 45);
  }
}
.entry-description {
  font-size: 12px;
}
</style>