<template>
    <div>
        <v-sheet rounded color="black" class="mb-5">
            <v-row align="center" justify="space-around" class="system-view">
                <div class="sun" />
                <div class="planet" style="transform:scale(.3, .3);background-image: url('/assets/planets/lava-1.png')" />
                <div class="planet" style="transform:scale(.6, .6);background-image: url('/assets/planets/dry-1.png')" />
                <div class="planet" style="transform:scale(.45, .45);background-image: url('/assets/planets/continental-1.png')" />
                <div class="planet-rings" style="transform:scale(1, 1);background-image: url('/assets/planets/rings-1.png')" />
                <div class="planet" style="transform:scale(.15, .15);background-image: url('/assets/planets/barren-1.png')" />
            </v-row>
        </v-sheet>

        <v-container>
            <div class="text-h3">
                Omicron Eridani
            </div>

            <pre v-if="systems">
                {{ systems.data.systems }}
            </pre>
        </v-container>
    </div>
</template>

<style>
    .system-view {
        position: relative;

        width: 100%;
        min-height: 30vh;

        background-size: 40px 40px;
        background-image: radial-gradient(circle, #222 1px, rgba(0, 0, 0, 0) 1px);
        background-repeat: repeat;
    }

    @keyframes sunX { to { background-position-x: -12000px; } }
    @keyframes sunY { to { background-position-y: -800px; } }

    .sun {
        height: 200px;
        width: 200px;

        background-image: url('/assets/sun/sun-1.png');
        animation: sunX 6s steps(60) infinite,
                    sunY 24s steps(4) infinite;

        -ms-interpolation-mode: nearest-neighbor;
        image-rendering: crisp-edges;
        image-rendering: pixelated;

        transform: scale(1.5, 1.5);
    }

    @keyframes planet { to { background-position: -12000px; } }

    .planet {
        height: 100px;
        width: 100px;

        background-image: url('/assets/planets/barren-1.png');
        animation: planet 12s steps(120) infinite;

        -ms-interpolation-mode: nearest-neighbor;
        image-rendering: crisp-edges;
        image-rendering: pixelated;
    }

    @keyframes planetRingsX { to { background-position-x: -9000px; } }
    @keyframes planetRingsY { to { background-position-y: -1200px; } }

    .planet-rings {
        height: 300px;
        width: 300px;

        background-image: url('/assets/planets/rings-1.png');
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
        chimera: {
            systems: {
                url: '/game/systems',
                interval: 1000 * 60
            }
        }
    }
</script>