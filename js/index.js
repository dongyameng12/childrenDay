﻿(function (doc, win) {
    var docEl = doc.documentElement,
        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
        recalc = function () {
            var clientWidth = docEl.clientWidth;
            if (!clientWidth) return;
            docEl.style.fontSize = 100 * (clientWidth / 750) + 'px';
        };
    if (!doc.addEventListener) return;
    win.addEventListener(resizeEvt, recalc, false);
    doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);
// ios点击事件不触发
$(function() {  
    FastClick.attach(document.body);  
})

$(document).ready(function () {
    //是否关注公众号
    var attention = true;
    // 是否绑定手机号
    var binding = true;
    // 本网，异网用户(默认本网)
    var CM = true;
    //是否转增
    var increase;
    // 领取奖励后当前class
    var current_clickclass
    //点击下一页 
    $('.next').on('click',function(namenext){
        // 点击当前name属性值
        var namenext = $(this).siblings('ul').children('li').children('input').attr('name');
        var animeArr = [];
        var items =$("input[name='"+namenext+"']");
        for (i = 0; i < items.length; i++) {
            if (items[i].checked) {
                animeArr.push(items[i].value);
            }
        }
        if (animeArr.length !== 0) {
            debugger
            //选择之后，（向已经选择的next中添加allnext）
            $(this).addClass('allnext');
            if ($(this).hasClass('allnext')) {
                //下一页
                $(this).parent().hide()
                $(this).parent().next().show(); 
            }
        } else {
            alert('你还没选择')
        } 
    })
    // 判断关注，绑定等
    function jiangli() {
        if (attention) {
            // 已关注
            if (binding) {
                if (CM) {
                    //本网中流量 
                    showMask();
                    $('.tc_1').show();
                } else {
                    //异网中流量 
                    // if ($(current_clickclass).text() == '查看奖励') {
                    //     // alert('查看奖励')
                    //     showMask();
                    //     $('.tc_5').show();
                    // } else {
                    //     showMask();
                    //     $('.tc_2').show();
                    // }
                    $('.tc_5').show();
                }
            } else {
                // $('.main').hide();
                // $('.bind').show();
                // 未绑定手机号
                alert('你还没绑定手机号');
            }
        } else {
            // 未关注
            alert('未关注');
            // window.location.href = "https://mp.weixin.qq.com/s/FDD5Q57SnOrWAiYkfyzLFQ";
        }
    };
    // (转增和取消)
    function Transfcancel() {
        if (increase) {
            //转增
            $('.tc_2').hide();
            $('.tc_3').show();
        } else {
            //  取消
            hideMask();
            $('.tc_2').hide();
        }
    };
    //异网流量弹窗 1（取消）
    $('.close2').on('click', function () {
        increase = false;
        Transfcancel();
    });
    //异网流量弹窗 1（转增）
    $('#giveBtn').on('click', function () {
        increase = true;
        Transfcancel();
    });
    //异网流量弹窗 2,确定
    $('#giveBtn_2').on('click', function () {
        var input_val = $('#inputTel').val();
        if (istel(input_val)) {
            $('.tc_3').hide();
            $('.tc_4').show();
            $('.mobile').text(input_val);
        } else {
            alert('请输入正确的北京移动号');
            // 清空input框
            $("#inputTel").val("");
        }

    });
    //异网流量弹窗 3,修改
    $('#revise').on('click', function () {
        $('.tc_4').hide();
        $('.tc_3').show();
    });
    //异网流量弹窗 3,确定
    $('#giveBtn_3').on('click', function () {
        $('.tc_4').hide();
        $('.tc_5').show();
    });
    //关闭
    $('.close').on('click', function () {
        // 获取奖励的最后一步
        // $(current_clickclass).parent('div').children('div:eq(0)').removeClass(current_lihe + 'no').addClass(current_lihe + 'yes');
        // $(current_clickclass).css('background-color', '#ff746b');
        // $(current_clickclass).text('点击查看');
        $(this).parent().hide();
        hideMask();
    });
    //移动手机号码验证
    function istel(tel) {
        var rtn = false;
        //移动号段验证
        // var regtel = /^((13[4-9])|(15([0-2]|[7-9]))|(18[2|3|4|7|8])|(178)|(147))[\d]{8}$/;
        var regtel = /^((13[4-9])|(15([0-2]|[7-9]))|(18[2|3|4|7|8])|(17[2|8])|(165)|(147)|198)[\d]{8}$/;
        if (regtel.test(tel)) {
            rtn = true;
        }
        return rtn;
    }

    // 测试
    $('.test2').on('click',function(){
        $('.test2').css('color','red');
        attention = false;
    });
    $('.test3').on('click',function(){
        $('.test3').css('color','red');
        binding = false;
    });
    $('.test4').on('click',function(){
        $('.test4').css('color','red');
        CM = false;
    });
});
//显示遮罩层
function showMask() {
    $("#mask").css("height", $(document).height());
    $("#mask").css("width", $(document).width());
    $("#mask").show();
    $('body').css('position', 'fixed');
}
//隐藏遮罩层
function hideMask() {
    $("#mask").hide();
    $('body').css('position', 'unset');
}