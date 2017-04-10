<template>
    
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">

          <div class="modal-header">
            <slot name="header">

              <span class="tittleService">Adicione serviços para essa profissão:  {{ sugestion.profissao }}  </span>
            
            </slot>
          </div>

          <div class="modal-body">

            <slot name="body">
            
                    <div class="validationMessage" v-show="validation">
                
                    <span > {{validationMessage}} </span>
                    
                    </div>

                    <div class="aprovationMessage" v-show="aprovation">
                
                    <span > {{aprovationMessage}} </span>
                    
                    </div>

             <input type="text"  class="inputService"
             required placeholder="Adicione aqui os serviços" 
              v-model="newService" @keyup.enter="addService">
          <button @click="addService" class="buttonClosed"> Adicionar Serviço </button>
            </br></br>     

         <ul class="ul">   
         <li v-for="(service, index) in services">
                  {{ service }}  
                 <button @click="removeService(index)" class="buttonRemove" > X </button>
             </li>  
          </ul>

            </slot>
          </div>

          <div class="modal-footer">

            <slot name="footer">
              <button class="buttonClosed" @click="closeModal">  Fechar </button> 
                
              <button tipo="submit" class="buttonSave" @click="saveServices(indexSugestion)" > Aprovar Sugestão </button>
              
            </slot>
               
          </div>
        </div>
      </div>
    </div>

  </transition>
</template>


<script>

export default{

    props: ['sugestion', 'indexSugestion'],

    data () {
      return {
       
        services : [],
        newService : '',
        validationMessage: 'Por favor preencha este campo',
        validation : false,
        aprovation: false,
        aprovationMessage: 'Por favor insira serviços antes de aprovar a sugestão'

        }
      },

    methods : {

      closeModal(){
         this.$emit('closeModal'); 
         this.services = []; 
       },
    
     removeService(index){
            this.services.splice(index, 1)
      },

      addService(){

           if (this.newService === ''){

             if(this.aprovation == false){
               this.validation = true;
              }
             
              setTimeout(function (){
                this.validation = false;
              }.bind(this), 5000);

            } else {
             
             this.validation = false;
             this.services.push(this.newService);
             this.newService = '';

            }
        },

      saveServices(indexSugestion){

            if(this.services.length > 0){
              
              this.$http.post('http://localhost:3020/services/', this.services)
                .then(() => console.log("Serviços enviado com sucesso"), err => console.log(err));

                this.$http.post('http://localhost:3020/remove/sugestion/', indexSugestion)
                .then(() => console.log("Sugestão removida com sucesso"), err => console.log(err));
                
                this.$emit('aproved');
                this.$emit('showModal');
                  
                this.services = [];

             return indexSugestion;

          } else {

              if(this.validation == false){
              this.aprovation = true;
                }
                
                setTimeout(function (){
                  this.aprovation = false;
                }.bind(this), 3000);

          }

     }
  }
}

</script>

<style>

.tittleService{
  font-size: 20px;
  font-weight: bold;
}

.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0, .15);
  display: table;
  transition: opacity .3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 670px;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
  transition: all .3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-header h3 {
  margin-top: 0;
  color: #555555;
}

.modal-body {
  margin: 0px 0;
}

.modal-default-button {
  float: right;
}

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}


.buttonClosed {
  background-color: #696969;
  color: white;
  border-radius: 12px;
   margin-left: 10px;
   padding: 5px;
  }

  .buttonSave {
  background-color: #B22222;
  color: white;
  border-radius: 12px;
   margin-left: 10px;
   padding: 5px;
  }

  .inputService{
    width:50%;
    height:30px; 
     border: 2px solid red;
     border-radius: 4px;
  } 

  .buttonRemove{

    background-color: #B22222;
    color: white;
    border-radius: 12px;
    margin-left: 5px;
   padding: px;

  }

  .validationMessage{
    margin-top:1%;
    margin-bottom:1%;   
    background-color: #B22222;
    color: white;
    border-radius: 5px;
    padding: 5px;
    width: 40%;
    text-align: center;

  }

  .aprovationMessage{
     margin-left:10%;
    margin-bottom:5%;   
    background-color: #B22222;
    color: white;
    border-radius: 5px;
    padding: 5px;
    width: 70%;
    text-align: center;
  }

  
</style>