<template>
    <v-skeleton-loader v-if="!ship"
        type="card-heading, list-item, list-item" />
    <v-card v-else
            class="fill-height">
        <v-card-text class="pb-0">
            <v-row align="center">
                <v-col class="shrink">
                    <ship-image :type="ship.type" />
                </v-col>
                <v-col>
                    {{ ship.type }}
                </v-col>
                <v-col class="text-right">
                    <v-chip small label>
                        {{ ship.manufacturer }}
                    </v-chip>
                </v-col>
            </v-row>

            <!-- Removed because the types are just the Manufacturer + Class
                <div class="text-h5 text--primary">
                    {{ ship.type }}
                </div>
            -->
        </v-card-text>

        <v-list-item>
            <div>Speed</div>
            
            <v-divider class="mx-3" />

            <span v-for="i in ship.speed" :key="'speed-' + i"
                class="pa-2 mr-1 primary rounded-circle d-inline-block" />
            <span v-for="i in (3 - ship.speed)" :key="'speed-' + (ship.speed + i)"
                class="pa-2 mr-1 grey rounded-circle d-inline-block" />
        </v-list-item>
        <v-list-item v-for="[ name, id ] in [ ['Max Cargo', 'maxCargo'], ['Plating', 'plating'], ['Weapons', 'weapons'] ]" :key="id">
            <div>{{ name }}</div>
            
            <v-divider class="mx-3" />

            <v-chip small label>
                {{ ship[id] }}
            </v-chip>
        </v-list-item>

        <v-card-actions>
            <v-chip>
                {{ ship.cargo.length }} in Cargo
            </v-chip>

            <v-divider class="ml-2 mr-5" />
            
            <v-btn
                    depressed color="primary"
                    @click="reveal = true">
                View Cargo
            </v-btn>
        </v-card-actions>

        <v-expand-transition>
            <v-card
                v-if="reveal"
                class="transition-fast-in-fast-out v-card--reveal"
                style="height: calc(100% - 56px);"
            >
                
                <v-card-actions class="pt-3">
                    <v-btn text v-if="ship.purchaseLocations.length > 3">
                        View All
                    </v-btn>

                    <v-spacer />
                    
                    <v-btn text @click="reveal = false">
                        Return
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-expand-transition>
    </v-card>
</template>

<style scoped>
    .v-card--reveal {
        bottom: 0;
        opacity: 1 !important;
        position: absolute;
        width: 100%;
    }
</style>

<script>
    import ShipImage from '@/components/ShipImage.vue';

    export default {
        components: { ShipImage },
        props: {
            ship: {
                type: Object
            }
        },
        chimera: {
            user() {
                return {
                    key: 'user',
                    url: '/users/' + this.$store.state.username,
                    interval: 1000 * 60
                }
            }
        },
        data: () => ({
            reveal: false,
            loading: false
        }),
        computed: {
            minimumPrice() {
                return this.ship.purchaseLocations.reduce((acc, loc) => (!acc || loc.price < acc ? loc.price : acc), null);
            },
            purchaseList() {
                return [ null, null, null ].map((v, i) => {
                    return this.ship.purchaseLocations[i] ?? null;
                })
            }
        },
        methods: {
            async purchaseShip(location) {
                this.loading = true;

                try {
                    await this.axios.post('/users/' + this.$store.state.username + '/ships', {
                        type: this.ship.type,
                        location
                    });

                    // Cache busting. Force a reload of the endpoints.
                    await this.user.reload(true);
                } catch(e) {
                    console.error(e);
                }

                this.reveal = false;
                this.loading = false;
            }
        }
    }
</script>