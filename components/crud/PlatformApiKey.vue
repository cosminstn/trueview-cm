<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="6">
        <v-text-field v-model="name" label="API Key Name" />
      </v-col>
      <v-col cols="12" md="6">
        <v-text-field v-model="description" label="Description" />
      </v-col>
      <v-col v-if="!isValueEmpty" cols="12" md="6">
        <v-text-field :value="value.key" readonly label="Platform Website" />
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
      name: this.value.name || null,
      description: this.value.description || null,
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
  created() {
    console.log('created platformApiKey crud component')
  },
  methods: {
    getValue() {
      return {
        id: this.id,
        name: this.name,
        description: this.description
      }
    }
  }
}
</script>
