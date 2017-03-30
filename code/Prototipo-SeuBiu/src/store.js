import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {   
        showModal: false,
        serviceModal: false,
        users: [
                { name : 'Everton'},
                { name : 'Juca'},
                { name : 'GodMilson'},
                { name : 'Clayton'}],

       sugestions: [
           {profissao: 'Mecânico'},
           {profissao: 'Eletricista'},
           {profissao: 'Pedreiro'}
       ]         
                
    }

});