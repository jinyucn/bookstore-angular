// <script type="text/javascript" src="http://ajax.microsoft.com/ajax/jquery/jquery-1.4.min.js"> </script>
var file
function show(f)
{
  file=f.value
  var rd = new FileReader();//创建文件读取对象
  var files = f.files[0];//获取file组件中的文件
  rd.readAsDataURL(files);//文件读取装换为base64类型
  rd.onloadend = function(e)
  {
    //加载完毕之后获取结果赋值给img
    document.getElementById("showImage").src = this.result;
  }
}


function onSubmit()
{
  if (file == null || file == "") {
    alert("please choose the image to show!");
    return false;
  }
  if (file.lastIndexOf('.') == -1) { //如果不存在"."
    alert("the location is error!");
    return false;
  }
  var AllImgExt = ".jpg|.jpeg|.bmp|.png|";
  var extName = file.substring(file.lastIndexOf(".")).toLowerCase();//（把路径中的所有字母全部转换为小写）
  if (AllImgExt.indexOf(extName + "|") == -1) {
    ErrMsg = "wrong file type " + AllImgExt + " now file type:"
      + extName;
    alert(ErrMsg);
    return false;
  }
  document.forms[0].submit();
}


$('#hidden_frame').load(function ()
{
  alert("upload function");
  var text = $(this).contents().find("body").text();
  // 根据后台返回值处理结果
  var j = $.parseJSON(text);
  alert(j);
  //提取pic_filename 看alert的内容再做调整-->
  document.getElementById("picFilenameShow").val = j;
});
