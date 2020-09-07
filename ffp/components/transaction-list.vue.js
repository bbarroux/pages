const transactionList = Vue.component('transaction-list', {
    data: () => ({
        currency:'USD',
        transactions: [],
        selectedTransaction: null,
        selectedTransactionAudit: [],
        columns: [
            {label: 'Entity', field: 'entityShortName'},
            {label: 'Amount', field: 'amount'},
            {label: 'Currency', field: 'currency'},
            {label: 'Date', field: 'valueDate'},
            {label: 'Status', field: 'status'},
        ],
        auditColumns: [
            {label: 'Date', field: 'date'},
            {label: 'Name', field: 'fullName'},
            {label: 'Role', field: 'role'},
        ],
    }),
    template: `
        <div>
            <div class="master-detail">            
                <div class="master">
                    <vue-good-table v-if="transactions.length"  :row-style-class="isSelected" :columns="columns"  :rows="transactions" @on-row-click="selectTransaction" class="selectable-data-table"/>
                </div>
                <div class="detail" v-if="transactions.length && !selectedTransaction" style="padding-top:20px ">Select a transaction in the list.</div>
                <div class="detail" v-if="selectedTransaction">
                    <div v-if="selectedTransaction.status==='PENDING-APPROVAL'" style="text-align:right;padding-right: 10px;margin-top: 18px">
                        <a href="#" class="btn">Approve</a>
                        <a href="#" class="btn" >Reject</a>
                    </div>
                    <h2>Transaction Details</h2>
                    <table class="detail-table">
                        <tr><th>Account</th><td colspan="3">{{selectedTransaction.account}}</td></tr>
                        <tr><td>&nbsp;</td></tr>
                        <tr><th>From</th><td>{{selectedTransaction.entityShortName}}</td><th>to</th><td>{{selectedTransaction.counterpartyName}}</td></tr>
                        <tr><th>Amount</th><td>{{selectedTransaction.amount}}</td><th>Customer Ref</th><td>{{selectedTransaction.currency}}</td></tr>
                        <tr><td>&nbsp;</td></tr>
                        <tr><th>Product</th><td>{{selectedTransaction.productCode}}</td><th>Sub Product</th><td>{{selectedTransaction.subProductCode}}</td></tr>
                        <tr><th>Date</th><td>{{selectedTransaction.applicationDate}}</td><th>Value Date</th><td>{{selectedTransaction.valueDate}}</td></tr>
                        <tr><th>Type</th><td>{{selectedTransaction.transactionType}}</td><th>Trade</th><td>{{selectedTransaction.tradeType}}</td></tr>
                        <tr><td>&nbsp;</td></tr>
                        <tr><th>Comment</th><td colspan="3">{{selectedTransaction.returnComment}}</td></tr>
                        <tr><th>Bulk Ref</th><td colspan="3">{{selectedTransaction.bulkReference}}</td></tr>
                    </table>
                    
                    <h2>Audit</h2>
                    <div>
                        <vue-good-table :columns="auditColumns"  :rows="selectedTransactionAudit"/>                    
                    </div>
                    <div v-if="selectedTransaction.additionalFields && selectedTransaction.additionalFields.length">
                    <h2>Additiona Details</h2>
                    <div>
                        <vue-good-table  :columns="[{label:'Name',field:'name'},{label:'Value', field:'value'}]"  :rows="selectedTransaction.additionalFields"/>                    
                    </div>
                    </div>
                </div>
            </div>
        </div>`,
    methods: {

        selectTransaction(event) {
            this.selectedTransactionAudit = [];
            this.selectedTransaction =  event.row;
            const url = `${this.$apiPaths.transactionEnquiries}/transactions/${event.row.id}/history`;
            this.$fetchJson(url).then(j => this.selectedTransactionAudit = j.items);
        },
        isSelected(row){
            return (this.selectedTransaction && this.selectedTransaction.id === row.id)?'selected-row':'';
        },
    },
    created:function (){
        const url = `${this.$apiPaths.transactionEnquiries}/transactions?limit=50`;
        this.$fetchJson(url).then(j => this.transactions = j.items);

    },

})
