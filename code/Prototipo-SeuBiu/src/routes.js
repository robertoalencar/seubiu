import Sugestion from './components/sugestion/Sugestion.vue';
import Home from './components/home/Home.vue';


export const routes = [
    //primeiro parametro é o caminho -> path , o outro é o component que irá ser carregado.
    //ao deixar o caminho em branco equivale a : localhost:3000/#/
    
    {path: '/' , component: Home, name: 'Inicio'},
    { path: '/sugestion', component: Sugestion, name: 'Sugestões'}
];