function readcode(data) {
    $.ajax({
        type: "POST",
        url: config.testConfig.MesPath + "workmessage/",
        // data: {code: code, card_id: card_id.toString(), process: process, station: station},
        data: data,
        dataType: "json",
        success: function (data) {
            console.log("data", data);
            if (data.status == "erro") {
                console.log(data);
                prompt[0].style.display = "block";
                prompt[0].innerHTML = data.message;
                var processGuidance = document.getElementsByClassName("processGuidance");
                var content_main_left = document.getElementsByClassName("content_main_left");
                processGuidance[0].style.display = "none";
                content_main_left[0].style.display = "none";
                return
            }
            prompt[0].style.display = "none";
            var res = data.data;
            var state = document.getElementsByClassName("state");
            if (res.state == "create") {
                $(".state").css("border", "5px solid green");
                $(".state").css("line-height", "70px");
                state[0].innerHTML = "扫码人:" + res.userName + "&nbsp&nbsp&nbsp&nbsp" + "工位:" + res.station + "<p class='check'>" + "成功" + "</p>"
            } else {
                $(".state").css("border", "5px solid red");
                state[0].innerHTML = "首次扫码时间：" + res.AlreadyCode_time + "&nbsp&nbsp&nbsp&nbsp" + " 扫码人:" + res.userName +"&nbsp&nbsp&nbsp&nbsp" +  "工位:" + res.station + "<p class='check'>" + "查看" + "</p>"
            }
            var processGuidance = document.getElementsByClassName("processGuidance");
            var content_main_left = document.getElementsByClassName("content_main_left");
            processGuidance[0].style.display = "block";
            content_main_left[0].style.display = "block";
            // var src_stage_image = 'data:image/jpeg;base64,' + res.version_commission[0]['款图片'];
            var src_stage_image = 'data:image/jpeg;base64,' + res.kuan_images;
            console.log("res", res);
            if (res['stage_remarks'] !== undefined) {
                $('#stage_remarks').text(res['stage_remarks'])
            } else {
                $('#stage_remarks').text("")
            }
            if (res['quality_remarks'] !== undefined) {
                $('#quality_remarks').text(res['quality_remarks'])
            } else {
                $('#quality_remarks').text("")
            }
            if (res['effectiveness'] !== undefined) {
                $('#effectiveness').text(res['effectiveness'])
            } else {
                $('#effectiveness').text("")
            }
            if (res['So'] !== undefined) {
                $('#so').text(res['So'])
            } else {
                $('#so').text("")
            }
            if (res['today_total_qty'] !== undefined) {
                $('#today_total_qty').text(res['today_total_qty'])
            } else {
                $('#today_total_qty').text("")
            }
            if (res['num'] !== undefined) {
                $('#num').text(res['num'])
            } else {
                $('#num').text("")
            }
            if (res['serial_number'] !== undefined) {
                $('#serial_number').text(res['serial_number'])
            } else {
                $('#serial_number').text("")
            }
            if (res['customer_code'] !== undefined) {
                $('#customer_num').text(res['customer_code'])
            } else {
                $('#customer_num').text("")
            }
            if (res['customer_claim'] !== undefined) {
                $('#customer_req').text(res['customer_claim'])
            } else {
                $('#customer_req').text("")
            }
            $('#stage_image').attr("src", src_stage_image);
            console.log(res['size_list_dic']);
            // res['size_list_dic'] = JSON.parse(res['size_list_dic'].replace(/'/g, '"'));
            // var kablist_html = template.render('kablist_model', res);
            // var size_list_dic_html = template.render('size_list_dic_model', res);
            // $("#kablist").html(kablist_html);
            // $("#size_list_dic").html(size_list_dic_html);
            if (res.version_commission[0]['客户'] !== undefined) {
                $("#kh").text(res.version_commission[0]['客户']);
            } else {
                $("#kh").text("");
            }
            if (res.version_commission[0]['明袋里'] !== undefined) {
                $("#mdl").text(res.version_commission[0]['明袋里']);
            } else {
                $("#mdl").text("");
            }
            if (res.version_commission[0]['袋盖里'] !== undefined) {
                $("#dgl").text(res.version_commission[0]['袋盖里']);
            } else {
                $("#dgl").text("");
            }
            if (res.version_commission[0]['包边条'] !== undefined) {
                $("#bbt").text(res.version_commission[0]['包边条']);
            } else {
                $("#bbt").text("");
            }
            if (res.version_commission[0]['织边条'] !== undefined) {
                $("#zbt").text(res.version_commission[0]['织边条']);
            } else {
                $("#zbt").text("");
            }
            if (res.version_commission[0]['大身里布'] !== undefined) {
                $("#dslb").text(res.version_commission[0]['大身里布']);
            } else {
                $("#dslb").text("");
            }
            if (res.version_commission[0]['样板编号'] !== undefined) {
                $("#yb").text(res.version_commission[0]['样板编号']);
            } else {
                $("#yb").text("");
            }
            if (res.version_commission[0]['袖里布'] !== undefined) {
                $("#xlb").text(res.version_commission[0]['袖里布']);
            } else {
                $("#xlb").text("");
            }
            if (res.version_commission[0]['里大袋开线料'] !== undefined) {
                $("#lddkxl").text(res.version_commission[0]['里大袋开线料']);
            } else {
                $("#lddkxl").text("");
            }
            if (res.version_commission[0]['挂里三角料'] !== undefined) {
                $("#glsj").text(res.version_commission[0]['挂里三角料']);
            } else {
                $("#glsj").text("");
            }
            if (res.version_commission[0]['里袋贴'] !== undefined) {
                $("#ldt").text(res.version_commission[0]['里袋贴']);
            } else {
                $("#ldt").text("");
            }
            if (res.version_commission[0]['裁剪改版'] !== undefined) {
                $("#prosess_req").text(res.version_commission[0]['裁剪改版']);
            } else {
                $("#prosess_req").text("");
            }
            if (res.version_commission[0]['面料裁剪'] !== undefined) {
                $("#mlcj").text(res.version_commission[0]['面料裁剪']);
            } else {
                $("#mlcj").text("");
            }
            if (res.version_commission[0]['裁剪改版'] !== undefined) {
                $("#cjgb").text(res.version_commission[0]['裁剪改版']);
            } else {
                $("#cjgb").text("");
            }
            if (res.version_commission[0]['卡袋开线料'] !== undefined) {
                $("#kdkxl").text(res.version_commission[0]['卡袋开线料']);
            } else {
                $("#kdkxl").text("");
            }
            if (res.version_commission[0]['笔袋开线料'] !== undefined) {
                $("#bdkxl").text(res.version_commission[0]['笔袋开线料']);
            } else {
                $("#bdkxl").text("");
            }
            if (res.version_commission[0]['香水袋料'] !== undefined) {
                $("#xsdl").text(res.version_commission[0]['香水袋料']);
            } else {
                $("#xsdl").text("");
            }
            if (res.version_commission[0]['钉扣线方式'] !== undefined) {
                $("#dkxfs").text(res.version_commission[0]['钉扣线方式']);
            } else {
                $("#dkxfs").text("");
            }
            if (res.version_commission[0]['袖扣锁眼技法'] !== undefined) {
                $("#xksyjf").text(res.version_commission[0]['袖扣锁眼技法']);
            } else {
                $("#xksyjf").text("");
            }
            if (res.m_line !== undefined) {
                $("#cx").text(res.m_line);
            } else {
                $("#cx").text("");
            }
            if (res.version_commission[0]['袋盖宽'] !== undefined) {
                $("#dgk").text("袋盖宽:" + res.version_commission[0]['袋盖宽']);
            } else {
                $("#dgk").text("");
            }
            if (res.version_commission[0]['面袋'] !== undefined) {
                $("#md").text("面袋:" + res.version_commission[0]['面袋']);
            } else {
                $("#md").text("");
            }
            if (res.version_commission[0]['凤眼'] !== undefined) {
                $("#fy").text("凤眼:" + res.version_commission[0]['凤眼']);
            } else {
                $("#fy").text("");
            }
            if (res.version_commission[0]['贡针宽距'] !== undefined) {
                $("#gzkj").text("贡针宽距:" + res.version_commission[0]['贡针宽距']);
            } else {
                $("#gzkj").text("");
            }
            if (res.version_commission[0]['手巾袋'] !== undefined) {
                $("#sjd").text("手巾袋:" + res.version_commission[0]['手巾袋'] + "," + res.version_commission[0]['手巾袋宽']);
            } else {
                $("#sjd").text("");
            }
            if (res.version_commission[0]['袖口开叉'] !== undefined) {
                $("#xkkc").text("袖口开叉:" + res.version_commission[0]['袖口开叉']);
            } else {
                $("#xkkc").text("");
            }
            if (res.version_commission[0]['袖扣数量'] !== undefined) {
                $("#xksl").text("袖扣数量:" + res.version_commission[0]['袖扣数量']);
            } else {
                $("#xksl").text("");
            }
            if (res.version_commission[0]['里大袋三角款式'] !== undefined) {
                $("#lddsj").text("里大袋三角款式:" + res.version_commission[0]['里大袋三角款式']);
            } else {
                $("#lddsj").text("");
            }
            if (res.version_commission[0]['袖叉扣眼'] !== undefined) {
                $("#xkky").text("袖叉扣眼:" + res.version_commission[0]['袖叉扣眼']);
            } else {
                $("#xkky").text("");
            }
            if (res.type === 'top') {
                var result = [];
                for (var i = 0; i < res.size_details_top.length; i += 15) {
                    result.push(res.size_details_top.slice(i, i + 15));
                }
                console.log("result", result);
                var menu = "";
                menu += "<tr>";
                menu += "<td>" + "版型" + "</td>";
                menu += "<td>" + "数量" + "</td>";
                menu += "<td>" + "流水号" + "</td>";
                menu += "</tr>";
                for (var i = 0; i < result.length; i++) {
                    for (var x = 0; x < result[i].length; x++) {
                        menu += "<tr>";
                        menu += "<td>" + result[i][x].B + "</td>";
                        menu += "<td>" + result[i][x].S + "</td>";
                        menu += "<td>" + result[i][x].star_number + " 一 " + result[i][x].end_number + "</td>";
                        menu += "</tr>";
                    }
                }
                var cm_detaile_main = document.getElementsByClassName("cm_detaile_main");
                cm_detaile_main[0].innerHTML = menu;
            } else {
                var result = [];
                for (var i = 0; i < res.size_details_bottom.length; i += 15) {
                    result.push(res.size_details_bottom.slice(i, i + 15));
                }
                console.log("result", result);
                var menu = "";
                menu += "<tr>";
                menu += "<td>" + "版型" + "</td>";
                menu += "<td>" + "数量" + "</td>";
                menu += "<td>" + "流水号" + "</td>";
                menu += "</tr>";
                for (var i = 0; i < result.length; i++) {
                    for (var x = 0; x < result[i].length; x++) {
                        menu += "<tr>";
                        menu += "<td>" + result[i][x].B + "</td>";
                        menu += "<td>" + result[i][x].S + "</td>";
                        menu += "<td>" + result[i][x].star_number + " 一 " + result[i][x].end_number + "</td>";
                        menu += "</tr>";
                    }
                }
                var cm_detaile_main = document.getElementsByClassName("cm_detaile_main");
                cm_detaile_main[0].innerHTML = menu;
            }

        }
    });
}