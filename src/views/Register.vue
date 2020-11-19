<template>
    <div>
        <div>
            <input v-model="user.name" type="text"/>
            <input v-model="user.email" type="email"/>
            <input v-model="user.password" type="password"/>
            <button @click="submit">
                envoyer
            </button>
        </div>
    </div>
</template>


<script>
    import axios from 'axios'
    export default {

        data(){
            return{
                user:{
                    name:'',
                    email: '',
                    password: ''
                }
            }
        },

        methods:{
            submit(){
                axios.post('http://127.0.0.1:8000/api/register', this.user)
                    .then(response => {
                        console.log(response)
                    })
                    .catch(error => {
                        console.log(error)
                    })
            }
        }
    }
</script>