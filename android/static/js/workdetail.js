window.onload = function(){
    // $('#username').bind('keydown',function(event){
    // if(event.keyCode == "13") {
        var code = $('#username').val()
        $('#username').val("")
        $('#code').text(code)
        // $('#so').text("12345")
        // $('#mo').text("54321")

         $.ajax({
             type: "POST",
             url: "test.json",
             data: {username:$("#username").val(), content:$("#content").val()},
             dataType: "json",
             success: function(data){
                      }
         });
    // }
// });
//     var ipt = document.getElementById("username");
//     ipt.oninput = function(){
//        console.log("获取值",ipt.value);
//       if(ipt.value!==""){
//           document.getElementById("username").value = ""
//       }
//     }

    $("body").click(function(){
        $("#username").focus();

    })
}
