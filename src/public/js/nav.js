jQuery(function() {
    const a = document.querySelectorAll('a').forEach(e => {
        e.onclick = function() {
            const hashantigo = window.location.hash
            const hashnovo = e.getAttribute(`href`)
            if(hashantigo != hashnovo){
                const btnantigo = document.querySelector(`#links a[href="${hashantigo}"]`)
                const btnnovo = document.querySelector(`#links a[href="${hashnovo}"]`)
                btnnovo.classList.add('text-primary')
                btnnovo.classList.remove('text-light')
                btnnovo.classList.remove('text-dark')
                if(btnantigo){
                    btnantigo.classList.remove('text-light')
                    btnantigo.classList.remove('text-primary')
                }
            }
            $.ajax({
                url: `../../pages/${hashnovo.substring(1)}.html`,
                cache: false
            }).done((html) => {
                $('main').html(html)
            })
        }
    })
})