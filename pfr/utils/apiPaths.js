const path = (api) => `corporate/channels/${api}/me/v1`;
Vue.prototype.$apiPaths =  {
    accountAndBalances: path('accounts'),
    beneficiaries: path('beneficiary'),
    bankInformation: path('bank'),
    userProfile: path('profile'),
    counterparties: path('counterparty'),
    fxRates: path('fx-rate'),
    paymentsInitiation: path('payment-initiation'),
    staticData: path('static-data'),
    termDeposits: path('term-deposit'),
    transactionApprovals: path('transaction-approval'),
    transactionEnquiries: path('transaction-enquiry'),
}
