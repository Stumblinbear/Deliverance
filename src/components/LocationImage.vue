<template>
    <!-- eslint-disable-next-line vue/require-component-is -->
    <component v-bind="getLocationComponent(location)" />
</template>

<script>
    import Sun from './locations/Sun.vue';
    import Planet from './locations/Planet.vue';
    import Asteroid from './locations/Asteroid.vue';
    import Nebula from './locations/Nebula.vue';
    import Special from './locations/Special.vue';

    import seedRandom from 'seedrandom';

    export default {
        props: {
            location: {
                type: Object,
                required: true
            },
            scale: {
                type: Number
            }
        },
        methods: {
            getLocationComponent({ type, symbol }) {
                const random = seedRandom(symbol);

                if(type == 'PLANET') {
                    let possible = [ 'dry-0', 'continental-0', 'lava-0' ];

                    return {
                        is: Planet,
                        type: possible[Math.floor(random() * possible.length)],
                        scale: this.scale || (.2 + (random() / 4))
                    };
                }

                if(type == 'MOON') {
                    return {
                        is: Planet,
                        type: 'barren-0',
                        scale: this.scale || (.1 + (random() / 10))
                    };
                }
                
                if(type == 'GAS_GIANT') {
                    return {
                        is: Planet,
                        type: 'gas-giant-0',
                        scale: this.scale || (.3 + (random() / 3))
                    };
                }
                
                if(type == 'ASTEROID') {
                    return {
                        is: Asteroid,
                        type: 'asteroid-' + Math.floor(random() * 6),
                        scale: this.scale || (.3 + (random() / 3))
                    };
                }
                
                if(type == 'NEBULA') {
                    return {
                        is: Nebula,
                        type: 'nebula-' + Math.floor(random() * 1),
                        scale: this.scale || (.3 + (random() / 3))
                    };
                }
                
                if(type == 'WORMHOLE') {
                    return {
                        is: Special,
                        type: 'wormhole',
                        scale: this.scale || .5
                    };
                }

                return { is: Sun, scale: .420 }
            }
        }
    }
</script>