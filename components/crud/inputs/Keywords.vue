<template>
  <v-container>
    <v-row no-gutters>
      <v-col cols="12" sm="4" class="mr-4">
        <v-text-field
          v-model="newKeyword"
          @keypress.enter="addKeyword"
          label="Add new keyword"
        />
      </v-col>
      <v-col cols="12" sm="4">
        <v-row no-gutter align="center" justify="center">
          <v-col>
            <v-btn @click="addKeyword" color="primary">
              <v-icon>add</v-icon> Add Keyword
            </v-btn>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <v-row>
      <v-container
        :style="`max-height: ${maxHeight}px`"
        class="overflow-y-auto"
      >
        <v-chip
          v-for="(word, index) in keywords"
          :color="getKeywordColor(word)"
          v-bind:key="index"
          class="my-2 mr-2"
          label
          ><v-icon left>label</v-icon>{{ word }}

          <v-icon v-on:click="removeKeyword(index)" right>clear</v-icon>
        </v-chip>
      </v-container>
    </v-row>
  </v-container>
</template>

<script>
const randomWords = require('random-words')

export default {
  name: 'Keywords',
  props: {
    value: {
      type: Array,
      default: () => []
    },
    maxHeight: {
      type: Number,
      default: 300
    }
  },
  data() {
    return {
      keywords: [],
      keywordsColors: {},
      newKeyword: null
    }
  },
  created() {
    this.initializeKeywords(randomWords(100))
  },
  methods: {
    getRandomColor() {
      const colors = ['primary', 'secondary', 'info', 'warning', 'error']
      const index = Math.floor(Math.random() * colors.length)
      return colors[index]
    },
    getKeywordColor(word) {
      if (this.keywordsColors[word] == null) {
        this.keywordsColors[word] = this.getRandomColor()
      }
      return this.keywordsColors[word]
    },
    initializeKeywords(arr) {
      arr.forEach((w) => {
        this.newKeyword = w
        this.addKeyword()
      })
    },
    addKeyword() {
      this.newKeyword = this.newKeyword.trim()
      if (!this.keywords.includes(this.newKeyword))
        this.keywords.push(this.newKeyword)
      this.newKeyword = null
      this.$emit('input', this.keywords)
    },
    removeKeyword(position) {
      const word = this.keywords.splice(position, 1)[0]
      delete this.keywordsColors[word]
      this.$emit('input', this.keywords)
    }
  }
}
</script>
