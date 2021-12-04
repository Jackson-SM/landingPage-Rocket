jQuery(function () {
    $(window).scroll(function() {
        var scroll = $(this).scrollTop()
        if(scroll > 590){
            $('#navbar').addClass('navbarscroll')
        }else {
            $('#navbar').removeClass('navbarscroll')
            $('#navbar a').removeClass('text-dark')
            $('#navbar a').addClass('text-light')
        }
    })
});