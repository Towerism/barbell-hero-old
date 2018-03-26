<template lang="pug">
 v-card.elevation-12
    v-toolbar(dark color="primary")
      v-toolbar-title Barbell Hero
    v-card-text
      span.red--text(v-if="failure") Could not validate credentials
      v-form(@submit.prevent="onSubmit" v-model="valid" lazy-validation)
        v-text-field(prepend-icon="person" v-model="username" label="Login" id="username" type="text" required)
        v-text-field(prepend-icon="lock" v-model="password" label="Password" id="password" type="password" required)
        button(type="submit" style="display: none")
    v-card-actions
      v-spacer
      v-btn(color="primary" id="loginSubmit" type="submit" @click="onSubmit") Login
</template>

<script>
export default {
  layout: 'loggedout',
  data () {
    return {
      valid: true,
      username: '',
      password: '',
      failure: false
    }
  },
  methods: {
    async onSubmit () {
      try {
        await this.$auth.login({
          data: {
            username: this.username,
            password: this.password
          }
        })
      } catch (e) {
        this.failure = true
      }
    }
  }
}
</script>

