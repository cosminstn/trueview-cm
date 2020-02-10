<template>
  <QueryTable
    @row-clicked="rowClick"
    :headers="headers"
    title="Products"
    api-controller="product"
  />
</template>

<script>
/* eslint-disable no-console */
export default {
  name: 'ProductSearch',
  components: {
    QueryTable: () => import('~/components/search/base/QueryTable')
  },
  data() {
    return {
      headers: [
        {
          align: 'center',
          text: 'Product Id',
          value: 'id'
        },
        {
          align: 'center',
          text: 'Category',
          value: 'category'
        },
        {
          align: 'center',
          text: 'Title',
          value: 'title'
        },
        {
          align: 'center',
          text: 'Universal Product Code',
          value: 'universalProductCode'
        }
      ]
    }
  },
  methods: {
    rowClick(row) {
      console.log('Row clicked in ProductSearch.vue')
      this.$emit('row-clicked', row)
    }
  }
}
</script>
