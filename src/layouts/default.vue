<template>
  <div>
    <Header></Header>
    <router-view class="content"></router-view>
    <Footer></Footer>
  </div>
</template>

<script setup>
import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";


</script>

<style scoped>
</style>