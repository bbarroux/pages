
const profile = Vue.component('profile',{
    data:()=>({
        accessPermissions: [],
        corporateDetails:null,
        entities:[],
        userDetails:null,
        bankDetails:null,
    }),
    template: `
        <div id="profile-page">
            <div id="user-details">
                <h3>User Details</h3>
                <div v-if="userDetails">
                    <table class="detail-table">
                        <tr>
                            <th>Status</th>
                            <td>{{userDetails.status}}</td>
                        </tr>
                        <tr>
                            <th>Name</th>
                            <td>{{userDetails.firstName}} {{userDetails.lastName}}</td>
                        </tr>
                        <tr>
                            <th>Phone</th>
                            <td>{{userDetails.contactInformation.phone}}</td>
                        </tr>
                        <tr>
                            <th>Email</th>
                            <td>{{userDetails.contactInformation.email.replace('&#x40;','@')}}</td>
                        </tr>
                        <tr>
                            <th>Authentication/Level</th>
                            <td>{{userDetails.authenticationMode}}/{{userDetails.authorization.userLevel}}</td>
                        </tr>
                        <tr>
                            <th>Default Currency</th>
                            <td>{{userDetails.userPreferences.baseCurrency}}</td>
                        </tr>
                        <tr>
                            <th>Language</th>
                            <td>{{userDetails.userPreferences.preferredLanguage}}</td>
                        </tr>
                        <tr>
                            <th>Timezone</th>
                            <td>{{userDetails.userPreferences.timezone.replace('&#x2f;','/')}}</td>
                        </tr>
                    </table>
                </div>
            </div>
            <div id="bank-details">
                <h3>Bank Details</h3>
                <div v-if="bankDetails">
                    <table class="detail-table">
                        <tr>
                            <th>Id</th>
                            <td>{{bankDetails.id}}</td>
                        </tr>
                        <tr>
                            <th>Name</th>
                            <td>{{bankDetails.name}}</td>
                        </tr>
                        <tr>
                            <th>Short Name</th>
                            <td>{{bankDetails.shortName}}</td>
                        </tr>
                        <tr>
                            <th>Swift Line</th>
                            <td>{{bankDetails.SWIFTAddress.line1}}</td>
                        </tr>
                    </table>
                </div>

            </div>
            <div id="access-permissions">
                <h3>Permissions</h3>
                <div v-if="accessPermissions.length">
                    <vue-good-table :columns="[{label:'Action',field:'actionAllowed'},{label:'Description',field:'description'}]"  :rows="accessPermissions"/>  
                </div>
            </div>
            <div id="corporate-details">
                <h3>Corporate Details</h3>
                <div v-if="corporateDetails">
                    <table class="detail-table">
                        <tr>
                            <th>Id</th>
                            <td>{{corporateDetails.id}}</td>
                        </tr>
                        <tr>
                            <th>Name</th>
                            <td>{{corporateDetails.name}}</td>
                        </tr>
                        <tr>
                            <th>Short Name</th>
                            <td>{{corporateDetails.shortName}}</td>
                        </tr>
                        <tr>
                            <th>Swift Line</th>
                            <td>{{corporateDetails.SWIFTAddress.line1}}</td>
                        </tr>
                    </table>
                    <h5>References</h5>
                    <vue-good-table :columns="[{label:'def',field:'defaultReference'},{label:'Ref',field:'reference'},{label:'Short',field:'shortName'}]"  :rows="corporateDetails.references"/>  

                </div>
           
            </div>
            <div id="entities">
                <h3>Entities</h3>
                <div v-if="entities.length">
                  <div v-for="entity in entities" style="margin:8px;padding:0px 5px; border: 1px solid var(--fade-color)">
                     <h4>{{entity.name}}</h4>
                     <table class="detail-table">
                        <tr>
                            <th>Country</th>
                            <td>{{entity.country}}</td>
                        </tr>
                        <tr>
                            <th>Short Name</th>
                            <td>{{entity.shortName}}</td>
                        </tr>
                    </table>
                  </div>
                </div>
            </div>
        </div>
        `,
    methods:{

    },
    created(){
        const url = `${this.$apiPaths.profile}`;
        this.$fetchJson(url+"/user-details").then(j => this.userDetails = j);
        this.$fetchJson(url+"/bank-details").then(j => this.bankDetails = j);
        this.$fetchJson(url+"/access-permissions?limit=50").then(j => this.accessPermissions = j.items);
        this.$fetchJson(url+"/corporate-details").then(j => this.corporateDetails = j);
        this.$fetchJson(url+"/entities?limit=50",{headers:{"content-type":'application/json'}}).then(j => this.entities = j.items);
    }
})
