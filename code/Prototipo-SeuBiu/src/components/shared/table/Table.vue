<template>


    <div class="tableCss">
      <div class="col-xs-12">
        <div class="card">
         <div class="card-header">
      
         <span class="tittle">Tabela Sugestões</span>

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
            <td> <button @click="changeShowModal()" class="buttonApprove">Aprovar</button>
              <button class="buttonDisapprove" @click="disapproveSugestion(index)"> Reprovar </button>
              </td>
        </tr>
                 
   <service-modal   :profissao="sugestion.profissao" v-show="serviceModal" @showModal="changeShowModal" />     

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
            services: []  
        }
    },

    components: {
        'service-modal' : ServiceModal,
    },

   /* mounted: function(){
        alert( 'teste' );

        var formData = new FormData();
        formData.append('email', 'teste@gmail.com');
        formData.append('password', 'asdfasdf');

        let data = {
            email: 'teste@gmail.com',
            password: 'asdfasdf'
        };

        let url = 'http://seubiu.com.br/api/authenticate';
       

        this.$http.post( url , data, { emulateHTTP: true,
                                     headers: { 'Access-Control-Allow-Origin': true } } )
            .then(response => {

                 alert( response );

        }, response => {
            alert(  );
            console.log( );
        });
    }, */

    created() {

      this.$http.get('http://localhost:3020/sugestions/')
      .then(res => res.json())
      .then(resultado => this.sugestions = resultado, err => console.log(err));
    },


    mounted: function(){
        this.$http.get('http://localhost:3020/services/')
        .then(res => res.json())
        .then(resultado => this.services = resultado, err => console.log(err));
    },

    /* userAutenthicate(){

        let object = {email: 'teste@gmail.com', senha : 'asdfasdf' };

       // this.$http.post('http://seubiu.com.br/api/authenticate', object)
       // .then(res => res.json())
       // .ten(resultado => this.users = resultado, err => console.log(err));
    } */ 
    
    methods: {

        changeShowModal(){
           this.serviceModal = !this.serviceModal

        },

        disapproveSugestion(index){ 

           let indexObject = {
               index: index
           } 

            this.$http.post('http://localhost:3020/remove/sugestion/', indexObject)
            .then(() => res.json())
            .then(resultado => alert("Sucesso"), err => console.log(err));
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
    }
 }

</script>

<style> 

    .tableCss{ 
        margin-left:200px;

    }

    .inputSearchCss{
        margin-left: 400px;
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

</style>