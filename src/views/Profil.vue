<template>
    <div class="main">
        PROFIL
    </div>
</template>


<script>
    export default {

        data(){
            return{
               
            }
        },

        methods:{

        }
    }
</script>

<style scoped>

    .main{

    }
    .formLog{
        position: fixed;
        top: 100px;
        left: 50%;
        width: 350px;
        padding: 20px;
        margin-left: -175px;
        background-color: white;

        box-shadow: 0px 0px 3px lightgrey;
        border-radius: 30px;
        /*background: #F7FBFF;*/
        /*box-shadow: 14px 14px 12px rgba(113, 162, 223, 0.1) ,*/
        /*-14px -14px 11px #ffffff;*/

    }

    input{
        width: 98% !important;
        border: none;
        border-radius: 30px;
        padding: 10px ;
        margin-top: 5px;
        box-shadow: 0px 0px 3px lightgrey;
    }
    .insiderForm{
        padding: 10px;
        margin: 10px 5px;
    }
    .neumorphism-1 {
        background: #dde1e7;
        /*background: #edf1f5;*/
        border-radius: 5px;
        box-shadow: -3px -3px 7px #ffffffb2, 3px 3px 5px rgba(94, 104, 121, 0.945);
    }
    .neumorphism-2 {
        background: #dde1e7;
        /*background: #edf1f5;*/
        border-radius: 5px;
        box-shadow: inset -3px -3px 7px #ffffffb0, inset 3px 3px 5px rgba(94, 104, 121, 0.692);
    }

</style>