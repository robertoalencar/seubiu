<template>
    
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">

          <div class="modal-header">
            <slot name="header">

              <span class="tittleService">Adicione serviços para essa profissão:  {{ profissao }}  </span>
            
            </slot>
          </div>

          <div class="modal-body">
            <slot name="body">

             <input type="text"  class="inputService" placeholder="Adicione aqui os serviços" 
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
              <button class="buttonClosed" @click="changeModal">  Fechar </button> 
                
              <button tipo="submit" class="buttonSave" @click="saveServices" > Salvar Serviços </button>
              
            </slot>
               
          </div>
        </div>
      </div>
    </div>

  </transition>
</template>


<script>

import Service from '../../domain/service/Service';

export default{

    data () {
      return {
       
       /* newService : { 
          id: '',
          refe : '',
          idSugestion: 2
        }, */

        services : [],
        newService : ''
        }

      },

      props: ['profissao'],

    methods : {
      changeModal(){
        this.$emit('showModal');  
       },
    
     removeService(index){
            this.services.splice(index, 1)
      },

      addService(){
            this.services.push(this.newService)
            this.newService = ''
        },

      saveServices(){

          console.log(JSON.stringify(this.services))

          this.$http.post('http://localhost:3020/services/', this.services)
          .then(() => this.services.refe = '', err => console.log(err));

          this.$emit('showModal');         
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
  
</style>