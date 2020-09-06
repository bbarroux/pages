const accountList = Vue.component('account-list', {
    data: () => ({
        accountContexts: [
            {text: 'View', value: 'VIEW-ACCOUNT'},
            {text: 'Internal', value: 'INTERNAL-TRANSFER'},
            {text: 'Third Party', value: 'THIRD-PARTY-TRANSFER'},
            {text: 'Domestic', value: 'DOMESTIC-TRANSFER'},
            {text: 'MT103', value: 'MT103'},
        ],
        accountContext: 'VIEW-ACCOUNT',
        accounts: [],
        selectedAccount: null,
        selectedAccountStatements: [],
        columns: [
            {label: 'Number', field: 'number'},
            {label: 'Currency', field: 'currency'},
            {label: 'Type', field: 'type'},
        ],
        statementColumns: [
            {label: 'Date', field: 'postingDate'},
            {label: 'Value', field: 'valueDate'},
            {label: 'Ccy', field: 'currency'},
            {label: 'Amount', field: 'amount'},
            {label: 'Type', field: 'transactionType'},
            {label: 'Balance', field: 'balance'},
            {label: 'Ref', field: 'backOfficeReference'},
        ],
    }),
    template: `
        <div>
            <div class="context-chooser">
                <span>Context:</span>
                <select v-model="accountContext">
                    <option v-for="context in accountContexts" :value="context.value">{{context.text}}</option>
                </select>
            </div>
            <div class="master-detail">            
                <div class="master">
                    <vue-good-table :columns="columns"  :rows="accounts" @on-row-click="selectAccount" class="selectable-data-table"/>
                </div>
                <div class="detail" v-if="selectedAccount">
                    <div>
                        <vue-good-table :columns="statementColumns"  :rows="selectedAccountStatements"/>                    
                    </div>
                </div>
            </div>
        </div>`,
    methods: {
        clearSelected() {
            this.selectedAccount = null;
            this.selectedAccountStatements = [];
        },
        selectAccount(event) {
            this.clearSelected();
            const url = `${this.$apiPaths.accountAndBalances}/accounts/${event.row.id}`;
            this.$ffal.fetch(url).then(r => r.json()).then(j => this.selectedAccount = j);
            const statementUrl = url + "/statement?fromDate=2000-01-01&toDate=2050-01-01&limit=50"
            this.$ffal.fetch(statementUrl).then(r => r.json()).then(j => this.selectedAccountStatements = j.items);
        }
    },
    watch: {
        accountContext: {
            immediate: true,
            handler(newVal) {
                this.clearSelected()
                this.accountContext = newVal;
                this.accounts = [];
                const api = `${this.$apiPaths.accountAndBalances}/accounts?limit=200&accountContext=${newVal}`;
                this.$ffal.fetch(api).then(r => r.json()).then(j => this.accounts = j.items);
            }
        },
    },
})
