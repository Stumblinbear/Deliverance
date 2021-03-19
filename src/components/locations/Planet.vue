<template>
    <div
        class="planet"
        :style="'margin: ' + ((100 * scale) - 100) / 2 + 'px;transform:scale(' + scale + ',' + scale + ');background-image: url(\'/assets/planets/' + type + '.png\')'" />
</template>

<style>
    @keyframes planet { to { background-position: -12000px; } }

    .planet {
        height: 100px;
        width: 100px;

        background-image: url('/assets/planets/barren-0.png');
        animation: planet 12s steps(120) infinite;

        -ms-interpolation-mode: nearest-neighbor;
        image-rendering: crisp-edges;
        image-rendering: pixelated;
    }
</style>

<script>
    export default {
        props: {
            type: {
                type: String,
                default: 'barren-0'
            }, scale: {
                type: Number,
                default: 1
            }
        }
    }
</script>