require.config({
    baseUrl: './js',
    paths: {
        jquery: 'lib/jquery-2.1.4',
        cookie: 'lib/jquery.cookie',
        text: 'lib/text',
        tempale: 'lib/template-web',
        bootstrap:'../assets/bootstrap/js/bootstrap',
        tpls:'../tpls',
    },
    shim:{
        bootstrap:{
            deps:['jquery'],
        }
    }
})
require(['jquery','tempale', 'courseCategory/list', 'course/list','common/checkLogin'], function ($, art,courseCategoryList,courseList) {
    // 处理用户名，头像没有
    var tc_avatar = $.cookie('tc_avatar');
    var tc_name = $.cookie('tc_name');
    $('#userName').html('欢迎您! '+tc_name);  

    // 绑定退出事件
    $('#btnLogout').on('click', function () {
        $.post('/api/logout', function (res) {
            if (res.code == 200) {
                //  清除cookie
                $.removeCookie('tc_avatar');
                $.removeCookie('tc_name');

                // 跳转到登录
                location.href = 'login.html';
            }
        })
    })

    //实现点击不同功能菜单，出现不同功能的页面

    //讲师管理

    $("#btnTeacherManager").on("click", function () {
        $(".module-container").empty();

        $(".module-container").append("讲师管理");
    })

    //课程管理

    $("#btnCourseManager").on("click", function () {
        $(".module-container").empty();

        courseList();
    })
    //课程分类管理
courseCategoryList();
    // $("#btnCourseCategoryManager").on("click", function () {
    //     $(".module-container").empty();
    //     $.get('/api/category',function(res){
    //         console.log(res);
    //         // 判断是否成功响应
    //         if(!res.code == 200){
    //             console.log(res.msg);
    //             return;
    //         }
    //         var result=res.result;
    //         var a=art.render(courseCategoryListTpl,{
    //             result:result,
    //         })
    //     $(".module-container").append(a);
    //     })
    // });

    //图表统计

    $("#btnChartManager").on("click", function () {
        $(".module-container").empty();

        $(".module-container").append("图表统计");
    });

    //希望一开始就渲染出讲师管理的功能？
    //  -->触发讲师管理的点击事件
    $("#btnTeacherManager").trigger("click");
})