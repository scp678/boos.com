import './library/jquery.js';
import './library/jquery.md5.js';
import cookie from './library/cookie.js';

$('#submit').on('click',function() {
    $.ajax({
        type: "post",
        url: "http://localhost:8088/users/login",
        data: {
            phone: $('[name=phone]').val(),
            password: $.md5($('[name=password]').val())
        },
        dataType: "json",
        success: function (response) {
            console.log(response);
        }
    });
});