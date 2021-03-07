<template>
    <div>
        <v-alert class="text-center">
            The Home UI is currently under development. Please come back later.
        </v-alert>
    </div>
</template>

<script>
    export default {
        chimera: {
            user() {
                return {
                    key: 'user',
                    url: '/users/' + this.$store.state.username,
                    interval: 1000 * 60
                }
            }
        }
    }
</script>