(function(){
    jQuery('#btnEntrar').on('click', e => {
        if($('#login').val().length == 0 || $('#password').val().length == 0){
            e.preventDefault()
            alert('Caixas Vazias')
        }
    })
})