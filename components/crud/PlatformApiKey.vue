<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="6">
        <v-text-field v-model="name" label="Platform Title" />
      </v-col>
      <v-col cols="12" md="6">
        <v-text-field v-model="description" label="Platform Website" />
      </v-col>
      <v-col v-if="isValueEmpty" cols="12" md="6">
        <v-text-field v-model="value.key" label="Platform Website" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
const _ = require('lodash')

export default {
  name: 'Platform',

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
  computed: {
    isValueEmpty() {
      return _.isEmpty(this.value)
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
