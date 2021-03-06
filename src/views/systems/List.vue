<template>
    <v-container>
        <div v-if="!systems.data">
            <v-skeleton-loader type="card-heading" class="mt-4" />
            <v-skeleton-loader type="card-heading" class="mt-4" />
        </div>
        <v-card v-else-if="systems.data.systems.length == 0"
                class="mt-4">
            <v-card-text>
                No systems could be found.
            </v-card-text>
        </v-card>
        <div v-else>
            <v-card v-for="(system, i) in systems.data.systems" :key="'system-' + i"
                    class="mt-4">
                <v-card-text class="pb-0">
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

                <v-row
                        align="center" justify="space-around"
                        no-gutters class="pa-5">
                    <v-col v-for="(location, j) in system.locations" :key="'location-' + i + '-' + j"
                            class="text-center">
                        <location-image :location="location" class="mx-auto" />
                        <div class="overline mt-2">{{ location.symbol }}</div>
                    </v-col>
                </v-row>
            </v-card>
        </div>
    </v-container>
</template>

<script>
    import Sun from '../../components/Sun.vue';
    import LocationImage from '../../components/LocationImage.vue';

    export default {
        components: { Sun, LocationImage },
        chimera: {
            systems: {
                url: '/game/systems',
                // Highly doubtful that this will change minute-to-minute, but update it just in case
                interval: 1000 * 60 * 5
            }
        }
    }
</script>