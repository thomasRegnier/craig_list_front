import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Profil from '../views/Profil.vue'
import Register from '../views/Register'
import Container from '../components/Container'
import Categorie from "../views/Categorie"
import City from '../views/City'
import store from '../store'
import AddAnnonce from '../views/AddAnnonce'
import Annonce from '../views/Annonce'
import Ads from '../views/Ads'
import Favorites from '../views/Favorites'

Vue.use(VueRouter)



function guardMyroute(to, from, next)
{
    console.log(store.state.user)
    let isAuthenticated= false;

    if(store.state.user && store.state.user.token){
        isAuthenticated = true;

    }
    else{
        isAuthenticated= false;
    }

    if(isAuthenticated) {
        next(); // allow to enter route
    }
    else
        {
        next('/'); // go to '/login';
    }
}

const routes = [
    {
        path: '/',
        name: 'Home',
    //    redirect: "/home",
        component: Container,
       // beforeEnter: guardMyroute,
        children: [
            {
                path: '/',
                name: 'Home',
                component: Home,
/*                 beforeEnter: (to, from, next) => {
                     console.log(store.state.user.token)
                    if(store.state.user.token && store.state.user.city_id){
                        console.log(store.state.user.city_id)
                        next(`/city/${store.state.user.city_id}`)
                    }else{
                        next()
                    }
                } */
            },
            {
                path: '/profil',
                name: 'Profil',
                component: Profil
            },
            {
                path: '/register',
                name: 'Register',
                component: Register
            },
            {
                path: '/annonce',
                name: 'Annonce',
                component: AddAnnonce,
                beforeEnter : guardMyroute,

            },
            {
                path: '/annonce/:id',
                name: 'Edit annonce',
                component: AddAnnonce,
                beforeEnter : guardMyroute,

            },
            {
                path: '/ads',
                name: 'Ads',
                component: Ads,
                beforeEnter : guardMyroute,

            },
            {
                path: '/favorites',
                name: 'Favorites',
                component: Favorites,
                beforeEnter : guardMyroute,

            },
            {
                path: '/:city',
                name: 'City',
                component: City
            },
            {
                path: '/:city/:categorie',
                name: 'Categorie',
                component: Categorie
            },
            {
                path: '/:city/:categorie/:subcategorie',
                name: 'Subcategorie',
                component: Categorie
            },
            {
                path: '/:city/:categorie/:subcategorie/:annonce/:id',
                name: 'Annonce',
                component: Annonce
            },

        ]
    }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
}
})


export default router
