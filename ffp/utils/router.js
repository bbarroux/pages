Vue.use(VueRouter);

const router = new VueRouter({
    routes: [
        {path: '/', component: accountList},
        {path: '/beneficiaries', component: beneficiaryList},
        {path: '/transactions', component: transactionList},
        {path: '/profile', component: profile},
    ]
})
