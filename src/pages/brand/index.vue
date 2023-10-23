<template>
  <div class="content">
    <div class="head">
      <router-link class="head-btn" to="/brand/create">Add New +</router-link>
    </div>

    <table class="table">
      <thead class="table-head">
        <tr>
          <th>
            <span>Name</span>
          </th>
          <th>
            <span>Image</span>
          </th>
          <th>
            <span>Status</span>
          </th>
          <th>
            <span>Change Status</span>
          </th>
          <th>
            <span>Actions</span>
          </th>
        </tr>
      </thead>
      <tbody class="table-body" v-if="tableData.length">
        <tr v-for="brand in tableData" :key="brand.id">
          <td>{{ brand.name }}</td>
          <td>
            <span><img :src="brand.image" alt="brand image" /></span>
          </td>
          <td>{{ brand.isActive ? "Active" : "Inactive" }}</td>
          <td>
            <label @click="handleChangeStatus(brand)" class="switch">
              <input :checked="brand.isActive" type="checkbox" disabled />
              <span class="slider round"></span>
            </label>
          </td>
          <td>
            <div class="table-actions">
              <!-- view -->
              <router-link
                class="table-actions--btn"
                :to="`/brand/${brand.id}`"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  width="24"
                  height="24"
                  class="inline-block"
                  role="presentation"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  ></path>
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  ></path>
                </svg>
              </router-link>

              <!-- edit -->
              <router-link
                class="table-actions--btn"
                :to="`/brand/update?id=${brand.id}`"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  width="24"
                  height="24"
                  class="inline-block"
                  role="presentation"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  ></path>
                </svg>
              </router-link>

              <!-- delete -->
              <button
                class="table-actions--btn"
                @click="handleDeleteCard(brand)"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  width="24"
                  height="24"
                  class="inline-block"
                  role="presentation"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  ></path>
                </svg>
              </button>
            </div>
          </td>
        </tr>
      </tbody>
      <tbody v-else>
        <tr>
          <td colspan="5">No Data Found</td>
        </tr>
      </tbody>
      <tfoot>
        <td colspan="5">
          <div class="table-footer">
            <div>
              <label for="items">Items per page :</label>
              <select v-model="listOptions.limit" name="items" id="items">
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option selected value="10">10</option>
              </select>
            </div>
            <div>
              <button @click="listOptions.page--">
                <span>Prev</span>
              </button>
              <span>Page : {{ listOptions.page }}</span>
              <button @click="listOptions.page++">
                <span>Next</span>
              </button>
            </div>
          </div>
        </td>
      </tfoot>
    </table>
    <BaseCard
      v-if="showPopup"
      :mode="mode"
      :brand="selectedBrand"
      @showPopup="showPopup = !showPopup"
      @refreshData="updateBrandList(mode, selectedBrand)"
    />
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from "vue";
import { Brand } from "../../services";
import BaseCard from "../../components/BaseCard.vue";

const tableData = ref([]);
const showPopup = ref(false);
const selectedBrand = ref({});
const listOptions = ref({
  page: 1,
  limit: 10,
});
const mode = ref("");

onMounted(() => {
  getBrandList();
});

const handleDeleteCard = (brand) => {
  showPopup.value = true;
  mode.value = "Delete";
  selectedBrand.value = brand;
};

const handleChangeStatus = (brand) => {
  showPopup.value = true;
  mode.value = "ChangeStatus";
  selectedBrand.value = brand;
};

const getBrandList = () => {
  Brand.list(listOptions.value).then((res) => {
    tableData.value = res.data.data;
  });
};
const updateBrandList = (mode, myBrand) => {
  switch (mode) {
    case "Delete":
      tableData.value = tableData.value.filter((ele) => ele.id !== myBrand.id);
      break;
    case "ChangeStatus":
      const index = tableData.value.findIndex((brand) => {
        return brand.id === myBrand.id;
      });
      tableData.value[index].isActive = !tableData.value[index].isActive;
      break;

    default:
      break;
  }
};

watch(
  listOptions,
  () => {
    getBrandList();
  },
  { deep: true }
);
</script>

<style>
.content {
  min-height: calc(100vh - 90.88px - 75px);
}
</style>

<style scoped>
.head {
  width: 100%;
  text-align: right;
}

.head-btn {
  display: inline-block;
  margin: 4rem 4rem 0 0;
  padding: 1rem;
}

.table {
  margin: 2rem auto;
  background-color: chocolate;
  border-radius: 8px;
  border-collapse: collapse;
}
tr,
td,
th {
  padding: 0.5rem;
  border-style: solid;
  border-color: black;
  border-right-width: 1px;
}

.table-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.table-actions:deep(button) {
  margin: 0 0.5rem;
}

/* toggle style */
.switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

input:checked + .slider {
  background-color: #646cff;
}

input:focus + .slider {
  box-shadow: 0 0 1px #646cff;
}

input:checked + .slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}

/* Rounded sliders */
.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}
/* toggle style */

.table-footer {
  padding: 0 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
}

.table-footer > div:nth-child(2) > span {
  margin: 0 1rem;
}
.table-footer > div:nth-child(1) > select {
  padding: 0.5rem;
}

.table-actions--btn {
  margin: 0 0.5rem;
}

@media only screen and (max-width:500px) {
  .table-actions {
    flex-direction: column;
  }

  .table-actions--btn {
  margin: 0.5rem 0;
}
}
</style>
