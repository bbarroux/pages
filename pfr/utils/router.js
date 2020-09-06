Vue.use(VueRouter);

const router = new VueRouter({
    routes: [
        {path: '/', component: accountList},
        {path: '/counterparties', component: counterpartyList},
        {path: '/profile', component: profile},
    ]
})
