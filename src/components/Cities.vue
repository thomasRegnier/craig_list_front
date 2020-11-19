<template>
    <div>
        <Wtitle title="Toutes nos villes" />
        <div style="padding-top: 20px">
            <span 
                style="margin: 5px" 
                v-for="(city, index) in cities" 
                :key="index"
                @click="$router.push({path: `/${city.slug}`})"
            >
                {{ city.name }}
            </span>
        </div>
    </div>
</template>

<script>

import { cities } from '../api/cities'
import Wtitle from '../components/Wtitle'
export default {
    components:{
        Wtitle
    },
    data(){
        return{
            cities: ''
        }
    },
    mounted(){
        cities.getCities()
        .then(response => {
            this.cities = response.data.cities
        })
    }
}
</script>

<style scoped>
span{
    cursor: pointer;
    transition: ease 0.2s;
}

span:hover{
    text-decoration: underline dodgerblue;
}
</style>