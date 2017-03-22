
new Vue({

  el: '#app',
  data: {
    id: '1',
    birthDate: '',
    rg: '',
    rgOrgIssuer: '',
    cpf: ''
  },

  methods: {
    signup: function (event) {

      var patches = {
            "patches": [
              { "op": "replace", "path": "/birthDate", "value": this.birthDate },
              { "op": "replace", "path": "/rg", "value": this.rg },
              { "op": "replace", "path": "/rgOrgIssuer", "value": this.rgOrgIssuer },
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
