<template>
    <div
        class="asteroid"
        :style="'margin: ' + ((100 * scale) - 100) / 2 + 'px;transform:scale(' + scale + ',' + scale + ');background-image: url(\'/assets/asteroids/' + type + '.png\')'" />
</template>

<style>
    .asteroid {
        height: 100px;
        width: 100px;

        background-image: url('/assets/asteroids/asteroid-1.png');

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
                default: 'asteroid-1'
            }, scale: {
                type: Number,
                default: 1
            }
        }
    }
</script>