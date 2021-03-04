<template>
    <div>
        {{ user }}
    </div>
</template>

<script>
    export default {
        chimera: {
            user: {
                url: '/users/Stumblinbear',
                interval: 1000 * 10
            }
        }
    }
</script>