<template>
  <v-col>
    <v-data-table :headers="headers" :items="items">
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title v-if="title !== undefined && title != null">{{
            title
          }}</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>

          <!-- Search bar -->
          <v-row align="center" justify="center">
            <v-spacer v-if="!allowSearch"></v-spacer>
            <v-text-field
              v-else
              v-model="search"
              clearable
              append-icon="search"
              label="Search"
              class="ma-2 pt-3"
            >
              <template v-slot:append-outer>
                <v-dialog v-model="dialog" max-width="500px">
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      v-bind="attrs"
                      v-on="on"
                      color="primary"
                      dark
                      class="mb-2"
                      ><v-icon>add</v-icon>New Item</v-btn
                    >
                  </template>
                  <v-card>
                    <v-card-title>
                      <span class="headline">{{ formTitle }}</span>
                    </v-card-title>

                    <v-card-text>
                      <CrudWrapper
                        @succeeded="
                          dialog = false
                          refreshData()
                        "
                        :component="crudComponent"
                        :endpoints="crudEndpoints"
                      />
                    </v-card-text>
                  </v-card>
                </v-dialog>
              </template>
            </v-text-field>
          </v-row>
        </v-toolbar>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-icon @click="edit(item)" small class="mr-2">
          mdi-pencil
        </v-icon>
        <v-icon @click="remove(item)" small>
          mdi-delete
        </v-icon>
      </template>
    </v-data-table>
    <!-- Edit dialog -->
    <v-dialog v-model="editDialog" max-width="500px">
      <v-card>
        <v-card-title>
          <span class="headline">{{ formTitle }}</span>
        </v-card-title>

        <v-card-text>
          <CrudWrapper
            :key="editDialog"
            :value="editItem"
            @succeeded="
              editDialog = false
              editItem = false
              refreshData()
            "
            :component="crudComponent"
            :endpoints="crudEndpoints"
          />
        </v-card-text>
      </v-card>
    </v-dialog>
    <!-- Remove dialog -->
    <v-dialog v-model="removeDialog" max-width="500px">
      <v-card>
        <v-card-title>
          <span class="headline">{{ formTitle }}</span>
        </v-card-title>

        <v-card-text>
          <CrudWrapper
            :key="removeDialog"
            :value="editItem"
            @succeeded="
              removeDialog = false
              editItem = null
              refreshData()
            "
            :component="crudComponent"
            :endpoints="crudEndpoints"
          />
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-col>
</template>

<script>
const _ = require('lodash')
export default {
  name: 'CrudQueryTable',
  components: {
    // QueryTable: () => import('~/components/tables/QueryTable')
    CrudWrapper: () => import('~/components/crud/wrappers/CrudWrapper')
  },
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
      default: undefined
    },
    crudComponent: {
      type: String,
      required: true
    },
    endpoints: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      dialog: false,
      rawCrudMode: null,
      items: [],
      loadingData: false,
      search: null,
      editDialog: false,
      editDialogUpdates: 0,
      editItem: null,
      removeDialog: false,
      removeDialogUpdates: 0
    }
  },
  computed: {
    crudMode() {
      return this.rawCrudMode == null
        ? 'add'
        : this.rawCrudMode.toLowerCase() === 'update'
        ? 'update'
        : this.rawCrudMode.toLowerCase() === 'delete' ||
          this.rawCrudMode.toLowerCase() === 'remove'
        ? 'delete'
        : this.rawCrudMode.toLowerCase() === 'view' ||
          this.rawCrudMode.toLowerCase() === 'info' ||
          this.rawCrudMode.toLowerCase() === 'read'
        ? 'read'
        : 'add'
    },
    formTitle() {
      return this.crudMode === 'edit'
        ? 'Edit Item'
        : this.crudMode === 'delete'
        ? 'Delete Item'
        : this.crudMode === 'read'
        ? 'Item Details'
        : 'Add Item'
    },
    crudEndpoints() {
      return _.pick(this.endpoints, ['add', 'delete', 'update', 'read'])
    }
  },
  created() {
    this.refreshData()
  },
  methods: {
    edit(item) {
      this.rawCrudMode = 'edit'
      this.editDialogUpdates++
      this.editDialog = true
      this.editItem = item
      console.log('editing item')
    },
    remove(item) {
      this.rawCrudMode = 'delete'
      console.log('delete item')
    },
    succeeded() {
      this.dialog = false
    },

    refreshData() {
      this.loadingData = true
      this.$axios
        .get(this.apiController)
        .then((response) => {
          this.items = response.data.items
        })
        .catch((err) => {
          this.platform = null
          console.log('Could not fetch platform by id: ')
          console.log(err)
        })
        .finally(() => {
          this.loadingData = true
        })
    }
  }
}
</script>
