const accountList = Vue.component('account-list', {
    data: () => ({
        currency:'USD',
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
        selectedAccountBalance : null,
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
            <div class="master-detail">            
                <div class="master">
                    <div class="context-chooser">
                        <span>Context:</span>
                        <select v-model="accountContext">
                            <option v-for="context in accountContexts" :value="context.value">{{context.text}}</option>
                        </select>
                        <span style="margin-left:20px">Currency:</span>
                        <select v-model="currency">
                            <option>USD</option>
                            <option>GBP</option>
                            <option>INR</option>
                        </select>
                    </div>
                    <vue-good-table v-if="accounts.length"  :row-style-class="isSelectedAccount" :columns="columns"  :rows="accounts" @on-row-click="selectAccount" class="selectable-data-table"/>
                </div>
                <div class="detail" v-if="selectedAccount">
                    <h2>Account {{selectedAccount.number}}</h2>
                    <table class="detail-table">
                        <tr><th>Type</th><td>{{selectedAccount.type}}</td><th>Format</th><td>{{selectedAccount.format}}</td></tr>
                        <tr><th>Status</th><td>{{selectedAccount.status}}</td><th>Customer Ref</th><td>{{selectedAccount.customerReference}}</td></tr>
                        <tr><td>&nbsp;</td></tr>
                        <tr><th>Bank</th><td>{{selectedAccount.bankShortName}}</td><th>Overdraft Limit</th><td>{{selectedAccount.overDraftLimit}}</td></tr>
                        <tr><th>Start Date</th><td>{{selectedAccount.accountStartDate}}</td><th>End Date</th><td>{{selectedAccount.accountEndDate}}</td></tr>
                        <tr><th>Principal</th><td>{{selectedAccount.principalAmount}}</td><th>Maturity</th><td>{{selectedAccount.maturityAmount}}</td></tr>
                        <tr><td>&nbsp;</td></tr>
                        <tr><th>Interest Rate</th><td>{{selectedAccount.interestRate}}</td></tr>
                        <tr><th>Rate (Credit)</th><td>{{selectedAccount.creditInterestRate}}</td><th>Rate (Debit)</th><td>{{selectedAccount.debitInterestRate}}</td></tr>
                    </table>
                    <div style="text-align:right;padding-right: 10px;margin-top: 18px">
                        <a href="#" class="btn">New Transfer</a>
                    </div>
                    <div v-if="selectedAccountBalance">
                        <h2>Balance ({{selectedAccountBalance.currency}})</h2>
                        <table class="no-border">
                            <tr>
                                <th>Date</th><td>{{selectedAccountBalance.balanceAsOn.substring(0,10)}}</td>
                                <th>Ledger</th><td>{{selectedAccountBalance.ledgerBalance}}</td>
                                <th>Available</th><td>{{selectedAccountBalance.availableBalance}}</td>
                            </tr>
                        </table>
                    </div>
                    <h2>Last statements</h2>
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
            this.selectedAccountBalance = null;
        },
        selectAccount(event) {
            this.clearSelected();
            const url = `${this.$apiPaths.accountAndBalances}/accounts/${event.row.id}`;
            const statementUrl = url + "/statement?fromDate=2000-01-01&toDate=2050-01-01&limit=50"
            const balanceUrl = url + "/balances";
            this.$fetchJson(url).then(j => this.selectedAccount = j);
            this.$fetchJson(statementUrl).then(j => this.selectedAccountStatements = j.items);
            this.$fetchJson(balanceUrl).then(j => this.selectedAccountBalance = j)
        },
        isSelectedAccount(row){
            return (this.selectedAccount && this.selectedAccount.id === row.id)?'selected-row':'';
        },
    },
    watch: {
        accountContext: {
            immediate: true,
            handler(newVal) {
                this.clearSelected()
                const url = `${this.$apiPaths.accountAndBalances}/accounts?limit=200&accountContext=${newVal}`;
                this.$fetchJson(url).then(j => this.accounts = j.items);
            }
        },
    },
})
