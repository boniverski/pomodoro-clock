$(document).ready(function() {

  var finishSound  = new Audio("audio/the-little-dwarf.mp3"), counter, startBreak;
  var breakSound = new Audio ("audio/solemn.mp3");

  $(".tomato").click(function() {
    // clear old interval if exist
      clearInterval(counter);
      clearInterval(startBreak);

    // get current user define value
    var sessionLength  = parseInt($('.sessionLength').html());
    var breakLength = parseInt($('.breakLength').html());

    sessionLength *= 60;

    if (sessionLength % 60 >= 10) {
      $(".clock__counter-time").html(Math.floor(sessionLength / 60) + ":" + sessionLength % 60);
    } else {
      $(".clock__counter-time").html(Math.floor(sessionLength / 60) + ":" + "0" + sessionLength % 60);
    }

    counter = setInterval(timer, 1000);

    function timer() {
      sessionLength -= 1;

      if (sessionLength === 0) {
        breakSound.play();
        $(".tomato").css("background", "#F4A71E");

        clearInterval(counter);
        startBreak = setInterval(breakTimer, 1000);
        breakLength *= 60;

        if (breakLength % 60 >= 10) {
          $(".clock__counter-time").html(Math.floor(breakLength / 60) + ":" + breakLength % 60);
        } else {
          $(".clock__counter-time").html(Math.floor(breakLength / 60) + ":" + "0" + breakLength % 60);
        }

      } else if (sessionLength % 60 >= 10) {
        $(".clock__counter-time").html(Math.floor(sessionLength / 60) + ":" + sessionLength % 60);
      } else {
        $(".clock__counter-time").html(Math.floor(sessionLength / 60) + ":" + "0" + sessionLength % 60);
      }

      // Run when counter is over
      function breakTimer() {
        breakLength -= 1;

        if (breakLength === 0) {
            finishSound.play();
            clearInterval(startBreak);
            $(".tomato").css("background", "#EE543D");
            $(".clock__counter-time").html("0:00");
        } else if (breakLength % 60 >= 10) {
            $(".clock__counter-time").html(Math.floor(breakLength / 60) + ":" + breakLength % 60);
        } else {
            $(".clock__counter-time").html(Math.floor(breakLength / 60) + ":" + "0" + breakLength % 60);
        }
      }
    }
  });

  // Handling a Reset button's logic
  $(".clock__reset").click(function() {
    $('.breakLength').html('5');
    $('.sessionLength').html('25');
    $('.clock__counter-time').html('25:00');
    $("#breakTimeAlert").hide();
    $(".tomato").css("background", "#43B748");

    clearInterval(counter);
    clearInterval(startBreak);
  });

  // Handling increament/decreament buttons
  $('#lessBreak').on('click', function() {
    var breakLength = parseInt($('.breakLength').html());
    if (breakLength > 1) {
      breakLength -= 1;
    }
    $('.breakLength').html(breakLength);
  });

  $('#moreBreak').on('click', function() {
    var breakLength = parseInt($('.breakLength').html());
    if(breakLength <= 24) {
      breakLength += 1;
    }
    $('.breakLength').html(breakLength);
  });

  $('#lessSession').on('click', function() {
    var sessionLength  = parseInt($('.sessionLength').html());
    if (sessionLength >1 && sessionLength <=25 ) {
      sessionLength -= 1;
      $('.clock__counter-time').html(sessionLength +':00');
    }
    $('.sessionLength').html(sessionLength);
  });

  $('#moreSession').on('click', function() {
    var sessionLength  = parseInt($('.sessionLength').html());
    if(sessionLength <= 24) {
      sessionLength += 1;
    }
    $('.sessionLength').html(sessionLength);
    $('.clock__counter-time').html(sessionLength +':00');
  });
});
