<template>
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
          <span>Actions</span>
        </th>
      </tr>
    </thead>
    <tbody class="table-body">
      <tr>
        <td></td>
        <td></td>
        <td></td>
        <td>
          <div>
            <span>
              <div class="table-actions">
                <!-- view -->
                <button>
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
                </button>

                <!-- edit -->
                <button>
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
                </button>

                <!-- delete -->
                <button>
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
            </span>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
import { onMounted } from "vue";

const tableData = ref([]);

onMounted(()=>{

})
</script>

<style scoped>
.table {
  margin: 2rem auto;
  background-color: chocolate;
  border-radius: 8px;
  border-collapse: collapse;
}
tr,td,th{
  padding: 0.5rem;
  border-style: solid;
  border-color:black;
  border-right-width: 1px;
}

.table-actions{
  display: flex;
  justify-content: space-between;
  align-content: center;
  align-items: center;
}

.table-actions:deep(button){
margin: 0 0.5rem; 
}
</style>