<template>
  <v-card>
    <QueryTable
      @row-clicked="handleRowClick"
      :headers="headers"
      title="Users"
      api-controller="user"
    />
    <v-card-actions>
      <v-btn @click="$router.push('/platforms/new')" color="primary">
        <v-icon>add</v-icon> Register platform
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: 'PlatformsList',
  components: {
    QueryTable: () => import('~/components/tables/QueryTable')
  },
  data() {
    return {
      headers: [
        {
          text: 'User Id',
          value: 'uid'
        },
        {
          text: 'Email',
          value: 'email'
        },
        {
          text: 'Roles',
          value: 'roles'
        }
      ]
    }
  },
  methods: {
    handleRowClick(row) {
      this.$router.push(`/users/${row.uid}/`)
    }
  }
}
</script>
