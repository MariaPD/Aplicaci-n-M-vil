var vm = new Vue({
  el: "#appnysl",
  data: {
    gameData: {},    
    login: false,
    database: firebase.database(),
    obj: {
      juegos: true,
      partido01: false,
      partido02: false,
      partido03: false,
      partido04: false,
      partido06: false,
      partido08: false,
      partido10: false,
      partido11: false,
      partido12: false,
      partido14: false,
      partido15: false,
      partido16: false,
      partido17: false,
      chat: false
    }
  },
  methods: {

    obtenerJuegos: function () {
      fetch("https://ubiqum-mobile-app.firebaseio.com/games.json", {
        method: "GET",
        headers: {
          'X-API-Key': "B2KicELUJFpqFIb5WoWcZIJ7VRhmBWnWyeUN5upN"
        }
      }).then(function (response) {
        if (response.ok) {
          return response.json();
        }
        throw new Error(response.statusText);
      }).then(function (json) {
        vm.gameData = json;
        console.log("Juegos", vm.gameData);
      }).catch(function (error) {
        console.log("Request failed:" + error.message);
      });
    },

    botonMatch: function (screen) {
      this.obj[screen] = true
      /*  arr= this.gameData.map(partido => `partido$(datosJuego.id)`);*/
      arr = Object.keys(this.obj)
      arr.filter(game => game !== screen)
        .forEach(game => this.obj[game] = false);
    },

/*    botonChat() {
      this.chat = true
      this.obj = false
    },*/
/*    botonGames() {
      this.chat = false
      this.obj.juegos = true
    },*/

    botonEnviar: function () {
      var mensaje = document.getElementById('entry').value;
      this.database.ref('mensajes').push({
        message: mensaje
      });
      document.getElementById('entry').value = "";
    },

    recibirMensajes: function () {
      this.database.ref('mensajes').on('child_added', function (data) {
        console.log(data.val().message);
        document.getElementById('message').innerHTML += '<p>' + data.val().message + '</p><br>';
      })
    },

    loginGoogle() {
      var provider = new firebase.auth.GoogleAuthProvider();
      firebase.auth().signInWithPopup(provider).then(function (result) {
        var token = result.credential.accessToken;
        var user = result.user;
      }).catch(function (error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        var email = error.email;
        var credential = error.credential;
      });
    },
    //        logoutGoogle() {
    //          firebase.auth().signOut(this.provider);
    //        }

  },
    mounted() {
      this.obtenerJuegos();
      this.recibirMensajes();
     /* this.loginGoogle();*/
/*            this.logoutGoogle();*/
    },
})

//
//member.party
//member["party"]
//member."party"
