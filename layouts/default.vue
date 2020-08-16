<template>
  <v-app dark>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-switch
        v-model="$vuetify.theme.dark"
        :label="$vuetify.theme.dark === true ? 'Dark Theme' : 'Light Theme'"
        class="ml-3"
        color="primary"
      ></v-switch>
    </v-navigation-drawer>
    <v-app-bar :clipped-left="clipped" fixed app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-btn @click.stop="miniVariant = !miniVariant" icon>
        <v-icon>mdi-{{ `chevron-${miniVariant ? 'right' : 'left'}` }}</v-icon>
      </v-btn>
      <v-btn @click.stop="clipped = !clipped" icon>
        <v-icon>mdi-application</v-icon>
      </v-btn>

      <v-toolbar-title v-text="title" />
      <v-spacer />

      <!-- profile menu dropdown -->
      <v-menu close-on-click close-on-content-click offset-y>
        <template v-slot:activator="{ on }">
          <!-- cu v-if in loc de v-show mai face figuri la refresh -->
          <v-btn v-show="loggedIn" @click="" v-on="on" icon>
            <v-icon>account_circle</v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-item @click="$router.push('/profile')">
            <v-list-item-action>
              <v-icon>info</v-icon>
            </v-list-item-action>
            <!-- <v-list-item-icon><v-icon>exit_to_app</v-icon></v-list-item-icon> -->
            <v-list-item-content>
              <v-list-item-title v-text="'Profile info'" />
            </v-list-item-content>
          </v-list-item>
          <v-list-item @click="$auth.logout()">
            <v-list-item-action>
              <v-icon>exit_to_app</v-icon>
            </v-list-item-action>
            <!-- <v-list-item-icon><v-icon>exit_to_app</v-icon></v-list-item-icon> -->
            <v-list-item-content>
              <v-list-item-title v-text="'Logout'" />
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
    <v-navigation-drawer v-model="rightDrawer" :right="right" temporary fixed>
      <v-list>
        <v-list-item @click.native="right = !right">
          <v-list-item-action>
            <v-icon light>
              mdi-repeat
            </v-icon>
          </v-list-item-action>
          <v-list-item-title>Switch drawer (click me)</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <notifications position="top right" />

    <v-footer :fixed="fixed" app>
      <span>&copy; 2019</span>
    </v-footer>
  </v-app>
</template>

<script>
/* eslint-disable no-console */
export default {
  middleware: 'authenticated',
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'apps',
          title: 'Welcome',
          to: '/'
        },
        {
          icon: 'bubble_chart',
          title: 'Inspire',
          to: '/inspire'
        },
        {
          icon: 'category',
          title: 'Categories',
          to: '/categories'
        },
        {
          icon: 'smartphone',
          title: 'Products',
          to: '/products'
        },
        {
          icon: 'code',
          title: 'Platforms',
          to: '/platforms'
        }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'TrueView CM'
    }
  },
  computed: {
    loggedIn() {
      return this.$auth.loggedIn
    }
  },
  created() {
    console.log('Process env API: ' + process.env.API_BASE_URL)
  }
}
</script>
