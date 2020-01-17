<template>
  <v-card>
    <v-card-title>Profile info</v-card-title>
    <v-card-text>
      <v-form>
        <v-text-field v-model="user.uid" label="User id" readonly />
        <v-text-field
          v-model="user.displayName"
          label="Display name"
          readonly
        />
        <v-text-field v-model="user.email" label="Email" readonly />
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-btn @click="$auth.logout()" color="error">
        <v-icon>exit_to_app</v-icon>
        Logout
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
/* eslint-disable no-console */
// import { mapGetters } from 'vuex'

export default {
  auth: true,
  computed: {
    user() {
      return this.$auth.user
    }
  },
  created() {
    console.log(this.user)
  }
}
</script>
