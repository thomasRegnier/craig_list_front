<template>
  <div>
    <div style="display: flex">
      <Wtitle :title="$route.params.city + ' - ' + $route.params.categorie" />
    </div>

    <BreadCrumb />
    <div style="padding-top: 20px">
      <button
        class="subButt"
        v-for="(ca, index) in cat.sub_category"
        :key="index"
        @click="goSub(ca)"
        :class="{
          activeSub:
            $route.params.subcategorie &&
            $route.params.subcategorie === ca.slug,
        }"
      >
        {{ ca.name }}
      </button>
    </div>
    <div style="padding-top: 20px" v-if="offers && offers.data.length > 0">
      <Offer
        v-for="(offer, index) in offers.data"
        :offer="offer"
        :key="index"
      />
    </div>
    <div style="padding-top: 20px" v-else>Aucune annonce</div>
    <div style="padding-top: 50px" v-if="offers && offers.data.length > 0">
      <div class="center con-pagination">
        <vs-pagination
          v-model="offers.current_page"
          :length="offers.last_page"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Wtitle from "../components/Wtitle";
import BreadCrumb from "../components/BreadCrumb";

import { categories } from "../api/categories";
import Offer from "../components/Offer";
import { subcategories } from "../api/subcategories";
export default {
  components: {
    Wtitle,
    Offer,
    BreadCrumb,
  },
  data() {
    return {
      offers: "",
      cat: "",
    };
  },
  mounted() {
    console.log("mounted");
    if (this.$route.params.subcategorie) {
      subcategories
        .getSubCategorie(
          this.$route.params.city,
          this.$route.params.categorie,
          this.$route.params.subcategorie
        )
        .then((response) => {
          console.log(response);
          this.offers = response.data;
        });
    }
    categories
      .getCategorie(this.$route.params.city, this.$route.params.categorie, 1)
      .then((response) => {
        this.offers = response.data;
      });
    categories.getOneCat(this.$route.params.categorie).then((response) => {
      this.cat = response.data;
    });
  },
  watch: {
    "$route.params.subcategorie": function (subcategorie) {
      console.log(subcategorie);
      subcategories
        .getSubCategorie(
          this.$route.params.city,
          this.$route.params.categorie,
          this.$route.params.subcategorie
        )
        .then((response) => {
          console.log(response);
          this.offers = response.data;
        });
    },
    "offers.current_page": function (page) {
      if (this.$route.params.subcategorie != null) {
        console.log("test");
        subcategories
          .getSubCategorie(
            this.$route.params.city,
            this.$route.params.categorie,
            this.$route.params.categorie,
            page
          )
          .then((response) => {
            console.log(response.data);
            this.offers = response.data;
          });
      } else {
        console.log("test sub");
        categories
          .getCategorie(
            this.$route.params.city,
            this.$route.params.categorie,
            page
          )
          .then((response) => {
            this.offers = response.data;
          });
      }
    },
  },
  methods: {
    goSub(slug) {
      this.$router.push({
        path: `/${this.$route.params.city}/${this.$route.params.categorie}/${slug.slug}`,
      });

      subcategories
        .getSubCategorie(
          this.$route.params.city,
          this.$route.params.categorie,
          slug.slug
        )
        .then((response) => {
          console.log(response.data);
          this.offers = response.data;
        });
    },
  },
};
</script>

<style scoped>
.subButt {
  margin-right: 10px;
  background: white;
  color: grey;
  border: none;
  box-shadow: 0px 0px 5px lightgrey;
  padding: 5px 15px;
  font-size: 100%;
  border-radius: 6px;
  transition: ease 0.3s;
}

.subButt:hover {
  background: dodgerblue;
  color: white;
}

.activeSub {
  background: dodgerblue;
  color: white;
}
</style>