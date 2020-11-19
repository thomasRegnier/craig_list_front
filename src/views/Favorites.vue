<template>
  <div>
    <div style="padding: 20px 0px">
      <Wtitle title="Mes favoris" />
    </div>
    <div v-if="favoris && favoris.length > 0">
      <Offer
        v-for="(offer, index) in favoris"
        :offer="offer.offer"
        :key="index"
        @unlike="unLike"
      />
    </div>
    <div v-else>
        Aucun favoris pour le moment
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { offers } from "../api/offers";
import Wtitle from "../components/Wtitle";
import Offer from "../components/Offer";

export default {
  components: {
    Wtitle,
    Offer,
  },
  data() {
    return {
      favoris: "",
    };
  },
  computed: {
    ...mapGetters(["user", "favorites"]),

    ifFav(){
        console.log(this.favorites)
    }
  },
  mounted() {
    offers.getFavoris(this.user.token).then((response) => {
      console.log(response);
      this.favoris = response.data.favoris;
    });
  },
  methods:{
      unLike(id){
          console.log(id)
          this.favoris.splice(this.favoris.findIndex(elem => elem.offer_id === id ), 1)
      }
  }
};
</script>