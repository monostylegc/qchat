<template>
  <q-page>
    <q-list>
      <q-item
        v-for="(user, key) in users"
        :key="key"
        :to="'/chat/' + key"
        class="q-my-sm"
        clickable
        v-ripple
      >
        <q-item-section avatar>
          <q-avatar color="primary" text-color="white">
            {{ user.name.charAt(0) }}
          </q-avatar>
        </q-item-section>
        <q-item-section> {{ user.name }} </q-item-section>
        <q-item-section side>
          <q-badge :color="user.online ? 'light-green-5' : 'grey-4'">
            {{ user.online ? "Online" : "Offline" }}
          </q-badge>
        </q-item-section>
      </q-item>
    </q-list>
  </q-page>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters("store", ["users"])
  },

  data() {
    return {};
  }
};
</script>

<style></style>
