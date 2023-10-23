<template>
  <header class="header">
    <h1 class="header__title">Issgate Task</h1>

    <button @click="handleLogout" class="header__btn">Logout</button>
  </header>
</template>

<script setup>
import { useRouter } from "vue-router";
import { isUserLoggedIn } from "../router/utils";


const router = useRouter();
const isLoggedIn = isUserLoggedIn();
const removeLocalStorage = () => {
    localStorage.removeItem("userDataInfo");
    localStorage.removeItem("accessToken");
  };
const handleLogout = () => {
  if (isLoggedIn) {
    removeLocalStorage();
    router.push({ path: "/login" });
    }
};
</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  padding: 0 2vw;
  align-items: center;
  height: 100%;
  box-shadow: 0 4px 2px -2px #000;
}

.header__title,
.header__btn {
  font-weight: 700;
  user-select: none;
  -webkit-user-select: none; /*Safari*/
  -moz-user-select: none; /*Firefox*/
}

.header__btn {
  cursor: pointer;
}
</style>
