<template>
  <v-card>
    <QueryTable
      :headers="headers"
      :api-controller="'review/report/active'"
      :allow-search="false"
      @row-clicked="rowClicked"
      title="Reviews Reports"
    />

    <v-divider />

    <v-treeview />
  </v-card>
</template>

<script>
/* eslint-disable no-console */
export default {
  // auth: false,
  components: {
    QueryTable: () => import('~/components/tables/QueryTable')
  },
  computed: {
    headers() {
      return [
        {
          text: 'Review ID',
          value: 'reviewId'
        },
        {
          text: 'Review Title',
          value: 'reviewTitle'
        },
        {
          text: 'Review Content',
          value: 'reviewContent'
        },
        {
          text: 'Flags Count',
          value: 'flagsCount'
        }
      ]
    }
  },
  methods: {
    rowClicked(row) {
      console.log('detected row click')
      this.$router.push(`/reviews/${row.reviewId}/reports`)
    }
  }
}
</script>
