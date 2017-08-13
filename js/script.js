new Vue ({
  el: "#pomodoro-clock",
  data: {
    breakLength: 5,
    sessionLength: 25
  },
  methods: {
    inc(property, amt){
      if (this[property] === 25) return
      this[property] += amt
    },
    dec(property, amt){
      if (this[property] === 1) return
      this[property] -= amt
    },
    setTime(sessionLength, breakLength){
      let timer;
      let endTime;
      let interval = sessionLength;
      let ending = breakLength;
      let breaking;
      let counter;
      let pausedCounter = false;
      let currentCounter;


      (startCounter => {
        let startTime = new Date();
        endTime = new Date(startTime.getTime() + interval * 60000);
        breaking = new Date(startTime.getTime() + ending * 60000);
        timer = setInterval(countDown, 1000);
      })();

      function countDown() {
        let now = new Date();
        let remaining = endTime - now;
        let breakingConvert = breaking - now;
        if (remaining <= 0) {
          clearInterval(timer);
          counter = "0:00";
        } else {
            if (pausedCounter === true){
                counter = currentCounter;
            }
            counter = niceTime(remaining);
            document.querySelector(".clock__counter-time").innerHTML = counter;
          }
        if (remaining === breakingConvert) {
          document.querySelector(".tomato").style.background = "red";
        }
      }

      function niceTime(t) {
        let seconds = t / 1000;
        let minutes = parseInt(seconds / 60);
        seconds = parseInt(seconds % 60);
        return `${minutes}:${seconds}`;
      }

      document.querySelector(".reset").onclick = function() {
        clearInterval(timer);
        document.querySelector(".clock__counter-time").innerHTML = `${interval}:00`;
      }
    }
  }
});
