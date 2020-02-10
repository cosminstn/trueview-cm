<template>
  <CrudWrapper @succeeded="success" component="product" />
</template>

<script>
export default {
  components: {
    CrudWrapper: () => import('~/components/crud/wrappers/CrudWrapper')
  },
  methods: {
    success(response) {
      this.$notify('Product added to the database!')
      this.$router.push('/products')
    }
  }
}
</script>
