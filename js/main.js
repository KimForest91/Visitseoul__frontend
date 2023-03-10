

    $(document).ready(function() {

      preventDefaultAnchor();
    //main-visual
    var numSlide = $('div.box ul.slide > li').length;
    var slideNow = 0;
    var slideNext = 0;
    var slidePrev = 0;
    var slideFirst = 1;
    var timerId = '';
    var timerSpeed = 2000;
    var isTimerOn = false;


    $('div.box ul.slide > li').each(function(i) {
      $(this).css({'left': (i * 100) + '%', 'display': 'block'});
      $('div.box .indicator-inner').append('<li><a href="#">' + ( i + 1 ) + '번 슬라이드</a></li>\n');
    });

    if (isTimerOn === true) {
      $('div.box .indicator > a.play').addClass('on');
    } else {
      $('div.box .indicator > a.play').removeClass('on');
    }

    showSlide(slideFirst);

    $('div.box .indicator-inner li a').on('click', function() {
      var index = $('div.box .indicator-inner li').index($(this).parent());
      showSlide(index + 1);
    });

    $('div.box .control a.prev').on('click', function() {
      showSlide(slidePrev);    
      });

    $('div.box .control a.next').on('click', function() {
      showSlide(slideNext);    
    });

    $('div.box .indicator a.play').on('click', function() {
      if (isTimerOn === true) {
        stopTimer();
      } else {
        startTimer();
      }
    });

    function startTimer() {
      timerId = setTimeout(function() {showSlide(slideNext);}, timerSpeed);
      $('div.box .indicator > a.play').addClass('on');
      isTimerOn = true;
    }

    function stopTimer() {
      clearTimeout(timerId);
      $('div.box .indicator > a.play').removeClass('on');
      isTimerOn = false;
    }

    function resetTimer() {
      clearTimeout(timerId);
      if (isTimerOn === true) {
        timerId = setTimeout(function() {showSlide(slideNext);}, timerSpeed);
      }
    }

    function showSlide(n) {
      resetTimer();
      $('div.box ul.slide').css({'transition': 'left 0.3s', 'left': (-(n - 1) * 100) + '%'});
      $('div.box .indicator-inner li').removeClass('on');
      $('div.box .indicator-inner li:eq('+ (n - 1) +')').addClass('on');

      slideNow = n;
      slidePrev = (n === 1) ? numSlide : (n - 1);
      slideNext = (n === numSlide) ? 1 : (n + 1);

      //console.log(slidePrev + ' / ' + slideNow + ' / ' + slideNext);
    }



  //season_banner
    
    var numSeason = $('div.box-inner ul.slide > li').length;
    var seasonNow = 0;
    var seasonNext = 0;
    var seasonPrev = 0;
    var seasonFirst = 1;


    $('div.box-inner ul.slide > li').each(function(i) {
      $(this).css({'left': (i * 100) + '%'});
    });

    showSeason(seasonFirst);

    $('#banner .control a.prev').on('click', function() {
      $($(this).children()).find('img').stop(true).animate({'left': '-10px'}, 30).animate({'left': '0px'}, 100);
      showSeason(seasonPrev);    
      });

    $('#banner .control a.next').on('click', function() {
      $($(this).children()).find('img').stop(true).animate({'right': '-10px'}, 30).animate({'right': '0px'}, 100);
      showSeason(seasonNext);    
    });


    function showSeason(n) {
      
      $('div.box-inner ul.slide').css({'transition': 'left 0.3s', 'left': (-(n - 1) * 100) + '%'});

      seasonNow = n;
      seasonPrev = (n === 1) ? numSeason : (n - 1);
      seasonNext = (n === numSeason) ? 1 : (n + 1);

      //console.log(slidePrev + ' / ' + slideNow + ' / ' + slideNext);
    }


 
  //festival_bannerSlide

  var numBanner = 0;
  var bannerNow = 1;
  var bannerPrev = 0;
  var bannerNext = 0;
  var offsetLeft = 0;
  var widthBox = 0;
  var widthBar = 0;
  var offsetLeftMin = 0;
  var loadCounter = 0;
  var bounceTimerId = '';
  var numFestival = $('div.box ul.banner > li').length;
  //console.log(numFestival);

  $('div.box ul.banner > li img').on('load', function() {
    loadCounter++;
    if (loadCounter === $('div.box .banner > li').length){
      setStatus();
    }
  });

  $('div.box ul.banner > li').each(function(i) {
    $(this).css({'left': (i * 100) + '%', 'display': 'block'});
  });

  $('div.box .control a.prev').on('click', function() {
    if (bannerNow === 1) {
      $('#festival div.box').find('.banner').css({'transition': 'left 0.05s', 'left': '10px'}).one('transitionend', function() {
          $(this).css({'transition': 'left 0.1s', 'left': '0px'});
        });
      } else {
        showBanner(bannerPrev);
      }
  });

  $('div.box .control a.next').on('click', function() {
    //console.log('next' + numBanner);
    if (bannerNow === numBanner) {  
      //console.log(`now : ${bannerNow} / num : ${numBanner}`);
        $('#festival div.box').find('.banner').css({'transition': 'left 0.05s', 'left': (offsetLeftMin - 10) + 'px'}).one('transitionend', function() {
          $(this).css({'transition': 'left 0.1s', 'left': offsetLeftMin + 'px'});
        });
      } else {
        //console.log('222');
        showBanner(bannerNext);
      }
  });

  $(window).on('resize', function() {
    clearTimeout(bounceTimerId);
    bounceTimerId = setTimeout(function() {setStatus();}, 100);
  });

  function showBanner(n, type) {
    if (n > numFestival) n = numFestival;
    if (type !== undefined && type === 'auto') {
    if (festivalNow === numFestival && n === numFestival) n = 1;
    }

    offsetLeft = -$('div.box .banner > li:eq('+ (n - 1) +')').position().left;
    if (offsetLeft <= offsetLeftMin) offsetLeft = offsetLeftMin;
    $('div.box .banner').css({'transition' : 'left 0.3s', 'left': offsetLeft + 'px'});

    bannerNow = n;
    bannerPrev = (n === 1) ? 1 : (n - 1);
    bannerNext = (n === numBanner) ? numBanner : (n + 1);
    //console.log(bannerPrev + ' / ' + bannerNow + ' / ' + bannerNext);
  }

  function setStatus() {
    // console.log('status' + numBanner);
    widthBox = $('div.box').innerWidth();
    widthBar = 0;
    $('div.box .banner > li').each(function() {
      widthBar += $(this).outerWidth(true);
    });
    offsetLeftMin = widthBox - widthBar;
    $('div.box ul.banner').css({'width' : (widthBar + 5) + 'px'});

    //console.log('widthBox : ' + widthBox);
    //console.log('widthBar : ' + widthBar);
    //console.log('min : ' + offsetLeftMin);


    $('div.box ul.banner > li').each(function(i) {
      // console.log(-$(this).position().left);
      if (-$(this).position().left <= offsetLeftMin) {
        numBanner = i + 1;
        //console.log(numBanner);
        return false;
      } 
    });

    if (numBanner < bannerNow) bannerNow = numBanner;
    showBanner(bannerNow);
  }



  //season

  var selectNow = 1;
  showSelect(1);

  $('ul.title > li > a').on('click', function() {
    var index = $('ul.title > li').index($(this).parent());
    showSelect(index + 1);
  });

  function showSelect(n) {
    $('ul.title > li:eq(' + (n - 1) + ') > div.inner-box').addClass('on'); 
    $('ul.title > li:eq(' + (n - 1) + ')').siblings().children().removeClass('on');
    selectNow === n;
  } 


  //hotplace
  var selectTab = 1;

  showTab(1);

    $('div.map > ul > li > a').on('click focus', function(n) {
    var index = $('div.map > ul > li').index($(this).parent());
    $('ul.tab-box > li > h4 > a').removeClass('on');
    $('ul.tab-box > li:eq('+ index +') > h4 > a').addClass('on');
    $('div.map > ul > li').removeClass('on');
    $(this).parent().addClass('on');
    showTab(index + 1);
    });

    $('ul.tab-box > li > h4 > a').on('click focus', function(n) {
    var num = $('ul.tab-box > li > h4').index($(this).parent());
    $('ul.tab-box > li > h4 > a').removeClass('on');
    $(this).addClass('on');
    $('div.map > ul > li').removeClass('on');
    $('div.map > ul > li:eq('+ num +')').addClass('on');
    showTab(num + 1);
    }); 

  function showTab(n) {
    $('ul.tab-box > li:eq(' + (n - 1) + ') > ul.inner').addClass('on'); 
    $('ul.tab-box > li:eq(' + (n - 1) + ')').siblings().children().removeClass('on');
    showTab === n;
  } 
});


//hotplace_mobile
/* var numPlace = 0;
var placeNow = 1;
var placePrev = 0;
var placeNext = 0;
var placeOffsetLeft = 0;
var placeWidthBox = 0;
var placeWidthBar = 0;
var placeOffsetLeftMin = 0;
var placeLoadCounter = 0;
var placeBounceTimerId = '';
var numHotplace = $('#hotplace > div.content > div.map-info > div.inner-box ul.tab-box > li').length;


$('#hotplace div.inner-box ul.tab-box > li').on('load', function() {
  loadCounter++;
  if (loadCounter === $('#hotplace div.inner-box ul.tab-box > li').length){
    setStatus02();
  }
});

$('#hotplace div.inner-box ul.tab-box > li').each(function(i) {
  $(this).css({'left': (i * 100) + '%', 'display': 'block'});
});

$('#hotplace div.inner-box .control a.prev').on('click', function() {
  if (placeNow === 1) {
    $('#hotplace div.inner-box').find('.tab-box').css({'transition': 'left 0.05s', 'left': '10px'}).one('transitionend', function() {
        $(this).css({'transition': 'left 0.1s', 'left': '0px'});
      });
    } else {
      showBanner(placePrev);
    }
});

$('#hotplace div.inner-box .control a.next').on('click', function() {
  //console.log('next' + numBanner);
  if (placeNow === numPlace) {  
    //console.log(`now : ${bannerNow} / num : ${numBanner}`);
      $('#hotplace div.inner-box').find('.tab-box').css({'transition': 'left 0.05s', 'left': (placeOffsetLeft - 10) + 'px'}).one('transitionend', function() {
        $(this).css({'transition': 'left 0.1s', 'left': placeOffsetLeft + 'px'});
      });
    } else {
      //console.log('222');
      showPlace(placeNext);
    }
});

$(window).on('resize', function() {
  clearTimeout(placeBounceTimerId);
  placeBounceTimerId = setTimeout(function() {setStatus02();}, 100);
});

function showPlace(n, type) {
  if (n > numHotplace) n = numHotplace;
  if (type !== undefined && type === 'auto') {
  if (placeNow === numHotplace && n === numHotplace) n = 1;
  }

  placeOffsetLeft = -$('#hotplace div.inner-box ul.tab-box > li:eq('+ (n - 1) +')').position().left;
  if (placeOffsetLeft <= placeOffsetLeftMin) placeOffsetLeft = placeOffsetLeftMin;
  $('#hotplace div.inner-box ul.tab-box').css({'transition' : 'left 0.3s', 'left': placeOffsetLeft + 'px'});

  placeNow = n;
  placePrev = (n === 1) ? 1 : (n - 1);
  placeNext = (n === numPlace) ? numPlace : (n + 1);
  console.log(placePrev + ' / ' + placeNow + ' / ' + placeNext);
}

function setStatus02() {
  // console.log('status' + numBanner);
  placeWidthBox = $('#hotplace div.inner-box').innerWidth();
  placeWidthBar = 0;
  $('#hotplace div.inner-box ul.tab-box > li').each(function() {
    placeWidthBar += $(this).outerWidth(true);
  });
  placeOffsetLeftMin = placeWidthBox - placeWidthBar;
  $('#hotplace div.inner-box ul.tab-box').css({'width' : (placeWidthBar + 5) + 'px'});

  console.log('placeWidthBox : ' + placeWidthBox);
  console.log('placeWidthBar : ' + placeWidthBar);
  console.log('min : ' + placeOffsetLeftMin);


  $('#hotplace div.inner-box ul.tab-box > li').each(function(i) {
    console.log(-$(this).position().left);
    if (-$(this).position().left <= placeOffsetLeftMin) {
      numPlace = i + 1;
      console.log(numPlace);
      return false;
    } 
  });

  if (numPlace < placeNow) placeNow = numPlace;
  showPlace(placeNow);
}



 */






function preventDefaultAnchor() {
  $(document).on('click', 'a[href="#"]', function(e) {
    e.preventDefault();
  });
}    






















