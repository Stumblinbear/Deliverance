<template>
    <v-alert v-if="ships.error"
            prominent type="error">
      {{ ships }}
    </v-alert>
    <v-row v-else>
        <template v-if="!ships.data">
            <v-col v-for="i in 4" :key="i"
                    cols="12" sm="6" md="4">
                <v-skeleton-loader type="card-heading, list-item, list-item" />
            </v-col>
        </template>
        <v-col v-else-if="ships.data.ships.length == 0">
            <v-card>
                <v-card-text>
                    There are no ships available.
                </v-card-text>
            </v-card>
        </v-col>
        <v-col v-else
                v-for="(ship, i) in ships.data.ships.sort((a, b) => a.type.localeCompare(b.type))" :key="i"
                cols="12" sm="6" md="4">
            <v-card class="fill-height">
                <v-card-text class="pb-0">
                    <v-row align="center">
                        <v-col class="shrink">
                            <div v-if="SHIPS[ship.type]"
                                    class="ship-img">
                                <div v-for="(part, i) in SHIPS[ship.type]" :key="i"
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

                    <span v-for="i in ship.speed" :key="i"
                        class="pa-2 mr-1 primary rounded-circle d-inline-block" />
                    <span v-for="i in (3 - ship.speed)" :key="i"
                        class="pa-2 mr-1 grey rounded-circle d-inline-block" />
                </v-list-item>
                <v-list-item v-for="[ name, id ] in [ ['Max Cargo', 'maxCargo'], ['Plating', 'plating'], ['Weapons', 'weapons'] ]" :key="id">
                    <div>{{ name }}</div>
                    
                    <v-divider class="mx-3" />

                    <v-chip small label>
                        {{ ship[id] }}
                    </v-chip>
                </v-list-item>

                <v-card-actions class="align-self-end">
                    <v-chip>
                        {{ ship.purchaseLocations.reduce((acc, loc) => (!acc || loc.price &lt; acc ? loc.price : acc), null) }} Credits
                    </v-chip>

                    <v-divider class="ml-2 mr-5" />
                    
                    <v-btn depressed color="primary">
                        Purchase
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-col>
    </v-row>
</template>

<style>
    .ship-img {
        position: relative;
        width: 32px;
        height: 32px;
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

    export default {
        chimera: {
            user: {
                url: '/users/Stumblinbear',
                interval: 1000 * 60
            },
            ships: {
                url: '/game/ships',
                interval: 1000 * 60
            }
        },
        data: () => ({ SHIPS }),
        methods: {
            tile(u, v, x, y) {
                return 'background-position: ' + (-u * 32) + 'px ' + (-v * 32) + 'px; top:' + y + 'px; left: ' + x + 'px';
            }
        }
    }
</script>