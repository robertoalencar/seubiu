new Vue({

  el: '#app',
  data: {
    name: '',
    surname: '',
    email: '',
    password: '',
    confirm_password: '',
    phone: ''
  },
  methods: {
    signup: function (event) {

      this.$http.post('/api/users', {name: this.name, surname: this.surname, email: this.email, password: this.password, phone: this.phone}).then((response) => {

          console.log(response);
          alert('Sucesso!');

        }, (response) => {
          console.log(response);
          alert('Erro!');
        });
    }
  }
});