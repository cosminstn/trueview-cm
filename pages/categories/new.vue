<template>
  <CrudWrapper component="category" />
</template>

<script>
export default {
  components: {
    CrudWrapper: () => import('~/components/crud/wrappers/CrudWrapper')
  }
}
</script>
