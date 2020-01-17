<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="4">
        <v-text-field v-model="title" label="Category Title" />
      </v-col>
      <v-col cols="12" md="4">
        <v-text-field v-model="description" label="Description" />
      </v-col>
      <v-col cols="12" md="4">
        <v-text-field
          v-model="parentCategoryId"
          label="Parent Category Id"
          readonly
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
// cum sa imbunatatim formurile
// https://simonkollross.de/posts/vuejs-using-v-model-with-objects-for-custom-components
export default {
  name: 'Category',
  props: {
    value: {
      type: Object,
      default: () => ({})
    }
  },
  // cand punem paranteze rotunde in jurul {} ii spunem compilatorului
  // ca vrem sa returnam un obiect cu acea structura,
  // si ca nu e body de functie
  // dar cand e implementat cu expresia aia nu merge sa accesam
  // keyword-ul this => mai bine cu metoda clasica
  data() {
    return {
      inputValue: null,
      id: this.value.id || null,
      title: this.value.title || null,
      parentCategoryId: this.value.parentCategoryId || null
    }
  },
  methods: {
    getValue() {
      return {
        id: this.id,
        title: this.title,
        parentCategoryId: this.parentCategoryId
      }
    }
  }
}
</script>
