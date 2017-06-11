define(['jquery', 'tempale', 'text!tpls/courseCategoryEdit.html', 'bootstrap'], function ($, art, courseCategoryEditTpl) {
    return function (cg_id) {
        $.get("/api/category/edit",{cg_id:cg_id}, function (res) {
            // 异常处理
            if (res.code != 200) {
                console.log(res.msg);
                return;
            }
            //获取数据
            var courseCategoryEdit = art.render(courseCategoryEditTpl, {
                result: res.result,
            })
            // 先删除再添加
            $('#modalEditCourseCategory').remove();
            var $courseCategoryEdit = $(courseCategoryEdit);
            // 给保存按钮添加事件
            // 使用事件委托
            $courseCategoryEdit.on('submit','form',function(){
                // 先获取表单数据
                var formData=$(this).serialize();
                // 发送ajax
                $.post("/api/category/modify",formData,function(res){
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
                // 取消submit默认事件，阻止刷新页面
                return false;
            })

            $courseCategoryEdit.appendTo('body').modal();
        })
    }
})