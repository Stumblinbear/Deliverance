<template>
    <v-alert v-if="ships.error"
            prominent type="error">
        {{ ships }}
    </v-alert>
    <v-row v-else>
        <v-col v-if="!ships.data">
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
                    <ship-purchase />
                </v-col>
            </v-row>
        </v-col>
        <v-col v-else-if="ships.data.ships.length == 0">
            <v-alert type="warning">
                There are no ships available for purchase.
            </v-alert>
        </v-col>
        <v-col v-else>
            <v-row v-for="(manufacturer, i) in manufacturers"
                    :key="'manufacturer-' + i">
                <v-col cols="12">
                    <v-list-item>
                        <v-list-item-avatar rounded="0">
                            <v-img :src="'/assets/manufacturers/' + manufacturer.name.toLowerCase() + '.png'" />
                        </v-list-item-avatar>
                        <v-list-item-content>
                            <v-list-item-title>{{ manufacturer.name }}</v-list-item-title>
                            <v-list-item-subtitle>{{ manufacturer.info }}</v-list-item-subtitle>
                        </v-list-item-content>
                    </v-list-item>
                </v-col>
                <v-col v-for="ship in manufacturer.ships" :key="ship.type"
                        cols="12" sm="6" xl="4">
                    <ship-purchase
                        :ship="ship"
                        :system="system"
                        :location="location"
                        :max-credits="user.data.user.credits" />
                </v-col>
            </v-row>
        </v-col>
    </v-row>
</template>

<script>
    import ShipPurchase from '@/components/ShipPurchase.vue';

    const MANUFACTURERS = {
        'ELECTRUM': { info: 'Specializing in quick, agile fighter crafts. \'Cause you\'ve got a need for speed.' },
        'GRAVAGER': { info: 'Take \'yer shit where \'yer shit need t\' be took.' },
        'JACKSHAW': { info: 'Spacecraft at affordable rates. (disclaimer: not responsible for spontneous combustion)' },
        'ZETRA': { info: 'Balanced spaceships at unbalanced prices.' },
    };

    export default {
        components: { ShipPurchase },
        props: {
            system: {
                type: String
            }, location: {
                type: String
            }
        },
        chimera: {
            user() {
                return {
                    key: 'user-' + this.$store.state.username,
                    url: '/users/' + this.$store.state.username,
                    interval: 1000 * 60
                }
            },
            ships() {
                return {
                    key: this.$store.state.username + '-ships',
                    url: '/game/ships',
                    interval: 1000 * 60
                }
            }
        },
        computed: {
            manufacturers() {
                const manufacturers = [];

                let manufacturer = null;
                for(let ship of [ ...this.ships.data.ships ].sort((a, b) => a.type.localeCompare(b.type))) {
                    if(manufacturer && ship.manufacturer != manufacturer.name) {
                        manufacturers.push(manufacturer);
                        manufacturer = null;
                    }

                    if(manufacturer == null) {
                        const id = ship.manufacturer.toUpperCase();

                        manufacturer = {
                            id,
                            name: ship.manufacturer,
                            info: MANUFACTURERS[id].info,
                            ships: [ ]
                        };
                    }

                    manufacturer.ships.push(ship);
                }

                if(manufacturer != null) {
                    manufacturers.push(manufacturer);
                }

                return manufacturers;
            }
        }
    }
</script>