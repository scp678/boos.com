function glass(movebox,bigpic,small,big) {

    small.on('mouseover',function() {
        movebox.css({'display':'block'});
        big.css({'display':'block'});

        movebox.css({
            width: (small.width() * big.width() / bigpic.width()) + 'px',
            height: (small.height() * big) + 'px'
        });

        small.on('mousemove',function(ev) {
            let top = ev.pageY - small.offset().top - movebox.height() / 2;
            let left = ev.pageX - small.offset().left - movebox.width() / 2;

            let ratio = bigpic.width() / small.width();

            if (top <= 0) {
                top = 0;
            }else if (top >= small.height() - movebox.height()) {
                top = small.height() - movebox.height() - 2;
            }

            if (left <= 0) {
                left = 0;
            }else if (left >= small.width() - movebox.width()) {
                left = small.width() - movebox.width - 2;
            }

            movebox.css({
                top: top + 'px',
                left: left + 'px'
            });

            bigpic.css ({
                top: ratio *-top + 'px',
                left: ratio * -left + 'px'
            });
        });
    });

    small.on('mouseout',function() {
        movebox.css({'display':'none'});
        big.css({'display':'none'});
    });
}

export default glass;