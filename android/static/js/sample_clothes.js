function readcode(data) {
    $.ajax({
        type: "POST",
        url: config.testConfig.MesPath + "workmessage/",
        // data: {code:code, card_id:card_id.toString(),process:process,station:station},
        data: data,
        dataType: "json",
        success: function (data) {
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
            var smcode = data.smcode
            $('#code').text(smcode)
            console.log(data)
            var res = data.data;
            console.log("res", res);
            if (res.version_commission[0]['成衣品类'] == "top") {
                var processGuidance = document.getElementsByClassName("processGuidance");
                var content_main_left = document.getElementsByClassName("content_main_left");
                var materials_clothes = document.getElementsByClassName("materials_clothes");
                var materials_trousers = document.getElementsByClassName("materials_trousers");
                var content_main_left_trousers = document.getElementsByClassName("content_main_left_trousers");
                var state_clothes = document.getElementsByClassName("state_clothes");
                var state_trousers = document.getElementsByClassName("state_trousers");
                state_clothes[0].style.display = "block";
                state_trousers[0].style.display = "none";
                processGuidance[0].style.display = "block";
                content_main_left[0].style.display = "block";
                content_main_left_trousers[0].style.display = "none";
                materials_clothes[0].style.display = "block";
                materials_trousers[0].style.display = "none";
                var state_clothes = document.getElementsByClassName("state_clothes");
                if (res.state == "create") {
                    state_clothes[0].style.background = "green";
                    state_clothes[0].innerHTML = "成功"
                } else {
                    state_clothes[0].style.background = "yellow";
                    state_clothes[0].innerHTML = "查看"
                }
                // var src_stage_image = 'data:image/jpeg;base64,'+res.version_commission[0]['款图片'];
                var src_stage_image = 'data:image/jpeg;base64,' + res.kuan_images;
                $('#stage_remarks').text(res['stage_remarks']);
                $('#quality_remarks').text(res['quality_remarks']);
                $('#effectiveness').text(res['effectiveness']);
                $('#so').text(res['So']);
                $('#today_total_qty').text(res['today_total_qty']);
                $('#num').text(res['num']);
                $('#serial_number').text(res['serial_number']);
                $('#customer_num').text(res['customer_code']);
                $('#customer_req').text(res['customer_claim']);
                $('#stage_image').attr("src", src_stage_image);
                res['size_list_dic'] = JSON.parse(res['size_list_dic'].replace(/'/g, '"'));
                $("#customer").text(res.version_commission[0]['客户']);
                $("#template_num").text(res.version_commission[0]['样板编号']);
                $("#fabric").text(res.version_commission[0]['面料']);
                $("#sleeve_lining").text(res.version_commission[0]['袖里布']);
                $("#process").text(res.version_commission[0]['内部工艺']);
                $("#type").text(res.version_commission[0]['款订单类型']);
                $("#lining").text(res.version_commission[0]['大身里布']);
                $("#sy_cloth").text(res.version_commission[0]['上衣袋布']);
                $("#mdl").text(res.version_commission[0]['明袋里']);
                $("#dgl").text(res.version_commission[0]['袋盖里']);
                $("#bbt").text(res.version_commission[0]['包边条']);
                $("#zbt").text(res.version_commission[0]['织边条']);
                if (res.version_commission[0]['裁剪改版'] !== undefined) {
                    $("#cjgb").text(res.version_commission[0]['裁剪改版']);
                } else {
                    $("#cjgb").text("");
                }
                if (res.version_commission[0]['面料裁剪'] !== undefined) {
                    $("#mlcj").text(res.version_commission[0]['面料裁剪']);
                } else {
                    $("#mlcj").text("");
                }
                $(".ybms").text(res.version_commission[0]['样板描述']);
                $(".ksms").text(res.version_commission[0]['款式描述']);
                $("#nclm").text(res.version_commission[0]['粘衬领面']);
                $("#ncgm").text(res.version_commission[0]['粘衬挂面']);
                $("#ncqp").text(res.version_commission[0]['粘衬前片']);
                $("#nclj").text(res.version_commission[0]['粘衬领脚']);
                $("#ncxs").text(res.version_commission[0]['粘衬袖山']);
                $("#ncdb").text(res.version_commission[0]['粘衬底边']);
                $("#ncjb").text(res.version_commission[0]['粘衬肩部']);
                $("#number").text(res['num']);
                if (res.version_commission[0]['款订单类型'] === "大货") {
                    var size_list_dic = res.size_list_dic;
                    var size_list_dic_menu = "";
                    var size_list_dic_tamplate = document.getElementsByClassName("size_list_dic_tamplate");
                    console.log('size_list_dic_tamplate', size_list_dic_tamplate);
                    for (var i = 0; i < size_list_dic.length; i++) {
                        size_list_dic_menu += "<tr>";
                        size_list_dic_menu += "<td>" + size_list_dic[i]["版型"] + "</td>";
                        size_list_dic_menu += "<td>" + size_list_dic[i]["备注"] + "</td>";
                        size_list_dic_menu += "</tr>";
                    }
                    size_list_dic_tamplate[0].innerHTML = size_list_dic_menu;
                    var kablist_html = template.render('kablist_model', res);
                    $(".kablist_tamplate").html(kablist_html);
                } else {
                    var size_list_dic = res.size_list_dic;
                    var size_list_dic_menu = "";
                    var size_list_dic_tamplate = document.getElementsByClassName("size_list_dic_tamplate");
                    if (res.size_list_dic.length !== 0) {
                        size_list_dic_menu += "<tr>";
                        size_list_dic_menu += "<td>" + "前衣长" + size_list_dic[0]["前衣长"] + "</td>";
                        size_list_dic_menu += "<td>" + "后衣长" + size_list_dic[0]["后衣长"] + "</td>";
                        size_list_dic_menu += "</tr>";
                        size_list_dic_menu += "<tr>";
                        size_list_dic_menu += "<td>" + "下摆" + size_list_dic[0]["下摆"] + "</td>";
                        size_list_dic_menu += "<td>" + "中腰" + size_list_dic[0]["中腰"] + "</td>";
                        size_list_dic_menu += "</tr>";
                        size_list_dic_menu += "<tr>";
                        size_list_dic_menu += "<td>" + "肩宽" + size_list_dic[0]["肩宽"] + "</td>";
                        size_list_dic_menu += "<td>" + "胸围" + size_list_dic[0]["胸围"] + "</td>";
                        size_list_dic_menu += "</tr>";
                        size_list_dic_menu += "<tr>";
                        size_list_dic_menu += "<td>" + "袖长" + size_list_dic[0]["袖长"] + "</td>";
                        size_list_dic_menu += "<td>" + "袖口" + size_list_dic[0]["袖口"] + "</td>";
                        size_list_dic_menu += "</tr>";
                    }

                    size_list_dic_tamplate[0].innerHTML = size_list_dic_menu;
                    var kablist_html = template.render('kablist_model', res);
                    $(".kablist_tamplate").html(kablist_html);
                }
                typeof (res.version_commission[0]['主标']) !== "undefined" ? $('#zb').attr("src", 'data:image/jpeg;base64,' + res.version_commission[0]['主标']) : $('#zb').attr("src", "");
                typeof (res.version_commission[0]['副标']) !== "undefined" ? $('#fb').attr("src", 'data:image/jpeg;base64,' + res.version_commission[0]['副标']) : $('#fb').attr("src", "");
                typeof (res.version_commission[0]['面料标']) !== "undefined" ? $('#mlb').attr("src", 'data:image/jpeg;base64,' + res.version_commission[0]['面料标']) : $('#mlb').attr("src", "");
                typeof (res.version_commission[0]['尺码标']) !== "undefined" ? $('#cmb').attr("src", 'data:image/jpeg;base64,' + res.version_commission[0]['尺码标']) : $('#cmb').attr("src", "");
                typeof (res.version_commission[0]['领标']) !== "undefined" ? $('#lb').attr("src", 'data:image/jpeg;base64,' + res.version_commission[0]['领标']) : $('#lb').attr("src", "");
                typeof (res.version_commission[0]['袖标']) !== "undefined" ? $('#xb').attr("src", 'data:image/jpeg;base64,' + res.version_commission[0]['袖标']) : $('#xb').attr("src", "");
                typeof (res.version_commission[0]['包边条图']) !== "undefined" ? $('#bzbt').attr("src", 'data:image/jpeg;base64,' + res.version_commission[0]['包边条图']) : $('#bzbt').attr("src", "");
                typeof (res.version_commission[0]['织边条图']) !== "undefined" ? $('#zbtt').attr("src", 'data:image/jpeg;base64,' + res.version_commission[0]['织边条图']) : $('#zbtt').attr("src", "");
                var result = [];
                for (var i = 0; i < res.size_details_top.length; i += 5) {
                    result.push(res.size_details_top.slice(i, i + 5));
                }
                var menu = "";
                for (var i = 0; i < result.length; i++) {
                    for (var x = 0; x < result[i].length; x++) {
                        menu += "<tr>";
                        menu += "<td>" + result[i][x].B + "</td>";
                        menu += "<td>" + result[i][x].S + "</td>";
                        menu += "</tr>";
                    }
                }
                var cm_detaile_main = document.getElementsByClassName("cm_detaile_main");
                cm_detaile_main[0].innerHTML = menu;
            } else if (res.version_commission[0]['成衣品类'] == "bottom") {

                var processGuidance = document.getElementsByClassName("processGuidance");
                var content_main_left_trousers = document.getElementsByClassName("content_main_left_trousers");
                var materials_trousers = document.getElementsByClassName("materials_trousers");
                var materials_clothes = document.getElementsByClassName("materials_clothes");
                var content_main_left = document.getElementsByClassName("content_main_left");
                var nc = document.getElementsByClassName("nc");
                var state_clothes = document.getElementsByClassName("state_clothes");
                var state_trousers = document.getElementsByClassName("state_trousers");
                state_clothes[0].style.display = "none";
                state_trousers[0].style.display = "block";
                processGuidance[0].style.display = "block";
                content_main_left_trousers[0].style.display = "block";
                content_main_left[0].style.display = "none";
                materials_trousers[0].style.display = "block";
                materials_clothes[0].style.display = "none";
                nc[0].style.display = "none";
                if (res.state == "create") {
                    state_trousers[0].style.background = "green";
                    state_trousers[0].innerHTML = "成功"
                } else {
                    state_trousers[0].style.background = "yellow";
                    state_trousers[0].innerHTML = "查看"
                }
                $('#so_trousers').text(res['So']);
                $('#kh').text(res.version_commission[0]['客户']);
                $('#ybbh').text(res.version_commission[0]['样板编号']);
                $('#ml').text(res.version_commission[0]['面料']);
                $('#kl').text(res.version_commission[0]['裤里布']);
                $('#nbgy').text(res.version_commission[0]['内部工艺']);
                $('#dddx').text(res.version_commission[0]['款订单类型']);
                $('#nk').text(res.version_commission[0]['门禁扣']);
                $('#sl').text(res.version_commission[0]['款数量']);
                $(".ybms").text(res.version_commission[0]['样板描述']);
                $(".ksms").text(res.version_commission[0]['款式描述']);
                $("#bbt").text(res.version_commission[0]['包边条']);
                if (res.version_commission[0]['裁剪改版'] !== undefined) {
                    $("#cjgb").text(res.version_commission[0]['裁剪改版']);
                } else {
                    $("#cjgb").text("");
                }
                if (res.version_commission[0]['面料裁剪'] !== undefined) {
                    $("#mlcj").text(res.version_commission[0]['面料裁剪']);
                } else {
                    $("#mlcj").text("");
                }
                // var src_stage_image = 'data:image/jpeg;base64,'+res.version_commission[0]['款图片'];
                var src_stage_image = 'data:image/jpeg;base64,' + res.kuan_images;
                $('#stage_remarks').text(res['stage_remarks']);
                $('#quality_remarks').text(res['quality_remarks']);
                $('#effectiveness').text(res['effectiveness']);
                $('#today_total_qty').text(res['today_total_qty']);
                $('#num').text(res['num']);
                $('#serial_number').text(res['serial_number']);
                $('#customer_num').text(res['customer_code']);
                $('#customer_req').text(res['customer_claim']);
                $('#stage_image').attr("src", src_stage_image);
                res['size_list_dic'] = JSON.parse(res['size_list_dic'].replace(/'/g, '"'));
                $("#number").text(res['num']);
                if (res.version_commission[0]['款订单类型'] == "大货") {
                    var size_list_dic = res.size_list_dic;
                    var size_list_dic_menu = "";
                    var size_list_dic_tamplate = document.getElementsByClassName("size_list_dic_tamplate");
                    console.log('size_list_dic_tamplate', size_list_dic_tamplate);
                    for (var i = 0; i < size_list_dic.length; i++) {
                        size_list_dic_menu += "<tr>";
                        size_list_dic_menu += "<td>" + size_list_dic[i]["版型"] + "</td>";
                        size_list_dic_menu += "<td>" + size_list_dic[i]["备注"] + "</td>";
                        size_list_dic_menu += "</tr>";
                    }
                    size_list_dic_tamplate[0].innerHTML = size_list_dic_menu;
                    var kablist_html = template.render('kablist_model', res);
                    $(".kablist_tamplate").html(kablist_html);
                } else {
                    var size_list_dic = res.size_list_dic;
                    var size_list_dic_menu = "";
                    var size_list_dic_tamplate = document.getElementsByClassName("size_list_dic_tamplate");
                    console.log("size_list_dic_tamplate", size_list_dic_tamplate)
                    if (res.size_list_dic !== "") {
                        size_list_dic_menu += "<tr>";
                        size_list_dic_menu += "<td>" + "脾围" + size_list_dic[0]["脾围"] + "</td>";
                        size_list_dic_menu += "<td>" + "门襟" + size_list_dic[0]["门襟"] + "</td>";
                        size_list_dic_menu += "</tr>";
                        size_list_dic_menu += "<tr>";
                        size_list_dic_menu += "<td>" + "腰围" + size_list_dic[0]["腰围"] + "</td>";
                        size_list_dic_menu += "<td>" + "臀围" + size_list_dic[0]["臀围"] + "</td>";
                        size_list_dic_menu += "</tr>";
                        size_list_dic_menu += "<tr>";
                        size_list_dic_menu += "<td>" + "横档" + size_list_dic[0]["横档"] + "</td>";
                        size_list_dic_menu += "<td>" + "中档" + size_list_dic[0]["中档"] + "</td>";
                        size_list_dic_menu += "</tr>";
                        size_list_dic_menu += "<tr>";
                        size_list_dic_menu += "<td>" + "脚口" + size_list_dic[0]["脚口"] + "</td>";
                        size_list_dic_menu += "<td>" + "后浪" + size_list_dic[0]["后浪"] + "</td>";
                        size_list_dic_menu += "</tr>";
                        size_list_dic_menu += "<tr>";
                        size_list_dic_menu += "<td>" + "前浪" + size_list_dic[0]["前浪"] + "</td>";
                        size_list_dic_menu += "<td>" + "裤长" + size_list_dic[0]["裤长"] + "</td>";
                        size_list_dic_menu += "</tr>";
                        size_list_dic_menu += "<tr>";
                        size_list_dic_menu += "<td>" + "膝围" + size_list_dic[0]["膝围"] + "</td>";
                        size_list_dic_menu += "<td>" + "拉链" + size_list_dic[0]["拉链"] + "</td>";
                        size_list_dic_menu += "</tr>";
                    }

                    size_list_dic_tamplate[0].innerHTML = size_list_dic_menu;
                    var kablist_html = template.render('kablist_model', res);
                    $(".kablist_tamplate").html(kablist_html);
                }
                typeof (res.version_commission[0]['主标']) !== "undefined" ? $('#zb').attr("src", 'data:image/jpeg;base64,' + res.version_commission[0]['主标']) : $('#zb').attr("src", "");
                typeof (res.version_commission[0]['副标']) !== "undefined" ? $('#fb').attr("src", 'data:image/jpeg;base64,' + res.version_commission[0]['副标']) : $('#fb').attr("src", "");
                typeof (res.version_commission[0]['面料标']) !== "undefined" ? $('#mlb').attr("src", 'data:image/jpeg;base64,' + res.version_commission[0]['面料标']) : $('#mlb').attr("src", "");
                typeof (res.version_commission[0]['面料']) !== "undefined" ? $('#ml').attr("src", 'data:image/jpeg;base64,' + res.version_commission[0]['面料']) : $('#ml').attr("src", "");
                typeof (res.version_commission[0]['里布']) !== "undefined" ? $('#lb').attr("src", 'data:image/jpeg;base64,' + res.version_commission[0]['里布']) : $('#lb').attr("src", "");
                typeof (res.version_commission[0]['支纱标']) !== "undefined" ? $('#zsb').attr("src", 'data:image/jpeg;base64,' + res.version_commission[0]['支纱标']) : $('#zsb').attr("src", "");
                typeof (res.version_commission[0]['防伪标']) !== "undefined" ? $('#fwb').attr("src", 'data:image/jpeg;base64,' + res.version_commission[0]['防伪标']) : $('#fwb').attr("src", "");
                typeof (res.version_commission[0]['包边条图']) !== "undefined" ? $('#bbtt').attr("src", 'data:image/jpeg;base64,' + res.version_commission[0]['包边条图']) : $('#bbtt').attr("src", "");
                var result = [];
                for (var i = 0; i < res.size_details_bottom.length; i += 5) {
                    result.push(res.size_details_bottom.slice(i, i + 5));
                }
                console.log("result", result);
                var menu = "";
                for (var i = 0; i < result.length; i++) {
                    for (var x = 0; x < result[i].length; x++) {
                        menu += "<tr>";
                        menu += "<td>" + result[i][x].B + "</td>";
                        menu += "<td>" + result[i][x].S + "</td>";
                        menu += "</tr>";
                    }
                }
                var cm_detaile_main = document.getElementsByClassName("cm_detaile_main");
                cm_detaile_main[0].innerHTML = menu;
            }
        }
    });
}
