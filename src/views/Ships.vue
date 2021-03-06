<template>
    <v-container>
        <v-alert v-if="user.error"
                prominent type="error">
            {{ ships }}
        </v-alert>
        <v-row v-else>
            <v-col v-if="!user.data">
                <v-row>
                    <v-col cols="12">
                        <v-list-item>
                            <v-list-item-avatar>
                                <v-skeleton-loader type="avatar" />
                            </v-list-item-avatar>
                            <v-list-item-content>
                                <v-skeleton-loader type="heading" />
                            </v-list-item-content>
                        </v-list-item>
                    </v-col>

                    <v-col v-for="i in 4" :key="i"
                            cols="12" sm="6" md="4">
                        <ship-info />
                    </v-col>
                </v-row>
            </v-col>
            <v-col v-else-if="user.data.user.ships.length == 0">
                <v-card>
                    <v-card-text>
                        You have no ships in your fleet.
                    </v-card-text>
                </v-card>
            </v-col>
            <v-col v-else
                    v-for="(location, i) in locations" :key="'location-' + i"
                    cols="12" md="6">
                <v-card class="mb-3">
                    <v-list-item>
                        <v-list-item-avatar rounded="0">
                            <sun :scale=".3" />
                        </v-list-item-avatar>
                        <v-list-item-content>
                            <v-list-item-title class="headline">{{ location.id }}</v-list-item-title>
                        </v-list-item-content>
                        <v-list-item-action>
                            <v-btn small depressed color="primary" :to="'/systems/' + location.id">
                                View
                            </v-btn>
                        </v-list-item-action>
                    </v-list-item>

                    <v-divider />

                    <ship-list-item v-for="(ship, j) in location.ships" :key="'location-' + i + '-' + j"
                        :ship="ship" />
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    import Sun from '@/components/Sun.vue';
    import ShipListItem from '@/components/ShipListItem.vue';

    export default {
        components: { Sun, ShipListItem },
        chimera: {
            user() {
                return {
                    key: 'user',
                    url: '/users/' + this.$store.state.username,
                    interval: 1000 * 60
                }
            }
        },
        computed: {
            locations() {
                const locations = [];

                let location = null;
                for(let ship of [ ...this.user.data.user.ships ].sort((a, b) => a.type.localeCompare(b.type))) {
                    if(location && ship.location != location.name) {
                        locations.push(location);
                        location = null;
                    }

                    if(location == null) {
                        location = {
                            id: ship.location,
                            ships: [ ]
                        };
                    }

                    location.ships.push(ship);
                }

                if(location != null) {
                    locations.push(location);
                }

                return locations;
            }
        }
    }
</script>