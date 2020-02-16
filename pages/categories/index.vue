<template>
  <v-card>
    <CategorySearch @row-clicked="rowClick" />

    <v-divider />

    <v-treeview />

    <v-card-actions>
      <v-btn @click="$router.push('/categories/new')" color="primary">
        <v-icon>add</v-icon> Adauga
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
/* eslint-disable no-console */
export default {
  // auth: false,
  components: {
    CategorySearch: () => import('~/components/search/CategorySearch')
  },
  methods: {
    rowClick(row) {
      console.log('detected row click')
      this.$router.push(`/categories/${row.id}/edit`)
    }
  }
}
</script>
