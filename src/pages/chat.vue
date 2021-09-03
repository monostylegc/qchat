<template>
  <q-page class="flex column page-chat" ref="pageChat">
    <q-banner
      v-if="!otherUserDetails.online"
      inline-actions
      class="text-center bg-grey-3 fixed-top"
    >
      {{ otherUserDetails.name }} Offline
    </q-banner>
    <div class="q-pa-md column col justify-end">
      <q-chat-message
        v-for="(message, key) in messages"
        :key="key"
        :name="message.from == 'me' ? userDetails.name : otherUserDetails.name"
        :text="[message.text]"
        :sent="message.from == 'me' ? true : false"
      />
    </div>
    <q-footer elevated>
      <q-toolbar>
        <q-form @submit="sendMessage" class="full-width">
          <q-input
            ref="newMessage"
            rounded
            outlined
            v-model="newMessage"
            label="입력"
            dense
            bg-color="white"
          >
            <template>
              <q-btn type="submit" round dense flat icon="send" />
            </template>
          </q-input>
        </q-form>
      </q-toolbar>
    </q-footer>
  </q-page>
</template>

<script>
import { mapActions, mapState } from "vuex";
import mixinOtherUserDetails from "src/mixins/mixin-other-user-details";

export default {
  mixins: [mixinOtherUserDetails],

  data() {
    return {
      newMessage: ""
    };
  },
  computed: {
    ...mapState("store", ["messages", "userDetails"])
  },

  methods: {
    ...mapActions("store", [
      "firebaseGetMessages",
      "firebaseStopGettingMessages",
      "firebaseSendMessages"
    ]),

    sendMessage() {
      this.firebaseSendMessages({
        message: {
          text: this.newMessage,
          from: "me"
        },
        otherUserID: this.$route.params.otherUserID
      });
      this.clearMessage();
    },
    clearMessage() {
      this.newMessage = "";
      this.$refs.newMessage.focus();
    },
    scrollToBottom() {
      let pageChat = this.$refs.pageChat.$el;
      setTimeout(() => {
        window.scrollTo(0, pageChat.scrollHeight);
      }, 20);
    }
  },
  watch: {
    messages: function(val) {
      if (Object.keys(val).length) {
        this.scrollToBottom();
      }
    }
  },
  mounted() {
    this.firebaseGetMessages(this.$route.params.otherUserID);
  },
  destroyed() {
    this.firebaseStopGettingMessages();
  }
};
</script>
<style scoped>
.page-chat {
  background: radial-gradient(
        circle at 50% 59%,
        #d2caab 3%,
        #364e27 4%,
        #364e27 11%,
        rgba(54, 78, 39, 0) 12%,
        rgba(54, 78, 39, 0)
      )
      50px 0,
    radial-gradient(
        circle at 50% 41%,
        #364e27 3%,
        #d2caab 4%,
        #d2caab 11%,
        rgba(210, 202, 171, 0) 12%,
        rgba(210, 202, 171, 0)
      )
      50px 0,
    radial-gradient(
        circle at 50% 59%,
        #d2caab 3%,
        #364e27 4%,
        #364e27 11%,
        rgba(54, 78, 39, 0) 12%,
        rgba(54, 78, 39, 0)
      )
      0 50px,
    radial-gradient(
        circle at 50% 41%,
        #364e27 3%,
        #d2caab 4%,
        #d2caab 11%,
        rgba(210, 202, 171, 0) 12%,
        rgba(210, 202, 171, 0)
      )
      0 50px,
    radial-gradient(circle at 100% 50%, #d2caab 16%, rgba(210, 202, 171, 0) 17%),
    radial-gradient(circle at 0% 50%, #364e27 16%, rgba(54, 78, 39, 0) 17%),
    radial-gradient(circle at 100% 50%, #d2caab 16%, rgba(210, 202, 171, 0) 17%)
      50px 50px,
    radial-gradient(circle at 0% 50%, #364e27 16%, rgba(54, 78, 39, 0) 17%) 50px
      50px;
  background-color: #63773f;
  background-size: 100px 100px;
}
.q-banner {
  top: 50px;
  z-index: 2;
  opacity: 0.8;
}
</style>
