
const counterpartyList = Vue.component('counterparty-list',{
    data:()=>({
        counterparties: []
    }),
    template: `
        <div>
            <table>
            <thead>
            <th>Counterparty</th>

            </thead>
            <tbody>
                <tr v-for="counterparty in counterparties" >
                  <td>{{counterparty.code}}</td>
                </tr>
            </tbody>
            </table>
        </div>
        `,
    methods:{
        changeContext(){
        }
    },
    created(){
        this.changeContext();
    }
})
