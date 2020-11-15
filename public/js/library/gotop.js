function goTop(select) {
    select.on('click', function() {
        $('html,body').animate({
            scrollTop: 0
        })
    })
}

export default goTop;