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

    <v-app-bar
        app color="white" flat>
      <v-container class="py-0 fill-height">
        <v-btn class="mr-2" text to="/">
          Home
        </v-btn>
        <v-btn class="mr-2" text to="/ships">
          Ships
        </v-btn>
        <v-btn class="mr-2" text to="/market">
          Market
        </v-btn>
        <v-btn class="mr-2" text to="/locations">
          Locations
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

    <v-dialog v-if="!$store.state.token"
        :value="true" persistent max-width="350">
      <v-card class="pa-5">
        <v-text-field
          v-model="token"
          label="SpaceTraders API Token"
          outlined />
          
        <v-btn
            depressed block color="primary"
            @click="$store.dispatch('SET_TOKEN', token)">
          Set Token
        </v-btn>
      </v-card>
    </v-dialog>
    <v-main v-else
        class="grey lighten-3">
      <v-container>
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
  export default {
    chimera: {
      status: {
        url: '/game/status',
        interval: 1000 * 60
      },

      user: {
        url: '/users/Stumblinbear',
        interval: 1000 * 30
      }
    },
    data: () => ({ token: '' })
  }
</script>