<template>
  <q-form class="q-gutter-md" @submit="submitForm">
    <q-input
      v-if="tab == 'register'"
      outlined
      v-model="formData.name"
      label="이름"
    />
    <q-input outlined v-model="formData.email" type="email" label="이메일" />
    <q-input
      outlined
      v-model="formData.password"
      type="password"
      label="비밀번호"
    />

    <div>
      <q-btn
        class="full-width"
        :label="tab == 'login' ? '로그인' : '회원가입'"
        type="submit"
        color="primary"
      />
    </div>
  </q-form>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "LoginRegister",

  props: ["tab"],

  data() {
    return {
      formData: {
        name: "",
        email: "",
        password: ""
      }
    };
  },
  methods: {
    ...mapActions("store", ["registerUser", "loginUser"]),
    submitForm() {
      if (this.tab == "login") {
        this.loginUser(this.formData);
      } else if (this.tab == "register") {
        this.registerUser(this.formData);
      }
    }
  }
};
</script>

<style></style>
