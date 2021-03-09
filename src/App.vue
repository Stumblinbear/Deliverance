<template>
  <v-app>
    <v-dialog :value="status.error" persistent max-width="350">
      <v-card>
        <v-card-title>
          An error occured
        </v-card-title>

        <v-card-text>
          SpaceTraders API appears to be experiencing problems.
        </v-card-text>

        <v-card-text>
          {{ status }}
        </v-card-text>
      </v-card>
    </v-dialog>

    <v-dialog v-if="!$store.state.username || !$store.state.token"
        :value="true" persistent max-width="375">
      <login />
    </v-dialog>
    <template v-else>
      <v-app-bar dense fixed flat>
        <v-app-bar-nav-icon
          class="d-flex d-md-none"
          @click="drawer = !drawer" />

        <img
          src="/assets/logo.png"
          class="logo logo-sm mr-5 d-none d-sm-flex" />

        <div class="d-none d-md-flex">
          <v-btn
              v-for="([ name, to ], i) in nav" :key="'bar-' + i"
              class="mr-2" text :to="to">
            {{ name }}
          </v-btn>
        </div>

        <v-spacer />
      
        <v-progress-circular v-if="$store.state.outstandingRequests > 0"
          class="mr-3"
          color="primary"
          indeterminate
          size="24"
          width="2" />

        <v-chip to="/loans">
          {{ user.data ? abbreviate(user.data.user.credits) : 'N/A' }} Credits
        </v-chip>

        <v-menu offset-y rounded="b-md">
          <template v-slot:activator="{ on, attrs }">
            <v-btn
                class="ml-3"
                tile color="primary"
                v-bind="attrs"
                v-on="on">
              {{ $store.state.username }}
            </v-btn>
          </template>

          <v-list dense tile class="py-0">
            <v-list-item
                v-for="(account, i) in $store.state.accounts.filter(auth => auth[1] != $store.state.token)" :key="i"
                @click="$store.dispatch('SET_AUTH', account)">
              <v-list-item-title>{{ account[0] }}</v-list-item-title>
            </v-list-item>

            <v-divider v-if="$store.state.accounts.length > 1" />

            <v-list-item @click="$store.dispatch('SET_AUTH', [ '', '' ])">
              <v-list-item-title>Switch Account</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-app-bar>

      <v-navigation-drawer
          app temporary
          v-model="drawer">
        <v-img
          src="/assets/logo.png"
          class="bar-logo mx-auto my-3" />

        <v-divider class="mt-3" />

        <v-list
            dense
            nav>
          <v-list-item
              v-for="([ name, to ], i) in nav" :key="'bar-' + i"
              link :to="to">
            <v-list-item-content>
              <v-list-item-title>{{ name }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>

      <v-main>
        <router-view />
      </v-main>
    </template>
  </v-app>
</template>

<style>
  html {
    max-height: 100vh;

    overflow-y: auto;

    scrollbar-color: #32303b #1c1b23;
    scrollbar-width: thin;
  }

  .v-main {
    height: calc(100vh - 48px);
    margin-top: 48px;
    
    overflow-y: auto;
  }

  .logo {
    -ms-interpolation-mode: nearest-neighbor;
    image-rendering: crisp-edges;
    image-rendering: pixelated;

    filter: drop-shadow(0 4px 0 #000)
  }

  .logo.logo-sm {
    height: 32px;
  }

  .logo.logo-lg {
    height: 48px;
  }
</style>

<script>
  import { abbreviate } from '@/utils/text';

  import Login from '@/components/Login.vue';

  export default {
    components: { Login },
    mixins: [ abbreviate ],
    chimera: {
      status: {
        key: 'status',
        url: '/game/status',
        interval: 1000 * 60
      },

      user() {
        return {
          key: 'user-' + this.$store.state.username,
          url: '/users/' + this.$store.state.username,
          interval: 1000 * 30
        }
      }
    },
    data: () => ({
      drawer: false,
      nav: [
        [ 'Home', '/' ],
        [ 'Ships', '/ships' ],
        [ 'Systems', '/systems' ],
        [ 'Market', '/market' ]
      ]
    })
  }
</script>