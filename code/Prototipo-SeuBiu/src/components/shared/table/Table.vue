<template>


    <div class="tableCss">
      <div class="col-xs-12">
        <div class="card">
         <div class="card-header">
      
         <span class="tittle">Tabela Sugestões</span>

                    <div class="messageReprove" v-show="remove">
                    
                    <span >Sugestão reprovada com sucesso</span>
                    
                    </div>

                    <div class="messageReprove" v-show="aprove">
                
                    <span >Sugestão aprovada com sucesso</span>
                    
                    </div>
                    

         <div class="col-lg-5 inputSearchCss">
                <div class="input-group">
                         <input type="search" class="form-search" 
                         placeholder="Busque pela profissão." 
                          @input="filtro = $event.target.value">
                          
                </div>
            </div>
        </div>
        
            
        <div class="card-body no-padding">
          <table class="datatable table table-striped primary" cellspacing="0" width="100%" >
    <thead>
        <tr>
            <th>Profissão</th>
            <th>Quantidade</th>
            <th>Status</th>
        </tr>
    </thead>
    <tbody v-for="(sugestion,index) in sugestionWithFilter">
        <tr> 
            <td>{{ sugestion.profissao }} </td>
            <td>{{ sugestion.quant }} </td>
            <td> <button @click="changeShowModal(sugestion)" class="buttonApprove">Informar Serviços</button>
              <button class="buttonDisapprove" @click="disapproveSugestion(index)"> Reprovar </button>
              </td>
        </tr>
                 
   <service-modal  :sugestion="pickSugestion"  v-show="serviceModal" @showModal="changeShowModal" />     

    </tbody>
</table>
        </div>
      </div>
    </div>
  </div>  </div>
    </div>




</template>

<script>

    import ServiceModal from '../../servicemodal/ServiceModal.vue';
    import Sugestion from '../../../domain/sugestion/Sugestion';

  export default{

    data() {
        return {
            sugestions : [],
            filtro: '',
            users: [],
            serviceModal: false,
            services: [] ,
            pickSugestion : {},
            token: '',
            remove: false,
            aprove: false,
        }
    },

    components: {
        'service-modal' : ServiceModal,
    },

    created() {

       this.loadSugestions();
    },
    
    methods: {

        loadSugestions() {
         this.$http.get('http://localhost:3020/sugestions/')
        .then(res => res.json())
        .then(resultado => this.sugestions = resultado, err => console.log(err));   

        },
        
        changeShowModal(sugestion){
           
           this.pickSugestion = sugestion
           this.serviceModal = !this.serviceModal
          
        },

        messageAproved(){
            
                /*    setTimeout(function(){
                        this.aprove = false;
                    }.bind(this), 3000); */

        },

        disapproveSugestion(index){ 

           let indexObject = {
               index: index
           } 

           this.$http.post('http://localhost:3020/remove/sugestion/', indexObject)
           .then( function(res) {
                let result = res.json();
                return result;
           }).catch(function(err){
               return console.log(err);
           });
     
             this.remove = true;

            setTimeout(function(){
                this.remove = false;
               
            }.bind(this), 3000); 

        

      }
    },

    computed: {
        sugestionWithFilter(){
                if(this.filtro){
                    let exp = new RegExp(this.filtro.trim(), 'i');
                    return this.sugestions.filter(sugestion => exp.test(sugestion.profissao));
                } else {
                    return this.sugestions;
                }
        }

    },

    
   /* mounted: function(){

            var user = new FormData();
            user.append('email', 'teste@gmail.com');
            user.append('password', 'asdfasdf');

            let url = 'http://seubiu.com.br/api/authenticate';

            let header =  {'Content-type': 'application/x-www-form-urlencoded',
                            'Access-Control-Allow-Origin':'http://seubiu.com.br',
                            'Origin':'http://localhost:8081'};
      
        
        this.$http.post(url, user, JSON.stringify(header))
            .then(function(res) {
                let resultado = res.json();
                alert("sucess");
                return resultado;
            }).catch( function(err){
                alert("fail")
                return console.log(err);
            });

     /*   this.$http.post('http://seubiu.com.br/api/authenticate', users, {
               'Content-Type': 'application/x-www-form-urlencoded'
           })
        .then(function(res){
                  let result = JSON.stringify(res);
                   alert('Sucess');
                   return result;               
                })          
          .then(function(result){
            this.token = result;
            alert(token);
            return token;
        }).catch(err => console.log(JSON.stringify(err))); */

  }

</script>

<style> 

    .tableCss{ 
        margin-left:200px;

    }

    .inputSearchCss{
        width: 30%;
        margin-left: auto;
        border-radius: 12px;
    }

    .buttonApprove{
  background-color: #696969;
  color: white;
  border-radius: 12px;
  padding: 10px;
  }

   .buttonDisapprove{
  background-color: #B22222;
  color: white;
  border-radius: 12px;
  margin-left: 5px;
  padding: 10px;
  }

  .tittle{
    margin-right: 5px;
     background: #B22222;
     color: white;
     padding: 10px;
     font-size: 15px;
     border-radius: 12px;
     font-style: comic;
  }

  .form-search{
    width:100%;
    height:40px; 
     border: 2px solid red;
     border-radius: 4px;
  }

  .messageReprove{
    margin:auto;   
    background-color: #696969;
    color: white;
    border-radius: 12px;
    padding: 10px;
    width: 30%;
    text-align: center;

  }


</style>