function readcode(data) {
    $.ajax({
        type: "POST",
        url: config.testConfig.MesPath + "workmessage/",
        // data: {code:code, card_id:card_id.toString(),process:process,station:station},
        data: data,
        dataType: "json",
        success: function (data) {
            console.log("data", data);
            if (data.status == "erro") {
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
            var code_number = document.getElementsByClassName("code_number");
            processGuidance[0].style.display = "block";
            content_main_left[0].style.display = "block";
            code_number[0].style.display = "block";
            // var src_stage_image = 'data:image/jpeg;base64,'+res.version_commission[0]['款图片'];
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
            // res['size_list_dic'] = JSON.parse(res['size_list_dic'].replace(/'/g, '"'));
            // var kablist_html = template.render('kablist_model', res);
            // var size_list_dic_html = template.render('size_list_dic_model', res);
            // $("#kablist").html(kablist_html);
            // $("#size_list_dic").html(size_list_dic_html);
            if (res.version_commission[0]['袋布内外工艺'] !== undefined) {
                $("#gy").text(res.version_commission[0]['袋布内外工艺']);
            } else {
                $("#gy").text("");
            }
            if (res.version_commission[0]['裤前褶'] !== undefined) {
                $("#ks").text(res.version_commission[0]['裤前褶']);
            } else {
                $("#ks").text("");
            }
            if (res.version_commission[0]['款数量'] !== undefined) {
                $("#ddsl").text(res.version_commission[0]['款数量']);
            } else {
                $("#ddsl").text("");
            }
            if (res.version_commission[0]['样板编号'] !== undefined) {
                $("#yb").text(res.version_commission[0]['样板编号']);
            } else {
                $("#yb").text("");
            }
            if (res.version_commission[0]['西裤口袋'] !== undefined) {
                $("#dbcl").text(res.version_commission[0]['西裤口袋']);
            } else {
                $("#dbcl").text("");
            }
            if (res.version_commission[0]['裤里布'] !== undefined) {
                $("#klcl").text(res.version_commission[0]['裤里布']);
            } else {
                $("#klcl").text("");
            }
            if (res.version_commission[0]['套结选择'] !== undefined) {
                $("#hdtj").text(res.version_commission[0]['套结选择']);
            } else {
                $("#hdtj").text(res.version_commission[0]['套结选择']);
            }
            if (res.version_commission[0]['样板编号'] !== undefined) {
                $("#dbyl").text(res.version_commission[0]['样板编号']);
            } else {
                $("#dbyl").text(res.version_commission[0]['样板编号']);
            }
            if (res.version_commission[0]['裤里用量'] !== undefined) {
                $("#klyl").text(res.version_commission[0]['裤里用量']);
            } else {
                $("#klyl").text("");
            }
            if (res.version_commission[0]['内部工艺'] !== undefined) {
                $("#process_req").text(res.version_commission[0]['内部工艺']);
            } else {
                $("#process_req").text("");
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
            var result = [];
            for (var i = 0; i < res.size_details_bottom.length; i += 15) {
                result.push(res.size_details_bottom.slice(i, i + 15));
            }
            var menu = "";
            for (var i = 0; i < result.length; i++) {
                for (var x = 0; x < result[i].length; x++) {
                    menu += "<tr style='width: 70px'>";
                    menu += "<td style='width: 50px'>" + result[i][x].B + "</td>";
                    menu += "<td>" + result[i][x].S + "</td>";
                    menu += "</tr>";
                }
            }
            var cm_detaile_main = document.getElementsByClassName("cm_detaile_main");
            cm_detaile_main[0].innerHTML = menu;
        }
    });
}
