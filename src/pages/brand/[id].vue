<template>
  <div class="content">
    <h1>Brand Details</h1>

    <div class="details" v-if="finishLoad">
      <img class="details-img" :src="brand.image" alt="Brand Image" />
      <ul class="details-list">
        <li class="details-list__row">
          <span class="details-list__row--key">Status:</span>
          <span
            :class="`details-list__row--value ${
              brand.isActive ? 'status-active' : 'status-inActive'
            }`"
            >{{ brand.isActive ? "Active" : "Inactive" }}</span
          >
        </li>
        <li class="details-list__row">
          <span class="details-list__row--key">Name (AR):</span>
          <span class="details-list__row--value">
            {{ brand.nameAR }}
          </span>
        </li>
        <li class="details-list__row">
          <span class="details-list__row--key">Name (EN):</span>
          <span class="details-list__row--value">
            {{ brand.nameEN }}
          </span>
        </li>
        <li class="details-list__row">
          <span class="details-list__row--key">Created At:</span>
          <span class="details-list__row--value">
            {{ formatDate(brand.createdAt) }}
          </span>
        </li>
        <li class="details-list__row">
          <span class="details-list__row--key">Updated At:</span>
          <span class="details-list__row--value">
            {{ formatDate(brand.updatedAt) }}
          </span>
        </li>
      </ul>
    </div>
  </div>
</template>
  
<script setup>
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { Brand } from "../../services";

const router = useRouter();
const brand = ref({});
const finishLoad = ref(false)
onMounted(() => {
  Brand.view(router.currentRoute.value.params?.id).then(async (res) => {
    let langENId;
    let langARId;
    await Brand.getLanguage().then((res) => {
      langENId = [...res.data.data].find((ele) => ele.name === "English").id;
      langARId = [...res.data.data].find((ele) => ele.name === "Arabic").id;
    });
    brand.value = res.data.data;

    const enIndex = await brand.value.nameByLang.findIndex((lang) => {
      return lang.langId === langENId;
    });
    const arIndex = await brand.value.nameByLang.findIndex((lang) => {
      return lang.langId === langARId;
    });
    brand.value.nameEN = brand.value.nameByLang[enIndex]?.value;
    brand.value.nameAR = brand.value.nameByLang[arIndex]?.value;

    finishLoad.value = true
  });
});

const formatDate = (onhandDate) => {
  let options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  };
  let date = new Date(onhandDate);
  return date.toLocaleDateString("en-US", options)
};
</script>

<style>
.content {
  min-height: calc(100vh - 90.88px - 75px);
}
</style>

<style scoped>
.details {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.details-img {
  max-width: 200px;
  border-radius: 0.5rem;
}

.details-list {
  width: 80%;
  margin-top: 4rem;
}

.details-list__row {
  list-style-type: none;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 1rem;
  font-size: 1.5rem;
  font-weight: 700;
  background-color: chocolate;
  border-radius: 0.5rem;
  margin-bottom: 1rem;
}

.details-list__row--key {
  padding-right: 1rem;
  color: #21e2e5;
}

.status-active, .status-inActive {
  padding: 0.5rem;
  border-radius: 0.5rem;
  box-shadow: 1px 1px 14px 2px;
  width: 8rem;
}
.status-active {
  background-color: #82bf45;
}
.status-inActive {
  background-color: #bf4545;
}
</style>
