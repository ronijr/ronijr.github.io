jQuery(document).ready(function($){

  var MQL = 1170;

  //primary navigation slide-in effect
  if($(window).width() > MQL) {
    var headerHeight = $('.rj-header').height();
    $(window).on('scroll',{

      previousTop:0
    },
    function (){
      var currentTop = $(window).scrollTop();
      if(currentTop < this.previousTop) {
        //scrolling up
        if(currentTop > 0 && $('.rj-header').hasClass('is-fixed')) {
          $('.rj-header').addClass('is-visible');
        } else {
          $('.rj-header').removeClass('is-visible is-fixed');
        }
      } else {
        //scrolling down
        $('.rj-header').removeClass('is-visible');
        if(currentTop > headerHeight && !$('.rj-header').hasClass('is-fixed')) $('.rj-header').addClass('is-fixed');
      }
     this.previousTop = currentTop;
    });
  }

  $('.rj-primary-nav-trigger').on('click', function(){
    $('.rj-menu-icon').toggleClass('is-clicked');
    $('.rj-header').toggleClass('menu-is-open');

    if($('.rj-primary-nav').hasClass('is-visible')){
      $('.rj-primary-nav').removeClass('is-visible').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(){
        $('body').removeClass('overflow-hidden');
      });
    } else {
      $('.rj-primary-nav').addClass('is-visible').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd trasitionend', function(){
        $('body').removeClass('overflow-hidden');
      });
    }
  });

  /*---------------------------------------------------- */
	/* Owl Carousel
	------------------------------------------------------ */
	$("#owl-slider").owlCarousel({
        navigation: false,
        pagination: true,
        itemsCustom : [
	        [0, 1],
	        [700, 2],
	        [960, 3]
	     ],
        navigationText: false
    });


  	$('.bounceInLeft').addClass("hidden").viewportChecker({
  	    classToAdd: 'visible animated bounceInLeft', // Class to add to the elements when they are visible
  	    offset: 100
  	   });

     $('.bounceInRight').addClass("hidden").viewportChecker({
   	    classToAdd: 'visible animated bounceInRight', // Class to add to the elements when they are visible
   	    offset: 100
   	   });

     $('.fedeInDown').addClass("hidden").viewportChecker({
         classToAdd: 'visible animated fadeInDown', // Class to add to the elements when they are visible
         offset: 100
        });

        $('.fedeInTop').addClass("hidden").viewportChecker({
            classToAdd: 'visible animated fadeInTop', // Class to add to the elements when they are visible
            offset: 100
           });

    $('.fadeIn').addClass("hidden").viewportChecker({
  	    classToAdd: 'visible animated fadeIn', // Class to add to the elements when they are visible
  	    offset: 100
  	   });

  $('.smoothscroll').on('click', function (e) {
    $('.rj-primary-nav').removeClass('is-visible');
    $('.rj-header').removeClass('menu-is-open');
      $('.rj-menu-icon').removeClass('is-clicked');
  e.preventDefault();
  var target = this.hash,
    $target = $(target);
    $('html, body').stop().animate({
      'scrollTop': $target.offset().top
    }, 800, 'swing', function () {
      window.location.hash = target;

    });

  });

  /*---------------------------------------------------- */
 /*  Placeholder Plugin Settings
 ------------------------------------------------------ */
 $('input, textarea, select').placeholder()


   /*---------------------------------------------------- */
 /*	contact form
 ------------------------------------------------------ */

 /* local validation */
 $('#contactForm').validate({

   /* submit via ajax */
   submitHandler: function(form) {

     var sLoader = $('#submit-loader');
     var name = $("#contactName").val();
     var email = $("#contactEmail").val();
     var subject = $("#contactSubject").val();
     var message = $("#contactMessage").val();

     $.ajax({

         type: "POST",
         url: "http://betastudiomusik.ronijr.com/api/sendmail",
         data: {contactName:name,contactEmail:email,contactSubject:subject,contactMessage:message},
         dataType:'json',
         beforeSend: function() {

           sLoader.fadeIn();

         },
         success: function(msg) {

             // Message was sent
             if (msg.status == 'OK') {
               sLoader.fadeOut();
                $('#message-warning').hide();
                $('#contactForm').fadeOut();
                $('#message-success').fadeIn();
             }
             // There was an error
             else {
               sLoader.fadeOut();
                $('#message-warning').html(msg.message);
               $('#message-warning').fadeIn();
             }

         },
         error: function() {

           sLoader.fadeOut();
           $('#message-warning').html("Ada beberapa kesalahan. Mohon untuk mencoba lagi.");
            $('#message-warning').fadeIn();

         }

       });
     }

 });
});
