<template>
<!-- v-if="!hidens.find(elem => elem.offer_id === offer.id)" -->
  <div class="annonce">
    <div @click="goOffer" style="width: 240px; height: 160px">
      <img
        v-if="offer.images && offer.images[0]"
        :src="`http://127.0.0.1:8000/thumbnail/${offer.images[0].url_path}`"
      />
      <img v-else src="/images/no.png" alt="" />
    </div>

    <div class="right">
      <div
        style="
          display: flex;
          align-items: center;
          justify-content: space-between;
        "
      >
        <div style="font-weight: bold">
          {{ offer.title }}
        </div>

        <div v-if="user && user.id != offer.user_id">
          <div v-if="!withCrud" style="display: flex; align-items: center">
           <i v-if="favorites.find(elem => elem.offer_id === offer.id)"
              class='bx bxs-heart'
              style="color: tomato; font-size: 20px; margin-right: 10px; cursor: pointer !important"
              @click="unlike(offer.id)"
               >
              </i>

            <i
            v-else
            @click="toFav(offer.id)"
              style="color: tomato; font-size: 20px; margin-right: 10px; cursor: pointer"
              class="bx bx-heart cursor"
            ></i>
            <i
              @click="hide(offer.id)"
              style="font-size: 20px; color: grey; cursor: pointer !important"
              class="bx bxs-hide cursor"
            ></i>
          </div>
        </div>

        <div v-if="withCrud" style="display: flex; align-items: center">
          <i
            style="
              font-size: 20px;
              color: dodgerblue;
              margin-right: 10px;
              cursor: pointer;
            "
            class="bx bxs-pencil cursor"
            @click="$router.push({ path: `annonce/${offer.id}` })"
          ></i>

          <i
            @click="deleteAds(offer)"
            style="color: tomato; font-size: 20px; cursor: pointer"
            class="bx bx-trash cursor"
          ></i>
        </div>
      </div>
      <span
        v-if="offer.category"
        :style="{ background: offer.category.color }"
        style="
          color: white;
          font-size: 70%;
          padding: 0px 4px;
          border-radius: 16px;
        "
      >
        <i :class="offer.category.icon"></i>
        {{ offer.category.name }}/
        <span class="span"> {{ offer.sub_category.name }} </span>
      </span>
      <div class="insideRight">
        <div style="display: flex; flex-direction: column">
          <div style="" v-if="offer.description">
            {{
              offer.description.length > 80
                ? offer.description.substring(0, 80) + "..."
                : offer.description
            }}
          </div>
          <div v-else>Aucune description</div>
        </div>
        <div style="font-style: italic; color: grey; text-align: right">
          {{ moment(offer.created_at).calendar() }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import {offers} from '../api/offers'
export default {
  props: {
    offer: {},
    withCrud: { default: false },
  },
  computed: {
    ...mapGetters(["user",'favorites','hidens']),
  },
  methods: {
    ...mapActions(['PUSH_TO','DELETE_TO','PUSH_TO_HIDENS','DELETE_TO_HIDENS']),
    goOffer() {
      console.log(this.offer);
      this.$router.push({
        path: `/${this.offer.city.slug}/${this.offer.category.slug}/${this.offer.sub_category.slug}/${this.offer.slug}/${this.offer.id}`,
      });
      //  this.$router.push({path: `${this.offer.city.slug}/${this.offer.category.slug}/${this.offer.sub_category.slug}/${this.offer.title}`})
    },
    deleteAds(ads) {
      this.$emit("delete", ads);
    },
    toFav(id){
      console.log(id)
      offers.addToFavorites(this.user.token, id)
      .then(response => {
        console.log(response.data.fav)
        this.PUSH_TO(response.data.fav)
      })
    },
    unlike(id){
      console.log(id)
      offers.removeToFavorites(this.user.token, id)
      .then(response => {
        this.DELETE_TO(id)
        this.$emit("unlike", id)
      })
    },
    hide(id){
      offers.addToHiden(this.user.token, id)
      .then(response => {
        this.PUSH_TO_HIDENS(response.data.fav)
        this.$emit('hide', id)
      })
    }
  },
};
</script>

<style scoped>
.annonce {
  display: flex;
  background: white;
  width: 700px;
/*   box-shadow: 0px 0px 5px lightgray;
 */    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
  margin-bottom: 20px;
  border-radius: 8px;
  overflow: hidden;
  transition: ease-in-out 0.3s;
}
.annonce img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  cursor: pointer;
}
.annonce:hover {
  box-shadow: 0px 0px 10px lightgray;
}

.right {
  padding: 20px;
  width: 100%;
}

.insideRight {
  display: flex;
  flex-direction: column;
  height: calc(100% - 40px);
  justify-content: space-between;
}

@media screen and (max-width: 1024px) {
  .annonce {
    width: 100%;
  }
}
</style>