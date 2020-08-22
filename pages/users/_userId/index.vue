<template>
  <v-container>
    <v-row>
      <v-col cols="12" sm="6" md="4">
        <v-text-field :value="uid" label="User ID" readonly />
      </v-col>
      <v-col cols="12" sm="6" md="4">
        <v-text-field :value="email" label="Email" readonly />
      </v-col>
      <v-col cols="12" sm="6" md="4">
        <v-text-field :value="displayName" label="Display Name" readonly />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" xs="12">
        <v-select
          v-model="roles"
          :items="allRoles"
          chips
          multiple
          label="User Roles"
        />
      </v-col>
      <v-btn @click="updateRoles" :loading="updateRolesLoading"
        ><v-icon left>save</v-icon>Update Roles</v-btn
      >
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'Product',
  components: {},
  props: {
    value: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      uid: null,
      email: null,
      displayName: null,
      roles: null,
      rules: {
        required: (value) => !!value || 'Required!',
        upc: (value) => {
          const pattern = /^\d{13}$/
          return pattern.test(value) || 'Invalid UPC!'
        }
      },
      updateRolesLoading: false
    }
  },
  computed: {
    userId() {
      return this.$route.params.userId
    },
    allRoles() {
      const roles = [
        'CATEGORY_EDITOR',
        'PRODUCT_EDITOR',
        'REVIEWS_MODERATOR',
        'PLATFORMS_MANAGER',
        'ACCREDITED_REVIEWER'
      ]
      if (this.roles != null && this.roles.includes('ADMIN')) {
        roles.splice(0, 0, 'ADMIN')
      }

      return roles
    }
  },
  created() {
    this.$axios
      .get(`/user/${this.$route.params.userId}`)
      .then((response) => {
        const user = response.data
        this.uid = user.uid
        this.email = user.email
        this.displayName = user.displayName
        this.roles = user.roles
      })
      .catch((err) => {
        console.err('Could not fetch user: ' + this.userId, err)
      })
  },
  methods: {
    updateRoles() {
      this.updateRolesLoading = true
      this.$axios
        .post(`/user/${this.userId}/roles`, this.roles)
        .then((response) => {
          console.info('Updated roles for user: ' + this.userId)
        })
        .catch((err) => {
          console.error('Could not update user roles: ', err)
        })
        .finally(() => {
          this.updateRolesLoading = false
        })
    }
  }
}
</script>
