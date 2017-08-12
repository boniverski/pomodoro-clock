$(document).ready(function(){
  var currentBreak = $(".clock__break-length").html();

  $("#increase-break").on("click", function(){
    currentBreak++;
    $(".clock__break-length").html(currentBreak);
  });

  $("#decrease-break").on("click", function(){
    if(currentBreak === 1) return;
    currentBreak--;
    $(".clock__break-length").html(currentBreak);
  });
});
