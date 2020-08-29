<template>
  <QueryTable
    @row-clicked="rowClick"
    :headers="headers"
    :api-controller="
      categoryId == null ? 'product' : `category/${categoryId}/products`
    "
    title="Products"
  />
</template>

<script>
/* eslint-disable no-console */
export default {
  name: 'ProductSearch',
  components: {
    QueryTable: () => import('~/components/tables/QueryTable')
  },
  props: {
    categoryId: {
      type: String,
      default: null
    }
  },

  computed: {
    headers() {
      const headers = [
        {
          align: 'center',
          text: 'Product Id',
          value: 'id'
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
      if (this.id != null) {
        headers.splice(1, 0, {
          text: 'Category ID',
          value: 'category.id'
        })
      }

      return headers
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
