define(['jquery','tempale', 'text!tpls/courseCategoryList.html','./add','./edit'], function ($,art,courseCategoryListTpl,courseCategoryAdd,courseCategoryEdit) {
    return function () {
        $("#btnCourseCategoryManager").on("click", function () {
            $(".module-container").empty();
            $.get('/api/category', function (res) {
                // console.log(res);
                // 判断是否成功响应
                if (!res.code == 200) {
                    console.log(res.msg);
                    return;
                }

                var courseCategoryList = art.render(courseCategoryListTpl, {
                    result: res.result,
                })
                var $courseCategoryList=$(courseCategoryList);
                // 添加分类
                $courseCategoryList.find('.btn-add-course-category').on('click',function(){
                    courseCategoryAdd();
                })
                // 编辑分类
                $courseCategoryList.on('click','.btn-edit-course-category',function(){
                    // 获取保存的ID
                    var cg_id=$(this).parent().attr('cg_id');
                    // console.log(cg_id);
                    courseCategoryEdit(cg_id);
                })
                $(".module-container").append($courseCategoryList);
            })
        });
    }
})