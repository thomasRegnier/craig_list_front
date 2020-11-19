<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  computed: {
    ...mapGetters(["user"]),
  },
  beforeMount() {
    this.GET_CATEGORIES();
  },

/*   mounted() {
    if (this.user) {
      console.log(this.user);
      this.$router.push({path: `/${this.user.city_id}`})
    }
  }, */
  methods: {
    ...mapActions(["GET_CATEGORIES"]),
  },
};
</script>

<style lang="scss">
@import "assets/custom.css";
.error {
  color: tomato;
}

body {
  margin: 0;
  padding: 0;
  min-height: 100vh;
  /*background: #f9f9f9;*/
  /*background:  #F7FBFF;*/
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
