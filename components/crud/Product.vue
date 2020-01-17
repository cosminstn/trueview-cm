<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="4">
        <v-text-field v-model="title" label="Product Title" />
      </v-col>

      <v-col cols="12" md="4">
        <EntityRef
          v-model="categoryId"
          component="category"
          label="Select category"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="4">
        <v-text-field
          v-model="universalProductCode"
          label="Universal Product Code"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-text-field v-model="newKeyword" label="Add new keyword" />
      <v-btn @click="addKeyword">Add keyword</v-btn>
    </v-row>
    <v-row>
      <v-container>
        <v-chip
          v-for="(word, index) in keywords"
          :color="getKeywordColor(word)"
          v-bind:key="index"
          class="ma-2"
          label
          ><v-icon left>label</v-icon>{{ word }}
          <v-icon v-on:click="removeKeyword(position)" right>clear</v-icon>
        </v-chip>
      </v-container>
    </v-row>
    <!-- <v-row>
      <v-col cols="12" md="4">
        <v-text-area v-model="specs" label="Specifications" />
      </v-col>
    </v-row> -->
  </v-container>
</template>

<script>
export default {
  name: 'Product',
  components: {
    EntityRef: () => import('~/components/crud/inputs/EntityRef')
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
      universalProductCode: this.value.universalProductCode || null,
      categoryId: this.value.categoryId || null,
      title: this.value.title || null,
      specs: this.value.specs || null,
      keywords: [],
      keywordsColors: {},
      newKeyword: null
    }
  },
  methods: {
    getValue() {
      return {
        id: this.id,
        universalProductCode: this.universalProductCode,
        categoryId: this.categoryId,
        title: this.title,
        specs: this.specs
      }
    },
    getRandomColor() {
      const colors = [
        'primary',
        'accent',
        'secondary',
        'info',
        'warning',
        'error',
        'success'
      ]
      const index = Math.floor(Math.random() * colors.length)
      return colors[index]
    },
    getKeywordColor(word) {
      if (this.keywordsColors[word] == null) {
        this.keywordsColors[word] = this.getRandomColor()
      }
      return this.keywordsColors[word]
    },
    addKeyword() {
      if (!this.keywords.includes(this.newKeyword))
        this.keywords.push(this.newKeyword)
      this.newKeyword = null
    },
    removeKeyword(position) {
      const word = this.keywords.splice(position, 1)[0]
      delete this.keywordsColors[word]
    }
  }
}
</script>
