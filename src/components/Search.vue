<template>
  <div style="padding-right: 20px; postion: relative">
    <vs-input
      color="#195BFF"
      type="email"
      label-placeholder="Rechercher"
      v-model="search"
      @keyup="research"
      @blur="blurInput"
      @focus="search.trim().length ? display = true :  display = false"
    >
      <template #icon>
        <i class="bx bx-search"></i>
      </template>
    </vs-input>
    <ul v-if="display" class="ulRes">
      <template v-if="results && results.length">
        <li @click="goOffer(res)" v-for="(res, index) in results" :key="index">
          <img
            v-if="res.images && res.images[0]"
            :src="`http://127.0.0.1:8000/thumbnail/${res.images[0].url_path}`"
          />
          <img v-else src="/images/no.png" alt="" />
          <div style="padding-left: 5px">
            <article style="font-size: 90%">{{ res.title }}</article>
            <small style="font-style: italic; color: grey" v-if="res.city">{{
              res.city.name
            }}</small>
          </div>
        </li>
      </template>
      <li v-else>Aucun résultats</li>
    </ul>
  </div>
</template>

<script>
import { offers } from "../api/offers";
export default {
  data() {
    return {
      search: "",
      results: "",
      display: false
    };
  },
  methods: {
    research() {
      if (!this.search.trim().length) {
        return;
      }
      console.log(this.search);
      offers.search(this.search).then((response) => {
        console.log(response);
        this.results = response.data.annonces;
        this.display = true
      });
    },
    goOffer(offer) {
      this.$router.push({
        path: `/${offer.city.slug}/${offer.category.slug}/${offer.sub_category.slug}/${offer.slug}/${offer.id}`,
      });
    },
    blurInput(){
        setTimeout( () => {
            this.display = false
        }, 400)
    }
  },
};
</script>

<style>
.ulRes {
  width: 350px;
  position: absolute;
  background: white;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  margin: 0px;
  padding: 10px 0px;
}

.ulRes li {
  list-style: none;
  padding: 0px 5px;
  display: flex;
  margin-top: 5px;
  cursor: pointer;
}
.ulRes li:hover article {
  text-decoration: underline;
}

img {
  width: 40px;
  height: 40px;
  object-fit: cover;
}
</style>