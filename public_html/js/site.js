/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 * 
 * see
 * http://stackoverflow.com/questions/123999/how-to-tell-if-a-dom-element-is-visible-in-the-current-viewport/7557433#7557433
 */
var engine = {
    
    homepageGalleryHeight : 0,
    homepageImageArray : [
            "images/1/2.jpg",
            "images/1/3.jpg",
            "images/1/4.jpg",
            "images/1/5.jpg",
            "images/1/6.jpg",
            "images/1/7.jpg",
            "images/1/8.jpg",
            "images/1/9.jpg"
        ],
        //TODO: Test onload insertion of images > 1 to increase apparent load speed...
    contentImagesArray : {
        "" : []
    },
    currentPage : null,
    
    init : function(){  
        //trigger stuff
        this.menuRolloverHandler();
        
        this.appendMenu();

        if(this.getCurrentPage() === "index" || this.getCurrentPage() === ""){
            this.appendHomePageImages();
            
            //set height of image container on load
            if($("#cycler").length){
                this.setHomepageImageContainerHeight();
            }
            // run every 7s
            setInterval('engine.cycleImages()', 7000);
        }
    },
    
    //append homepage carousel images after DOM content load:
    appendHomePageImages : function(){
        for(var a=0;a<this.homepageImageArray.length;a++){
            var img = document.createElement("img");
            img.src = this.homepageImageArray[a];
            img.alt = "";
            $("#cycler").append(img);
        }
    },
    
    getCurrentPage : function(){
        return(window.location.pathname.split(/\//g)[window.location.pathname.split(/\//g).length-1].split(/\./)[0]);
    },
    
    menuRolloverHandler : function(){
        //get all menu panels with JQuery selector.
        //simply set the background and text visibility
        $(".linkblock").each(function(){   
            $(this).mouseover(function(){
                $(this).find(".menu-overlay").css({
                    "display":"block",
                    "width":$(this).find("img").width()+"px",
                    "height":$(this).find("img").height()+"px",
                    //see http://stackoverflow.com/questions/12744928/in-jquery-how-can-i-set-top-left-properties-of-an-element-with-position-values
                    "position":"absolute",  //NOTE: PARENT element is set to position:relative
                    "top":"5px",
                    "left":"5px",
                    "line-height":$(this).find("img").height() + "px"
                });
            }).mouseout(function(){
                $(this).find(".menu-overlay").css({"display":"none"});
            });
        });
    },
    
    appendMenu : function(){
        //append menu block if we are on client example page:
        if($("#body-content").length > 0){
            $.ajax("portfolio.html").done(function(data){
                //get the primary menu blocks
                $("#body-content").append($(data).find("#portfolio_blocks"));
                
                //and attach the hover handler:
                engine.menuRolloverHandler();
            });
        }
    },
    
    setHomepageImageContainerHeight : function(){
        //console.log("Getting height: " + $("#cycler>img")[0].clientHeight);
        $("#cycler").height($("#cycler>img")[0].clientHeight);
    },
    
    /* from http://www.simonbattersby.com/blog/simple-jquery-image-crossfade/ */
    cycleImages : function(){
        
        var $active = $('#cycler .active');
        var $next = ($active.next().length > 0) ? $active.next() : $('#cycler img:first');
        $next.css('z-index',2);//move the next image up the pile
        $active.fadeOut(1500,function(){//fade out the top image
            $active.css('z-index',1).show().removeClass('active');//reset the z-index and unhide the image
            $next.css('z-index',3).addClass('active');//make the next image the top one
        });
        //set height on each image fade because we moght resize...
        this.setHomepageImageContainerHeight();
    }
};





////http://stackoverflow.com/questions/123999/how-to-tell-if-a-dom-element-is-visible-in-the-current-viewport/7557433#7557433
////Check if element el is within viewport:
//function isElementInViewport(el){
//    var rect = el.getBoundingClientRect();
//
//    return (
//        rect.top >= 0 &&
//        rect.left >= 0 &&
//        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && /*or $(window).height() */
//        rect.right <= (window.innerWidth || document.documentElement.clientWidth) /*or $(window).width() */
//    );
//};
//    
////the callback function:
//function onVisibilityChange(){
//    var old_visible;
//    return function () {
//        var visible = isElementInViewport(el);
//        if (visible !== old_visible) {
//            old_visible = visible;
//            if (typeof callback === 'function') {
//                callback();
//            }
//        }
//    };
//};
//
////the handler:
//var handler = onVisibilityChange($(".content-image")[0], function() {
//    console.log("xx");
//});
//
////jQuery - attach handler to events
//$(window).on('DOMContentLoaded load resize scroll', handler); 
//
////finally, attach to element?
//$(".content-image").onVisibilityChange(function(){
//    console.log("XX"); 
//});

/*
 * JQurey onload handler. Trigger things when the page has finished loading:
 */
$(function(){
    //engine.init();
});
window.onload = function(){
    console.log("window.onload");
    engine.init();
};

/*
 * we need to resize the homepage carousel image container element when the page resizes:
 */
$(window).resize(function(){
    if($("#cycler").length){
        engine.setHomepageImageContainerHeight();
    };
});

//$(window).on('DOMContentLoaded load resize scroll', function(){
//    engine.onVisibilityChange(el,function(){
//        console.log(el + " is ");
//    });
//});


