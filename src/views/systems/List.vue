<template>
    <v-container>
        <div v-if="!systems.data">
            <v-skeleton-loader type="card-heading" class="mb-4" />
            <v-skeleton-loader type="card-heading" class="mb-4" />
        </div>
        <v-alert v-else-if="systems.data.systems.length == 0"
                type="error">
            No systems could be found.
        </v-alert>
        <v-card v-else
                v-for="(system, i) in systems.data.systems" :key="'system-' + i"
                class="mb-4">
            <v-card-text>
                <v-row align="center">
                    <v-col class="shrink">
                        <sun :scale=".3" />
                    </v-col>
                    <v-col class="text-h5">
                        {{ system.name }}
                    </v-col>
                    <v-col class="shrink">
                        <v-btn class="float-right"
                            depressed color="primary"
                            :to="'/systems/' + system.symbol">
                            View
                        </v-btn>
                    </v-col>
                </v-row>
            </v-card-text>

            <v-divider />

            <v-row
                    align="center" justify="space-around"
                    no-gutters class="pa-5">
                <v-col v-for="(location, j) in sortOrbits(system.locations)" :key="'location-' + i + '-' + j"
                        class="text-center">
                    <location-image :location="location" class="mx-auto" />
                    <div class="pt-4">
                        <small>{{ location.symbol }}</small>
                    </div>
                </v-col>
            </v-row>
        </v-card>
    </v-container>
</template>

<script>
    import orbitalMixin from '@/utils/orbital';

    import Sun from '@/components/Sun.vue';
    import LocationImage from '@/components/LocationImage.vue';

    export default {
        components: { Sun, LocationImage },
        mixins: [ orbitalMixin ],
        chimera: {
            systems: {
                key: 'systems',
                url: '/game/systems',
                // Highly doubtful that this will change minute-to-minute, but update it just in case
                interval: 1000 * 60 * 5
            }
        }
    }
</script>