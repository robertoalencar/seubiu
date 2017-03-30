<template>

<button @click="disparaAcao()"> Aprovar !</button>

</template>


<script>

    export default {
        methods : {
            disparaAcao(){
               this.$emit('showModal');
            }
        }

    }

</script>


<style>


</style>