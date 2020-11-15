function djs() {
    var futuretime = new Date('2020-11-21 00:00:00'); //未来时间
    var currenttime = new Date(); //当前时间。
    var time = parseInt((futuretime - currenttime) / 1000); //秒

    return time;
}

export default djs;