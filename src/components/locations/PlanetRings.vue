<template>
    <div
        class="planet-rings"
        :style="'margin: ' + ((300 * scale) - 300) / 2 + 'px;transform:scale(' + scale + ',' + scale + ');background-image: url(\'/assets/planets/' + type + '.png\')'" />
</template>

<style>
    @keyframes planetRingsX { to { background-position-x: -9000px; } }
    @keyframes planetRingsY { to { background-position-y: -1200px; } }

    .planet-rings {
        height: 300px;
        width: 300px;

        background-image: url('/assets/rings/rings-0.png');
        animation: planetRingsX 3s steps(30) infinite,
                    planetRingsY 12s steps(4) infinite;

        -ms-interpolation-mode: nearest-neighbor;
        image-rendering: crisp-edges;
        image-rendering: pixelated;

        transform: scale(.5, .5);
    }
</style>

<script>
    export default {
        props: {
            type: {
                type: String,
                default: 'rings-0'
            }, scale: {
                type: Number,
                default: 1
            }
        }
    }
</script>