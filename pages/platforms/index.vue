<template>
  <v-card>
    <QueryTable
      @row-clicked="handleRowClick"
      :headers="headers"
      title="Platforms"
      api-controller="platform"
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
    QueryTable: () => import('~/components/search/base/QueryTable')
  },
  data() {
    return {
      headers: [
        {
          text: 'Platform Id',
          value: 'id'
        },
        {
          text: 'Title',
          value: 'title'
        },
        {
          text: 'Website',
          value: 'website'
        }
      ]
    }
  },
  methods: {
    handleRowClick(row) {
      this.$router.push(`/products/${row.id}/edit`)
    }
  }
}
</script>
