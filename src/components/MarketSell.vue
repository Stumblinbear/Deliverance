<template>
    <div v-if="!market.data">
        <v-skeleton-loader
            class="mb-2" type="list-item-avatar-two-line" />
        <v-skeleton-loader
            class="mb-2" type="list-item-avatar-two-line" />
    </div>
    <v-alert v-else-if="market.data.planet.marketplace.length == 0"
            type="error" tile>
        No market data could be found.
    </v-alert>
    <v-alert v-else-if="marketEntries.length == 0"
            type="error" tile>
        You have no cargo to sell.
    </v-alert>
    <v-window v-else
            v-model="step">
      <v-window-item value="select">
            <v-list dense>
                <v-list-item
                        v-for="(entry, i) in marketEntries" :key="i"
                        two-line>
                    <v-list-item-content>
                        <v-list-item-title>
                            {{ entry.symbol }}
                        </v-list-item-title>
                        <v-list-item-subtitle>
                            Buying at {{ entry.pricePerUnit }} Credits
                        </v-list-item-subtitle>
                    </v-list-item-content>

                    <v-btn
                            small depressed color="primary"
                            @click="selected = entry; step = 'quantity'">
                        Select
                    </v-btn>
                </v-list-item>
            </v-list>
      </v-window-item>

      <v-window-item v-if="selected"
            value="quantity">
        <v-card color="grey darken-3" class="ma-4">
            <v-list-item two-line>
                <v-list-item-content>
                    <v-list-item-title>
                        {{ selected.symbol }}
                    </v-list-item-title>
                    <v-list-item-subtitle>
                        {{ cargo.find(entry => entry.good == selected.symbol).quantity }} Available to Sell
                    </v-list-item-subtitle>
                </v-list-item-content>

                <div class="overline">
                    {{ selected.pricePerUnit }} Credits
                </div>
            </v-list-item>
        </v-card>

        <v-card-text>
            <v-text-field
                v-model="quantity"
                type="number"
                :min="0"
                :max="cargo.find(entry => entry.good == selected.symbol).quantity"
                label="Quantity"
                outlined
                hide-details />
        </v-card-text>

        <v-divider />

        <v-card-actions>
            <v-btn text @click="step = 'select'">
                Back
            </v-btn>

            <v-spacer />

            <v-btn
                    depressed color="primary"
                    :disabled="quantity <= 0"
                    @click="$emit('sell', selected.symbol, quantity)">
                Sell for {{ selected.pricePerUnit * quantity }} Credits
            </v-btn>
        </v-card-actions>
      </v-window-item>
    </v-window>
</template>

<script>
    export default {
        props: {
            origin: {
                type: String,
                required: true
            },
            cargo: {
                type: Array,
                required: true
            }
        },
        chimera: {
            market() {
                return {
                    key: 'market-' + this.origin,
                    url: '/game/locations/' + this.origin + '/marketplace',
                    interval: 1000 * 60
                }
            }
        },
        data: () => ({
            step: 'select',
            selected: null,
            quantity: 0
        }),
        computed: {
            marketEntries() {
                const entries = [
                    ...(this.market.data.planet.marketplace.filter(entry => this.cargo.some(cargoEntry => cargoEntry.good == entry.symbol)))
                ];

                entries.sort((a, b) => a.symbol.localeCompare(b.symbol))

                return entries;
            }
        }
    }
</script>