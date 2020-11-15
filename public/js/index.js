import './library/jquery.js';
import './library/jquery.lazyload.min.js'
import goTop from './library/gotop.js';
import debounce from './library/debounce.js';
import bufferMove from './library/move.js';
import djs from './library/time.js';
import {baseUrl} from './library/config.js';

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


// 轮播
const banner = $('.banner');
const picLi = $('.banner ul li');
const btnLi = $('.banner .btns span');
const leftArrow = $('.prev');
const rightArrow = $('.next');
let num = 0;
let timer = null;

// 圆圈添加事件
for (let i = 0; i < btnLi.length;i++) {
    btnLi[i].onmouseover = function() {
        num = i;
        tabswitch();
    };
}

function tabswitch() {
    // 清空
    for (let j = 0;j < btnLi.length;j++) {
        btnLi[j].className = '';
        bufferMove(picLi[j],{
            opacity: 0
        });
    }
    // 当前添加
    btnLi[num].className = 'cur';
    bufferMove(picLi[num],{
        opacity: 100
    });
}


banner.on('mouseover',function() {
    clearInterval(timer);
});

banner.on('mouseout',function() {
    timer = setInterval(() => {
        num++;
        if (num > btnLi.length - 1) {
            num = 0;
        }
        tabswitch();
    }, 3000);
});

// 左右箭头添加点击事件
rightArrow.on('click',function() {
    num++;
    if (num > btnLi.length - 1) {
        num = 0;
    }
    tabswitch();
});
leftArrow.on('click',function() {
    num--;
    if (num < 0) {
        num = btnLi.length - 1;
    }
    tabswitch();
});
// 自动播放
timer = setInterval(() => {
    num++;
    if (num > btnLi.length - 1) {
        num = 0;
    }
    tabswitch();
}, 3000);


// tab切换
const btns = $('.links .tabBtn');
const boxs = $('.set-meal-ajax .box');

btns.on('mouseover', function() {
    let i = btns.index(this);
    $(this).addClass('hover').siblings().removeClass('hover');
    boxs.eq(i).addClass('show').siblings().removeClass('show');
});

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

    if (days < 10) {
        days = '0' + parseInt(djs() / 86400);
    }
    if (hours < 10) {
        hours = '0' + parseInt(djs() % 86400 / 3600);
    }
    if (mins < 10) {
        mins = '0' + parseInt(djs() % 3600 / 60);
    }
    if (secs < 10) {
        secs = '0' + parseInt(djs() % 60);
    }

    day.html(days);
    hour.html(hours);
    min.html(mins);
    sec.html(secs);
}, 1000);


(function() {
    $.ajax({
        type: "get",
        url: `${baseUrl}/product/getProducts`,
        dataType: "json",
        success: function (res) {
            let limitLi = '';
            let burstingLi = '';
            res.forEach((elm,i) => {
                let picture = JSON.parse(elm.picture);

                if (i <= 5) {
                    limitLi += `
                        <li class="productTab">
                        <div class="bt">
                        <span class="red">保价全年</span>
                        </div>
                        <a href="./html/details.html?id=${elm.id}">
                            <div class="pic fl">
                                <img data-original="${picture[0].src}" alt="" style="display: inline;" class="lazy">
                            </div>
                            <div class="con fr">
                                <h2>${elm.model} ${elm.subtitle}</h2>
                                <p>11.11巅峰盛惠：购0.01元福袋下单，抢11月11日0点全年最低价！更有12重巅峰豪礼相赠！</p>
                                <div class="money">
                                特惠价：￥
                                    <span class="yuan">${elm.price}</span>
                                </div>
                                <div class="more">立即购买</div>
                            </div>
                        </a>
                    </li>
                    `;
                }

                if (i <= 3) {
                    burstingLi += `
                        <li>
                        <div class="bt">
                            <span class="red">保价全年</span>
                        </div>
                        <div class="pic productTab">
                            <a href="./html/details.html?id=${elm.id}" target="_blank">
                                <img data-original="../${picture[0].src}" alt="" class="lazy img" style="display: block;">
                                <div class="er-box f-cb">
                                    <h2>大品牌质量就是好，买了三件套，抽风机消毒柜燃气灶，还想买个蒸焗的</h2>
                                    <p>来自于 150****0169 的评价</p>
                                </div>
                            </a>
                        </div>
                        <div class="con">
                            <a href="javascript:;" target="_blank">
                                <h2>${elm.subtitle}</h2>
                                <p>抢11.11日0点优惠X百元，全年最低价！</p>
                                <div class="tt opsen">
                                    <span class="money">${elm.price}</span>
                                    <span class="jf f-cb">
                                        <i></i>
                                        赠送${elm.price}积分
                                    </span>
                                </div>
                                <div class="tt">
                                    <span class="money">${elm.price}</span>
                                    <span class="jf f-cb">
                                        <i></i>
                                        赠送${elm.price}积分
                                    </span>
                                </div>
                            </a>
                            <div class="btns">
                                <a href="javascript:;" target="_blank" class="info">查看详情</a>
                                <a href="javascript:;" target="_blank" class="have">咨询有礼</a>
                            </div>
                        </div>
                    </li>
                    `;
                }
            });

            $('.wel-limit-list').append(limitLi);
            $('.bursting-list').append(burstingLi);
            // 懒加载
            $(".lazy").lazyload({
                effect: "fadeIn",
                placeholder :"../img/timg.gif"
            });
        }
    });
})()