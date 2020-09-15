<template>
  <v-card>
    <v-card-text>
      <v-form v-if="review != null">
        <v-col>
          <v-text-field :value="review.score" label="Review score" readonly />
          <v-text-field :value="review.title" label="Review title" readonly />
          <v-textarea
            :rows="5"
            :value="review.content"
            label="Review content"
            readonly
          />
          <v-text-field
            :value="review.platformUserIdentity"
            label="Review Platform User Identity"
            readonly
          />
        </v-col>
      </v-form>

      <v-data-table :headers="reportsHeaders" :items="reports" />
    </v-card-text>
    <v-card-actions>
      <v-btn @click="markSafe" :loading="markSafeLoading" color="lime"
        >KEEP</v-btn
      >
      <v-btn @click="markNotSafe" :loading="markNotSafeLoading" color="red"
        >REMOVE</v-btn
      >
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      review: null,
      noReports: null,
      reports: [],
      markSafeLoading: false,
      markNotSafeLoading: false
    }
  },
  computed: {
    reviewId() {
      return this.$route.params.reviewId
    },
    reportsFlags() {
      return ['Inappropriate Content', 'Irrelevant Content']
    },
    reportsHeaders() {
      return [
        {
          text: 'Flag',
          value: 'flag'
        },
        {
          text: 'Details',
          value: 'details'
        }
      ]
    }
  },
  created() {
    this.$axios
      .get(`/review/${this.reviewId}`)
      .then((response) => {
        this.review = response.data
      })
      .catch((error) => {
        console.error('Could not fetch review for id: ' + this.reviewId, error)
      })

    this.$axios
      .get(`/review/${this.reviewId}/reports`)
      .then((response) => {
        const items = response.data.items
        items.forEach((item) => {
          item.flag = this.reportsFlags[item.flags[0]]
        })
        this.reports = items

        this.noReports = response.data.totalItems
      })
      .catch((error) => {
        console.error('Could not fetch review reports', error)
      })
  },
  methods: {
    markSafe() {
      if (this.markSafeLoading) {
        return
      }
      this.markSafeLoading = true

      this.$axios
        .post(`/review/${this.reviewId}/report/mark-safe`)
        .then((response) => {
          this.$router.push('/reviews/reports')
        })
        .catch((error) => {
          console.error('Could not mark review as safe: ', error)
        })
        .finally(() => {
          this.markSafeLoading = false
        })
    },
    markNotSafe() {
      if (this.markNotSafeLoading) {
        return
      }
      this.markNotSafeLoading = true

      this.$axios
        .post(`/review/${this.reviewId}/report/mark-not-safe`)
        .then((response) => {
          this.$router.push('/reviews/reports')
        })
        .catch((error) => {
          console.error('Could not mark review as not safe: ', error)
        })
        .finally(() => {
          this.markNotSafeLoading = false
        })
    }
  }
}
</script>
