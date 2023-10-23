<template>
    <div class="content">
      <h1>Create Brand</h1>
  
      <form @submit.prevent="formSubmit()" class="container__box-form">
        <div class="container__box-row">
          <label class="container__box-form--lable" for="Image"> Image </label>
          <input
            @change="handleFile($event)"
            class="container__box-form--input"
            id="Image"
            name="Image"
            placeholder="Brand Image"
            type="file"
          />
        </div>
  
        <div class="container__box-row">
          <label class="container__box-form--lable" for="NameEN"> Name EN </label>
          <input
            v-model="formData.nameEN"
            class="container__box-form--input"
            id="NameEN"
            placeholder="Brand Name (EN)"
            type="text"
          />
        </div>
  
        <div class="container__box-row">
          <label class="container__box-form--lable" for="Name"> Name AR </label>
          <input
            v-model="formData.nameAR"
            class="container__box-form--input"
            id="Name"
            placeholder="Brand Name (AR)"
            type="text"
          />
        </div>
  
        <p v-if="isValid === false" style="color: red">Please Fill All fields</p>
  
        <button class="container__box-form--btn">Submit</button>
      </form>
    </div>
  </template>
  
  <script setup>
  import { onMounted, reactive, ref } from "vue";
  import { useRouter } from "vue-router";
  import { Brand } from "../../services";
  
  const router = useRouter();
  
  const formData = reactive({
    image: null,
    langENId: null,
    nameEN: null,
    langARId: null,
    nameAR: null,
  });
  const isValid = ref(null);
  
  onMounted(async () => {
    await Brand.getLanguage().then((res) => {
      formData.langENId = [...res.data.data].find(
        (ele) => ele.name === "English"
      ).id;
      formData.langARId = [...res.data.data].find(
        (ele) => ele.name === "Arabic"
      ).id;
    });

    await Brand.view(router.currentRoute.value.query?.id).then((res)=>{
        let data = res.data.data;

        const enIndex = data.nameByLang.findIndex((lang) => {
            return lang.langId === formData.langENId;
        });
        const arIndex = data.nameByLang.findIndex((lang) => {
            return lang.langId === formData.langARId;
        });
        formData.nameEN = res.data.data.nameByLang[enIndex]?.value;
        formData.nameAR = res.data.data.nameByLang[arIndex]?.value;
    })

  });
  
  const handleFile = (e) => {
    formData.image = e.target.files[0];
  };
  
  const formSubmit = () => {
  
    if (formData.nameEN && formData.nameAR) {
      isValid.value = true;
  
      const bodyFormData = new FormData();
      formData.image && bodyFormData.append("Image", formData.image);
      bodyFormData.append("NameByLang[0].langId", formData.langENId); // EN
      bodyFormData.append("NameByLang[0].value", formData.nameEN); // EN
      bodyFormData.append("NameByLang[1].langId", formData.langARId); // AR
      bodyFormData.append("NameByLang[1].value", formData.nameAR); // EN
  
      Brand.update(bodyFormData,router.currentRoute.value.query?.id)
        .then(() => {
          router.push({ name: "brand" });
        })
        .catch((error) => {
        //   console.log(error);
        });
    } else {
      isValid.value = false;
    }
  };
  </script>
  
  <style scoped>
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
  
  .delete__btn {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 2rem;
    margin-bottom: 1rem;
  }
  
  .delete__btn--1 {
    background-color: var(--danger);
  }
  
  .delete__btn--0 {
    background-color: var(--sucess);
  }
  
  .container__box-form {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 2rem 0;
  }
  
  .container__box-row {
    display: flex;
    flex-direction: column;
    width: 90%;
    margin: 1rem;
    margin-top: 0;
    justify-content: center;
    align-items: center;
    max-width: 500px;
  }
  
  .container__box-form--lable {
    font-size: 1.5rem;
    padding: 0 1vw 0 0;
  }
  
  .container__box-form--input {
    -ms-box-sizing: content-box;
    -moz-box-sizing: content-box;
    -webkit-box-sizing: content-box;
    box-sizing: content-box;
    font-size: 1rem;
    width: 90%;
    margin: 8px 0;
    border: 1px solid #ccc;
    box-shadow: inset 0 1px 3px #ddd;
    border-radius: 4px;
    padding: 20px 12px;
    transition: all 0.2s;
  }
  </style>