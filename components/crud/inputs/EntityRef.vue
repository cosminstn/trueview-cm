<template>
  <div>
    <v-dialog v-model="dialog">
      <v-card>
        <SearchWrapper :component="component" @row-clicked="rowClick" />
      </v-card>
    </v-dialog>
    <v-text-field v-model="entityId" :label="label" clearable readonly>
      <template slot="prepend-inner">
        <!-- <v-btn icon> -->

        <v-icon @click="dialog = true">list</v-icon>
        <!-- <v-icon @click="entityId = null" color="error">clear</v-ighjghjghjtyutyuhjghjggjhcon> -->
        <!-- </v-btn> -->
        <!-- <v-icon>search</v-icon> -->

        <!-- <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-icon @click="dialog = true" v-on="on">list</v-icon>
          </template>
          <span>Tooltip</span>
        </v-tooltip> -->
      </template>
    </v-text-field>
  </div>
</template>

<script>
export default {
  name: 'EntityRef',
  components: {
    SearchWrapper: () => import('~/components/search/wrappers/SearchWrapper')
  },
  props: {
    value: {
      type: String,
      default: null
    },
    component: {
      type: String,
      required: true
    },
    label: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      dialog: false,
      entityId: this.value || null
    }
  },
  watch: {
    entityId() {
      this.$emit('input', this.entityId)
    }
  },
  methods: {
    rowClick(row) {
      this.entityId = row.id
      this.dialog = false
    }
  }
}
</script>
