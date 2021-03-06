<template>
    <div v-if="SHIPS[type]"
            class="ship-img">
        <div v-for="(part, i) in SHIPS[type]" :key="'part-' + i"
            class="ship-part" :style="tile(...part)" />
    </div>
</template>

<style scoped>
    .ship-img {
        position: relative;
        width: 32px;
        height: 32px;
        
        filter: drop-shadow(0 0 0px rgba(0, 0, 0, .6));

        transition: .3s ease-in-out;
    }

    .ship-img:hover {
        filter: drop-shadow(0 5px 0px rgba(0, 0, 0, .3));

        transform: translateY(-10px) scale(2);
    }

    .ship-part {
        position: absolute;
        top: 0;
        left: 0;

        width: 100%;
        height: 100%;

        background-image: url('/assets/ships.png');
        background-repeat: no-repeat;

        -ms-interpolation-mode: nearest-neighbor;
        image-rendering: crisp-edges;
        image-rendering: pixelated;
    }
</style>

<script>
    const SHIPS = {
        'EM-MK-II': [ [ 0, 3, 0, 0 ], [ 0, 4, 0, 0 ], [ 8, 6, 0, -7 ], [ 1, 1, 0, -5 ] ],
        'EM-MK-III': [ [ 5, 3, 0, 0 ], [ 0, 5, 0, 4 ], [ 7, 6, 0, -7 ], [ 2, 1, 0, 0 ] ],
        
        'GR-MK-I': [ [ 2, 1, 0, 0 ], [ 2, 4, 0, 2 ], [ 13, 0, 0, 0 ] ],
        'GR-MK-II': [ [ 5, 1, 0, 0 ], [ 3, 4, 0, -2 ], [ 14, 1, 0, -5 ] ],
        'GR-MK-III': [ [ 4, 5, 0, 4 ], [ 3, 2, 0, 0 ], [ 15, 0, 0, 2 ] ],
        
        'JW-MK-I': [ [ 2, 4, 0, 0 ], [ 2, 6, 0, -6 ], [ 8, 0, 0, 0 ] ],
        'JW-MK-II': [ [ 3, 4, 0, 2 ], [ 1, 6, 0, -3 ], [ 3, 6, 0, -10 ], [ 7, 0, 0, 0 ] ],
        
        'ZA-MK-II': [ [ 9, 3, 0, 0 ], [ 2, 5, 0, -1 ], [ 13, 0, 0, -3 ] ],
        'ZA-MK-III': [ [ 8, 3, 0, -3 ], [ 2, 5, 0, 1 ], [ 15, 0, 0, 0 ] ],
    };

    export default {
        props: {
            type: {
                type: String,
                required: true
            }
        },
        data: () => ({ SHIPS }),
        methods: {
            tile(u, v, x, y) {
                return 'background-position: ' + (-u * 32) + 'px ' + (-v * 32) + 'px; top:' + y + 'px; left: ' + x + 'px';
            }
        }
    }
</script>