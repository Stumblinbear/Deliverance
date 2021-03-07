<template>
    <v-container>
        <v-alert v-if="loans.error"
                prominent type="error">
            {{ loans }}
        </v-alert>
        <v-row v-else>
            <v-col cols="12" md="6">
                <div class="headline mb-4">
                    Current Loans
                </div>

                <div v-if="!user.data">
                    <v-skeleton-loader type="card-heading" class="mb-4" />
                    <v-skeleton-loader type="card-heading" class="mb-4" />
                </div>
                <v-alert v-else-if="user.data.user.loans.length == 0">
                    You have no outstanding loans.
                </v-alert>
                <v-card v-else
                        v-for="(loan, i) in user.data.user.loans" :key="i"
                        class="mb-4">
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
                        
                        <v-btn
                                depressed color="primary"
                                :disabled="loan.repaymentAmount > user.data.user.credits"
                                :loading="loading"
                                @click="repayLoan(loan.id)">
                            Repay Loan
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
            <v-col cols="12" md="6">
                <div class="headline mb-4">
                    Available Loans
                </div>

                <div v-if="!loans.data">
                    <v-skeleton-loader type="card-heading" class="mb-4" />
                    <v-skeleton-loader type="card-heading" class="mb-4" />
                    <v-skeleton-loader type="card-heading" class="mb-4" />
                </div>
                <v-alert v-else-if="loans.data.loans.length == 0">
                    You have no loan offers.
                </v-alert>
                <div v-else>
                    <v-card v-for="(loan, i) in loans.data.loans" :key="i"
                            class="mb-3">
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
                            
                            <v-btn
                                    depressed color="primary"
                                    :disabled="!user.data || user.data.user.loans.length > 0"
                                    :loading="loading"
                                    @click="acceptLoan(loan.type)">
                                Accept Loan
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </div>
            </v-col>
        </v-row>
    </v-container>
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
            },
            loans: {
                key: 'loans',
                url: '/game/loans',
                interval: 1000 * 60
            }
        },
        data: () => ({ loading: false }),
        methods: {
            async acceptLoan(type) {
                this.loading = true;

                try {
                    await this.axios.post('/users/' + this.$store.state.username + '/loans', {
                        type
                    });

                    // Cache busting. Force a reload of the endpoints.
                    await this.user.reload(true);
                    await this.loans.reload(true);
                } catch(e) {
                    console.error(e);
                }
                
                this.loading = false;
            },
            async repayLoan(id) {
                this.loading = true;

                try {
                    await this.axios.put('/users/' + this.$store.state.username + '/loans/' + id);

                    // Cache busting. Force a reload of the endpoints.
                    await this.user.reload(true);
                    await this.loans.reload(true);
                } catch(e) {
                    console.error(e);
                }
                
                this.loading = false;
            }
        }
    }
</script>