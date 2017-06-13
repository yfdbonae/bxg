define(['jquery', 'tempale', 'text!tpls/courseListEdit.html', 'bootstrap'], function ($, art,courseListEditTpl) {
    return function (cs_id) {
        $.get("/api/course/lesson",{cs_id:cs_id}, function (res) {
            // 异常处理
            if (res.code != 200) {
                console.log(res.msg);
                return;
            }
            console.log(res);
            //获取数据
            var courseListEdit = art.render(courseListEditTpl, res);
            // 先删除再添加
            $('.module-container').empty();
            var $courseListEdit = $(courseListEdit);
            // 给编辑按钮添加事件
            // 使用事件委托
            $courseListEdit.on('click','.btn-edit-course',function(){
                // 先获取表单数据
                var ct_id=$(this).parent().attr('ct_id');
                // console.log(ct_id);
                // 发送ajax
                $.post("/api/course/chapter/edit",{ct_id:ct_id},function(res){
                    // 错误验证
                    if(res.code!=200){
                        console.log(res.msg);
                        return;
                    }
                    // 成功就将数据渲染到页面上
                    // 取巧，用模拟再点击一次事件
                    $("#btnCourseCategoryManager").trigger("click");
                    // 关闭添加模态框
                    $courseCategoryEdit.modal('hide');

                })
            })

            $courseListEdit.appendTo('.module-container');
        })
    }
})