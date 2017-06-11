define(['jquery', 'cookie'], function () {
    var tc_name = $.cookie('tc_name');
    if (!tc_name) {
        location.href = 'login.html';
    }
})