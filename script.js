$(document).ready(function(){
    $(window).scroll(function(){
        // sticky navbar on scroll script
        if(this.scrollY > 20){
            $('.navbar').addClass("sticky");
        }else{
            $('.navbar').removeClass("sticky");
        }
        
        // scroll-up button show/hide script
        if(this.scrollY > 500){
            $('.scroll-up-btn').addClass("show");
        }else{
            $('.scroll-up-btn').removeClass("show");
        }
    });

    // slide-up script
    $('.scroll-up-btn').click(function(){
        $('html').animate({scrollTop: 0});
        // removing smooth scroll on slide-up button click
        $('html').css("scrollBehavior", "auto");
    });

    $('.navbar .menu li a').click(function(){
        // applying again smooth scroll on menu items click
        $('html').css("scrollBehavior", "smooth");
    });

    // toggle menu/navbar script
    $('.menu-btn').click(function(){
        $('.navbar .menu').toggleClass("active");
        $('.menu-btn i').toggleClass("active");
    });

    // typing text animation script
    var typed = new Typed(".typing", {
        strings: [ "Software Developer", "YouTuber", "Blogger", "Designer", "Freelancer"],
        typeSpeed: 100,
        backSpeed: 60,
        loop: true
    });

    var typed = new Typed(".typing-2", {
        strings: [ "Software Developer", "Blogger", "Designer", "Freelancer","YouTuber",],
        typeSpeed: 100,
        backSpeed: 60,
        loop: true
    });

    // owl carousel script
    $('.carousel').owlCarousel({
        margin: 20,
        loop: true,
        autoplay: true,
        autoplayTimeOut: 2000,
        autoplayHoverPause: true,
        responsive: {
            0:{
                items: 1,
                nav: false
            },
            600:{
                items: 2,
                nav: false
            },
            1000:{
                items: 3,
                nav: false
            }
        }
    });

// dynamic all right reerved date 
    document.getElementById("year").innerHTML = (new Date().getFullYear());

// to download cd directly 
    $(document).on('click','#download-cv',function(e){
        e.preventDefault();  //stop the browser from following
        window.location.href = 'file/sabin_cv.docx';
    });   

});

// to send email 
function sendEmail(){
    $('#submit').attr('disabled', true);
    $('#button-spinner').show();
    var name = $('#sender-name').val();
    var email = $('#sender-email').val();
    var subject = $('#sender-subject').val();
    var body = $('#sender-body').val();
    
    var final_body = 'name: '+ name +'<br>email: '+email+ '<br>subject: '+subject+'<br>body: '+body;

    Email.send({
        Host : "smtp.gmail.com",
        Username : "portfolio.response@gmail.com",
        Password : "pedrohazard10",
        To : 'metusab@gmail.com',
        From : "portfolio.response@gmail.com",
        Subject : "From Portfolio Site",
        Body : final_body
    }).then(
             message =>{
                if(message=='OK'){
                    $('#button-spinner').hide();
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Email Sent. Thank you for connecting.',
                        showConfirmButton: false,
                        timer: 1500
                      })
                    $("#email-form")[0].reset();
                }
                else{
                    console.error (message);
                    $('#button-spinner').hide();
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Something went wrong!',
                        footer: '<a href="">Why do I have this issue?</a>'
                      })
                    
                }
            }   
    );
}

// $(document).on('click','#hire-me',function(e){
//     Swal.fire({
//         title: 'Error!',
//         text: 'Do you want to continue',
//         icon: 'error',
//         confirmButtonText: 'Cool'
//       })
// });