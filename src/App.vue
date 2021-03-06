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
        <v-container class="py-0 fill-height">
          <v-btn class="mr-2" text to="/">
            Home
          </v-btn>
          <v-btn class="mr-2" text to="/ships">
            Ships
          </v-btn>
          <v-btn class="mr-2" text to="/systems">
            Systems
          </v-btn>
          <v-btn class="mr-2" text to="/market/ships">
            Market
          </v-btn>

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
        </v-container>
      </v-app-bar>

      <v-main>
        <router-view />
      </v-main>
    </template>
  </v-app>
</template>

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
    data: () => ({ username: '', token: '' })
  }
</script>