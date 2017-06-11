define(['jquery', 'tempale', 'text!tpls/courseCategoryAdd.html', 'bootstrap'], function ($, art, courseCategoryAddTpl) {
    return function () {
        $.get("/api/category/top", function (res) {
            // 异常处理
            if (res.code != 200) {
                console.log(res.msg);
                return;
            }

            //获取数据
            var courseCategoryAdd = art.render(courseCategoryAddTpl, {
                result: res.result,
            })
            // 先删除再添加
            $('#modalAddCourseCategory').remove();
            var $courseCategoryAdd = $(courseCategoryAdd);
            // 给保存按钮添加事件
            // 使用事件委托
            $courseCategoryAdd.on('submit','form',function(){
                // 先获取表单数据
                var formData=$(this).serialize();
                // 发送ajax
                $.post("/api/category/add",formData,function(res){
                    // 错误验证
                    if(res.code!=200){
                        console.log(res.msg);
                        return;
                    }
                
                    // 成功就将数据渲染到页面上
                    // 取巧，用模拟再点击一次事件
                    $("#btnCourseCategoryManager").trigger("click");
                    // 关闭添加模态框
                    $courseCategoryAdd.modal('hide');

                })
                // 取消submit默认事件，阻止刷新页面
                return false;
            })

            $courseCategoryAdd.appendTo('body').modal();
        })

    }
})