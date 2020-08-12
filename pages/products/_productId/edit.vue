<template>
  <v-col>
    <CrudWrapper
      v-if="product != null"
      :value="product"
      @succeeded="success"
      component="product"
    />
    <ReviewsSearch v-if="product != null" />
  </v-col>
</template>

<script>
/* eslint-disable no-console */

export default {
  components: {
    CrudWrapper: () => import('~/components/crud/wrappers/CrudWrapper'),
    ReviewsSearch: () => import('~/components/reviews/ReviewsSearch')
  },
  data: () => ({
    product: null
  }),
  created() {
    this.$axios
      .get(`/product/${this.$route.params.productId}`)
      .then((response) => {
        this.product = response.data
      })
      .catch((err) => {
        this.product = null
        console.log(err)
      })
  },
  methods: {
    success(response) {
      console.log(JSON.stringify(response))
      this.$notify('Updated product ' + this.product.id)
      this.$router.push('/products')
    }
  }
}
</script>
