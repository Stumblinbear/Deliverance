<template>
    <pre>
        {{ systems.data.systems }}
    </pre>
</template>

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