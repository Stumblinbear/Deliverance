<template>
    <div v-if="!locations.data">
        <v-skeleton-loader
            class="mb-2" type="list-item-avatar-two-line" />
        <v-skeleton-loader
            class="mb-2" type="list-item-avatar-two-line" />
    </div>
    <v-alert v-else-if="locations.data.locations.length == 0"
            type="error">
        No viable locations could be found.
    </v-alert>
    <v-list v-else
            dense>
        <v-list-item
                v-for="(location, i) in sortOrbits(locations.data.locations, originLocation)" :key="i"
                two-line>
            <v-list-item-content>
                <v-list-item-title>
                    {{ location.name }}
                </v-list-item-title>
                <v-list-item-subtitle>
                    {{ location.symbol }}
                </v-list-item-subtitle>
            </v-list-item-content>

            <v-list-item-content v-if="location.symbol != origin">
                <v-list-item-title v-if="speed">
                    ~{{ Math.floor((((getDistance(location, originLocation) * 15) / speed) + 60) / 60) }} Minutes
                </v-list-item-title>
                <v-list-item-subtitle>
                    ~{{ Math.round((getDistance(location, originLocation) / 4)) + (location.type == 'PLANET' ? 2 : 0) + 1 }} Fuel
                </v-list-item-subtitle>
            </v-list-item-content>
            
            <v-btn
                    small depressed color="primary"
                    :disabled="location.symbol == origin"
                    @click="$emit('select', location.symbol)">
                Select
            </v-btn>
        </v-list-item>
    </v-list>
</template>

<script>
    import orbitalMixin from '@/utils/orbital';

    export default {
        mixins: [ orbitalMixin ],
        props: {
            origin: {
                type: String,
                required: true
            },
            speed: {
                type: Number,
                default: null
            }
        },
        chimera: {
            locations() {
                return {
                    key: this.$store.state.username + '-system-' + this.origin.split('-', 2)[0],
                    url: '/game/systems/' + this.origin + '/locations',
                    interval: 1000 * 60
                }
            }
        },
        computed: {
            originLocation() {
                return this.locations.data.locations.find(loc => loc.symbol == this.origin);
            }
        }
    }
</script>