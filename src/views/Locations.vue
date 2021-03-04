<template>
    <div>
        <div class="planet" />
        <div class="planet" style="background-image: url('/assets/planets/continental-1.png')" />
        <div class="planet" style="background-image: url('/assets/planets/lava-1.png')" />
        <div class="planet" style="background-image: url('/assets/planets/dry-1.png')" />

        <pre>
            {{ systems.data.systems }}
        </pre>
    </div>
</template>

<style>
    @keyframes spaceBody {
        to { background-position: -12000px; }
    }

    .sun {
        height: 200px;
        width: 200px;
        background-image: url('/assets/sun/sun-1.png');
        animation: spaceBody 12s steps(60) infinite;
    }

    .planet {
        height: 100px;
        width: 100px;
        background-image: url('/assets/planets/barren-1.png');
        animation: spaceBody 12s steps(120) infinite;
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