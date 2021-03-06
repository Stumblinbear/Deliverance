<template>
    <div v-if="!locations.data">
        <v-skeleton-loader type="image" />

        <v-container>
            <v-skeleton-loader type="heading" class="mt-4" />
        </v-container>
    </div>
    <div v-else>
        <v-sheet rounded color="black" class="mb-5">
            <v-row class="system-view"
                    align="center" justify="space-around"
                    no-gutters>
                <sun />
                
                <v-col v-for="(location, j) in locations.data.locations" :key="'location-' + i + '-' + j"
                        class="text-center">
                    <location-image :location="location" class="mx-auto" />
                    <div class="overline mt-2">{{ location.symbol }}</div>
                </v-col>
            </v-row>
        </v-sheet>

        <v-container>
            <div class="text-h3">
                Omicron Eridani
            </div>
        </v-container>
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
    import Sun from '@/components/Sun.vue';
    import LocationImage from '@/components/LocationImage.vue';

    export default {
        components: { Sun, LocationImage },
        chimera: {
            locations() {
                return {
                    key: 'system-' + this.$route.params.id,
                    url: '/game/systems/' + this.$route.params.id + '/locations'
                }
            }
        }
    }
</script>