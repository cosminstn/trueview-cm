<template>
  <QueryTable
    @row-clicked="rowClick"
    :headers="headers"
    :api-controller="`/api/review/upc/${upc}`"
    title="Reviews"
  />
</template>

<script>
export default {
  name: 'ReviewsSearch',
  props: {
    upc: {
      type: String,
      required: true
    }
  }
}
</script>
