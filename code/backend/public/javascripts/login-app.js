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
            axios.post('/api/authenticate',
            {
                email: this.email,
                password: this.password

            }).then(function (response) {
                console.log(response);
                alert('Sucesso!');
            }).catch(function (error) {
                console.log(error);
                alert('Acesso negado!');
            });

        }
    }
  }
});