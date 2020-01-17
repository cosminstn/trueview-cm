<template>
  <QueryTable
    @row-clicked="rowClick"
    :headers="headers"
    title="Categories"
    api-controller="category"
  />
</template>

<script>
export default {
  name: 'CategorySearch',
  components: {
    QueryTable: () => import('~/components/search/base/QueryTable')
  },
  data() {
    return {
      headers: [
        {
          align: 'center',
          text: 'Category Id',
          value: 'id'
        },
        {
          align: 'center',
          text: 'Title',
          value: 'title'
        },
        {
          align: 'center',
          text: 'Parent category id',
          value: 'parentCategoryId'
        }
      ]
    }
  },
  methods: {
    rowClick(row) {
      this.$emit('row-clicked', row)
    }
  }
}
</script>
