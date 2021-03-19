<template>
    <v-skeleton-loader v-if="!ship"
            class="mb-2" type="list-item-avatar-two-line" />
    <v-list-item v-else
            :three-line="!dense"
            :dense="dense">
        <ship-image :type="ship.type"
            class="mr-3" />

        <v-list-item-content>
            <v-list-item-title>
                {{ ship.type }}
            </v-list-item-title>
            <v-list-item-subtitle>
                <v-chip v-if="ship.cargo.length == 0"
                        :small="!dense" :x-small="dense"
                        label>
                    No Cargo
                </v-chip>
                <v-chip v-else
                        v-for="(cargo, i) in ship.cargo" :key="i"
                        :small="!dense" :x-small="dense"
                        label
                        class="mr-2">
                    {{ prettifyEnum(cargo.good) }} x{{ cargo.quantity }}
                </v-chip>
            </v-list-item-subtitle>
        </v-list-item-content>

        <v-btn v-if="ship.location"
                small depressed color="primary"
                @click="reveal = true">
            Command
        </v-btn>
        <v-btn v-else
                small depressed color="primary"
                @click="flightPlan.reload(); flight.reveal = true">
            View Flight Plan
        </v-btn>

        <v-expand-x-transition>
            <v-sheet
                    v-if="reveal"
                    class="transition-fast-in-fast-out v-list-item--reveal"
                    color="grey darken-3"
                    style="width: calc(100% - 64px)">
                <v-row
                        no-gutters
                        align="center"
                        class="flex-nowrap fill-height">
                    <v-btn
                            large tile
                            elevation="0"
                            color="warning"
                            class="shrink"
                            @click="warp.reveal = true; reveal = false">
                        Warp
                    </v-btn>
                    <v-btn
                            large tile
                            elevation="0"
                            color="green"
                            class="grow"
                            @click="travel.reveal = true; reveal = false">
                        Travel
                    </v-btn>
                    <v-btn
                            large tile
                            elevation="0"
                            color="primary"
                            class="grow"
                            @click="buy.reveal = true; reveal = false">
                        Buy
                    </v-btn>
                    <v-btn
                            large tile
                            elevation="0"
                            color="accent"
                            class="grow"
                            @click="sell.reveal = true; reveal = false">
                        Sell
                    </v-btn>

                    <v-col class="shrink fill-height">
                        <v-btn
                                elevation="0"
                                color="red"
                                large tile
                                @click="reveal = false">
                            <v-icon>mdi-close</v-icon>
                        </v-btn>
                    </v-col>
                </v-row>
            </v-sheet>
        </v-expand-x-transition>

        <template v-if="ship.location">
            <v-dialog
                    v-model="travel.reveal"
                    width="500"
                    scrollable>
                <v-card>
                    <v-card-title class="headline">
                        Travel
                    </v-card-title>

                    <v-divider />

                    <v-card-text v-if="travel.loading"
                            class="text-center pt-6">
                        <v-progress-circular
                            color="primary"
                            indeterminate
                            size="24"
                            width="2" />
                    </v-card-text>
                    <template v-else>
                        <v-alert v-if="travel.error"
                                type="error"
                                tile
                                class="mb-0">
                            {{ travel.error.message }}
                        </v-alert>
                        
                        <v-card-text class="pa-0">
                            <select-location
                                :origin="ship.location.split('-', 2)[0]"
                                :speed="ship.speed"
                                @select="moveShip" />
                        </v-card-text>
                    </template>
                </v-card>
            </v-dialog>

            <v-dialog
                    v-model="warp.reveal"
                    width="500"
                    scrollable>
                <v-card v-if="!warp.error || warp.error.code != 418">
                    <v-card-title class="headline">
                        Enter the Wormhole
                    </v-card-title>

                    <v-divider />

                    <location-image
                        class="mx-auto"
                        :location="{ type: 'WORMHOLE', symbol: ship.location }"
                        :scale="2" />

                    <v-card-text v-if="warp.loading"
                            class="text-center pt-6">
                        <v-progress-circular
                            color="primary"
                            indeterminate
                            size="24"
                            width="2" />
                        
                        <div class="mt-4">Science waits for nobody.</div>
                    </v-card-text>
                    <template v-else>
                        <v-alert v-if="warp.error"
                                type="error"
                                tile
                                class="mb-0">
                            {{ warp.error.message }}
                        </v-alert>
                        <v-card-text v-else>
                            <div class="text-center">
                                Are you absolutely sure you wish to enter the wormhole? Our sensors indicate a <b>HIGH PROPABILITY</b> of a complete loss of your ship.
                            </div>
                            <div class="mt-4 text-center">
                                <v-btn
                                        depressed color="warning"
                                        @click="warpShip">
                                    Brave the Void
                                </v-btn>
                            </div>
                        </v-card-text>
                    </template>
                </v-card>
                <v-card v-else>
                    <v-card-title class="headline">
                        I am a Teapot
                    </v-card-title>

                    <v-divider />

                    <img
                        src="/assets/teapot.png"
                        class="mx-auto"
                        width="35%" />

                    <v-alert
                            type="error"
                            tile
                            class="mb-0">
                        {{ warp.error.message }}
                    </v-alert>
                </v-card>
            </v-dialog>

            <v-dialog
                    v-model="buy.reveal"
                    width="500"
                    scrollable>
                <v-card>
                    <v-card-title class="headline">
                        Market Buy
                    </v-card-title>

                    <v-divider />

                    <v-card-text v-if="buy.loading"
                            class="text-center pt-6">
                        <v-progress-circular
                            color="primary"
                            indeterminate
                            size="24"
                            width="2" />
                    </v-card-text>
                    <template v-else>
                        <v-alert v-if="buy.error"
                                type="error"
                                tile
                                class="mb-0">
                            {{ buy.error.message }}
                        </v-alert>
                        
                        <v-card-text class="pa-0">
                            <market-buy
                                :origin="ship.location"
                                :credits="$store.state.credits"
                                :remaining-cargo="ship.maxCargo - ship.cargo.reduce((acc, entry) => acc + entry.totalVolume, 0)"
                                @buy="purchaseCargo" />
                        </v-card-text>
                    </template>
                </v-card>
            </v-dialog>

            <v-dialog
                    v-model="sell.reveal"
                    width="500"
                    scrollable>
                <v-card>
                    <v-card-title class="headline">
                        Sell
                    </v-card-title>

                    <v-divider />

                    <v-card-text v-if="sell.loading"
                            class="text-center pt-6">
                        <v-progress-circular
                            color="primary"
                            indeterminate
                            size="24"
                            width="2" />
                    </v-card-text>
                    <template v-else>
                        <v-alert v-if="sell.error"
                                type="error"
                                tile
                                class="mb-0">
                            {{ sell.error.message }}
                        </v-alert>
                        
                        <v-list-item>
                            <v-list-item-title>
                                Sell the Ship
                            </v-list-item-title>
                            <v-list-item-action>
                                <v-btn
                                        small depressed color="primary"
                                        :loading="sell.loading"
                                        @click="sellShip">
                                    Sell
                                </v-btn>
                            </v-list-item-action>
                        </v-list-item>

                        <v-divider />
                        
                        <v-card-text class="pa-0">
                            <market-sell
                                :origin="ship.location"
                                :cargo="ship.cargo"
                                @sell="sellCargo" />
                        </v-card-text>
                    </template>
                </v-card>
            </v-dialog>
        </template>
        <v-dialog v-else
                v-model="flight.reveal"
                width="300"
                scrollable>
            <v-card v-if="flightPlan.data">
                <v-card-title class="d-block text-h4 text-center">
                    Arrives 
                </v-card-title>

                <v-card-text class="text-h6 text-center">
                    <timeago :datetime="flightPlan.data.flightPlan.arrivesAt" :auto-update="1" />
                </v-card-text>

                <v-divider />

                <v-list class="py-0">
                    <v-list-item>
                        <v-list-item-title>Fuel Consumed</v-list-item-title>
                        <v-list-item-subtitle class="text-right">
                            {{ flightPlan.data.flightPlan.fuelConsumed }}
                        </v-list-item-subtitle>
                    </v-list-item>
                    <v-list-item>
                        <v-list-item-title>Destination</v-list-item-title>
                        <v-list-item-subtitle class="text-right">
                            {{ flightPlan.data.flightPlan.destination }}
                        </v-list-item-subtitle>
                    </v-list-item>
                    <v-list-item>
                        <v-list-item-title>Distance</v-list-item-title>
                        <v-list-item-subtitle class="text-right">
                            {{ flightPlan.data.flightPlan.distance }} DU
                        </v-list-item-subtitle>
                    </v-list-item>
                </v-list>
            </v-card>
        </v-dialog>
    </v-list-item>
</template>

<style scoped>
    .v-list-item--reveal {
        right: 0;
        opacity: 1 !important;
        position: absolute;
    }
</style>

<script>
    import { prettifyEnum } from '@/utils/text';
    
    import ShipImage from '@/components/ShipImage.vue';
    import SelectLocation from '@/components/SelectLocation.vue';
    import MarketBuy from '@/components/MarketBuy.vue';
    import MarketSell from '@/components/MarketSell.vue';
    import LocationImage from '@/components/LocationImage.vue';

    export default {
        components: { ShipImage, SelectLocation, MarketBuy, MarketSell, LocationImage },
        mixins: [ prettifyEnum ],
        props: {
            ship: {
                type: Object
            },
            location: {
                type: Object
            },
            dense: {
                type: Boolean,
                default: false
            }
        },
        chimera: {
            flightPlan() {
                return {
                    key: this.$store.state.username + '-flight-plans',
                    url: '/users/' + this.$store.state.username + '/flight-plans/' + (this.ship?.flightPlanId),
                    auto: false
                }
            }
        },
        data: () => ({
            reveal: false,
            
            flight: {
                reveal: false
            },

            travel: {
                reveal: false,
                error: null,
                loading: false
            }, warp: {
                reveal: false,
                error: null,
                loading: false
            }, buy: {
                reveal: false,
                error: null,
                loading: false
            }, sell: {
                reveal: false,
                error: null,
                loading: false
            }
        }),
        watch: {
            'travel.reveal'(val) {
                if(val) this.travel.error = null;
            }, 'warp.reveal'(val) {
                if(val) this.warp.error = null;
            }, 'buy.reveal'(val) {
                if(val) this.buy.error = null;
            }, 'sell.reveal'(val) {
                if(val) this.sell.error = null;
            }
        },
        methods: {
            async moveShip(destination) {
                this.travel.loading = true;
                this.travel.error = null;

                try {
                    await this.axios.post('/users/' + this.$store.state.username + '/flight-plans', {
                        shipId: this.ship.id,
                        destination
                    });

                    this.$emit('refresh');
                    
                    this.travel.reveal = false;
                } catch(e) {
                    this.travel.error = e.response.data.error;
                }
                
                this.travel.loading = false;
            }, async warpShip() {
                this.warp.loading = true;
                this.warp.error = null;

                try {
                    await this.axios.post('/users/' + this.$store.state.username + '/warp-jump', {
                        shipId: this.ship.id
                    });

                    this.$emit('refresh');
                    
                    this.warp.reveal = false;
                } catch(e) {
                    this.warp.error = e.response.data.error;
                }
                
                this.warp.loading = false;
            }, async purchaseCargo(symbol, quantity) {
                this.buy.loading = true;
                this.buy.error = null;

                try {
                    await this.axios.post('/users/' + this.$store.state.username + '/purchase-orders', {
                        shipId: this.ship.id,
                        good: symbol,
                        quantity
                    });
                    
                    await this.$store.dispatch('UPDATE_CREDITS');

                    this.$emit('refresh');
                    
                    this.buy.reveal = false;
                } catch(e) {
                    this.buy.error = e.response.data.error;
                }
                
                this.buy.loading = false;
            }, async sellShip() {
                this.sell.loading = true;
                this.sell.error = null;

                try {
                    await this.axios.delete('/users/' + this.$store.state.username + '/ships/' + this.ship.id);
                    
                    await this.$store.dispatch('UPDATE_CREDITS');

                    this.$emit('refresh');
                    
                    this.sell.reveal = false;
                } catch(e) {
                    this.sell.error = e.response.data.error;
                }
                
                this.sell.loading = false;
            }, async sellCargo(symbol, quantity) {
                this.sell.loading = true;
                this.sell.error = null;

                try {
                    await this.axios.post('/users/' + this.$store.state.username + '/sell-orders', {
                        shipId: this.ship.id,
                        good: symbol,
                        quantity
                    });
                    
                    await this.$store.dispatch('UPDATE_CREDITS');

                    this.$emit('refresh');
                    
                    this.sell.reveal = false;
                } catch(e) {
                    this.sell.error = e.response.data.error;
                }
                
                this.sell.loading = false;
            }
        }
    }
</script>