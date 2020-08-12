<template>
  <CrudWrapper @succeeded="success" component="platform" />
</template>

<script>
export default {
  components: {
    CrudWrapper: () => import('~/components/crud/wrappers/CrudWrapper')
  },
  methods: {
    success(response) {
      this.$notify('Platform added to the database!')
      this.$router.push('/platforms')
    }
  }
}
</script>
