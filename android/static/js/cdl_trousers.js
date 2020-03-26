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
            console.log("res", res);
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
            // console.log(res['size_list_dic']);
            // res['size_list_dic'] = JSON.parse(res['size_list_dic'].replace(/'/g, '"'));
// {#                                console.log(res['kablist'][0]['款式值'])#}
//             var kablist_html = template.render('kablist_model', res);
//             var size_list_dic_html = template.render('size_list_dic_model', res);
//             $("#kablist").html(kablist_html);
//             $("#size_list_dic").html(size_list_dic_html);
            if (res.version_commission[0]['后开衩型'] !== undefined) {
                $("#ks").text(res.version_commission[0]['后开衩型']);
            } else {
                $("#ks").text("");
            }
            if (res.version_commission[0]['袖口开叉'] !== undefined) {
                $("#xc").text(res.version_commission[0]['袖口开叉']);
            } else {
                $("#xc").text("");
            }
            if (res.version_commission[0]['大身里布'] !== undefined) {
                $("#dslbml").text(res.version_commission[0]['大身里布']);
            } else {
                $("#dslbml").text("");
            }
            if (res.version_commission[0]['袖里布'] !== undefined) {
                $("#szlbml").text(res.version_commission[0]['袖里布']);
            } else {
                $("#szlbml").text("");
            }
            if (res.version_commission[0]['里大袋开线料'] !== undefined) {
                $("#lkxml").text(res.version_commission[0]['里大袋开线料']);
            } else {
                $("#lkxml").text("");
            }
            if (res.version_commission[0]['里袋贴'] !== undefined) {
                $("#dtcl").text(res.version_commission[0]['里袋贴']);
            } else {
                $("#dtcl").text("");
            }
            if (res.version_commission[0]['香水袋料'] !== undefined) {
                $("#xsdcl").text(res.version_commission[0]['香水袋料']);
            } else {
                $("#xsdcl").text("");
            }
            if (res.version_commission[0]['挂里三角料'] !== undefined) {
                $("#sjcl").text(res.version_commission[0]['挂里三角料']);
            } else {
                $("#sjcl").text("");
            }
            if (res.version_commission[0]['样板编号'] !== undefined) {
                $("#bx").text(res.version_commission[0]['样板编号']);
            } else {
                $("#bx").text("");
            }
            if (res.version_commission[0]['挂面款式'] !== undefined) {
                $("#gm").text(res.version_commission[0]['挂面款式']);
            } else {
                $("#gm").text("");
            }
            if (res.version_commission[0]['里布用法'] !== undefined) {
                $("#lbyf").text(res.version_commission[0]['里布用法']);
            } else {
                $("#lbyf").text("");
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
            if (res.version_commission[0]['卡袋开线料'] !== undefined) {
                $("#kdkxl").text(res.version_commission[0]['卡袋开线料']);
            } else {
                $("#kdkxl").text("");
            }
            if (typeof (res.version_commission[0]['大身里布']) !== "undefined") {
                var dslbyl = res.version_commission[0]['大身里布'];
                var cut_field_dslbyl = dslbyl.match(/\(([^)]*)\)/);
                if (cut_field_dslbyl) {
                    console.log(cut_field_dslbyl[1]);
                    $("#dslbyl").text(cut_field_dslbyl[1]);
                }
            }
            if (typeof (res.version_commission[0]['袖里布']) !== "undefined") {
                var xzlbyl = res.version_commission[0]['袖里布'];
                var cut_field_xzlbyl = xzlbyl.match(/\(([^)]*)\)/);
                if (cut_field_xzlbyl) {
                    console.log(cut_field_xzlbyl[1]);
                    $("#xzlbyl").text(cut_field_xzlbyl[1]);
                }
            }
            if (typeof (res.version_commission[0]['里大袋开线料']) !== "undefined") {
                var lkxyl = res.version_commission[0]['里大袋开线料'];
                var cut_field_lkxyl = lkxyl.match(/\(([^)]*)\)/);
                if (cut_field_lkxyl) {
                    console.log(cut_field_lkxyl);
                    $("#lkxyl").text(cut_field_lkxyl[1]);
                }
            }
            if (typeof (res.version_commission[0]['里袋贴']) !== "undefined") {
                var dtyl = res.version_commission[0]['里袋贴'];
                var cut_field_dtyl = dtyl.match(/\(([^)]*)\)/);
                if (cut_field_dtyl) {
                    console.log(cut_field_dtyl);
                    $("#dtyl").text(cut_field_dtyl[1]);
                }
            }
            if (typeof (res.version_commission[0]['挂里三角料']) !== "undefined") {
                var sjyl = res.version_commission[0]['挂里三角料'];
                var cut_field_sjyl = sjyl.match(/\(([^)]*)\)/);
                if (cut_field_sjyl) {
                    console.log(cut_field_sjyl);
                    $("#sjyl").text(cut_field_sjyl[1]);
                }
            }
// {#                                $("#xsdyl").text(res.version_commission[0]['香水袋用量']);#}
// {#                                $("#sjyl").text(res.version_commission[0]['三角用量']);#}
            $("#ddslhj").text(res.version_commission[0]['款数量']);

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
