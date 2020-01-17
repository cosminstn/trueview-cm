<template>
  <div>
    <h1>Category id: {{ this.$route.params.categoryId }}</h1>

    <CrudWrapper
      v-if="category != null"
      :value="category"
      component="category"
    />
  </div>
</template>

<script>
/* eslint-disable no-console */

export default {
  components: {
    CrudWrapper: () => import('~/components/crud/wrappers/CrudWrapper')
  },
  data: () => ({
    category: null
  }),
  created() {
    this.$axios
      .get(`/category/${this.$route.params.categoryId}`)
      .then((response) => {
        this.category = response.data
      })
      .catch((err) => {
        this.category = null
        console.log('Could not fetch category by id: ')
        console.log(err)
      })
  }
}
</script>
