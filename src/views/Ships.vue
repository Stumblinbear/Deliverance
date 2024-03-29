<template>
    <v-container>
        <v-alert v-if="ships.error || systems.error"
                prominent type="error">
            {{ ships.error || systems.error }}
        </v-alert>
        <v-row v-else
                justify="center">
            <v-col v-if="!ships.data || !systems.data">
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
                    You have no ships in your fleet.
                </v-alert>
            </v-col>
            <template v-else>
                <v-col v-if="shipSystems.inTransit.length > 0"
                        cols="12" md="6">
                    <v-card>
                        <v-list>
                            <v-list-item>
                                <v-list-item-content>
                                    <v-list-item-title class="headline">In Transit</v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>

                            <v-divider />

                            <ship-list-item
                                v-for="(ship, j) in shipSystems.inTransit" :key="'intransit-' + j"
                                :ship="ship"
                                dense
                                @refresh="ships.reload(true)" />
                        </v-list>
                    </v-card>
                </v-col>

                <v-col
                        v-for="(system, i) in shipSystems.systems" :key="'system-' + i"
                        cols="12" md="6">
                    <v-card>
                        <v-list>
                            <v-list-item>
                                <div class="mr-4">
                                    <sun :scale=".27" />
                                </div>
                                <v-list-item-content>
                                    <v-list-item-title class="headline">{{ system.name }}</v-list-item-title>
                                </v-list-item-content>
                                <v-list-item-action>
                                    <v-btn small depressed color="primary" :to="'/systems/' + system.symbol">
                                        View
                                    </v-btn>
                                </v-list-item-action>
                            </v-list-item>

                            <v-divider />

                            <ship-list-item
                                v-for="(ship, j) in system.ships" :key="'system-' + i + '-' + j"
                                :ship="ship"
                                :location="system.locations[ship.location]"
                                dense
                                @refresh="ships.reload(true)" />
                        </v-list>
                    </v-card>
                </v-col>
            </template>
        </v-row>
    </v-container>
</template>

<script>
    import Sun from '@/components/locations/Sun.vue';
    import ShipListItem from '@/components/ShipListItem.vue';

    export default {
        components: { Sun, ShipListItem },
        chimera: {
            ships() {
                return {
                    key: 'user-' + this.$store.state.username + '-ships',
                    url: '/users/' + this.$store.state.username + '/ships',
                    interval: 1000 * 30
                }
            },
            systems() {
                return {
                    key: this.$store.state.username + '-systems',
                    url: '/game/systems'
                }
            }
        },
        computed: {
            shipSystems() {
                const systemMap = this.systems.data.systems.reduce((acc, system) => {
                    acc[system.symbol] = system;
                    return acc;
                }, { });

                const systems = [];

                const inTransit = [];

                let system = null;
                for(let ship of [ ...this.ships.data.ships ].sort((a, b) => a.location?.localeCompare(b.location))) {
                    if(!ship.location) {
                        inTransit.push(ship);
                        continue;
                    }

                    if(system && ship.location.split('-')[0] != system.symbol) {
                        systems.push(system);
                        system = null;
                    }

                    if(system == null) {
                        const symbol = ship.location.split('-')[0];

                        system = {
                            symbol,
                            name: systemMap[symbol].name,
                            locations: systemMap[symbol].locations.reduce((acc, location) => {
                                acc[location.symbol] = location;
                                return acc;
                            }, { }),
                            ships: [ ]
                        };
                    }

                    system.ships.push(ship);
                }

                if(system != null) {
                    systems.push(system);
                }

                return {
                    inTransit,
                    systems
                };
            }
        }
    }
</script>