new Vue ({
  el: "#pomodoro-clock",
  data: {
    breakLength: 5,
    sessionLength: 25,
  },
  methods: {
    inc(property, amt){
      this[property] += amt
    },
    dec(property, amt){
      if (this[property] === 1) return
      this[property] -= amt
    },
  }
});
