var vm = new Vue({
  el: "#appnysl",
  data: {
    gameData: {},
    chat: false,
    login: false,
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
    botonChat() {
      this.chat = true
      this.obj = false
    }

  },

  mounted() {
    this.obtenerJuegos();
  }
})

//
//member.party
//member["party"]
//member."party"
