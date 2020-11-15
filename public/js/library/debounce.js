function debounce(callback, wait) {
    var timer = null; // 计时器
    return function() {
        var arg = arguments; // 获得实参
        if (timer) clearTimeout(timer); // 如果有计时器就清除计时器
        timer = setTimeout(function() {
            callback.apply(this, arg); // 调用回调 传入实参  需要事件对象
        }.bind(this), wait); // bind(this)  是修正 事件中的this指向
    }
}

export default debounce;