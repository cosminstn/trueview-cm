<template>
  <CrudWrapper component="product" />
</template>

<script>
export default {
  components: {
    CrudWrapper: () => import('~/components/crud/wrappers/CrudWrapper')
  }
}
</script>
