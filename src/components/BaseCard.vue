<template>
  <div class="baseCard__shadow"></div>
  <div class="baseCard">
    <div class="container">
      <div class="container__header">
        <h2 class="container__header--title">
          {{
            props.mode === "Delete"
              ? `Delete ${props.brand.name}`
              : props.brand.isActive
              ? `Deactivate ${props.brand.name}`
              : `Activate ${props.brand.name}`
          }}
        </h2>
        <svg
          @click="emit('showPopup', false)"
          class="container__header--close"
          focusable="false"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <path
            d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
            fill="currentColor"
            fillRule="evenodd"
          ></path>
        </svg>
      </div>
      <div class="container__box">
        <p>Are You Sure?</p>
        <div class="action__btn">
          <button
            @click="
              () => {
                props.mode === 'Delete' && handleDelete();
                props.mode === 'ChangeStatus' && handleChangeStatus();
              }
            "
            class="action__btn--1"
          >
          {{props.mode === 'Delete' ? 'Delete' : 'Change Status'}}
          </button>
          <button @click="emit('showPopup', false)" class="action__btn--0">
            Cancel
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Brand } from "../services";

const props = defineProps({
  mode: {
    type: String,
    required: true,
  },
  brand: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(["showPopup", "refreshData"]);

const handleDelete = () => {
  Brand.delete(props.brand.id).then(() => {
    emit("showPopup", false);
    emit("refreshData");
  });
};
const handleChangeStatus = () => {
  Brand.changeStatus(props.brand.id).then(() => {
    emit("showPopup", false);
    emit("refreshData");
  });
};
</script>

<style scoped>
.baseCard__shadow {
  background-color: #ffffff6b;
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  opacity: 0.8;
}

.container {
  background-color: rgb(124, 103, 103);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 2px solid black;
  border-radius: 1vw;
  width: 400px;
  max-width: 90%;
  max-height: 12rem;
  z-index: 2;
  position: fixed;
  right: 0;
  left: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  box-shadow: 0px 0px 10px 5px black;
}

.container__header {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #000;
}

.container__header--close {
  width: 30px;
  height: 30px;
  cursor: pointer;
  margin-right: 1rem;
}

.container__header--close:hover {
  color: #646cff;
}

.container__header--title {
  padding: 0 3vw;
  font-weight: 600;
  font-size: 1.2rem;
}

.container__box {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.container__box-card {
  width: 100%;
  height: 50px;
}

.container__box {
  width: 80%;
}

.container__box > .container__box-row {
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 1rem;
  width: 100%;
  border-bottom: gray 1px solid;
}
.container__box-row > h4 {
  white-space: pre;
}

.action__btn {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 2rem;
  margin-bottom: 1rem;
}

.action__btn--1 {
  background-color: red;
}

.action__btn--0 {
  background-color: greenyellow;
}
</style>