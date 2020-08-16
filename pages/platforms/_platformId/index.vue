<template>
  <v-card>
    <CrudWrapper
      v-if="platform != null"
      :value="platform"
      @succeeded="$router.push('/platforms')"
      component="platform"
      readonly
    />

    <CrudQueryTable
      :headers="headers"
      :api-controller="`/platform/${platformId}/api-keys/search`"
      :endpoints="{
        add: `/platform/${platformId}/api-keys`,
        search: '/platform/${platformId}/api-keys'
      }"
      title="API Keys"
      crud-component="platformApiKey"
    />
  </v-card>
</template>

<script>
/* eslint-disable no-console */

export default {
  components: {
    CrudWrapper: () => import('~/components/crud/wrappers/CrudWrapper'),
    CrudQueryTable: () => import('~/components/tables/CrudQueryTable')
  },
  data: () => ({
    platform: null
  }),
  computed: {
    platformId() {
      return this.$route.params.platformId
    },
    headers() {
      return [
        {
          text: 'Name',
          value: 'name'
        },
        {
          text: 'Created On',
          value: 'createdOn'
        },
        {
          text: 'Key',
          value: 'key'
        },
        { text: 'Actions', value: 'actions', sortable: false }
      ]
    }
  },
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
