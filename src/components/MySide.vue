<template>
  <div class="hidden">
    <vs-sidebar fixed open :reduce="windowWidth > 1000 ? false : true">
      <template #logo>
        <div
          id="loGo"
          style="font-size: 150%; display: flex; align-items: center"
        >
          <i class="bx bxs-dashboard"></i>
          <span id="nameS" v-if="windowWidth > 1000" style="margin-left: 5px"
            >Craig List</span
          >
        </div>
      </template>
      <div @click="$router.push({ path: '/' })" style="width: 100%">
        <vs-sidebar-item :class="{ active: $route.name === 'Home' }" id="/">
          <template #icon>
            <i class="bx bx-home"></i>
          </template>
          <span @click="$router.push({ path: '/' })"> Home </span>
        </vs-sidebar-item>
      </div>

      <vs-sidebar-group v-if="user">
        <template #header>
          <vs-sidebar-item arrow>
            <template #icon>
              <i class="bx bx-user"></i>
            </template>
            Mon compte
          </vs-sidebar-item>
        </template>

        <div style="width: 100%" @click="$router.push({ path: '/profil' })">
          <vs-sidebar-item
            :class="{ active: $route.name === 'Profil' }"
            id="profil"
          >
            <template #icon>
              <i class="bx bxs-user-circle"></i>
            </template>
            <span> Profil </span>
          </vs-sidebar-item>
        </div>

        <div style="width: 100%" @click="$router.push({ path: '/ads' })">
          <vs-sidebar-item :class="{ active: $route.name === 'Ads' }" id="ads">
            <template #icon>
              <i class="bx bx-list-check"></i>
            </template>
            <span> Mes annonces </span>
          </vs-sidebar-item>
        </div>

        <div style="width: 100%" @click="$router.push({ path: '/favorites' })">
          <vs-sidebar-item :class="{ active: $route.name === 'Favorites' }" id="favorites">
            <template #icon>
              <i class="bx bxs-heart"></i>
            </template>
            <span> Mes favoris </span>
          </vs-sidebar-item>
        </div>

        <div @click="$router.push({ path: '/annonce' })" style="width: 100%">
          <vs-sidebar-item
            :class="{ active: $route.name === 'Annonce' }"
            id="/"
          >
            <template #icon>
              <i class="bx bx-list-plus"></i>
            </template>
            <span @click="$router.push({ path: '/' })">
              Créer vôtre annonce
            </span>
          </vs-sidebar-item>
        </div>
      </vs-sidebar-group>

      <!--       <vs-sidebar-group>
        <template #header>
          <vs-sidebar-item arrow>
            <template #icon>
              <i class="bx bxs-dashboard"></i>
            </template>
            Categories
          </vs-sidebar-item>
        </template>

        <div
          v-for="(cat, index) in categories"
          :id="cat.name"
          :key="index"
          @click="$router.push({ path: `/categorie/${cat.slug}` })"
        >
          <vs-sidebar-item :class="{ active: $route.params.slug === cat.slug }">
            <template #icon>
            </template>
            {{ cat.slug }}
          </vs-sidebar-item>
        </div>
      </vs-sidebar-group>
 -->

      <vs-sidebar-group>
        <template #header>
          <vs-sidebar-item arrow>
            <template #icon>
              <i class="bx bxs-city"></i>
            </template>
            Villes
          </vs-sidebar-item>
        </template>

        <div
          v-for="(city, index) in cities"
          :key="index"
          @click="$router.push({ path: `/${city.slug}` })"
        >
          <vs-sidebar-item
            :class="{ active: $route.params.city === city.slug }"
          >
            <template #icon> </template>
            {{ city.name }}
          </vs-sidebar-item>
        </div>
      </vs-sidebar-group>

      <template
        v-if="
          $route.name === 'City' ||
          $route.name === 'Categorie' ||
          $route.name === 'Subcategorie' ||
          $route.name === 'Annonce'
        "
      >
        <div v-for="(cat, index) in categories" :key="index">
          <vs-sidebar-group>
            <template #header>
              <vs-sidebar-item
                :class="{ active: $route.params.categorie === cat.slug }"
                arrow
              >
                <template #icon>
                  <i :class="cat.icon"></i>
                </template>
                {{ cat.name }}
              </vs-sidebar-item>
            </template>
            <vs-sidebar-item
              v-for="(sub, index) in cat.sub_category"
              :key="index"
            >
              <template #icon> </template>
              <span
                @click="
                  $router.push({
                    path: `/${$route.params.city}/${cat.slug}/${sub.slug}`,
                  })
                "
              >
                {{ sub.name }}
              </span>
            </vs-sidebar-item>
          </vs-sidebar-group>
        </div>
      </template>

      <!--       </vs-sidebar-group>
    </div> -->
      <template #footer>
        <!--<vs-row justify="space-between">-->
        <!--<vs-avatar badge-color="danger" badge-position="top-right">-->
        <!--<i class='bx bx-bell' ></i>-->

        <!--<template #badge>-->
        <!--28-->
        <!--</template>-->
        <!--</vs-avatar>-->

        <!--<vs-avatar>-->
        <!--<img src="/avatars/avatar-5.png" alt="">-->
        <!--</vs-avatar>-->
        <!--</vs-row>-->
      </template>
    </vs-sidebar>
  </div>
</template>

<script>
import { categories } from "../api/categories";
import { mapGetters, mapActions } from "vuex";
import { cities } from "../api/cities";

export default {
  data() {
    return {
      categories: "",
      cities: "",
      windowWidth: window.innerWidth,
    };
  },
  beforeMount() {
    cities.getCities().then((response) => {
      this.cities = response.data.cities;
    });
    categories.getCategories().then((response) => {
      console.log(response.data);
      this.categories = response.data.categories;
    });

    console.log(this.windowWidth);
    window.addEventListener("resize", () => {
      this.windowWidth = window.innerWidth;
      console.log(this.windowWidth);
    });
  },
  computed: {
    ...mapGetters(["user"]),
    active: {
      get() {
        console.log(this.$route.name);
        return this.$route.name;
      },
    },
  },
};
</script>