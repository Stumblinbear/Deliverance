<template>
    <v-container>
        <v-alert v-if="loans.error"
                prominent type="error">
            {{ loans }}
        </v-alert>
        <v-row v-else>
            <v-col cols="12" md="6">
                <div class="headline mb-4">
                    Your Loans
                </div>

                <div v-if="!user.data">
                    <v-skeleton-loader type="card-heading" class="mb-4" />
                    <v-skeleton-loader type="card-heading" class="mb-4" />
                </div>
                <v-alert v-else-if="user.data.user.loans.length == 0">
                    You have no loan history.
                </v-alert>
                <v-card v-else
                        v-for="(loan, i) in user.data.user.loans" :key="i"
                        class="mb-4">
                    
                    <template v-if="loan.status == 'CURRENT' || loan.status == 'LATE' || true">
                        <v-card-text class="pb-0">
                            <v-row>
                                <v-col>
                                    {{ prettifyEnum(loan.type) }}
                                </v-col>
                                <v-col class="text-right">
                                    <v-chip small label>
                                        {{ prettifyEnum(loan.status) }}
                                    </v-chip>
                                </v-col>
                            </v-row>
                            
                            <div class="text-h5 text--primary">
                                {{ abbreviate(loan.repaymentAmount) }} <small>Credits due</small> <timeago :datetime="loan.due" :auto-update="10" />
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
                    </template>
                    <v-card-text v-else>
                        <v-row align="center">
                            <v-col class="shrink">
                                {{ prettifyEnum(loan.type) }}
                            </v-col>
                            <v-col>
                                {{ abbreviate(loan.repaymentAmount) }} <small>Credits</small>
                            </v-col>
                            <v-col class="text-right">
                                <v-chip small label>
                                    {{ prettifyEnum(loan.status) }}
                                </v-chip>
                            </v-col>
                        </v-row>
                    </v-card-text>
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
                                    {{ prettifyEnum(loan.type) }}
                                </v-col>
                                <v-col class="text-right">
                                    {{ loan.termInDays }} days
                                </v-col>
                            </v-row>
                            
                            <div class="text-h5 text--primary">
                                {{ abbreviate(loan.amount) }} <small>Credits at</small> {{ loan.rate }}<small><sup>%</sup></small>
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
                                    :disabled="!user.data || hasCurrentLoan"
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
    import { prettifyEnum, abbreviate } from '@/utils/text';

    export default {
        mixins: [ prettifyEnum, abbreviate ],
        chimera: {
            user() {
                return {
                    key: 'user-' + this.$store.state.username,
                    url: '/users/' + this.$store.state.username,
                    interval: 1000 * 60
                }
            },
            loans() {
                return {
                    key:  this.$store.state.username + '-loans',
                    url: '/game/loans',
                    interval: 1000 * 60
                }
            }
        },
        data: () => ({ loading: false }),
        computed: {
            hasCurrentLoan() {
                return this.user.data.user.loans.some(loan => loan.status == 'CURRENT');
            }
        },
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
                    await this.$store.dispatch('UPDATE_CREDITS');
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
                    await this.$store.dispatch('UPDATE_CREDITS');
                } catch(e) {
                    console.error(e);
                }
                
                this.loading = false;
            }
        }
    }
</script>