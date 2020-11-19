<template>
  <div>
    <MyNav />
    <MySide />
    <div :class="{ reduceMainer: windowWidth < 1000 }" class="mainer">
      <div :class="{ reduceMainer: windowWidth < 1000 }" class="outterHeader">
        <div :class="{ reduceMainer: windowWidth < 1000 }" class="header"></div>
      </div>
      <router-view />
    </div>
  </div>
</template>

<script>
import MyNav from "../../src/components/MyNav";
import MySide from "../../src/components/MySide";
export default {
  components: {
    MyNav,
    MySide,
  },
  data() {
    return {
      windowWidth: window.innerWidth,
    };
  },
  beforeMount() {
    console.log(this.windowWidth);
    window.addEventListener("resize", () => {
      this.windowWidth = window.innerWidth;
      console.log(this.windowWidth);
    });
  },
};
</script>


<style>
.mainer {
  overflow: hidden;
  width: calc(100vw - 320px);
  position: relative;
  top: 81px;
  left: 260px;
  transition: ease-in-out 0.3s;
  background: #f7fafc;
  min-height: calc(100vh - 81px);
  border-top-left-radius: 30px;
  padding: 30px;
  box-shadow: -3px -3px 7px #ffffffb2, 3px 3px 5px rgba(94, 104, 121, 0.945);
}

.outterHeader {
  width: calc(100vw - 260px);
  position: fixed;
  top: 81px;
  left: 260px;
  height: 30px;
  background: white;
}
.header {
  width: calc(100vw - 260px);
  position: fixed;
  top: 81px;
  left: 260px;
  height: 30px;
  border-top-left-radius: 30px;
  background: #f7fafc;
}

.reduceMainer {
  width: calc(100vw - 110px);
  left: 50px;
}
</style>
