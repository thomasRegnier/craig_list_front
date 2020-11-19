<template>
  <div>
    <div v-if="city">
      <Wtitle :title="city.name" />

      <Categories />

      <div style="padding: 20px 0px">
        <Wtitle title="Toutes les annonces" />
      </div>

      <div v-if="cityOffers && cityOffers.data.length > 0">
        <Offer
          v-for="(offer, index) in cityOffers.data"
          :offer="offer"
          :key="index"
          @hide="hiden"
        />
      </div>

      <div v-else>Aucun offre pour le moment</div>

      <div
        style="padding-top: 50px"
        v-if="cityOffers && cityOffers.data.length > 0"
      >
        <div class="center con-pagination">
          <vs-pagination
            v-model="cityOffers.current_page"
            :length="cityOffers.last_page"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { cities } from "../api/cities";
import Wtitle from "../components/Wtitle";
import Categories from "../components/Categories";
import { mapGetters, mapActions } from "vuex";
import { offers } from "../api/offers";
import axios from "axios";
import Offer from "../components/Offer";

export default {
  components: {
    Wtitle,
    Categories,
    Offer,
  },
  data() {
    return {
      city: "",
      cityOffers: "",
    };
  },
  computed: {
    ...mapGetters(["categories"]),
  },
  beforeMount() {
    cities.getCity(this.$route.params.city).then((response) => {
      this.city = response.data[0];
    });

    offers.getOffers(this.$route.params.city, 1).then((response) => {
      console.log(response);
      this.cityOffers = response.data.offers;
    });
  },

  watch: {
    "$route.params.city": function (city) {
      console.log(city);
      this.city = "";
      cities.getCity(this.$route.params.city).then((response) => {
        this.city = response.data[0];
      });
      offers.getOffers(this.$route.params.city, 1).then((response) => {
        this.cityOffers = response.data.offers;
        console.log(this.cityOffers);
      });
    },
    "cityOffers.current_page": function (page) {
      offers.getOffers(this.$route.params.city, page).then((response) => {
        this.cityOffers = response.data.offers;
      });
    },
  },
  methods: {
    hiden(id) {
      this.cityOffers.data.splice(
        this.cityOffers.data.findIndex(elem => elem.id === id),1 );
    },
  },
};
</script>

<style  scoped>
.parent {
  display: flex;
  flex-wrap: wrap;
  padding-top: 30px;
}
.categories {
  width: 30%;
  margin: 1.5%;
}
.title {
  background: dodgerblue;
  text-align: center;
  color: white;
}

.forOffers {
  display: flex;
  flex-wrap: wrap;
}

.vs-card__text {
  width: 100% !important;
}
</style>