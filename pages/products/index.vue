<template>
  <v-card>
    <ProductSearch @row-clicked="rowClick" />

    <v-card-actions>
      <v-btn @click="$router.push('/products/new')" color="primary">
        <v-icon>add</v-icon> Register Product
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  // auth: false,
  components: {
    ProductSearch: () => import('~/components/search/ProductSearch')
  },
  methods: {
    rowClick(row) {
      this.$router.push(`/products/${row.id}/edit`)
    }
  }
}
</script>
