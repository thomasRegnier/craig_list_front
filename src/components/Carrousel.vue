<template>
  <div class="wrapper">
    <div class="container">
      <img
        class="imgFirst"
        :src="`http://127.0.0.1:8000/images/${imagesFirst}`"
      />
    </div>
    <div class="forLi">
      <div v-for="(img, index) in images" class="forImgLi" :key="index">
        <img
          class="imagesLi"
          @click="changeImg(img.url_path)"
          :src="`http://127.0.0.1:8000/images/${img.url_path}`"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    images: {},
  },
  data() {
    return {
      imagesFirst: "",
    };
  },
  mounted() {
    console.log(this.images);
    this.imagesFirst = this.images[0].url_path;
  },
  methods: {
    changeImg(img) {
      this.imagesFirst = img;
    },
  },
};
</script>


<style scoped>
.wrapper {
  display: flex;
}
.container {
  width: 585px;
  height: 383px;
}
.imgFirst {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 5px;
}

.forLi {
  margin-left: 10px;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  justify-items: flex-start;
  align-items: flex-start;
  align-content: flex-start;
  width: calc(100% - 595px);
}
.forImgLi {
  width: 80px;
  height: 40px;
  margin-right: 10px;
  margin-bottom: 10px;
  overflow: hidden;
}
.imagesLi {
  width: 100%;
  height: 100%;
  border-radius: 5px;
  object-fit: cover;
  cursor: pointer;
  transition: 0.3s ease-in;
}

.imagesLi:hover {
  box-shadow: 0px 0px 5px lightgray;
  transform: scale(1.1);
}
</style>