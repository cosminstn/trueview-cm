<template>
  <v-form v-model="formValid">
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
      :value="value"
    ></Product>

    <v-row class="mx-2">
      <v-btn v-if="crudMode === 'add'" @click="add" class="mx-2" color="success"
        ><v-icon>add</v-icon>Add</v-btn
      >
      <v-btn
        v-if="crudMode === 'update'"
        @click="save"
        class="mx-2"
        color="primary"
        ><v-icon>save</v-icon>Save</v-btn
      >
      <v-btn v-if="crudMode === 'update'" class="mx-2" color="error"
        ><v-icon>delete</v-icon>Delete</v-btn
      >
    </v-row>
  </v-form>
</template>

<script>
const _ = require('lodash')
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
      return this.value == null || _.isEmpty(this.value) ? 'add' : 'update'
    }
  },
  methods: {
    add() {
      this.$axios
        .post(`/${this.component}`, this.getFormValue())
        .then((r) => {
          this.$emit('succeeded', r)
        })
        .catch((e) => {
          this.$emit('failed', e)
        })
    },
    save() {
      const formValue = this.getFormValue()
      if (formValue == null || formValue.id == null) {
        console.log('Invalid form value!')
        return
      }
      this.$axios
        .put(`/${this.component}/${formValue.id}`, formValue)
        .then((r) => {
          this.$emit('succeeded', r)
        })
        .catch((e) => {
          this.$emit('failed', e)
        })
    },
    getFormValue() {
      return this.$refs[this.component].getValue()
    }
  }
}
</script>

<style scoped></style>
