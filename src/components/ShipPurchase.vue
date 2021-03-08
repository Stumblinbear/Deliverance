<template>
    <v-skeleton-loader v-if="!ship"
        type="card-heading, list-item, list-item" />
    <v-card v-else
            outlined
            class="fill-height">
        <v-card-text class="pb-0">
            <v-row align="center">
                <v-col class="shrink">
                    <div v-if="SHIPS[ship.type]"
                            class="ship-img">
                        <div v-for="(part, i) in SHIPS[ship.type]" :key="'part-' + i"
                            class="ship-part" :style="tile(...part)" />
                    </div>
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
                {{ abbreviate(minimumPrice) }} Credits
            </v-chip>

            <v-divider class="ml-2 mr-5" />
            
            <v-btn
                    depressed color="primary"
                    :loading="!user.data"
                    :disabled="!user.data || minimumPrice > user.data.user.credits"
                    @click="reveal = true">
                Purchase
            </v-btn>
        </v-card-actions>

        <v-expand-transition>
            <v-card
                v-if="reveal"
                class="transition-fast-in-fast-out v-card--reveal"
                style="height: calc(100% - 56px);"
            >
                <v-list dense class="py-0">
                    <v-list-item v-for="(purchase, i) in purchaseList" :key="'location-' + i"
                            two-line>
                        <template v-if="purchase">
                            <v-list-item-content>
                                <v-list-item-title>
                                    {{ purchase.location }}
                                </v-list-item-title>
                                <v-list-item-subtitle>
                                    {{ abbreviate(purchase.price) }} Credits
                                </v-list-item-subtitle>
                            </v-list-item-content>

                            <v-list-item-action>
                                <v-btn
                                        small depressed color="primary"
                                        :loading="loading"
                                        @click="purchaseShip(purchase.location)">
                                    Buy
                                </v-btn>
                            </v-list-item-action>
                        </template>
                        <v-list-item-content v-else>
                            <v-divider />
                        </v-list-item-content>
                    </v-list-item>
                </v-list>

                <v-card-actions class="pt-3">
                    <v-btn text v-if="purchaseLocations.length > 3">
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
    .ship-img {
        position: relative;
        width: 32px;
        height: 32px;
        
        filter: drop-shadow(0 0 0px rgba(0, 0, 0, .6));

        transition: .3s ease-in-out;
    }

    .ship-img:hover {
        filter: drop-shadow(0 5px 0px rgba(0, 0, 0, .3));

        transform: translateY(-10px) scale(2);
    }

    .ship-part {
        position: absolute;
        top: 0;
        left: 0;

        width: 100%;
        height: 100%;

        background-image: url('/assets/ships.png');
        background-repeat: no-repeat;

        -ms-interpolation-mode: nearest-neighbor;
        image-rendering: crisp-edges;
        image-rendering: pixelated;
    }

    .v-card--reveal {
        bottom: 0;
        opacity: 1 !important;
        position: absolute;
        width: 100%;
    }
</style>

<script>
    const SHIPS = {
        'EM-MK-II': [ [ 0, 3, 0, 0 ], [ 0, 4, 0, 0 ], [ 8, 6, 0, -7 ], [ 1, 1, 0, -5 ] ],
        'EM-MK-III': [ [ 5, 3, 0, 0 ], [ 0, 5, 0, 4 ], [ 7, 6, 0, -7 ], [ 2, 1, 0, 0 ] ],
        
        'GR-MK-I': [ [ 2, 1, 0, 0 ], [ 2, 4, 0, 2 ], [ 13, 0, 0, 0 ] ],
        'GR-MK-II': [ [ 5, 1, 0, 0 ], [ 3, 4, 0, -2 ], [ 14, 1, 0, -5 ] ],
        'GR-MK-III': [ [ 4, 5, 0, 4 ], [ 3, 2, 0, 0 ], [ 15, 0, 0, 2 ] ],
        
        'JW-MK-I': [ [ 2, 4, 0, 0 ], [ 2, 6, 0, -6 ], [ 8, 0, 0, 0 ] ],
        'JW-MK-II': [ [ 3, 4, 0, 2 ], [ 1, 6, 0, -3 ], [ 3, 6, 0, -10 ], [ 7, 0, 0, 0 ] ],
        
        'ZA-MK-II': [ [ 9, 3, 0, 0 ], [ 2, 5, 0, -1 ], [ 13, 0, 0, -3 ] ],
        'ZA-MK-III': [ [ 8, 3, 0, -3 ], [ 2, 5, 0, 1 ], [ 15, 0, 0, 0 ] ],
    };

    import { abbreviate } from '@/utils/text';

    export default {
        mixins: [ abbreviate ],
        props: {
            ship: {
                type: Object
            }, system: {
                type: String
            }, location: {
                type: String
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
            SHIPS,
            
            reveal: false,
            loading: false
        }),
        computed: {
            purchaseLocations() {
                return this.ship.purchaseLocations.filter(entry => {
                    if(this.system) {
                        if(!entry.location.startsWith(this.system + '-')) {
                            return false;
                        }
                    }
                    
                    if(this.location) {
                        if(entry.location != this.location && !entry.location.endsWith('-' + this.location)) {
                            return false;
                        }
                    }

                    return true;
                })
            },

            minimumPrice() {
                return this.purchaseLocations.reduce((acc, loc) => (!acc || loc.price < acc ? loc.price : acc), null);
            },
            purchaseList() {
                return [ null, null, null ].map((v, i) => {
                    return this.purchaseLocations[i] ?? null;
                })
            }
        },
        methods: {
            tile(u, v, x, y) {
                return 'background-position: ' + (-u * 32) + 'px ' + (-v * 32) + 'px; top:' + y + 'px; left: ' + x + 'px';
            },
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