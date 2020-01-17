<template>
  <v-form v-model="formValid">
    <h2>{{ crudMode }}</h2>

    <div v-if="component == null">
      <h1 style="color: red">
        Invalid component name
      </h1>
    </div>
    <Category
      ref="category"
      v-if="component.toLowerCase() === 'category'"
      :value="value"
    ></Category>
    <Product
      ref="product"
      v-if="component.toLowerCase() === 'product'"
    ></Product>

    <v-row class="mx-2">
      <v-btn v-if="crudMode === 'add'" @click="add" class="mx-2" color="success"
        ><v-icon>add</v-icon>Add</v-btn
      >
      <v-btn v-if="crudMode === 'update'" class="mx-2" color="primary"
        ><v-icon>save</v-icon>Save</v-btn
      >
      <v-btn v-if="crudMode === 'update'" class="mx-2" color="primary"
        ><v-icon>delete</v-icon>Delete</v-btn
      >
    </v-row>
  </v-form>
</template>

<script>
/* eslint-disable no-console */
export default {
  name: 'CrudWrapper',
  components: {
    Category: () => import('~/components/crud/Category.vue'),
    Product: () => import('~/components/crud/Product.vue')
  },
  props: {
    component: {
      type: String,
      required: true
    },
    value: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      formValid: false
    }
  },
  computed: {
    crudMode() {
      return 'add'
    }
  },
  methods: {
    add() {
      this.$axios.post(`/${this.component}`, this.getFormValue())
    },
    getFormValue() {
      return this.$refs[this.component].getValue()
    }
  }
}
</script>

<style scoped></style>
