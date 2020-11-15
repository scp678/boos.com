import './library/jquery.js';
import './library/jquery.lazyload.min.js'
import goTop from './library/gotop.js';
import debounce from './library/debounce.js';
import djs from './library/time.js';
import glass from './library/glass.js';
import sTab from './library/sTab.js';
import cookie from './library/cookie.js';
import {baseUrl} from './library/config.js';


(function() {
    let id = location.search.split('=')[1];

    $.ajax({
        type: "get",
        url: `${baseUrl}/product/getItem`,
        data: {id: id},
        dataType: "json",
        success: function (res) {
            res = res[0];
            let picture = JSON.parse(res.picture);
            let viewlist = '';
            picture.forEach((elm,i) => {
                if (i > 0) {
                    viewlist += `
                    <li>
                        <img src="../${elm.src}" alt="" style="display: inline;" class="lazy">
                    </li>
                `; 
                }
            });
            
            let innertit = `
                <a href="./details.html?id=${res.id}">${res.title}</a>
            `;
            let descriptiontit = `
                ${res.title}
            `;
            let price = `
                ${res.price}
            `;
            let eva = `
                <div class="hotcakes">
                 热销
                    <span>${res.sales}</span>
                </div>
                <div class="hotcakes">
                    评价
                    <span id="comment_count">${res.eva}</span>
                </div>
            `;
            let mod = `     
                <span class="num1">
                    <img src="../${picture[1].src}" alt="" class="set">
                    &nbsp;${res.model}天然气
                </span>
                <span class="num2">
                    <img src="../${picture[1].src}" alt="" class="set">
                    &nbsp;${res.model}液化气
                </span>                           
            `;

            let addsp = `
                <span class="cut">-</span>
                <input type="number" name="num" id="item_num" value="1" onblur="if (value == '') {value = '1'}" onfocus="if (value == '1') {value = ''}" min="1" max="${res.gus_num}">
                <span class="add">+</span>
            `;

            let hb = `
                <div class="staging-top outer huabei">
                    <span>
                        <i>￥${(res.price / 3).toFixed(2)}</i>
                        x 3
                        <br>
                        (免息)
                    </span>
                    <span>
                        <i>￥${(res.price / 6).toFixed(2)}</i>
                        x 6
                        <br>
                        (免息)
                    </span>
                    <span>
                        <i>￥${(res.price / 12).toFixed(2)}</i>
                        x 12
                        <br>
                        (免息)
                    </span>
                    <span>
                        <i>￥${(res.price / 24).toFixed(2)}</i>
                        x 24
                        <br>
                        (免息)
                    </span>
                </div>
            `;

            let buy = `
                <a id="addToCart">加入购物车</a>
                <a id="addToOrder" class="color" style="display:block">立即购买</a>
            `;

            let details = `
                ${res.details}
            `;


            $('.navshow .inner').append(innertit);
            $('.shopping-view ul').append(viewlist);
            $('.shopping-description h3').append(descriptiontit);
            $('#showPrice').append(price);
            $('#lastPrice').append(price);
            $('.integral-right span').append(price);
            $('.evaluation').append(eva);
            $('.colortype .mod').append(mod);
            $('.optionnums-add .outer').append(addsp);


            // 按钮添加商品数量
            $('.optionnums-add .cut').on('click',function() {
                let num = $('#item_num').val();
                if (num > 1) {
                    num--;
                    $('.optionnums-add #item_num').val(num);
                }
            });
           
            $('.optionnums-add .add').on('click',function() {
                let num = $('#item_num').val();
                if (num < res.gus_num + 1) {
                    num++;
                }
            });

            // 加入购物车
            $('.presaleHide').append(buy).find('#addToCart').on('click',function() {
                addItem(res.id,$('#item_num').val());
            });

            $('#hbshow .stagingpotion').append(hb);
            $('.process .inner .shoppingcontent').append(details);

            // 懒加载
            $(".lazy").lazyload({
                effect: "fadeIn",
                placeholder :"../img/timg.gif"
            });

            const smallpic = $('.smallpic');
            const bLeft = $('.btn-left');
            const bRight = $('.btn-right');

            const movebox = $('.movebox');
            const bigpic = $('.bigpic');
            const small = $('.smallbox');
            const big = $('.bigbox');

            // 小图切换
            sTab(smallpic,bigpic,bRight,bLeft);
            // 放大镜
            glass(movebox,bigpic,small,big);

            $('.colortype span').on('click',function() {
                $(this).addClass('on').siblings().removeClass('on');
            });

            // tab切换
            const btns = $('.parameteroptions span');
            const boxs = $('.shoppingcontent-item');

            btns.on('click', function() {
                let i = btns.index(this);
                $(this).addClass('ab').siblings().removeClass('ab');
                boxs.eq(i).addClass('show').siblings().removeClass('show');
            });
        }
    });

    function addItem(id,num) {
        let shop = cookie.get('shop');
        let product = {
            id: id,
            num: num
        }

        if (shop) {
            shop = JSON.parse(shop);
            if (shop.some(elm => elm.id == id)) {
                shop.forEach(el => {
                    el.id === id?el.num = num : null;
                });
            }else {
                shop.push(product);
            }
        }else {
            shop = [];
            shop.push(product);
        }

        cookie.set('shop',JSON.stringify(shop),1);
    }
})();


//3.回到顶部
const sel = $('.scrolltt a');
goTop(sel);

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


// 倒计时
const day = $('#days');
const hour = $('#hours');
const min = $('#minutes');
const sec = $('#seconds');

setInterval(function() {
    let days = parseInt(djs() / 86400);
    let hours = parseInt(djs() % 86400 / 3600);
    let mins = parseInt(djs() % 3600 / 60);
    let secs = parseInt(djs() % 60);

    day.html(days);
    hour.html(hours);
    min.html(mins);
    sec.html(secs);
}, 1000);

