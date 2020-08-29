<template>
  <v-card>
    <CrudWrapper
      v-if="category != null"
      :value="category"
      @succeeded="$router.push('/categories')"
      component="category"
    />
  </v-card>
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
        console.log(this.category)
      })
      .catch((err) => {
        this.category = null
        console.log('Could not fetch category by id: ')
        console.log(err)
      })
  }
}
</script>
