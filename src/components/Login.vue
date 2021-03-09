<template>
    <v-card v-if="tabs != null">
        <div class="py-5">
            <img
                src="/assets/logo.png"
                class="d-block logo logo-lg mx-auto" />
        </div>

        <v-divider />
        
        <v-tabs v-model="tabs" fixed-tabs>
          <v-tab>
            Switch
          </v-tab>

          <v-tab>
            Import
          </v-tab>

          <v-tab>
            Create
          </v-tab>
        </v-tabs>

        <v-divider />
        
        <v-alert v-if="error"
                type="error"
                tile
                class="mb-0">
            {{ error }}
        </v-alert>

        <v-tabs-items v-model="tabs">
            <v-tab-item :value="0">
                <v-alert v-if="$store.state.accounts.length == 0"
                        class="mb-0 text-center">
                    No accounts have been added, yet.
                </v-alert>
                <v-list v-else
                        tile class="py-0">
                    <v-list-item
                            v-for="(account, i) in $store.state.accounts" :key="i"
                            @click="$store.dispatch('SET_AUTH', account)">
                        <v-list-item-content>
                            <v-list-item-title>{{ account[0] }}</v-list-item-title>
                        </v-list-item-content>
                        <v-list-item-action>
                            <v-btn
                                    icon color="red"
                                    @click.stop="$store.dispatch('REMOVE_ACCOUNT', account)">
                                <v-icon>mdi-delete</v-icon>
                            </v-btn>
                        </v-list-item-action>
                    </v-list-item>
                </v-list>
            </v-tab-item>

            <v-tab-item :value="1">
                <div class="pa-5">
                    <v-text-field
                        v-model="username"
                        label="Username"
                        :disabled="loading"
                        outlined />
                    <v-text-field
                        v-model="token"
                        label="API Token"
                        :disabled="loading"
                        outlined />

                    <v-btn
                            depressed block color="primary"
                            :loading="loading"
                            @click="$store.dispatch('SET_AUTH', [ username, token ])">
                        Set Username / Token
                    </v-btn>
                </div>
            </v-tab-item>

            <v-tab-item :value="2">
                <div class="pa-5">
                    <v-text-field
                        v-model="username"
                        label="Username"
                        :disabled="loading"
                        outlined />

                    <v-btn
                            depressed block color="primary"
                            :loading="loading"
                            @click="createAccount">
                        Create Account
                    </v-btn>
                </div>
            </v-tab-item>
        </v-tabs-items>
    </v-card>
</template>

<script>
    export default {
        data: () => ({
            tabs: null,
            
            error: null,
            loading: false,

            username: '', token: ''
        }),
        methods: {
            async createAccount() {
                this.loading = true;

                try {
                    const result = await this.axios.post('/users/' + this.username + '/token');

                    this.$store.dispatch('SET_AUTH', [ this.username, result.data.token ]);
                } catch(e) {
                    this.error = e.response.data;
                }

                this.loading = false;
            }
        },
        mounted() {
            this.tabs = this.$store.state.accounts.length > 0 ? 0 : 1;
        }
    }
</script>