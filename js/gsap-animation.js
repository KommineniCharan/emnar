(function ($) {
"use strict";

gsap.registerPlugin(ScrollTrigger, SplitText);
gsap.config({
nullTargetWarn: false,
trialWarn: false
});

/*----  Functions  ----*/
function getpercentage(x, y, elm) { 
elm.find('.pbmit-fid-inner').html(y + '/' + x);
var cal = Math.round((y * 100) / x);
return cal;
}

function pbmit_title_animation() {
ScrollTrigger.matchMedia({
"(min-width: 1025px)": function() {

var pbmit_var = jQuery('.pbmit-heading, .pbmit-heading-subheading');
if (!pbmit_var.length) {
return;
}
const quotes = document.querySelectorAll(".pbmit-heading-subheading .pbmit-title, .pbmit-heading .pbmit-title");

quotes.forEach(quote => {

//Reset if needed
if (quote.animation) {
quote.animation.progress(1).kill();
quote.split.revert();
}

var getclass = quote.closest('.pbmit-heading-subheading, .pbmit-heading').className;
var animation = getclass.split('animation-');
if (animation[1] == "style4") return

quote.split = new SplitText(quote, {
type: "lines,words,chars",
linesClass: "split-line"
});
gsap.set(quote, { perspective: 400 });

if (animation[1] == "style1") {
gsap.set(quote.split.chars, {
opacity: 0,
y: "90%",
rotateX: "-40deg"
});
}
if (animation[1] == "style2") {
gsap.set(quote.split.chars, {
opacity: 0,
x: "50"
});
}
if (animation[1] == "style3") {
gsap.set(quote.split.chars, {
opacity: 0,
});
}
quote.animation = gsap.to(quote.split.chars, {
scrollTrigger: {
trigger: quote,
start: "top 90%",
},
x: "0",
y: "0",
rotateX: "0",
opacity: 1,
duration: 1,
ease: Back.easeOut,
stagger: .02
});
});
},
});
}

function pbmit_card_verticel_pinning() {
var pbmit_var = jQuery('.pbmit-element-portfolio-style-2');
if (!pbmit_var.length) {
return;
}
ScrollTrigger.matchMedia({
"(min-width: 1025px)": function() {

let pbmitpanels = gsap.utils.toArray(".pbmit-element-portfolio-style-2 .pbmit-portfolio-style-2");
const spacer = 0;

let pbmitheight = pbmitpanels[0].offsetHeight + 120;
pbmitpanels.forEach((pbmitpanel, i) => { 
TweenMax.set(pbmitpanel, {top: i * 50});
const tween = gsap.to(pbmitpanel, {
scrollTrigger: {
trigger: pbmitpanel,
start: () => `top bottom-=100`,
end: () => `top+=${150 + (pbmitpanels.length * 2)}`,
scrub: true, 
//   invalidateOnRefresh: true
},
ease: "none",
scale: () => 1 - (pbmitpanels.length - i) * 0.025
});
ScrollTrigger.create({
trigger: pbmitpanel, 
start: () => "top 140px", 
endTrigger: '.pbmit-element-portfolio-style-2', 
end: `bottom top+=${pbmitheight + pbmitpanels.length}`,
pin: true, 
pinSpacing: false, 
});
});
},
"(max-width:1024px)": function() {
ScrollTrigger.getAll().forEach(pbmitpanels => pbmitpanels.kill(true));
}
});
}

function pbmit_img_animation() {
const boxes = gsap.utils.toArray('.pbmit-animation-style1,.pbmit-animation-style2,.pbmit-animation-style3,.pbmit-animation-style4,.pbmit-animation-style5,.pbmit-animation-style6,.pbmit-animation-style7');
boxes.forEach(img => {
gsap.to(img, {
scrollTrigger: {
trigger: img,
start: "top 70%",
end: "bottom bottom",
toggleClass: "active",
once: true,
}
});
});
}

var pbmit_thia_sticky = function() {
if(typeof jQuery.fn.theiaStickySidebar == "function"){
jQuery('.pbmit-sticky-sidebar').theiaStickySidebar({
additionalMarginTop: 100
});
jQuery('.pbmit-sticky-column').theiaStickySidebar({
additionalMarginTop: 120
});
}
}

ScrollTrigger.matchMedia({
"(max-width: 1200px)": function() {
ScrollTrigger.getAll().forEach(t => t.kill());
}
});

pbmit_title_animation();
pbmit_thia_sticky();


// on resize
jQuery(window).on('resize', function() {  
pbmit_title_animation();
pbmit_img_animation();
});

// on load 
jQuery(window).on('load', function(){
pbmit_img_animation();
pbmit_card_verticel_pinning();
gsap.delayedCall(1, () =>
ScrollTrigger.getAll().forEach((t) => {
t.refresh();
})
);	
});	
})($);

