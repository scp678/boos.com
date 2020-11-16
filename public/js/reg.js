import './library/jquery.js';
import './library/jquery.md5.js';
import cookie from './library/cookie.js';
import {baseUrl} from './library/config.js';

$('#submit').on('click',function() {
    $.ajax({
        type: "post",
        url: `${baseUrl}/users/reg`,
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