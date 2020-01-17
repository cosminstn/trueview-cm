<template>
  <div>
    <CategorySearch v-if="component === 'category'" @row-clicked="rowClick" />
    <ProductSearch
      v-else-if="component === 'product'"
      @row-clicked="rowClick"
    />
  </div>
</template>

<script>
/* eslint-disable no-console */

export default {
  name: 'SearchWrapper',
  components: {
    CategorySearch: () => import('~/components/search/CategorySearch'),
    ProductSearch: () => import('~/components/search/ProductSearch')
  },
  props: {
    component: {
      type: String,
      required: true
    }
  },
  methods: {
    rowClick(row) {
      console.log('row clicked in search wrapper')
      this.$emit('row-clicked', row)
    }
  }
}
</script>
