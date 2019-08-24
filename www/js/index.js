var last_db;
var duration_costant_db;


function getDB( context){
  DBMeter.start(function(dB) {
    console.log(dB);
    window.setTimeout(getDB, 2000,context);
  });
}


var app = {
  // Application Constructor
  initialize: function() {
    document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
  },


  onDeviceReady: function() {


    this.receivedEvent('deviceready');
   getDB( this)



    this.requestSMSPermission()
  },

  // Update DOM on a Received Event
  receivedEvent: function(id) {
    var parentElement = document.getElementById(id);
    var listeningElement = parentElement.querySelector('.listening');
    var receivedElement = parentElement.querySelector('.received');

    listeningElement.setAttribute('style', 'display:none;');
    receivedElement.setAttribute('style', 'display:block;');

    console.log('Received Event: ' + id);
  },
  send: function() {
    sms.send("0682526723", "Alerte au feu", options,
      function() {
        console.log("ok");
      },
      function() {
        console.error(e)
      }
    );
  },
  checkSMSPermission: function() {
    var success = function(hasPermission) {
      if (hasPermission) {
        sms.send("0682526723", "Alerte au feu", options, function() {
          console.log("ok");
        }, error);
      } else {
        // show a helpful message to explain why you need to require the permission to send a SMS
        // read http://developer.android.com/training/permissions/requesting.html#explain for more best practices
      }
    };
    var error = function(e) {
      alert('Something went wrong when asking SMS permission :' + e);
    };
    sms.hasPermission(success, error);
  },
  requestSMSPermission: function() {
    var success = function(hasPermission) {
      if (!hasPermission) {
        sms.requestPermission(function() {
          console.log('[OK] Permission accepted')
        }, function(error) {
          console.info('[WARN] Permission not accepted')

        })
      }
    };
    var error = function(e) {
      alert('Something went wrong when askin permission for SMS:' + e);
    };
    sms.hasPermission(success, error);
  }
};


function bind(base, el, varname) {
  Object.defineProperty(base, varname, {
    get: () => {
      return el.value;
    },
    set: (value) => {
      el.value = value;
      console.log(varname)
      document.getElementById(varname + '_display').innerHTML = value;
    }
  })
}

var p = {};
bind(p, document.getElementById("temps"), 'temps')
bind(p, document.getElementById("num"), 'num')
bind(p, document.getElementById("DB"), 'DB')

document.getElementById("temps").addEventListener("change",
  function(e) {
    document.getElementById('temps_display').innerHTML = e.target.value;
  }, false);
document.getElementById("DB").addEventListener("change",
  function(e) {
    document.getElementById('DB_display').innerHTML = e.target.value;
  }, false);
document.getElementById("num").addEventListener("change",
  function(e) {
    document.getElementById('num_display').innerHTML = e.target.value;
  }, false);


p.temps = 10
p.num = '0682526723'
p.DB = 53

app.initialize();
