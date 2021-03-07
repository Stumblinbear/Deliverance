<template>
    <v-skeleton-loader v-if="!ship"
            class="mb-2" type="list-item-avatar-two-line" />
    <v-list-item v-else
            three-line>
        <ship-image :type="ship.type"
            class="mr-3" />

        <v-list-item-content>
            <v-list-item-title>
                {{ ship.type }}
            </v-list-item-title>
            <v-list-item-subtitle>
                <v-chip v-if="ship.cargo.length == 0"
                        small label>
                    No Cargo
                </v-chip>
                <v-chip v-else
                        v-for="(cargo, i) in ship.cargo" :key="i"
                        small label
                        class="mr-2">
                    {{ cargo.good }} x{{ cargo.quantity }}
                </v-chip>
            </v-list-item-subtitle>
        </v-list-item-content>

        <v-btn small depressed color="primary">
            Command
        </v-btn>
    </v-list-item>
</template>

<script>
    import ShipImage from '@/components/ShipImage.vue';

    export default {
        components: { ShipImage },
        props: {
            ship: {
                type: Object
            }
        }
    }
</script>