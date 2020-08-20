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
      v-else-if="component.toLowerCase() === 'product'"
      :value="value"
    ></Product>

    <Platform
      ref="platform"
      v-else-if="component.toLowerCase() === 'platform'"
      :value="value"
    ></Platform>

    <PlatformApiKey
      ref="platformApiKey"
      v-else-if="component.toLowerCase() === 'platformapikey'"
      :value="value"
    ></PlatformApiKey>

    <v-card-actions v-if="!readonly">
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
      <v-btn
        v-if="crudMode === 'update'"
        @click="remove"
        class="mx-2"
        color="error"
        ><v-icon>delete</v-icon>Delete</v-btn
      >
    </v-card-actions>
  </v-form>
</template>

<script>
const _ = require('lodash')
/* eslint-disable no-console */
export default {
  name: 'CrudWrapper',
  components: {
    Category: () => import('~/components/crud/Category.vue'),
    Product: () => import('~/components/crud/Product.vue'),
    Platform: () => import('~/components/crud/Platform.vue'),
    PlatformApiKey: () => import('~/components/crud/PlatformApiKey')
  },
  props: {
    component: {
      type: String,
      required: true
    },
    value: {
      type: Object,
      default: () => ({})
    },
    readonly: {
      type: Boolean,
      default: false
    },
    endpoints: {
      type: Object,
      default: null
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
  created() {
    const acknowledgedEntities = [
      'category',
      'product',
      'platform',
      'platformapikey'
    ]
    if (!acknowledgedEntities.includes(this.component.toLowerCase())) {
      console.error('Unknown entity: ' + this.component)
    }
  },
  methods: {
    add() {
      const endpoint =
        _.isEmpty(this.endpoints) ||
        this.endpoints.add == null ||
        this.endpoints.add.trim() === ''
          ? `/${this.component}`
          : this.endpoints.add

      this.$axios
        .post(endpoint, this.getFormValue())
        .then((r) => {
          this.$emit('succeeded', r)
        })
        .catch((e) => {
          this.$emit('failed', e)
        })
    },
    save() {
      const endpoint =
        _.isEmpty(this.endpoints) ||
        this.endpoints.update == null ||
        this.endpoints.update.trim() === ''
          ? `/${this.component}`
          : this.endpoints.add

      const formValue = this.getFormValue()
      if (formValue == null || formValue.id == null) {
        console.log('Invalid form value!')
        return
      }
      this.$axios
        .put(endpoint + '/' + formValue.id, formValue)
        .then((r) => {
          this.$emit('succeeded', r)
        })
        .catch((e) => {
          this.$emit('failed', e)
        })
    },
    remove() {
      const endpoint =
        _.isEmpty(this.endpoints) ||
        this.endpoints.delete == null ||
        this.endpoints.delete.trim() === ''
          ? `/${this.component}`
          : this.endpoints.add

      const formValue = this.getFormValue()
      if (formValue == null || formValue.id == null) {
        console.log('Invalid form value!')
        return
      }
      this.$axios
        .delete(endpoint + '/' + formValue.id)
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
