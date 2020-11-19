<template>
  <div>
    <div style="padding: 20px 0px">
      <Wtitle title="Mes annonces" />
    </div>
    <div v-if="ads && ads.data.length > 0">
      <Offer @delete="deleteAds" :withCrud="true" v-for="(offer, index) in ads.data" :offer="offer" :key="index" />
    </div>

    <div v-else>Aucun offre pour le moment</div>

    <div style="padding-top: 50px" v-if="ads && ads.data.length > 0">
      <div class="center con-pagination">
        <vs-pagination v-model="ads.current_page" :length="ads.last_page" />
      </div>
    </div>
  </div>
</template>

<script>
import Wtitle from "../components/Wtitle";
import { offers } from "../api/offers";
import { mapGetters, mapActions } from "vuex";
import Offer from "../components/Offer";

export default {
  components: {
    Wtitle,
    Offer,
  },
  data() {
    return {
      ads: "",
    };
  },
  computed: {
    ...mapGetters(["user",'favoris']),
  },

  watch: {
    "ads.current_page": function (page) {
      offers.getMyOffers(this.user.token, page).then((response) => {
        console.log(response);
        this.ads = response.data.offers;
      });
    },
  },

  mounted() {
    offers.getMyOffers(this.user.token, 1).then((response) => {
      console.log(response);
      this.ads = response.data.offers;
    });
  },
  methods: {
    deleteAds(elem){
      console.log(elem)
      offers.deleteOffer(this.user.token, elem.id)
      .then(response => {
        console.log(response)

        this.ads.data.splice(this.ads.data.findIndex(el => el.id == elem.id), 1)
      })
    }
  },
};
</script>

<style>
</style>