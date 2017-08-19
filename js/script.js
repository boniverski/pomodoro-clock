/* Title: Pomodoro Clock v1 (for freeCodeCamp), August 2017
* Author: Boško Rabrenović
* https://github.com/boniverski/pomodoro-clock
* Description: Simple counter with break alerts
*/

/* Title: Pomodoro Clock v1 (for freeCodeCamp), August 2017
* Author: Boško Rabrenović
* https://github.com/boniverski/pomodoro-clock
* Description: Simple counter with break alerts
*/

$(document).ready(function() {

  var counter,
      startBreak,
      notification = new Audio ("https://raw.githubusercontent.com/boniverski/pomodoro-clock/master/audio/solemn.mp3");

  $(".tomato").on("click", function startCounting() {
    notification.play();
    // Clear old interval if exist
    clearInterval(counter);
    clearInterval(startBreak);

    // Get current user define value
    var sessionLength  = parseInt($('.sessionLength').html()),
        breakLength = parseInt($('.breakLength').html());

    // Converting minutes and seconds
    sessionLength *= 60;
    if (sessionLength % 60 >= 10) {
      $(".clock__counter-time").html(Math.floor(sessionLength / 60) + ":" + sessionLength % 60);
    } else {
      $(".clock__counter-time").html(Math.floor(sessionLength / 60) + ":" + "0" + sessionLength % 60);
    }

    counter = setInterval(timer, 1000);

    function timer() {
      sessionLength -= 1;

      // Turning tomtato orange when last minute of session begins
      if(sessionLength === 59) {
        $(".tomato").css("background", "#F4A71E"); //color tomato to orange
      // Break start
      } else if (sessionLength === 0) {
          $(".tomato").css("background", "#ee543d"); //color tomato to red
          notification.play();
          clearInterval(counter);
          startBreak = setInterval(breakTimer, 1000);
          breakLength *= 60;
          // Converting Break minutes and seconds
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

      // Run when session is over
      function breakTimer() {
        breakLength -= 1;

        if (breakLength === 0) {
            $(".tomato").css("background", "#43B748"); // Turning tomato into green again
            notification.play();
            clearInterval(startBreak);
            startCounting(); // Starts all over
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
    $('.clock__counter-time').html("25:00");
    $(".tomato").css("background", "#43B748"); // Turning tomato into green
    clearInterval(counter);
    clearInterval(startBreak);
  });

  // Handling increament/decreament buttons
  $('#subtractBreak').on('click', function() {
    var breakLength = parseInt($('.breakLength').html());
    if (breakLength > 1) {
      breakLength -= 1;
    }
    $('.breakLength').html(breakLength);
  });

  $('#addBreak').on('click', function() {
    var breakLength = parseInt($('.breakLength').html());
    if(breakLength <= 24) {
      breakLength += 1;
    }
    $('.breakLength').html(breakLength);
  });

  $('#subtractSession').on('click', function() {
    var sessionLength  = parseInt($('.sessionLength').html());
    if (sessionLength >1 && sessionLength <=25 ) {
      sessionLength -= 1;
      $('.clock__counter-time').html(sessionLength +':00');
    }
    $('.sessionLength').html(sessionLength);
  });

  $('#addSession').on('click', function() {
    var sessionLength  = parseInt($('.sessionLength').html());
    if(sessionLength <= 24) {
      sessionLength += 1;
    }
    $('.sessionLength').html(sessionLength);
    $('.clock__counter-time').html(sessionLength +':00');
  });
});
