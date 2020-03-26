/*图片的缩放*/

var list = {};
(function (obj) {
    /*扫码*/
    obj.echo_code = function () {
        if (window.s) {
            window.s.close()
        }
        /*创建socket连接*/
        var socket = new WebSocket("ws://192.168.1.140:8000/echo/");
        socket.onopen = function () {
            console.log('WebSocket open');//成功连接上Websocket
        };
        socket.onmessage = function (e) {
            alert('全体通告: ' + e.data);//打印出服务端返回过来的数据
            $('#messagecontainer').prepend('<p>' + e.data + '</p>');
        };
        // Call onopen directly if socket is already open
        if (socket.readyState == WebSocket.OPEN) socket.onopen();
        if (socket.readyState == WebSocket.OPEN) socket.onopen();
        window.s = socket;
    };

    /*图片的缩放*/
    obj.zoomify = function () {
        $('img').bind('click', function () {
            $(this).zoomify('zoom');
        })
    };

    /*链接个人中心*/
    obj.person_message = function () {
        window.location.href = config.testConfig.MesPath + "person_message/" + machine_code + "/" + card_id + "/";
    }

    /*下班*/
    obj.off_work = function () {
        var event = new MessageEvent('call', {
            'view': window,
            'bubbles': false,
            'cancelable': false,
            'data': '~!!!!!!!!!!!!!!!!'
        });
        document.dispatchEvent(event);
        var card_id = $('#card_id').html()
        $.ajax({
            type: "POST",
            url: config.testConfig.MesPath + "offwork/",
            data: {card_id: card_id.toString(), process: process, station: station},
            dataType: "json",
            success: function (data) {
                console.log("下班")
            }
        })

    }

    /*故障*/
    obj.fault_view = function () {
        function fault() {
            var fault_bag = document.getElementsByClassName("fault_bag");
            var fault_title_delete = document.getElementsByClassName("fault_title_delete");
            fault_bag[0].style.display = "block";
            fault_title_delete[0].onclick = function () {
                fault_bag[0].style.display = "none";
            }
        }

        fault();
        var confirm = document.getElementsByClassName("confirm");
        confirm[0].onclick = function () {
            var radio = $('input:radio');
            for (var i = 0; i < radio.length; i++) {
                if (radio[i].checked == true) {
                    console.log(radio[i].nextSibling.nodeValue);
                    var reason = radio[i].nextSibling.nodeValue;
                    //post请求
                    $.ajax({
                        type: "POST",
                        url: config.testConfig.MesPath + "trouble/",
                        data: {
                            card_id: card_id.toString(),
                            process: process,
                            station: station,
                            userName: userName,
                            reason: reason
                        },
                        dataType: "json",
                        success: function (data) {
                            console.log("data", data);
                            if (data.status = "success") {
                                console.log("故障提交完成")
                            } else {
                                console.log("故障提交失败")
                            }
                        }
                    })
                    var fault_bag = document.getElementsByClassName("fault_bag");
                    fault_bag[0].style.display = "none";
                }
            }
        }
    }

    /*暂停/恢复*/
    obj.changeTime = function (obj) {
        var status = obj.innerHTML
        console.log(obj.innerHTML)
        if (status == '暂停') {
            console.log("~~~~~~")
            console.log(card_id)
            $.ajax({
                type: "POST",
                url: config.testConfig.MesPath + "stopTime/",
                data: {card_id: card_id, process: process, station: station},
                dataType: "json",
                success: function (data) {
                    $('.layui-btn-warm').text("恢复")
                    var bag = document.getElementsByClassName("bag");
                    console.log("bag", bag);
                    bag[0].style.display = "block";
                    that.onkeypress = false;
                }
            })
        } else {
            console.log("~~~~~~")
            $.ajax({
                type: "POST",
                url: config.testConfig.MesPath + "recoverTime/",
                data: {card_id: card_id.toString(), process: process, station: station},
                dataType: "json",
                success: function (data) {
                    $('.layui-btn-warm').text("暂停");
                    var bag = document.getElementsByClassName("bag");
                    bag[0].style.display = "none";
                    that.Template_rendering();
                }
            })
        }
    }

    /*历史*/
    var ever_page_num = 13;  /*每一页所展示的信息条数*/
    obj.history = function () {
        history_bag.style.display = "block";
        title_delete.onclick = function () {
            history_bag.style.display = "none";
        };
        $("#history_bag").click(function () {
            $("#history_bag").hide()
        });
        $("#history_bag_popup").click(function (event) {
            event.stopPropagation();
        });
        $.ajax({
            type: "POST",
            url: config.testConfig.MesPath + "history/",
            data: {card_id: card_id.toString(), station: station},
            dataType: "json",
            success: function (data) {
                var history_bag_popup_main_li = "";
                var history_bag_popup_main_li_top = "";
                history_bag_popup_main_li_top += "<li>";
                history_bag_popup_main_li_top += "<span>SO</span>";
                history_bag_popup_main_li_top += "<span>二维码</span>";
                history_bag_popup_main_li_top += "<span>客户</span>";
                history_bag_popup_main_li_top += "<span>扫码时间</span>";
                history_bag_popup_main_li_top += "</li>";
                if (data.data) {
                    console.log(data.data.length);
                    for (var x = 0; x < data.data.length; x++) {
                        var code = data.data[x].二维码;
                        var a_li = "";
                        history_bag_popup_main_li += "<li class='popup_li' data-code=" + code + ">";
                        history_bag_popup_main_li += "<span>" + data.data[x].So + "</span>";
                        history_bag_popup_main_li += "<span>" + code + "</span>";
                        history_bag_popup_main_li += "<span>" + data.data[x].客户 + "</span>";
                        history_bag_popup_main_li += "<span>" + data.data[x].扫码时间 + "</span>";
                        history_bag_popup_main_li += "</li>";
                        var history_bag_popup_middle = document.getElementById("history_bag_popup_middle");
                        history_bag_popup_middle.innerHTML = history_bag_popup_main_li_top;
                        history_bag_popup_middle.innerHTML += history_bag_popup_main_li;
                    }
                    var page_num = Math.ceil(data.data.length / ever_page_num);/*向上取整数*/
                    // console.log(page_num);
                    if (page_num === 1) {
                    } else {
                        for (var y = 1; y <= page_num; y++) {
                            a_li += "<a onclick='list.front_page(this)'>" + y + "</a>"
                        }
                        var layui_laypage_2 = document.getElementById("layui-laypage-2");
                        layui_laypage_2.innerHTML = a_li;
                    }
                    $(".popup_li").bind('click', function () {
                        var code = $(this).attr('data-code');
                        readcode({code: code, card_id: card_id.toString(), process: process, station: station});
                        $(this).addClass('active').siblings().removeClass('active');
                    })
                }
            }
        });
    };

    /*通过后台实现分页的方法*/
    /*    obj.backstage_page = function (a) {
            // console.log(a)
            var page = a.innerHTML;
            // console.log(page)
            $.ajax({
                type: "POST",
                url: config.testConfig.MesPath + "history/",
                data: {card_id: card_id.toString(), station: station, page_id: page},
                dataType: "json",
                success: function (data) {
                    var history_bag_popup_main_li = "";
                    var history_bag_popup_main_li_top = "";
                    if (data.data) {
                        history_bag_popup_main_li_top += "<li>";
                        history_bag_popup_main_li_top += "<span>SO</span>";
                        history_bag_popup_main_li_top += "<span>二维码</span>";
                        history_bag_popup_main_li_top += "<span>客户</span>";
                        history_bag_popup_main_li_top += "<span>扫码时间</span>";
                        history_bag_popup_main_li_top += "</li>"
                        for (var x = 0; x < data.data.length; x++) {
                            var code = data.data[x].二维码;
                            history_bag_popup_main_li += "<li class='popup_li' data-code=" + code + ">";
                            history_bag_popup_main_li += "<span>" + data.data[x].So + "</span>";
                            history_bag_popup_main_li += "<span>" + code + "</span>";
                            history_bag_popup_main_li += "<span>" + data.data[x].客户 + "</span>";
                            history_bag_popup_main_li += "<span>" + data.data[x].扫码时间 + "</span>";
                            history_bag_popup_main_li += "</li>";
                        }
                        var history_bag_popup_middle = document.getElementById("history_bag_popup_middle");
                        history_bag_popup_middle.innerHTML = history_bag_popup_main_li_top;
                        history_bag_popup_middle.innerHTML += history_bag_popup_main_li
                    }
                }
            });
        };*/

    /*    通过前端页面实现分页的方法*/
    obj.front_page = function (a) {
        var s = $(".popup_li");
        s.attr("style", "display:none");
        // s.setAttribute("style","display:none");
        var page_num = a.innerHTML;
        var start_num = ever_page_num * (page_num - 1);
        var end_num = (ever_page_num * page_num) - 1;
        if (end_num > s.length) {
            var end_nums = s.length - 1;
            for (var q = start_num; start_num <= q && q <= end_nums; q++) {
                s[q].setAttribute("style", "display:black");
            }
        } else {
            for (var z = start_num; start_num <= z && z <= end_num; z++) {
                s[z].setAttribute("style", "display:black");
            }
        }

    }

})(list);