<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="6">
        <v-text-field v-model="title" label="Platform Title" />
      </v-col>
      <v-col cols="12" md="6">
        <v-text-field v-model="website" label="Platform Website" />
      </v-col>
    </v-row>

    <v-row>
      <Keywords v-model="keywords" />
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'Platform',
  components: {
    Keywords: () => import('~/components/crud/inputs/Keywords')
  },
  props: {
    value: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      id: this.value.id || null,
      title: this.value.title || null,
      website: this.value.website || null,
      keywords: this.value.keywords || null,
      rules: {
        required: (value) => !!value || 'Required!'
      }
    }
  },
  methods: {
    getValue() {
      return {
        id: this.id,
        title: this.title,
        website: this.website,
        keywords: this.keywords
      }
    }
  }
}
</script>
