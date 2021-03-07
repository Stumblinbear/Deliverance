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
        :value="true" persistent max-width="350">
      <v-card class="pa-5">
        <v-text-field
          v-model="username"
          label="Username"
          outlined />
        <v-text-field
          v-model="token"
          label="API Token"
          outlined />

        <v-btn
            depressed block color="primary"
            @click="$store.dispatch('SET_AUTH', [ username, token ])">
          Set Username / Token
        </v-btn>
      </v-card>
    </v-dialog>
    <template v-else>
      <v-app-bar app flat>
        <v-app-bar-nav-icon
          class="d-flex d-md-none"
          @click="drawer = !drawer" />

        <img
          src="/assets/logo.png"
          class="bar-logo ml-3 mr-6 d-none d-sm-flex" />

        <div class="d-none d-md-flex">
          <v-btn
              v-for="([ name, to ], i) in nav" :key="'bar-' + i"
              class="mr-2" text :to="to">
            {{ name }}
          </v-btn>
        </div>

        <v-spacer />
      
        <v-progress-circular v-if="$chimera.$loading"
          class="mr-3"
          color="primary"
          indeterminate
          size="24"
          width="2" />

        <v-chip to="/loans">
          {{ user.data ? user.data.user.credits : 'N/A' }} Credits
        </v-chip>
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
  .bar-logo {
    height: 32px;

    -ms-interpolation-mode: nearest-neighbor;
    image-rendering: crisp-edges;
    image-rendering: pixelated;

    filter: drop-shadow(0 4px 0 #000)
  }
</style>

<script>
  export default {
    chimera: {
      status: {
        key: 'status',
        url: '/game/status',
        interval: 1000 * 60
      },

      user() {
        return {
          key: 'user',
          url: '/users/' + this.$store.state.username,
          interval: 1000 * 30
        }
      }
    },
    data: () => ({
      username: '', token: '',

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