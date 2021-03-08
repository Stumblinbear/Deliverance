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
                v-for="(location, i) in sortOrbits(locations.data.locations)" :key="i"
                two-line>
            <v-list-item-content>
                <v-list-item-title>
                    {{ location.name }}
                </v-list-item-title>
                <v-list-item-subtitle>
                    {{ location.symbol }}
                </v-list-item-subtitle>
            </v-list-item-content>

            <v-btn
                    small depressed color="primary"
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
            }
        },
        chimera: {
            locations() {
                return {
                    key: 'system-' + this.origin,
                    url: '/game/systems/' + this.origin + '/locations',
                    interval: 1000 * 60
                }
            }
        }
    }
</script>