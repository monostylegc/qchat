<template>
  <q-layout view="lHh Lpr lFf">
    <q-header >
      <q-toolbar>
        <q-btn v-if="$route.fullPath === '/chat'" v-go-back.single icon='arrow_back' dense flat/>
        <q-toolbar-title class="absolute-center">
          {{ title }}
        </q-toolbar-title>
        <q-btn icon='account_circle' dense flat no-caps label="Login" class="absolute-right q-pr-sm" to="/auth" v-show="$route.fullPath!=='/auth'" />
      </q-toolbar>
    </q-header>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>


export default {
  name: 'MainLayout',

  computed:{
    title() {
      let currentPath = this.$route.fullPath;

      if(currentPath === "/") {return 'Q Chat'}
      else if(currentPath === "/chat") {return "Chat Page"}
      else (currentPath === "/auth") 
      return "Login"
    }
  },
  data () {
    return {
      
    }
  }
}
</script>
