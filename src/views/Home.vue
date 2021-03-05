<template>
    <div>
        {{ user }}
    </div>
</template>

<script>
    export default {
        chimera: {
            user() {
                return {
                url: '/users/' + this.$store.state.username,
                interval: 1000 * 60
                }
            }
        }
    }
</script>