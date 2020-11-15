import './library/jquery.js';
import './library/jquery.lazyload.min.js'
import goTop from './library/gotop.js';
import debounce from './library/debounce.js';
import cookie from './library/cookie.js';
import {baseUrl} from './library/config.js';

(function() {
    let shop = cookie.get('shop');

    if (shop) {
        shop = JSON.parse(shop);
        let idList = shop.map(elm => elm.id).join();
        
        $.ajax({
            type: "get",
            url: `${baseUrl}/product/getItems`,
            data: {
                idList: idList
            },
            dataType: "json",
            success: function (res) {
                let template = '';

                res.forEach((elm,i) => {
                    let arr = shop.filter(val => val.id === elm.id);
                    let picture = JSON.parse(elm.picture);

                    template += `
                    <li class="hover">
                        <div class="top f-cb">
                            <div class="fl check checked">
                                <input type="checkbox" style="display: none;">
                            </div>
                            <div class="fl intro">
                                <div class="pic">
                                    <img src="../${picture[0].src}" alt="">
                                </div>
                                <h2>${elm.title}</h2>
                                <p>${elm.model}天然气</p>
                            </div>
                            <div class="fl price">
                                ￥
                                <span class="unit-html">${elm.price.toFixed(2)}</span>
                            </div>
                            <div class="fl numbox">
                                <span class="fl butn cut">-</span>
                                <span class="fl num">${arr[0].num}</span>
                                <span class="fl butn add">+</span>
                            </div>
                            <div class="fl integral integral-pice">${(elm.price * arr[0].num)}</div>
                            <div class="fl plan">
                                ￥
                                <span class="unit-html sum-pice">${(elm.price * arr[0].num).toFixed(2)}</span>
                            </div>
                            <div class="fl dele">删除</div>
                        </div>
                        <dl>
                            <dd>
                                <div class="into f-cb">
                                    <div class="btns red fl">赠品</div>
                                    <div class="dd-pic fl">
                                        <img src="https://img.shoprobam.com//Public/Uploads/boss/goods/20160719/14689157994978.jpg" alt="">
                                    </div>
                                    <h3 class="fl">前10名好评赠WMF煎盘</h3>
                                    <div class="fl dd-price"></div>
                                    <div class="fl dd-numbox">1</div>
                                    <div class="fl dd-integral"></div>
                                    <div class="fl dd-plan"></div>
                                    <div class="fl dd-dele"></div>
                                </div>
                            </dd>
                        </dl>
                    </li>
                    `;

                    let fin = `
                    <span class="all-price">${(elm.price * arr[0].num).toFixed(2)}</span>
                    `;

                    $('.cart-box .cart-list').append(template);
                    $('.cart-box .cart-bot .price').append(fin);

                        $('.cut').on('click',function() {
                            if (arr[0].num > 1) {
                                arr[0].num--;
                                $('.numbox .num').html(arr[0].num);
        
                                if (arr[0].num == 1) {
                                    $('.numbox .cut').addClass('hd');
                                }
                            }
                        });

                        $('.add').on('click',function() {
                            if (arr[0].num < 6) {
                                arr[0].num++;
                                $('.numbox .num').html(arr[0].num);
        
                                if (arr[0].num == 5) {
                                    alert('当前商品限购5件');
                                }
                            }
                        });


                });
            }
        });
    }

})();

//3.回到顶部
const sel = $('.scrolltt a');
goTop(sel);

// 懒加载
$(".lazy").lazyload({
    effect: "fadeIn",
    placeholder :"../img/timg.gif"
});

// 商品下拉菜单
function down() {
    $('.sub').slideDown(200);
}
function up() {
    $('.sub').slideUp(200);
}
$('.all').hover(debounce(down,200),debounce(up,200));

// 广告栏信息显示
// 上
function showS() {
    $('.gotalk-alert_ss').fadeIn(100);
}
function hideS() {
    $('.gotalk-alert_ss').fadeOut(100);
}
$('.scrob a').hover(debounce(showS,500),debounce(hideS,500));
// 下
function showX() {
    $('.erw-box').fadeIn(100);
}
function hideX() {
    $('.erw-box').fadeOut(100);
}
$('.shopping a').hover(debounce(showX,500),debounce(hideX,500));

// 优惠券显示
$('.see-discount').on('click',function() {
    $('.discount-box').slideToggle();
    $('.see-discount').toggleClass('hover');
});