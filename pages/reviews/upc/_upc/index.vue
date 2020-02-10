<template>
  <v-row>
    <v-col cols="12" xs="12">
      <v-row v-for="review in reviews" v-bind:key="review.id">
        <v-col cols="12" xs="12" sm="6" md="4">
          <v-card>
            <v-card-title>
              {{ review.title }}
            </v-card-title>
            <v-card-subtitle>
              <v-row>
                <v-rating
                  :value="review.score"
                  :length="5"
                  half-increments
                  readonly
                  full-icon="mdi-heart"
                  half-icon="mdi-heart-half-full"
                  empty-icon="mdi-heart-outline"
                  color="primary"
                  background-color="primary"
                ></v-rating>
              </v-row>
              <!-- foarte ciudat ca daca scoate mx-0 se da mai in stanga. wtf -->
              <v-row class="mx-0">
                {{ review.username }}
              </v-row>
            </v-card-subtitle>
            <v-card-text>{{ review.content }}</v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
/* eslint-disable no-console */
export default {
  data() {
    return {
      headers: [
        {
          align: 'center',
          text: 'Review Id',
          value: 'id'
        },
        {
          align: 'center',
          text: ''
        }
      ],
      reviews: []
    }
  },
  created() {
    console.log(this.$route.params)
    this.$axios
      .get(`/review/upc/${this.$route.params.upc}`)
      .then((response) => {
        this.reviews = response.data
        this.reviews.forEach((r) => {
          r.username = 'cosmyn9708@gmail.com'
        })
      })
      .catch((ex) => {
        console.log('Could not fetch reviews for: ' + this.$route.params.upc)
        console.log(ex)
        this.reviews = []
      })
  }
}
</script>
