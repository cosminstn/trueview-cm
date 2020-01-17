<template>
  <div>
    <v-card-title
      ><v-col>
        <v-row v-if="title != null">{{ title }}</v-row>
        <v-row>
          <v-text-field
            v-if="allowSearch === true"
            v-model="search"
            clearable
            append-icon="search"
            label="Search"
          />
        </v-row>
      </v-col>
    </v-card-title>
    <v-data-table :headers="headers" :items="rows" @click:row="rowClick" />
  </div>
</template>

<script>
/* eslint-disable no-console */
const _ = require('lodash')

export default {
  props: {
    apiController: {
      type: String,
      required: true
    },
    headers: {
      type: Array,
      required: true
    },
    allowSearch: {
      type: Boolean,
      default: true
    },
    title: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      rows: [],
      search: ''
    }
  },
  watch: {
    search() {
      this.debouncedGetData()
    }
  },
  created() {
    this.refreshData()
    this.debouncedGetData = _.debounce(this.refreshData, 500)
  },
  methods: {
    refreshData() {
      this.$axios
        .get(`/${this.apiController}/search?query=${this.search || ''}`)
        .then((response) => {
          this.rows = response.data
        })
        .catch((err) => {
          console.log(
            `Could not fetch data from controller: ${this.apiController} `
          )
          console.log(err)
          this.rows = []
        })
    },
    rowClick(row) {
      this.$emit('row-clicked', row)
    }
  }
}
</script>
