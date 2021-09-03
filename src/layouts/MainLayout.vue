<template>
  <q-layout view="lHh Lpr lFf">
    <q-header>
      <q-toolbar>
        <q-btn
          v-if="$route.fullPath.includes('/chat')"
          v-go-back.single
          icon="arrow_back"
          dense
          flat
        />
        <q-toolbar-title class="absolute-center">
          {{ title }}
        </q-toolbar-title>
        <q-btn
          v-if="!userDetails.userID"
          icon="account_circle"
          dense
          flat
          no-caps
          label="Login"
          class="absolute-right q-pr-sm"
        />
        <q-btn
          v-else
          @click="logoutUser"
          icon="account_circle"
          dense
          flat
          no-caps
          class="absolute-right q-pr-sm"
        >
          LogOut
        </q-btn>
      </q-toolbar>
    </q-header>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { mapState, mapActions } from "vuex";
import mixinOtherUserDetails from "src/mixins/mixin-other-user-details";

export default {
  name: "MainLayout",
  mixins: [mixinOtherUserDetails],
  computed: {
    ...mapState("store", ["userDetails"]),

    title() {
      let currentPath = this.$route.fullPath;

      if (currentPath === "/") {
        return "Q Chat";
      } else if (currentPath.includes("/chat")) {
        return this.otherUserDetails.name;
      } else return "Login";
    }
  },
  data() {
    return {};
  },

  methods: {
    ...mapActions("store", ["logoutUser"])
  }
};
</script>

<style scoped lang="stylus">
.q-toolbar
  .q-btn
    line-height 1.0
</style>
