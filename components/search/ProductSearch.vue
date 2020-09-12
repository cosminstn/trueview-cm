<template>
  <CrudQueryTable
    :headers="headers"
    :api-controller="endpoints.search"
    :endpoints="{
      add: `/category/${categoryId}/products`,
      delete: `/product`
    }"
    title="Products"
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
    endpoints() {
      return {
        search:
          this.categoryId != null
            ? `/category/${this.categoryId}/products/search`
            : '/product/search'
      }
    },
    headers() {
      const headers = [
        {
          text: 'Product Id',
          value: 'id',
          sortable: false
        },

        {
          text: 'Title',
          value: 'title',
          sortable: false
        },
        {
          text: 'Universal Product Code',
          value: 'universalProductCode',
          sortable: false
        }
      ]
      if (this.categoryId == null) {
        headers.splice(1, 0, {
          text: 'Category ID',
          value: 'category.id',
          sortable: false
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
