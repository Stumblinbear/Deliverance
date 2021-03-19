<template>
    <div class="sun" :style="'margin: ' + ((235 * scale) - 235) / 2 + 'px;transform:scale(' + scale + ',' + scale + ');background-image: url(\'/assets/suns/' + type + '.png\')'" />
</template>

<style>
    @keyframes sunX { to { background-position-x: -12000px; } }
    @keyframes sunY { to { background-position-y: -800px; } }

    .sun {
        height: 200px;
        width: 200px;

        background-image: url('/assets/sun/sun-0.png');
        animation: sunX 6s steps(60) infinite,
                    sunY 24s steps(4) infinite;

        -ms-interpolation-mode: nearest-neighbor;
        image-rendering: crisp-edges;
        image-rendering: pixelated;

        transform: scale(1.5, 1.5);
    }
</style>

<script>
    export default {
        props: {
            type: {
                type: String,
                default: 'sun-0'
            }, scale: {
                type: Number,
                default: 1
            }
        }
    }
</script>