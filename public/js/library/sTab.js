function sTab(smallpic,bigpic,right,left) {
    let listLi = $('.shopping-list .outer li');
    let list = $('.shopping-list .outer');

    let imgurlfirst = listLi.eq(0).find('img').attr('src');
    smallpic.attr('src',imgurlfirst);

    listLi.on('click',function() {
        let imgurl = $(this).find('img').attr('src');
        smallpic.attr('src',imgurl);
        bigpic.attr('src',imgurl);
    });

    let num = 5;
    right.on('click',function() {
        if (listLi.length > num) {
            num++;
            list.animate({
                left: -(num - 5) * listLi.eq(0).outerWidth(true)
            });
        }
    });

    left.on('click',function() {
        if (num > 5) {
            num--;
            list.animate({
                left: -(num - 5) * listLi.eq(0).outerWidth(true)
            });
        }
    });

}

export default sTab;