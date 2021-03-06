<template>
    <div v-if="!system.data">
        <v-skeleton-loader type="image" />

        <v-container>
            <v-skeleton-loader type="heading" class="mt-4" />
        </v-container>
    </div>
    <div v-else>
        <v-sheet
                rounded color="black" class="mb-5">
            <v-row class="system-view"
                    align="center" justify="space-around"
                    no-gutters>
                <sun />
                
                <v-col v-for="(location, j) in sortOrbits(system.data.system.locations)" :key="'location-' + j"
                        class="text-center">
                    <location-image :location="location" class="mx-auto" />
                    <div class="pt-4">
                        <small>{{ location.name }}</small>
                        <br />
                        <small>{{ parseFloat(getDistance(location).toFixed(1)) }} DU</small>
                    </div>
                </v-col>
            </v-row>
        </v-sheet>

        <v-container>
            <v-row align="center">
                <v-col
                        cols="12" sm="9"
                        class="text-h3 text-center text-sm-left">
                    {{ system.data.system.name }}
                </v-col>

                <v-col cols="12" sm="3">
                    <v-btn
                            depressed block color="primary"
                            @click="shipyard.reveal = true">
                        View Shipyard
                    </v-btn>
                </v-col>
            </v-row>

            <v-row justify="center">
                <v-col v-if="!ships.data">
                    <v-row>
                        <v-col cols="12" md="6">
                            <v-card>
                                <v-card-text>
                                    <v-skeleton-loader type="heading" />
                                </v-card-text>

                                <ship-list-item />
                            </v-card>
                        </v-col>
                        <v-col cols="12" md="6">
                            <v-card>
                                <v-card-text>
                                    <v-skeleton-loader type="heading" />
                                </v-card-text>

                                <ship-list-item />
                            </v-card>
                        </v-col>
                    </v-row>
                </v-col>
                <v-col v-else-if="ships.data.ships.length == 0">
                    <v-alert>
                        You have no ships in this system.
                    </v-alert>
                </v-col>
                <template v-else>
                    <v-col v-if="shipLocations.inTransit.length > 0"
                            cols="12" md="6">
                        <v-card>
                            <v-list-item>
                                <v-list-item-content>
                                    <v-list-item-title class="headline">In Transit</v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>

                            <v-divider />

                            <ship-list-item v-for="(ship, j) in shipLocations.inTransit" :key="'intransit-' + j"
                                :ship="ship"
                                @refresh="ships.reload(true)" />
                        </v-card>
                    </v-col>
        
                    <v-col
                            v-for="(location, i) in shipLocations.locations" :key="'location-' + i"
                            cols="12" md="6">
                        <v-card>
                            <v-list-item two-line v-if="system.data.system">
                                <v-list-item-content>
                                    <v-list-item-title class="headline">{{ location.name }}</v-list-item-title>
                                    <v-list-item-subtitle>{{ location.symbol }}</v-list-item-subtitle>
                                </v-list-item-content>
                                
                                <location-image :location="location" />
                            </v-list-item>

                            <v-divider />

                            <ship-list-item v-for="(ship, j) in location.ships" :key="'location-' + i + '-' + j"
                                :ship="ship"
                                :location="location"
                                @refresh="ships.reload(true)" />
                        </v-card>
                    </v-col>
                </template>
            </v-row>
        </v-container>

        <v-dialog
                v-model="shipyard.reveal"
                width="800"
                scrollable>
            <v-card>
                <v-card-title class="headline">
                    Shipyard
                </v-card-title>

                <v-divider />

                <v-card-text v-if="shipyard.loading"
                        class="text-center pt-6">
                    <v-progress-circular
                        color="primary"
                        indeterminate
                        size="24"
                        width="2" />
                </v-card-text>
                <template v-else>
                    <v-alert v-if="shipyard.error"
                            type="error"
                            tile
                            class="mb-0">
                        {{ shipyard.error }}
                    </v-alert>
                    
                    <v-card-text>
                        <shipyard
                            :system="$route.params.id"
                            @refresh="ships.reload(true)" />
                    </v-card-text>
                </template>
            </v-card>
        </v-dialog>
    </div>
</template>

<style>
    .system-view {
        position: relative;

        width: 100%;
        min-height: 30vh;

        background-size: 40px 40px;
        background-image: radial-gradient(circle, #222 1px, rgba(0, 0, 0, 0) 1px);
        background-repeat: repeat;
    }
</style>

<script>
    import orbitalMixin from '@/utils/orbital';

    import Sun from '@/components/locations/Sun.vue';
    import LocationImage from '@/components/LocationImage.vue';
    import Shipyard from '@/components/Shipyard.vue';
    import ShipListItem from '@/components/ShipListItem.vue';

    export default {
        components: { Sun, LocationImage, Shipyard, ShipListItem },
        mixins: [ orbitalMixin ],
        chimera: {
            ships() {
                return {
                    key: 'user-' + this.$store.state.username + '-ships',
                    url: '/users/' + this.$store.state.username + '/ships',
                    interval: 1000 * 10
                }
            },
            system() {
                return {
                    key: 'system-' + this.$route.params.id,
                    url: '/game/systems/' + this.$route.params.id
                }
            }
        },
        data: () => ({
            shipyard: {
                reveal: false,
                error: null,
                loading: false
            }
        }),
        computed: {
            shipLocations() {
                const locationMap = this.system.data.system.locations.reduce((acc, location) => {
                    acc[location.symbol] = location;
                    return acc;
                }, { });

                const locations = [];

                const inTransit = [];

                let location = null;
                for(let ship of [ ...this.ships.data.ships ].sort((a, b) => a.type.localeCompare(b.type))) {
                    if(!ship.location) {
                        inTransit.push(ship);
                        continue;
                    }

                    if(location && ship.location != location.symbol) {
                        locations.push(location);
                        location = null;
                    }

                    if(location == null) {
                        const symbol = ship.location;

                        location = {
                            symbol,
                            type: locationMap[symbol].type,
                            name: locationMap[symbol].name,
                            locations: locationMap[symbol],
                            ships: [ ]
                        };
                    }

                    location.ships.push(ship);
                }

                if(location != null) {
                    locations.push(location);
                }

                return {
                    inTransit,
                    locations
                };
            }
        }
    }
</script>