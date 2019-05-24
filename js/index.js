
// ios点击事件不触发
$(function () {
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
    // 主页显示内容(随机四个分数)
    // var fendata = parseInt(Math.random()*4);
    var fendata = 0;
    var mainArr = [
        {
            fenImg:'images/88.png',
            ping_01:'恭喜你通过了资格检测！',
            ping_02:' 虽然超龄了、身高超限了、体重超标了',
            ping_03:'不过童心还在哦，特准许再过一次儿童节',
            ping_04:' 祝节日快乐！快去领取惊喜礼物吧~'
        },
        {
            fenImg:'images/90.png',
            ping_01:'童真满满，童趣多多',
            ping_02:'你是最适合过儿童节的大朋友啦！',
            ping_03:'愿你永远无忧无虑、快乐幸福~',
            ping_04:'祝节日快乐！快去领取你的惊喜礼物~'
        },
        {
            fenImg:'images/95.png',
            ping_01:'恭喜你通过资格检测！',
            ping_02:'没想到你的童年这么丰富多彩',
            ping_03:'祝你永远像儿童般快乐！',
            ping_04:'快去开启你的幸运礼物吧~'
        },
        {
            fenImg:'images/99.png',
            ping_01:'恭喜你呀，通过了资格检测！',
            ping_02:'留住几个童年的幻想，让生活更有希望',
            ping_03:'童年短暂，童心无限。',
            ping_04:'儿童节到了，快来领礼物啦~'
        }
    ]
    // 选择
    $('.choose_content ul li').on('click', function () {
        if ($(this).children('div:eq(1)').children('span').hasClass('cheacked')) {
            $(this).children('div:eq(1)').children('span').removeClass('cheacked');
        } else {
            $(this).children('div:eq(1)').children('span').addClass('cheacked');
        }
    })

    //点击下一页 
    $('.next').on('click', function () {
        var _this = $(this)
        var li_obj = _this.siblings('.choose_content').children('ul').children('li')
        var i = 0
        $.each(li_obj, function (index, item) {
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
                $('.main_context').html("<img src='"+mainArr[fendata].fenImg+"'><div><p>"+mainArr[fendata].ping_01+"</p><p> "+mainArr[fendata].ping_02+"</p><p>"+ mainArr[fendata].ping_03+"</p><p>"+mainArr[fendata].ping_04+"</p></div>")
                $('.main').show();
            }
        } else {
            showMask();
            if ($(this).hasClass('next_last')) {
                $('#tc_text').text('资格认证')
            }
            $('.tc_tishi').show();
        }
    });
    // 点击首页开始
    $('#start_game').on('click', function () {
        $('.home').hide();
        $('.choose_01').show();
    })
    //聊天气泡淡入    
    // 活动规则
    $('.rule').on('click', function () {
        $('.tc_rule').show();
    })
    // 点击主页的按钮
    $('.lottery').on('click', function () {
        // 左边
        if ($(this).hasClass('main_left')) {
            current_clickclass = '.main_left'
            current_change = 'left'
            //本网链接
            // 随机产生三个链接（测试用）
            var data_left = parseInt(Math.random()*3);
            switch(data_left){
                case 0:
                    // 手厅活动
                    $('#alink_cm').css('background-image','url(images/a_cm_shouting.gif)').attr('href','http://sc.bj.chinamobile.com/activity/loading/loading.html?actname=coupon')
                    break;
                case 1:
                    // 惠享券
                    $('#alink_cm').css('background-image','url(images/a_cm_huxiang.gif)').attr('href','http://open.weixin.qq.com/connect/oauth2/authorize?appid=wx7858699aca01b75f&redirect_uri=http%3A%2F%2Fserviceimg.bmcc.com.cn%2Fweixin%2Fredirect%2FdispenseRequest.action&response_type=code&scope=snsapi_base&state=fxyll20G#wechat_redirect')
                    break;
                case 2:
                    // 流量放心用
                    $('#alink_cm').css('background-image','url(images/a_cm_fangxin.gif)').attr('href','http://open.weixin.qq.com/connect/oauth2/authorize?appid=wx7858699aca01b75f&redirect_uri=http%3A%2F%2Fserviceimg.bmcc.com.cn%2Fweixin%2Fredirect%2FdispenseRequest.action&response_type=code&scope=snsapi_base&state=cxfree#wechat_redirect')
                    break;
                }
            // 异网移动王卡
            $('#alink_cy').css('background-image','url(images/a_cy_wangka.gif)').attr('href','https://service.bj.10086.cn/m/num/num/commonNum/showFontPage.action?busiCode=YDWKWXYW')
            jiangli();
        } else if ($(this).hasClass('main_right')) {
                // 右边
              // 已经分享
              if (noShare) {
                current_clickclass = '.main_right'
                current_change = 'right'
                //本网链接
                // 随机产生二个链接（测试用）
                var data_right = parseInt(Math.random()*2);
                switch(data_right){
                    case 0:
                        // 倍享券
                        $('#alink_cm').css('background-image','url(images/a_cm_beixiang.gif)').attr('href',' http://open.weixin.qq.com/connect/oauth2/authorize?appid=wx7858699aca01b75f&redirect_uri=http%3A%2F%2Fserviceimg.bmcc.com.cn%2Fweixin%2Fredirect%2FdispenseRequest.action&response_type=code&scope=snsapi_base&state=cxfree#wechat_redirect')        
                        break;
                    case 1:
                        // 移动网卡
                        $('#alink_cm').css('background-image','url(images/a_cy_wangka.gif)').attr('href','https://mp.weixin.qq.com/s?__biz=MjM5Nzg1NTQyMQ==&mid=2677712529&idx=1&sn=9c1eb5ed965c2e016b03132138b079f9&chksm=bcbdaf438bca2655635226aa3296329e8497e303ccd2ed37653e2e1a00f9001c70ffd7b9c038&mpshare=1&scene=1&srcid=0524E7cHQBzxiDAjv8wi1WRf&key=e37b65ef319f79ace47c72b232008c7867680022704be0cccb84866ce750e357ad47f83d024df5ce8c02dddd156f9e09733c253124c6ec15fe32de4738e6900cd14d03a6a2a2182f3a2571cf9cddfda2&ascene=1&uin=MTQwMjgyMjAxOA%3D%3D&devicetype=Windows+10&version=62060739&lang=zh_CN&pass_ticket=fQDD8A14KpSkQqZO14sx3wKJu1K7IthBAzj8baFf0E%2F%2F3aqviMjDF46ijCnbdutM')        
                        break;
                }
                // 异网无限卡
                $('#alink_cy').css('background-image','url(images/a_cy_wuxian.gif)').attr('href','   https://service.bj.10086.cn/m/num/num/commonNum/showFontPage.action?busiCode=WXKWTYW')
                jiangli();
            } else {
                $('.share').show();
            }
        }
    })
    // 分享（测试用）
    $('.share').on('click', function () {
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
                        $(current_clickclass).hasClass('cancel') ? $('.tc_2').show() : $('.tc_5').show();
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
            window.location.href = "https://mp.weixin.qq.com/s/I5_SP5hTP5tmwZmWn8_i3Q";
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
            $(current_clickclass).removeClass('unling_' + current_change).addClass('allling').addClass('cancel')
            //// 右边动效
            rightBtn()
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
        $(current_clickclass).removeClass('unling_' + current_change).addClass('allling');
        //// 右边动效
        rightBtn()
        $(this).parent().hide();
        hideMask();
    });
    //主页右边按钮动效
    function rightBtn(){
        if($('.main_right').hasClass('unling_right')){
            $('.main_right').addClass('mymove');  
        }else{
            $('.main_right').removeClass('mymove');      
        }
    }
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
    $('.test2').on('click', function () {
        $('.test2').css('color', 'red');
        attention = false;
    });
    $('.test3').on('click', function () {
        $('.test3').css('color', 'red');
        binding = false;
    });
    $('.test4').on('click', function () {
        $('.test4').css('color', 'red');
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
var i = 1
function inoutOne() {
    $("#talk_0" + i).fadeIn(1000, function () {
        if (i < 5) {
            i++
            return inoutOne()
        }
    })
}
