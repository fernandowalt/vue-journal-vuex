<template>
  <template v-if="entry">
    <div class="entry-title d-flex justify-content-between">
      <div>
        <span class="text-success fs-3 fw-bold">{{ day }}</span>
        <span class="mx-1 fs-3">{{ month }}</span>
        <span class="mx-2 fs-4 fw-light">{{ year }}</span>
      </div>

      <div>
        <input
          type="file"
          @change="onSelectedImage"
          ref="imageSelector"
          v-show="false"
          accept="image/png,image/jpeq"
        />
        <button
          v-if="entry.id"
          class="btn btn-danger mx-2 my-1"
          @click="onDeleteEntry"
        >
          Borrar
        </button>
        <button class="btn btn-primary" @click="onSelectImage">
          Subir Foto
        </button>
      </div>
    </div>

    <hr />
    <div class="d-flex flex-column px-3 h-75">
      <textarea placeholder="Que sucedio hoy?" v-model="entry.text"> </textarea>
    </div>
    <img
      v-if="entry.picture && !localImage"
      class="img-thub"
      :src="entry.picture"
      alt="entry-picture"
    />

    <img
      v-if="localImage"
      class="img-thub"
      :src="localImage"
      alt="entry-picture"
    />
  </template>

  <Fab icon="fa-save" @on:click="saveEntry" />
</template>


<script>
import { defineAsyncComponent } from "vue";
import { mapGetters, mapActions } from "vuex";
import Swal from "sweetalert2";

import getDayMonthYear from "../helpers/getDayMonthYear.js";
import uploadImage from "../helpers/uploadImage.js";

export default {
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  components: {
    Fab: defineAsyncComponent(() =>
      import("@/modules/daybook/components/Fab.vue")
    ),
  },
  data() {
    return {
      entry: null,
      localImage: null,
    };
  },
  computed: {
    ...mapGetters("journal", ["getEntriesById"]),

    day() {
      const { day } = getDayMonthYear(this.entry.date);

      return day;
    },

    month() {
      const { month } = getDayMonthYear(this.entry.date);

      return month;
    },

    year() {
      const { yearDay } = getDayMonthYear(this.entry.date);
      return yearDay;
    },
  },

  methods: {
    ...mapActions("journal", ["updateEntry", "createEntry", "deleteEntry"]),
    loadEntry() {
      let entry;
      if (this.id === "new") {
        entry = {
          text: "",
          date: new Date().getTime(),
        };
      } else {
        entry = this.getEntriesById(this.id);

        if (!entry) {
          return this.$router.push({ name: "no-entry" });
        }
      }
      this.entry = entry;
    },

    async saveEntry() {
      new Swal({ title: "espere por favor...", allowOutsideClick: true });

      Swal.showLoading();

      const picture = await uploadImage(this.localImage);
      console.log(picture);
      this.entry.picture = picture;
      console.log(this.entry);

      if (this.entry.id) {
        //actualizar
        this.updateEntry(this.entry).then((res) => {
          console.log(res);
        });
      } else {
        this.createEntry(this.entry).then((id) => {
          return this.$router.push({ name: "entry", params: { id: id } });
        });
      }
      this.localImage = null;
      Swal.fire("Guardado", "Entrada registrada con exito", "success");
    },

    async onDeleteEntry() {
      const { isConfirmed } = await Swal.fire({
        title: "¿Está seguro de eliminar esta nota?",
        showDenyButton: true,
        confirmButtonText: "Si, estoy seguro",
      });

      if (isConfirmed) {
        new Swal({
          title: "Espere por favor",
          allowOutsideClick: false,
        });
        Swal.showLoading();
        await this.deleteEntry(this.entry.id);
        Swal.fire("Eliminado", "", "success");
        return this.$router.push({ name: "no-entry" });
      }
    },
    onSelectedImage(event) {
      const file = event.target.files[0];

      if (!file) {
        this.localImage = null;
        this.file = null;
        return;
      }

      const fr = new FileReader();
      fr.readAsDataURL(file);
      fr.onload = () => (this.localImage = fr.result);
    },

    onSelectImage() {
      this.$refs.imageSelector.click();
    },
  },

  created() {
    this.loadEntry(this.id);
  },

  watch: {
    id() {
      this.loadEntry();
    },
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