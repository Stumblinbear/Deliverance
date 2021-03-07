<template>
    <v-skeleton-loader v-if="!ship"
            class="mb-2" type="list-item-avatar-two-line" />
    <v-list-item v-else
            three-line>
        <ship-image :type="ship.type"
            class="mr-3" />

        <v-list-item-content>
            <v-list-item-title>
                {{ ship.type }}
            </v-list-item-title>
            <v-list-item-subtitle>
                <v-chip v-if="ship.cargo.length == 0"
                        small label>
                    No Cargo
                </v-chip>
                <v-chip v-else
                        v-for="(cargo, i) in ship.cargo" :key="i"
                        small label
                        class="mr-2">
                    {{ cargo.good }} x{{ cargo.quantity }}
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
                    width="500">
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
                        
                        <select-location
                            :origin="ship.location"
                            @select="moveShip" />
                    </template>
                </v-card>
            </v-dialog>

            <v-dialog
                    v-model="buy.reveal"
                    width="500">
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
                        
                        <market-buy
                            :origin="ship.location"
                            @buy="purchaseCargo" />
                    </template>
                </v-card>
            </v-dialog>

            <v-dialog
                    v-model="sell.reveal"
                    width="500">
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
                        
                        <sell-cargo
                            :origin="ship.location"
                            @select="offloadCargo" />
                    </template>
                </v-card>
            </v-dialog>
        </template>
        <v-dialog v-else
                v-model="flight.reveal"
                width="500">
            <v-card>
                <v-card-title class="headline">
                    Flight Plan
                </v-card-title>

                <v-divider />

                {{ flightPlan }}
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
    import ShipImage from '@/components/ShipImage.vue';
    import SelectLocation from '@/components/SelectLocation.vue';
    import MarketBuy from '@/components/MarketBuy.vue';

    export default {
        components: { ShipImage, SelectLocation, MarketBuy, SellCargo: MarketBuy },
        props: {
            ship: {
                type: Object
            }
        },
        chimera: {
            flightPlan() {
                return {
                    key: 'flight-plans',
                    url: '/users/' + this.$store.state.username + '/flight-plans',
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
                    this.move.error = 'Ship has insufficient fuel for flight plan.';
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

                    this.$emit('refresh');
                    
                    this.buy.reveal = false;
                } catch(e) {
                    this.buy.error = 'Ship has insufficient fuel for flight plan.';
                }
                
                this.buy.loading = false;
            }, async offloadCargo(type, count) {
                console.log(type, count);
            }
        }
    }
</script>