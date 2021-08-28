<template>
  <q-page class="flex column">
    <q-banner inline-actions class="text-center bg-grey-3">
      User Offline
    </q-banner>
    <div class="q-pa-md column col justify-end">
      <q-chat-message
        v-for="message in messages"
        :key="message.text"
        :name="message.from"
        :text="[message.text]"
        :sent="message.from == 'me' ? true : false"
      />
    </div>
    <q-footer elevated>
      <q-toolbar>
        <q-form @submit="sendMessage" class="full-width">
          <q-input
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
export default {
  data() {
    return {
      newMessage: "",
      messages: [
        {
          text: "미친놈아",
          from: "me"
        },
        {
          text: "왜 새끼야",
          from: "jane"
        },
        {
          text: "빨리 돈갚아라",
          from: "me"
        },
        {
          text: "빨리",
          from: "me"
        }
      ]
    };
  },

  methods: {
    sendMessage() {
      this.messages
        .push({
          text: this.newMessage,
          from: "me"
        })
        .then((this.newMessage = ""));
    }
  }
};
</script>
