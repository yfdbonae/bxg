define(['jquery', 'tempale', 'text!tpls/courseList.html','course/edit'], function ($, art, courseListTpl,courseEdit) {
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
            // 给编辑按钮添加点击事件，事件委托
            $courseList.find('.btn-edit-course').on('click',function(){
                var cs_id=$(this).attr('cs_id');
                // console.log(cs_id);
                courseEdit(cs_id);
            })


            $('.module-container').append($courseList);
        })

    }
})