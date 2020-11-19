<template>
  <div class="bread">
    <article @click="go(index)" class="brd" v-for="(brd, index) in bread" :key="index">
      <span v-if="index !== 4">
        {{ brd }}
        <span v-if="index !== bread.length - 1 && index != 3">/</span>
      </span>
    </article>
  </div>
</template>


<script>
export default {
  computed: {
    bread() {
      return Object.values(this.$route.params);
    },
  },
  methods: {

    go(pos) {
        if(pos == 3){
            return
        }
        let route = ''
        for(let i = 0; i <= pos; i++){
            route += i == pos ? this.bread[i] : this.bread[i]+'/'
        }

        this.$router.push({path: `/${route}`})  
    },

  },
};
</script>

<style scoped>
.bread {
  display: flex;
  padding: 10px;
}

.bread article {
  margin-right: 5px;
  cursor: pointer;
  transition: 0.1s ease;
  color: dodgerblue;
}

.brd:hover {
  text-decoration: underline;
}
</style>