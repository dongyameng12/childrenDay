(function (doc, win) {
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
    // 当前按钮的class
    var current_clickclass;
    // 领奖时当前按钮显示的class
    var current_change
    // 是否分享(默认没分享)
    var noShare = false;
    var  cheackArr = []
    // 选择
    $('.choose_content ul li').on('click',function(){
        if ($(this).children('div:eq(1)').children('span').hasClass('cheacked')) {
            $(this).children('div:eq(1)').children('span').removeClass('cheacked');
        } else {
            $(this).children('div:eq(1)').children('span').addClass('cheacked'); 
        }
    })

    //点击下一页 
    $('.next').on('click',function(){
        var _this = $(this)
        var li_obj = _this.siblings('.choose_content').children('ul').children('li')
        var i = 0
        $.each(li_obj,function(index,item){
            var status = $(this).children('div:eq(1)').children('span').hasClass('cheacked')
            if (status) {
                i++
                return false;
            }
        })
        if (i > 0) {
            // 对的个数
            // console.log(i)
            var chose_obj = $(this).parents('.choose').hide().next('.choose')
            if (chose_obj.length > 0) {
                $(this).parents('.choose').hide().next('.choose').show()
            } else {
                $('.main').show();
            }
        } else {
            // alert('没选择')
            showMask();
            $('.tc_tishi').show();
        }
    });
    // 点击首页开始
    $('#start_game').on('click',function(){
        $('.home').hide();
        $('.choose_01').show();
    })
    //聊天气泡淡入    
    // 活动规则
    $('.rule').on('click',function(){
        $('.tc_rule').show();
    })
    // 点击主页的按钮
    $('.lottery').on('click',function () {
        // 左边
        if ($(this).hasClass('main_left')) {
            current_clickclass = '.main_left'
            current_change = 'left'
            jiangli();
        }else if ($(this).hasClass('main_right')) {
            // 右边
            // 已经分享
            if (noShare) {
                current_clickclass = '.main_right'
                current_change = 'right'
                jiangli(); 
            }else{
                $('.share').show();
            }
          
        }
    })
    // 分享（测试用）
    $('.share').on('click',function(){
        $('.share').hide();
        noShare = true;
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
                    if ($(current_clickclass).hasClass('allling')) {
                        showMask();
                        $(current_clickclass).hasClass('cancel')?$('.tc_2').show():  $('.tc_5').show();
                    } else {
                        showMask();
                        $('.tc_2').show();
                    }
                }
            } else {
                 // 未绑定手机号
                $('.main').hide();
                $('.binded').show();
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
            $(current_clickclass).removeClass('cancel');
        } else {
            //  取消
            hideMask();
            $('.tc_2').hide();
            // 点击取消后加入cancel,用于判断显示那个弹窗
            $(current_clickclass).removeClass('unling_'+current_change).addClass('allling').addClass('cancel');
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
    //关闭(中奖)
    $('.close').on('click', function () {
        // 获取奖励的最后一步
        $(current_clickclass).removeClass('unling_'+current_change).addClass('allling');
        $(this).parent().hide();
        hideMask();
    });
     //关闭
     $('.close3').on('click', function () {
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

// 淡出执行一次
function inoutOne () {
    // $("#talk_01").fadeIn(1000,function () {
    //     $("#talk_02").fadeIn(1000,function () {
    //         $("#talk_03").fadeIn(1000,function () {
    //             $("#talk_04").fadeIn(1000,function () {
    //                 $("#talk_05").fadeIn(1000);
    //             });
    //         });
    //     });
    // })
    $("#talk_0"+i).fadeIn(1000,function () {
        if (i < 5) {
            i++
            return inoutOne()
        } 
    })
}

// 一直淡入淡出1
var i = 1
function inoutAuto () {
    $("#talk_0"+i).fadeIn(1000,function () {
        if (i < 5) {
            i++
            return inoutAuto()
        } else {
            inoutTwo()
        }
    })
}

function inoutTwo () {
    $("#talk_0"+i).fadeOut(1000,function () {
        if (i > 1) {
            i--
            return inoutTwo()
        } else {
            inoutAuto()
        }
    })
}






