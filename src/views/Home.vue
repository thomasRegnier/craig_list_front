<template>
  <div>
    <!-- <Categories /> -->
    <Cities />
  </div>
</template>
<script>

  import { categories} from "../api/categories";
  import Categories from "./../components/Categories"
  import Cities from '../components/Cities'

export default {
    components:{
      Categories,
      Cities
    },
        computed:{
            active: {
                get(){
                    console.log(this.$route.name)
                    return this.$route.name
                },
            }
        }
    }
</script>


        