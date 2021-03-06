<template>
    <!-- eslint-disable-next-line vue/require-component-is -->
    <component v-bind="getLocationComponent(location)" />
</template>

<script>
    import Sun from './Sun.vue';
    import Planet from './Planet.vue';

    import seedRandom from 'seedrandom';

    export default {
        props: {
            location: {
                type: Object,
                required: true
            }
        },
        methods: {
            getLocationComponent({ type, symbol }) {
                const random = seedRandom(symbol);

                if(type == 'PLANET') {
                    let possible = [ 'dry-1', 'continental-1', 'lava-1' ];

                    return {
                        is: Planet,
                        type: possible[Math.floor(random() * possible.length)],
                        scale: .2 + (random() / 4)
                    };
                }

                if(type == 'MOON') {
                    return {
                        is: Planet,
                        type: 'barren-1',
                        scale: .1 + (random() / 10)
                    };
                }
                
                if(type == 'GAS_GIANT') {
                    return {
                        is: Planet,
                        type: 'gas-giant-1',
                        scale: .3 + (random() / 3)
                    };
                }

                return { is: Sun, scale: .420 }
            }
        }
    }
</script>