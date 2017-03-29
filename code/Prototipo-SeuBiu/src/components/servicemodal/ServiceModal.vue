<template>
    
  <transition name="modal">
  
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">

          <div class="modal-header">
            <slot name="header">

              Adicione serviços para a profissão :  <span> {{ profissao }} </span>
            
            </slot>
          </div>

          <div class="modal-body">
            <slot name="body">

             <input type="text"  class="col-lg-6" placeholder="Adicione aqui os serviços" 
            v-on:keyup.enter="addService" 
            v-model="newService">  <button @click="addService" class="buttonClosed"> Adicionar Serviço </button>
            </br></br>


              <li v-for="(service,index) in services">
                 {{ service }}  <button @click="removeService(index)" class="buttonClosed" > X </button>
             </li>


            </slot>
          </div>

          <div class="modal-footer">

            <slot name="footer">
              <button class="buttonClosed" @click="changeModal">  Fechar </button> 
              <button class="buttonSave" @click="saveServices"> Salvar </button>
            </slot>
               
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>


<script>

import Sugestion from '../../domain/sugestion/Sugestion';

export default{

    data (){
      return {
        newService : '',
        services: ['Reboca parede', 'Colocar cerâmica'],
        quant : 10,

        sugestion : new Sugestion(this.quant , this.profissao, this.services)

        

      }
    },

      props: ['profissao']
    ,

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

          //this.$http.post('http://localhost:3020/v1/sugestions', this.sugestion)
          //.then(() => this.sugestion = new Sugestion(), err => console.log(err));

          this.$emit('showModal');         
     },
        
     
  }
}


</script>


<style>

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
  color: #555555
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
  background-color: #555555;
  color: white;
  border-radius: 12px;
   margin-left: 10px;
  }

  .buttonSave {
  background-color: #4CAF50;
  color: white;
  border-radius: 12px;
   margin-left: 10px;
  }
  
</style>