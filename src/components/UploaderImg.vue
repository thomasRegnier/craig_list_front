<template>
  <div style="padding-top: 20px">
    <label>Ajouter des images</label>
    <div style="display: flex">
      <div v-if="!imgLoading" class="image-upload" style="position: relative">
        <label class="upldImg" for="file-input">
          <div
            style="
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
            "
          >
            <i style="font-size: 200%" class="bx bx-upload"></i>

            <article>Ajouter une image</article>
          </div>
        </label>
        <div style="position: relative">
          <span
            @click="removePreview"
            style="
              position: absolute;
              color: tomato;
              padding: 4px 8px;
              border-radius: 4px;
              background: white;
              box-shadow: 0px 0px 5px lightgrey;
              right: 0px;
            "
          >
            <i style="cursor: pointer" class="fas fa-trash"></i>
          </span>
        </div>
        <input id="file-input" @change="onFile" type="file" accept="image/*" multiple/>
      </div>
      <div class="forImages" v-if="previewUrl">
        <div v-for="(img, index) in previewUrl" :key="index">
          <img :src="img" />
          <i style="color: tomato"
           class='bx bx-x-circle'
           @click="removePreview(index)"
           ></i>
        </div>
      </div>
    </div>
    <div v-if="imgLoading">
      <MiniLoading />
    </div>
  </div>
</template>

<script>
import MiniLoading from "../components/MiniLoading";
export default {
  components: {
    MiniLoading,
  },
  data() {
    return {
      imgLoading: false,
      previewUrl: [],
      files: [],
      form: {
        image: "",
      },
    };
  },
  methods: {
    onFile() {
      const file = event.target.files[0];
      if (!file) {
        return false;
      }
      if (!file.type.match("image.*")) {
        return false;
      }
      const reader = new FileReader();

      let vm = this;
      reader.onload = (e) => {
        vm.previewUrl.push(e.target.result);
        // vm.news.image = e.target.result;
      };

      reader.readAsDataURL(file);

        console.log(file)
      // Initial FormData
      this.files.push(file)
      this.$emit('action', this.files)

    //  const formData = new FormData();
    //  formData.append("file", file);

    },
    removePreview(index) {
        this.previewUrl.splice(index, 1)
        this.$emit('delete',index)
    },
  },
};
</script>

<style scoped>
.image-upload > input {
  display: none;
}

.forImages img {
  width: 60px;
  height: 60px;
  margin-left: 10px;
  margin-bottom: 10px;
  border-radius: 5px;

  cursor: pointer;
  object-fit: cover;
}

.upldImg {
  width: 350px;
  height: 200px;
  background-color: #f4f7f8;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px dashed #898989;
  cursor: pointer;
  color: grey;
  position: relative;
}

.forImages {
  padding-left: 20px;
  display: flex;
  flex-wrap: wrap;
}
</style>