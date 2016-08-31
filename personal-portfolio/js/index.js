

//everything starts out collapsed
$(function() {
  var $container = $('#parallax');
  $container.masonry({
    gutter: ".gutter",
    itemSelector : '.floating',
    percentPosition: true
  });
  $(".expand").slideUp(0);
});



// handle links with @href started with '#' only
$(".click").on('click', 'a[href^="#"]', function(e) {
    // target element id
    var id = $(this).attr('href');
    // target element
    var $id = $(id);
    if ($id.length === 0) {
        return;
    }
    
    e.preventDefault();
    
    var pos = $(id).offset().top;
    $('body, html').animate({scrollTop: pos - 20});
});

$("#resume").hover(function(){ 
  
});


$("#tabs>li>a").hover(function(){
  var $this = $(this);
  var scrollPos = $(document).scrollTop();
  var grad = scrollPos/($(document).height() - $(window).height());
  var rgb = hslToRgb(rgbToHsl(204,204,255)[0], 1, (75 - (Math.abs(80 - 160*grad)))/100);
  var $color = "rgb(" + rgb[0] + ", " + rgb[1] + ", " + rgb[2] + ")";
  $(this).css("background-color", $color);
}, function(){
  $(this).css("background-color", "transparent");
});


//change active tabs during scrolling, gradient color
$(document).on('scroll', function(event){
  var scrollPos = $(document).scrollTop();
  var grad = scrollPos/($(document).height() - $(window).height());
  console.log((80 - (Math.abs(80 - 160*grad)))/100);
  var rgb = hslToRgb(rgbToHsl(204,204,255)[0], 1, (80 - (Math.abs(80 - 160*grad)))/100);
  var $color = "rgb(" + rgb[0] + ", " + rgb[1] + ", " + rgb[2] + ")";
  $("#tabs").css("background-color", $color);
  if ($("#portfolio").position().top <= scrollPos && $("#portfolio").position().top + $("#portfolio").height() + 80> scrollPos) {
    console.log($(".caption").css("color"));
    if ($(".caption").css("color") === "rgb(255, 255, 255)"){
      $(".caption").css("color", "black");
      $(".caption").effect("bounce", {times: 7, distance: 100}, "slow");
    }
  }
});

//expand div
$("figure>img").click(function () {
  $div = $(this); 
  var bool;
  $row = $div.parent().parent().parent();
  //getting the next element
  $content = $row.next();
  bool = ($content.css("display") != "none");
  
  $content.slideToggle({duration: 500, start: function () {
    $('#parallax').masonry('reload');
    if (bool) {
      $('body, html').animate({scrollTop: $div.offset().top - 100});
    } else {
      $('body, html').animate({scrollTop: $content.offset().top - 100});
    }
  }});
});

//from axonflux.com, attributed to the now defunct mjijackson.com
function hslToRgb(h, s, l){
    var r, g, b;

    if(s == 0){
        r = g = b = l; // achromatic
    }else{
        var hue2rgb = function hue2rgb(p, q, t){
            if(t < 0) t += 1;
            if(t > 1) t -= 1;
            if(t < 1/6) return p + (q - p) * 6 * t;
            if(t < 1/2) return q;
            if(t < 2/3) return p + (q - p) * (2/3 - t) * 6;
            return p;
        }

        var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        var p = 2 * l - q;
        r = hue2rgb(p, q, h + 1/3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1/3);
    }
    return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}

//from axonflux.com, attributed to the now defunct mjijackson.com
function rgbToHsl(r, g, b){
    r /= 255, g /= 255, b /= 255;
    var max = Math.max(r, g, b), min = Math.min(r, g, b);
    var h, s, l = (max + min) / 2;

    if(max == min){
        h = s = 0; // achromatic
    }else{
        var d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch(max){
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }

    return [h, s, l];
}

$(".fa-github-square").hover(function() {
  var $text = document.getElementById("text");
  $text.style.paddingTop = "60px";
  $text.innerHTML = "Feel free to fork me on github.";
});

$(".fa-facebook-square").hover(function() {
  var $text = document.getElementById("text");
  $text.style.paddingTop = "60px";
  $text.innerHTML = "Feel free to add or message me on Facebook.";
});

$(".fa-codepen").hover(function() {
  var $text = document.getElementById("text");
  $text.style.paddingTop = "60px";
  $text.innerHTML = "Check out some of my webdev projects, including this website.";
});

$(".fa-linkedin-square").hover(function() {
  var $text = document.getElementById("text");
  $text.style.paddingTop = "60px";
  $text.innerHTML = "Feel free to connect with me on Linkedin.";
});

$(".fa-envelope-square").hover(function() {
  var $text = document.getElementById("text");
  $text.style.paddingTop = "30px";
  $text.innerHTML = "Please message me with an personal or professional inquiries. I also am part of the industrial relations committee of HKN at Berkeley. If you would like to contact me with questions about partnering with HKN to host a recruiting event, please email jasonainc@hkn.eecs.berkeley.edu instead.";
});