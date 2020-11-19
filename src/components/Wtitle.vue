<template>
    <div id="mainWtitle">
        <span class="w-title">
            {{ title }}
        </span>
    </div>
</template>

<script>
    export default {
        name: 'Wtitle',
        props: {
            title: {
                required: true,
                type: String

            }
        }
    }
</script>

<style>

    #mainWtitle{
        padding-bottom: 40px;
    }

    .w-title{
        position: absolute;
        font-size: 150%;
        color: #7a7a7a;
/*         font-family: "Helvetica Neue";
        font-weight: lighter; */
        cursor: pointer;
        text-transform:capitalize;
    }

    .w-title:after{
        content: '';
        width: 60px;
        height: 3px;
        background-color: dodgerblue;
        display: block;
        transition: width 0.2s ease-in-out;
    }

    .w-title:hover:after{
        width: 100%;
    }

</style>