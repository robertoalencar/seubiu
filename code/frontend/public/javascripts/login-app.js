//https://github.com/mzabriskie/axios

new Vue({
  el: '#app',
  data: {
    email: '',
    password: ''
  },
  methods: {
    login: function (event) {
        if (this.email && this.email.length > 0 && this.password && this.password.length > 0) {


            this.$http.post('/api/authenticate', {email: this.email, password: this.password}).then((response) => {

                console.log(response);
                alert('Sucesso!');

              }, (response) => {
                console.log(response);
                alert('Acesso negado!');
              });

        }
    }
  }
});