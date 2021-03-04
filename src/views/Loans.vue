<template>
    <v-alert v-if="loans.error"
            prominent type="error">
      {{ loans }}
    </v-alert>
    <v-row v-else>
        <v-col cols="12" md="6">
            <div class="headline">
                Current Loans
            </div>

            <div v-if="!user.data">
                <v-skeleton-loader type="card-heading" class="mt-4" />
                <v-skeleton-loader type="card-heading" class="mt-4" />
            </div>
            <v-card v-else-if="user.data.user.loans.length == 0"
                    class="mt-4">
                <v-card-text>
                    You have no outstanding loans.
                </v-card-text>
            </v-card>
            <div v-else>
                <v-card v-for="(loan, i) in user.data.user.loans" :key="i"
                        class="mt-4">
                    <v-card-text class="pb-0">
                        <v-row>
                            <v-col>
                                {{ loan.type[0] + loan.type.substring(1).toLowerCase() }}
                            </v-col>
                            <v-col class="text-right">
                                <v-chip small label>
                                    {{ loan.status[0] + loan.status.substring(1).toLowerCase() }}
                                </v-chip>
                            </v-col>
                        </v-row>
                        
                        <div class="text-h5 text--primary">
                            {{ loan.repaymentAmount }} <small>Credits due</small> <timeago :datetime="loan.due" :auto-update="10" />
                        </div>
                    </v-card-text>

                    <v-card-actions>
                        <v-divider class="ml-2 mr-5" />
                        
                        <v-btn depressed color="primary">
                            Repay Loan
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </div>
        </v-col>
        <v-col cols="12" md="6">
            <div class="headline">
                Available Loans
            </div>

            <div v-if="!loans.data">
                <v-skeleton-loader type="card-heading" class="mt-4" />
                <v-skeleton-loader type="card-heading" class="mt-4" />
                <v-skeleton-loader type="card-heading" class="mt-4" />
            </div>
            <v-card v-else-if="loans.data.loans.length == 0"
                    class="mt-3">
                <v-card-text>
                    You have no loan offers.
                </v-card-text>
            </v-card>
            <div v-else>
                <v-card v-for="(loan, i) in loans.data.loans" :key="i"
                        class="mt-3">
                    <v-card-text class="pb-0">
                        <v-row>
                            <v-col>
                                {{ loan.type[0] + loan.type.substring(1).toLowerCase() }}
                            </v-col>
                            <v-col class="text-right">
                                {{ loan.termInDays }} days
                            </v-col>
                        </v-row>
                        
                        <div class="text-h5 text--primary">
                            {{ loan.amount }} <small>Credits at</small> {{ loan.rate }}<small><sup>%</sup></small>
                        </div>
                    </v-card-text>

                    <v-card-actions>
                        <v-chip v-if="loan.collateralRequired"
                                class="mr-2">
                            Collateral Required
                        </v-chip>

                        <v-divider class="ml-2 mr-5" />
                        
                        <v-btn depressed color="primary">
                            Accept Loan
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </div>
        </v-col>
    </v-row>
</template>

<script>
    export default {
        chimera: {
            user: {
                url: '/users/Stumblinbear',
                interval: 1000 * 60
            },
            loans: {
                url: '/game/loans',
                interval: 1000 * 60
            }
        }
    }
</script>