<template>
  <Keywords />
</template>

<script>
export default {
  // auth: false,
  components: {
    Keywords: () => import('~/components/crud/inputs/Keywords')
  }
}
</script>
