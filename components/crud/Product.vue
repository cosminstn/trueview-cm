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
          :rules="[rules.required, rules.upc]"
          label="Universal Product Code"
          counter
        />
      </v-col>
    </v-row>
    <v-row>
      <Keywords v-model="keywords" />
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
    EntityRef: () => import('~/components/crud/inputs/EntityRef'),
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
      universalProductCode: this.value.universalProductCode || null,
      categoryId: this.value.categoryId || null,
      title: this.value.title || null,
      specs: this.value.specs || null,
      keywords: this.value.keywords || null,
      rules: {
        required: (value) => !!value || 'Required!',
        upc: (value) => {
          const pattern = /^\d{13}$/
          return pattern.test(value) || 'Invalid UPC!'
        }
      }
    }
  },
  methods: {
    getValue() {
      return {
        id: this.id,
        universalProductCode: this.universalProductCode,
        categoryId: this.categoryId,
        title: this.title,
        specs: this.specs,
        keywords: this.keywords
      }
    }
  }
}
</script>
