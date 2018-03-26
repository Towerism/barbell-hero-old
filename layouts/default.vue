<template lang="pug">
  v-app(id="inspire")
    v-navigation-drawer.grey.lighten-4(
      fixed
      clipped
      app
      v-model="drawer"
    )
      v-list.grey.lighten-4(
        dense
      )
        template(v-for="(item, i) in items")
          v-layout(
            row
            v-if="item.heading"
            align-center
            :key="i"
          )
            v-flex(xs6)
              v-subheader(v-if="item.heading") {{ item.heading }}
            v-flex.text-xs-right(xs6)
              v-btn(small flat) edit
          v-divider.my-3(
            dark
            v-else-if="item.divider"
            :key="i"
          )
          v-list-tile(
            :key="i"
            v-else
            :id="menuItemId(item.text)"
            @click="item.onClick"
          )
            v-list-tile-action
              v-icon {{ item.icon }}
            v-list-tile-content
              v-list-tile-title.grey--text {{ item.text }}
    v-toolbar(color="amber" app absolute clipped-left)
      v-toolbar-side-icon(@click.native="drawer = !drawer")
      span.title.ml-3.mr-5 Barbell&nbsp;
      span.text Hero
      v-text-field(
        solo-inverted
        flat
        label="Search"
        prepend-icon="search"
      )
      v-spacer
    v-content
      v-container.grey.lighten-4(fluid)
        nuxt
</template>

<script>
  import _ from 'lodash'
  export default {
    data () {
      return {
        drawer: null,
        items: [
          { icon: 'perm_identity', text: 'Logout', onClick: this.logout }
        ]
      }
    },
    props: {
      source: String
    },
    methods: {
      logout () {
        this.$auth.logout()
        this.$router.push('login')
      },
      menuItemId (menuItemText) {
        return `${_.camelCase(menuItemText)}MenuItem`
      }
    }
  }
</script>

<style>
  #keep main .container {
    height: 660px;
  }
  .navigation-drawer__border {
    display: none;
  }
  .text {
    font-weight: 400;
  }
</style>
