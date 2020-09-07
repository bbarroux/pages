
const beneficiaryList = Vue.component('beneficiary-list',{
    data:()=>({
        beneficiaries: [],
        columns:[
            { label:'Name', field:'name'},
            { label:'Account', field:'accountNumber'},
            { label:'PreApproved', field:'preApproved'},
            { label:'Type', field:'subProductCode'},
         ],
        selectedBeneficiary:null,
    }),
    template: `
        <div class="master-detail">            
                <div class="master">
                    <vue-good-table v-if="beneficiaries.length"  :row-style-class="isSelected" :columns="columns"  :rows="beneficiaries" @on-row-click="selectBeneficiary" class="selectable-data-table"/>
                </div>
                <div class="detail">
                    <div v-if="!selectedBeneficiary && beneficiaries.length" style="padding-top:20px ">Select a beneficiary in the list.</div>
                    <div v-if="selectedBeneficiary">
                        <div style="text-align:right;padding-right: 10px;margin-top: 8px;margin-bottom: 16px">
                            <a href="#" class="btn">Create New</a>
                            <a href="#" class="btn" >Update</a>
                            <a href="#" style="float:left;margin-top: -6px" class="btn">New Wire Transfer</a>
                        </div>
                        <table class="detail-table form-table">
                            <tr>
                                <th>Type</th>
                                <td colspan="3"><select v-model="selectedBeneficiary.subProductCode">
                                    <option>Domestic Transfer</option>
                                    <option>Third Party Transfer</option>
                                    <option>MT 103 Telegraphic Transfer</option>
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <th>Name</th>
                                <td><input disabled type="text" v-model="selectedBeneficiary.name"></td></td>
                                <th>NickName</th>
                                <td><input type="text" v-model="selectedBeneficiary.nickName"></td>
                            </tr>
                            <tr>
                                <th>Account</th>
                                <td><input type="text" v-model="selectedBeneficiary.accountNumber"></td></td>
                                <th>Currency</th>
                                <td><select v-model="selectedBeneficiary.currency">
                                    <option>USD</option>
                                    <option>GBP</option>
                                    <option>IRN</option>
                                </select></td>
                            </tr>
                            <tr>
                                <th>Pre Approved</th>
                                <td><select v-model="selectedBeneficiary.preApproved">
                                    <option>true</option>
                                    <option>false</option>
                                </select></td></td>
                                <th>Limit</th>
                                <td><input type="text" v-model="selectedBeneficiary.limit" size="8"><input style="margin-left:3px" type="text" size="4" v-model="selectedBeneficiary.limitCurrency"></td>
                            </tr>
                            <tr>
                                <td colspan="4" style="padding-top:16px">
                                    <h2 style="margin-bottom: 4px">Bank Info</h2>
                                </td>
                            </tr>
                            <tr>
                                <th>Name</th>
                                <td><input type="text" v-model="selectedBeneficiary.bankName"></td></td>
                                <th>BIC code</th>
                                <td><input type="text" v-model="selectedBeneficiary.bicCode"></td>
                            </tr>
                            <tr>
                                <th>Adress</th>
                                <td colspan="3"><input style="width:90%" type="text" v-model="selectedBeneficiary.bankAddress"></td></td>
                            </tr>
                            <tr>
                                <th>Country</th>
                                <td><input type="text" v-model="selectedBeneficiary.country"></td></td>
                                <th>Clearing code</th>
                                <td><input type="text" v-model="selectedBeneficiary.clearingCode"></td>
                            </tr>
                           <tr>
                                <td colspan="4" style="padding-top:16px">
                                    <h2 style="margin-bottom: 4px">Intermediary Bank Info</h2>
                                </td>
                            </tr>
                            <tr>
                                <th>Name</th>
                                <td><input type="text" v-model="selectedBeneficiary.intermediaryBankName"></td></td>
                                <th>BIC code</th>
                                <td><input type="text" v-model="selectedBeneficiary.intermediaryBankBicCode"></td>
                            </tr>
                            <tr>
                                <th>Adress</th>
                                <td colspan="3"><input style="width:90%" type="text" v-model="selectedBeneficiary.intermediaryBankAddress"></td></td>
                            </tr>
                            <tr>
                                <th>Country</th>
                                <td><input type="text" v-model="selectedBeneficiary.intermediaryBankCountry"></td></td>
                                <th>Clearing code</th>
                                <td><input type="text" v-model="selectedBeneficiary.intermediaryBankClearingCode"></td>
                            </tr>
                     </table>
                    </div>
                </div>
        </div>
        `,
    methods:{
        selectBeneficiary(event){
            this.selectedBeneficiary=event.row;
        },
        isSelected(row){
            return (this.selectedBeneficiary && this.selectedBeneficiary.accountId === row.accountId)?'selected-row':'';
        },
    },
    created(){
        const url = `${this.$apiPaths.beneficiaries}/beneficiaries?limit=50`;
        this.$fetchJson(url,{headers:{"content-type":'application/json'}}).then(j => this.beneficiaries = j.items);
    }
})
