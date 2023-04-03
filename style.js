function carrousel(){
    $( ".element__caroussel div:not(.middle)" ).click(function() {
      pos=$(this).attr('class');
      if(pos!="middle"){

        old=$(this);
        current_middle=$(this).parent().children('.middle');
        current_middle.fadeOut(200);
        $(this).fadeOut(100);

        setTimeout(function(){
          current_middle.removeClass("middle").addClass(pos).fadeIn(800);
          old.removeClass("left").removeClass("right").addClass("middle").fadeIn(200);


          $( ".element__caroussel div").unbind( "click" );
          carrousel();
        }, 500);

      }
  });


}
carrousel();





$(document).ready(function() {
    $('.element__navigation a').on('click', function() { // Au clic sur un element
      event.preventDefault();
      var page = $(this).attr('href'); // Page cible
      var old_page = $(this).attr('data-pos'); // Page actuelle

      $(page).addClass("element--hidden");
      $(old_page).removeClass("element--current").addClass("element--hidden");

      setTimeout(function(){
          $('body').scrollTop($(page).position().top);

          $(page).removeClass("element--hidden").addClass("element--current");


      }, 1200);

    });
  });