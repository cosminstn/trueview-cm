<template>
  <CrudQueryTable
    :headers="headers"
    :api-controller="`/category/${categoryId}/products/search`"
    :endpoints="{
      add: `/category/${categoryId}/products`,
      delete: `/product`
    }"
    title="Product"
    crud-component="product"
  />
</template>

<script>
/* eslint-disable no-console */
export default {
  name: 'ProductSearch',
  components: {
    CrudQueryTable: () => import('~/components/tables/CrudQueryTable')
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
