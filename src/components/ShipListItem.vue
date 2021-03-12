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
                            color="green"
                            class="grow"
                            @click="move.reveal = true; reveal = false">
                        Move
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
                            :disabled="ship.cargo.length == 0"
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
                    v-model="move.reveal"
                    width="500"
                    scrollable>
                <v-card>
                    <v-card-title class="headline">
                        Move Ship
                    </v-card-title>

                    <v-divider />

                    <v-card-text v-if="move.loading"
                            class="text-center pt-6">
                        <v-progress-circular
                            color="primary"
                            indeterminate
                            size="24"
                            width="2" />
                    </v-card-text>
                    <template v-else>
                        <v-alert v-if="move.error"
                                type="error"
                                tile
                                class="mb-0">
                            {{ move.error }}
                        </v-alert>
                        
                        <v-card-text class="pa-0">
                            <select-location
                                :origin="ship.location"
                                @select="moveShip" />
                        </v-card-text>
                    </template>
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
                            {{ buy.error }}
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
                        Sell Cargo
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
                            {{ sell.error }}
                        </v-alert>
                        
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
                width="500"
                scrollable>
            <v-card>
                <v-card-title class="headline">
                    Flight Plan
                </v-card-title>

                <v-divider />

                <div v-if="flightPlan.data">
                    {{ flightPlan.data.flightPlan }}
                </div>
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

    export default {
        components: { ShipImage, SelectLocation, MarketBuy, MarketSell },
        mixins: [ prettifyEnum ],
        props: {
            ship: {
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

            move: {
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
            'move.reveal'(val) {
                if(val) this.move.error = null;
            }, 'buy.reveal'(val) {
                if(val) this.buy.error = null;
            }, 'sell.reveal'(val) {
                if(val) this.sell.error = null;
            }
        },
        methods: {
            async moveShip(destination) {
                this.move.loading = true;
                this.move.error = null;

                try {
                    await this.axios.post('/users/' + this.$store.state.username + '/flight-plans', {
                        shipId: this.ship.id,
                        destination
                    });

                    this.$emit('refresh');
                    
                    this.move.reveal = false;
                } catch(e) {
                    this.move.error = e.response.data.error.message;
                }
                
                this.move.loading = false;
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
                    this.buy.error = e.response.data.error.message;
                }
                
                this.buy.loading = false;
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
                    this.sell.error = e.response.data.error.message;
                }
                
                this.sell.loading = false;
            }
        }
    }
</script>