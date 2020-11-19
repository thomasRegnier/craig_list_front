<template>
  <div>
    <!--     <Wtitle title="Categories" />-->
    <div class="scrollBlock">
      <div  @click="goToCat(cat)" class="myCard" v-for="(cat, index) in categories" :key="index">
        <div
          style="
            width: 200px;
            min-width: 200px;
            height: 120px;
            scroll-snap-align: center;
            border-radius: 20px;
            margin: 20px 0px 20px 20px;
            object-fit: cover;
            position: relative;
            cursor: pointer;
          "
          :style="{ background: 'url(' + cat.image + ')' }"
        >
          <div
            class="gradi"
            style="
              background: linear-gradient(
                133deg,
                rgba(0, 0, 0, 0.3743872549019608) 35%,
                rgba(0, 0, 0, 0.27914915966386555) 100%
              );
              width: 200px;
              min-width: 200px;
              height: 120px;
              border-radius: 20px;
              color: white;
            "
          >
            <span style="position: absolute; bottom: 5px; left: 15px">
              {{ cat.name }}</span
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { categories } from "../api/categories";
import Wtitle from "../components/Wtitle";
import { mapGetters , mapActions} from 'vuex'

export default {
  components: {
    Wtitle,
  },
  data() {
    return {
    //  categories: "",
    };
  },
    computed: {
    ...mapGetters(["categories"]),
  },
  methods:{
    goToCat(cat){
      console.log(cat);
      console.log(this.$route.params)
      this.$router.push( {path:`/${this.$route.params.city}/${cat.slug}`})
    }
  }
/*   beforeMount() {
    categories.getCategories().then((response) => {
      this.categories = response.data.categories;
    });
  }, */
};
</script>

<style scoped>
.scrollBlock {
  width: 100%;
  display: flex;
  overflow-x: scroll;
  overflow-y: hidden;
  scroll-snap-type: x mandatory;
}

.myCard {
  transition: ease-in-out 0.2s;
}
.myCard:hover {
  transform: scale(1.02);
}
</style>
