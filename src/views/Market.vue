<template>
    <v-container>
        <div v-if="loading"
                class="text-center pt-6">
            <v-progress-circular
                color="primary"
                indeterminate
                size="24"
                width="2" />
        </div>
        <v-alert v-else-if="ships.data.ships.length == 0"
                type="error">
            You have no ships collecting market data.
        </v-alert>
        <template v-else>
            <v-row v-if="bestTransactions.length > 0">
                <v-col v-for="(transaction, i) in bestTransactions" :key="i"
                        cols="12">
                    <v-card>
                        <v-card-text>
                            <v-row no-gutters align="center" justify="space-around">
                                <v-col>
                                    {{ transaction.symbol }}
                                </v-col>

                                <v-col class="text-center">
                                    <div class="overline">{{ transaction.buy.location.symbol }}</div>
                                    <div class="overline">{{ abbreviate(transaction.buy.pricePerUnit) }} Credits</div>
                                </v-col>
                                
                                <v-col class="text-center">
                                    <v-icon>mdi-arrow-right</v-icon>
                                </v-col>
                                
                                <v-col class="text-center">
                                    <div class="overline">{{ transaction.sell.location.symbol }}</div>
                                    <div class="overline">{{ abbreviate(transaction.sell.pricePerUnit) }} Credits</div>
                                </v-col>
                                
                                <v-col class="text-center">
                                    <v-icon>mdi-equal</v-icon>
                                </v-col>
                                
                                <v-col class="text-center">
                                    +{{ abbreviate(transaction.sell.pricePerUnit - transaction.buy.pricePerUnit) }} Credits
                                    <br />
                                    (+{{ ((transaction.sell.pricePerUnit - transaction.buy.pricePerUnit) / transaction.buy.pricePerUnit * 100).toFixed(0) }}%)
                                </v-col>
                            </v-row>
                        </v-card-text>
                    </v-card>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12" md="6">
                    <v-card>
                        <v-card-title>
                            Best Buy
                        </v-card-title>

                        <v-divider />

                        <v-list dense>
                            <v-list-item
                                    v-for="[ symbol, entry ] in Object.entries(bestBuy)" :key="symbol"
                                    two-line>
                                <v-list-item-avatar rounded="0">
                                    <location-image :location="entry.location" />
                                </v-list-item-avatar>

                                <v-list-item-content>
                                    <v-list-item-title>
                                        {{ symbol }}
                                    </v-list-item-title>
                                    <v-list-item-subtitle>
                                        {{ entry.available }} Available at {{ abbreviate(entry.pricePerUnit) }} Credits each on {{ entry.location.symbol }}
                                    </v-list-item-subtitle>
                                </v-list-item-content>
                            </v-list-item>
                        </v-list>
                    </v-card>
                </v-col>

                <v-col cols="12" md="6">
                    <v-card>
                        <v-card-title>
                            Best Sell
                        </v-card-title>

                        <v-divider />

                        <v-list dense>
                            <v-list-item
                                    v-for="[ symbol, entry ] in Object.entries(bestSell)" :key="symbol"
                                    two-line>
                                <v-list-item-avatar rounded="0">
                                    <location-image :location="entry.location" />
                                </v-list-item-avatar>

                                <v-list-item-content>
                                    <v-list-item-title>
                                        {{ symbol }}
                                    </v-list-item-title>
                                    <v-list-item-subtitle>
                                        {{ abbreviate(entry.pricePerUnit) }} Credits each on {{ entry.location.symbol }}
                                    </v-list-item-subtitle>
                                </v-list-item-content>
                            </v-list-item>
                        </v-list>
                    </v-card>
                </v-col>
            </v-row>
        </template>
    </v-container>
</template>

<script>
    import LocationImage from '@/components/LocationImage.vue';
    import { abbreviate } from '@/utils/text';

    export default {
        components: { LocationImage },
        mixins: [ abbreviate ],
        chimera: {
            ships() {
                return {
                    key: 'user-ships',
                    url: '/users/' + this.$store.state.username + '/ships',
                    interval: 1000 * 60
                }
            }
        },
        data: () => ({
            loading: false,
            
            locations: []
        }),
        computed: {
            bestBuy() {
                const bestBuy = { };

                for(let loc of this.locations) {
                    for(let entry of loc.marketplace) {
                        if(entry.available == 0) continue;

                        if(bestBuy[entry.symbol] && bestBuy[entry.symbol].pricePerUnit < entry.pricePerUnit) continue;

                        bestBuy[entry.symbol] = {
                            location: {
                                symbol: loc.symbol,
                                type: loc.type
                            },
                            pricePerUnit: entry.pricePerUnit,
                            available: entry.available
                        }
                    }
                }

                return bestBuy;
            }, bestSell() {
                const bestSell = { };

                for(let loc of this.locations) {
                    for(let entry of loc.marketplace) {
                        if(entry.available == 0) continue;

                        if(bestSell[entry.symbol] && bestSell[entry.symbol].pricePerUnit > entry.pricePerUnit) continue;

                        bestSell[entry.symbol] = {
                            location: {
                                symbol: loc.symbol,
                                type: loc.type
                            },
                            pricePerUnit: entry.pricePerUnit,
                            available: entry.available
                        }
                    }
                }

                return bestSell;
            }, bestTransactions() {
                const bestTransactions = [ ];

                for(let symbol in this.bestBuy) {
                    if(!this.bestSell[symbol]) continue;

                    if(this.bestBuy[symbol].pricePerUnit == this.bestSell[symbol].pricePerUnit) continue;

                    bestTransactions.push({
                        symbol,
                        buy: this.bestBuy[symbol],
                        sell: this.bestSell[symbol]
                    });
                }

                bestTransactions.sort((a, b) => a.symbol.localeCompare(b.symbol));

                return bestTransactions;
            }
        },
        methods: {
            async refresh() {
                this.loading = true;

                this.locations = [];

                await this.ships.reload();

                const locations = new Set(this.ships.data.ships.filter(ship => ship.location).map(ship => ship.location));

                for(let loc of locations) {
                    const { data } = await this.axios.get('/game/locations/' + loc + '/marketplace');

                    this.locations.push(data.planet);
                }

                this.loading = false;
            }
        },
        mounted() {
            this.refresh();
        }
    }
</script>