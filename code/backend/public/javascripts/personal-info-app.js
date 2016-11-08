Vue.directive('mask', function (maskval) {
    $("#phone").mask(maskval);
});


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

      var patches = {
            "patches": [
              { "op": "replace", "path": "/rg", "value": this.rg },
              { "op": "replace", "path": "/cpf", "value": this.cpf }
            ]
          }

      this.$http.put('/api/users/1/personalinfo', patches).then((response) => {

          console.log(response);
          alert('Sucesso!');

        }, (response) => {
          console.log(response);
          alert('Erro!');
        });
    }
  }
});

