<template>
  <v-card>
    <v-card-text>
      <QueryTable
        :headers="headers"
        :api-controller="`review/upc/${gtin}`"
        title="Reviews"
      />
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  components: {
    QueryTable: () => import('~/components/tables/QueryTable')
  },
  props: {
    /**
     * Global Trade Item Number: UPC/EAN
     */
    gtin: {
      type: String,
      required: true
    }
  },
  computed: {
    headers() {
      return [
        {
          text: 'Review Id',
          value: 'id'
        },
        {
          text: 'Score',
          value: 'score'
        },
        {
          text: 'Author',
          value: 'authorUsername'
        },
        {
          text: 'Platform Id',
          value: 'platform.id'
        },
        {
          text: 'Platform Title',
          value: 'platform.title'
        }
      ]
    }
  }
}
</script>
