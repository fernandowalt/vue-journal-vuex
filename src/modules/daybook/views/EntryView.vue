<template>
  <div class="entry-title d-flex justify-content-between">
    <div>
      <span class="text-success fs-3 fw-bold">15</span>
      <span class="mx-1 fs-3">julio</span>
      <span class="mx-2 fs-4 fw-light">2022</span>
    </div>

    <div>
      <button class="btn btn-danger mx-2 my-1">Borrar</button>
      <button class="btn btn-primary">Subir Foto</button>
    </div>
  </div>

  <hr />
  <div class="d-flex flex-column px-3 h-75">
    <textarea placeholder="Que sucedio hoy?"></textarea>
  </div>
  <Fab icon="fa-save" />
  <img
    class="img-thub"
    src="https://concepto.de/wp-content/uploads/2015/03/paisaje-2-e1549600987975.jpg"
    alt="entry-picture"
  />
</template>

<script>
import { defineAsyncComponent } from "vue";

export default {
  components: {
    Fab: defineAsyncComponent(() =>
      import("@/modules/daybook/components/Fab.vue")
    ),
  },
};
</script>
<style lang="scss" scoped>
textarea {
  font-size: 20px;
  border: none;
  height: 100%;

  &:focus {
    outline: none;
  }
}
img {
  width: 200px;
  position: fixed;
  bottom: 150px;
  right: 20px;
  box-shadow: 0px 5px 10px rgba($color: black, $alpha: 0.2);
}
</style>