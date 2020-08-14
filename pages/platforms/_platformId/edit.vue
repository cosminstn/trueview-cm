<template>
  <v-card>
    <CrudWrapper
      v-if="platform != null"
      :value="platform"
      @succeeded="$router.push('/platforms')"
      component="platform"
    />
  </v-card>
</template>

<script>
/* eslint-disable no-console */

export default {
  components: {
    CrudWrapper: () => import('~/components/crud/wrappers/CrudWrapper')
  },
  data: () => ({
    platform: null
  }),
  created() {
    this.$axios
      .get(`/platform/${this.$route.params.platformId}`)
      .then((response) => {
        this.platform = response.data
      })
      .catch((err) => {
        this.platform = null
        console.log('Could not fetch platform by id: ')
        console.log(err)
      })
  }
}
</script>
