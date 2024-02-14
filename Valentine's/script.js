var opacity = 0;
var intervalID = 0;

window.onload = fadeIn;

function fadeIn() {
    if (document.getElementById("name")){
        intervalID = setInterval(show, 100); 
    }
   


    if (document.getElementById("iloveyou")){
        thirdInterValID = setInterval(showMessage,100);
        setTimeout(function(){
            secIntervalID = setInterval(showIloveYou, 100);
        }, 6000);
        
    }

    if(document.getElementById("offer")){
        thirdInterValID = setInterval(showMessage,100);
    }
}

function show() {
    var body = document.getElementById("name");
    opacity = Number(window.getComputedStyle(body)
        .getPropertyValue("opacity"));
    if (opacity < 1) {
        opacity = opacity + 0.05; 
        body.style.opacity = opacity;
    } else {
        clearInterval(intervalID);
    }
}

function showMessage() {
    var body = document.getElementById("message");
    opacity = Number(window.getComputedStyle(body)
        .getPropertyValue("opacity"));
    if (opacity < 1) {
        opacity = opacity + 0.05; 
        body.style.opacity = opacity;
    } else {
        clearInterval(thirdInterValID);
    }
}


function showIloveYou(){
    var body = document.getElementById("iloveyou");
    opacity = Number(window.getComputedStyle(body)
        .getPropertyValue("opacity"));
    if (opacity < 1) {
        opacity = opacity + 0.05; 
        body.style.opacity = opacity;
    } else {
        clearInterval(secIntervalID);
    }

}



$(document.getElementById("name")).on("click", function() {
    window.location.href = "./second.html"
});

$(document.getElementById("iloveyou")).on("click", function() {
    window.location.href = "./offer.html"
});



$( document ).ready(function() {
    var scaleCurve = mojs.easing.path('M0,100 L25,99.9999983 C26.2328835,75.0708847 19.7847843,0 100,0');
       var el = document.querySelector('.button'),
        timeline = new mojs.Timeline(),
        tween1 = new mojs.Burst({
            parent: el,
            radius: { 0: 100 },
            angle: { 0: 45 },
            y: -10,
            count: 10,
            radius: 100,
            children: {
                shape: 'circle',
                radius: 30,
                fill: [ 'red', 'white' ],
                strokeWidth: 15,
                duration: 500,
            }
        });
    
    
        tween2 = new mojs.Tween({
            duration : 900,
            onUpdate: function(progress) {
                var scaleProgress = scaleCurve(progress);
                el.style.WebkitTransform = el.style.transform = 'scale3d(' + scaleProgress + ',' + scaleProgress + ',1)';
            }
        });
        tween3 = new mojs.Burst({
            parent: el,
            radius: { 0: 100 },
            angle: { 0: -45 },
            y: -10,
            count:10,
            radius:125,
            children: {
                shape: 'circle',
                radius: 30,
                fill: [ 'white', 'red' ],
                strokeWidth: 15,
                duration:400,
            }
        });
    
    
    timeline.add(tween1, tween2, tween3);
    
    
    $( ".button" ).click(function() {
        if ($(this).hasClass('active')){
            $(this).removeClass('active');
        }else{
        timeline.play();
        $(this).addClass('active');
        setTimeout(function(){
            window.location.href = "poem.html";
        },2000);
        }
    });
    
});

