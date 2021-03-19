<template>
    <div
        class="special"
        :style="'margin: ' + ((100 * scale) - 100) / 2 + 'px;transform:scale(' + scale + ',' + scale + ');background-image: url(\'/assets/special/' + type + '.png\')'" />
</template>

<style>
    .special {
        height: 128px;
        width: 128px;

        background-image: url('/assets/special/wormhole.png');

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
                default: 'wormhole'
            }, scale: {
                type: Number,
                default: 1
            }
        }
    }
</script>