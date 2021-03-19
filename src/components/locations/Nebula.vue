<template>
    <div
        class="nebula"
        :style="'margin: ' + ((100 * scale) - 100) / 2 + 'px;transform:scale(' + scale + ',' + scale + ');background-image: url(\'/assets/nebulae/' + type + '.png\')'" />
</template>

<style>
    .nebula {
        height: 128px;
        width: 128px;

        background-image: url('/assets/nebulae/nebula-0.png');

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
                default: 'nebula-0'
            }, scale: {
                type: Number,
                default: 1
            }
        }
    }
</script>