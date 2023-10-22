<template>
  <div class="auth-wrapper">
    <div class="auth-inner">
      <h3>Welcome 👋🏻</h3>
      <form class="form" ref="loginForm" @submit.prevent="onSubmit">
        <div class="form-row">
          <label class="form-lable" for="email">Email</label>
          <input
            required
            class="form-input"
            placeholder="yourname@example"
            id="email"
            v-model="email"
            type="email"
            @input="errorMessage = ''"
          />
        </div>

        <div class="form-row">
          <label class="form-lable" for="password">Password</label>
          <input
            required
            class="form-input"
            id="password"
            v-model="password"
            type="password"
            @input="errorMessage = ''"
          />
        </div>
        <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
        <button block class="mt-8 primary-button" type="submit">Login</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { isUserLoggedIn } from "../router/utils";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { Auth } from "../services";
const loginForm = ref(null);
const router = useRouter();

const email = ref("");
const password = ref("");
const isFormValid = ref(false);
const isLoggedIn = isUserLoggedIn();
const errorMessage = ref("");

onMounted(() => {
  if (isLoggedIn) {
    router.push({ name: "brand" });
  }
});

const onSubmit = () => {
  isFormValid.value = email.value && password.value;
  if (!!isFormValid.value) {
    Auth.login(email.value, password.value)
      .then((res) => {
        if (res.data.IsSuccess) {
          errorMessage.value = "";
          router.push({ name: "brand" });
        } else {
          errorMessage.value = res.data.Message;
        }
      })
      .catch((error) => {
        // the API return 200 status code at 404 so i cann't access to catch
      });
  }
};
</script>


<style scoped>
.auth-wrapper {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: center;

  background-size: 300% 300%;
  background-image: linear-gradient(
    -45deg,
    rgb(84, 106, 13) 0%,
    rgb(134, 134, 10) 25%,
    rgb(255, 111, 0) 51%,
    rgb(125, 160, 9) 100%
  );
  -webkit-animation: AnimateBG 15s ease infinite;
  animation: AnimateBG 15s ease infinite;
}

@-webkit-keyframes AnimateBG {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

@keyframes AnimateBG {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

.auth-inner,
.form {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.form {
  gap: 1.2rem;
  width: 25rem;
  background-color: rgb(224, 224, 251);
  padding: 2rem;
  border-radius: 0.5rem;
  box-shadow: 10px 10px 10px 10px #2928282c;
}

.form-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.form-lable,
.form-input {
  padding: 1rem;
  border-radius: 0.5rem;
  font-weight: 500;
  font-size: 0.8rem;
  border: none !important;
}

.form-lable {
  color: #000;
}
.form-input {
  max-width: 100%;
  color: #fff;
}

@media screen and (max-width: 500px) {
  .form {
    width: 60vw;
  }
  .form-row {
    flex-direction: column;
  }
}
</style>

<route lang="yaml">
  meta:
    layout: blank
    action: read
    subject: Auth
    redirectIfLoggedIn: true
  </route>