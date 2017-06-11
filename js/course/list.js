define(['jquery', 'tempale', 'text!tpls/courseList..html'], function ($, art, courseListTpl) {
    return function () {

        $.get('/api/course', function (res) {
            console.log(res);
            // 错误处理
            if (res.code != 200) {
                console.log(res.msg);
                return;
            }
            var courseList = art.render(courseListTpl, res);

            var $courseList = $(courseList);
            $('.module-container').append($courseList);
        })

    }
})