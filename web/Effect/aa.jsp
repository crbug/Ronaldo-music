<%@ page contentType="text/html;charset=UTF-8" language="java" %>

<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title></title>
    <link rel="stylesheet" href="../staticFile/UIframe/layui/css/layui.css" media="all">
    <link rel="stylesheet" href="../staticFile/css/singer/style.css" media="all">
    <script src="https://cdn.bootcss.com/jquery/3.3.1/jquery.min.js"></script>
    <style>
        #img_box {
            padding-top: 30px;
        }

        #img_box li {
            display: inline-block;
            width: 155px;
            padding-bottom: 15px;
            padding-left: 30px;
        }
    </style>
</head>
<body>
<div class="layui-tab layui-tab-brief">
    <div class="layui-tab-content" style="height: 100%;">
        <!-- 歌手 -->
        <div class="layui-tab-item layui-show">
            <div>
                <ul class="nav">
                    <span>全部</span>
                    <li>&nbsp;A</li>
                    <li>B</li>
                    <li>C</li>
                    <li>D</li>
                    <li>E</li>
                    <li>F</li>
                    <li>G</li>
                    <li>H</li>
                    <li>I</li>
                    <li>J</li>
                    <li>K</li>
                    <li>L</li>
                    <li>M</li>
                    <li>N</li>
                    <li>O</li>
                    <li>P</li>
                    <li>Q</li>
                    <li>R</li>
                    <li>#</li>
                </ul>
            </div>
            <div style="padding-top: 10px">
                <ul class="nav">
                    <span>全部</span>
                    <li>男单</li>
                    <li>女单</li>
                    <li>组合</li>
                </ul>
            </div>
            <div style="padding-top: 10px">
                <ul class="nav">
                    <span>全部</span>
                    <li>内地</li>
                    <li>港台</li>
                    <li>欧美</li>
                    <li>日本</li>
                    <li>韩国</li>
                    <li>其他</li>
                </ul>
            </div>
            <div style="padding-top: 10px">
                <ul class="nav">
                    <span>全部</span>
                    <li>流行</li>
                    <li>嘻哈</li>
                    <li>摇滚</li>
                    <li>民谣</li>
                    <li>电子</li>
                    <li>乡村</li>
                    <li>爵士</li>
                    <li>古典</li>
                    <li>蓝调</li>
                    <li>轻音乐</li>
                </ul>
            </div>
        </div>
        <ul id="img_box">

        </ul>

        <button id="aaa">666</button>
        <button id="bbb">777</button>
    </div>
</div>


<script src="../staticFile/UIframe/jquery-2.1.1.min.js" charset="utf-8"></script>
<script type="text/javascript" src="http://ajax.microsoft.com/ajax/jquery.templates/beta1/jquery.tmpl.min.js"
        charset="utf-8"></script>
<script id="demo" type="text/x-jquery-tmpl">
    <li>
       <div style="background: #F0F0F0;box-shadow: 4px 9px 15px #88887A;">
         <div style="text-align: center;padding-top:10px">
             <img src="{{= picUrl}}" style="border-radius: 50%;width: 100px">
         </div>
         <div style="text-align: center;padding-top:5px;padding-bottom:10px">{{= name}}</div>
       </div>
    </li>

</script>

<script type="text/javascript">
    $(function () {
        var url = "http://127.0.0.1:3000/top/artists?offset=15&limit=15";
        $.get(url, function (data) {
            result = data.artists;
            $("#img_box").html('');
            $("#demo").tmpl(result).appendTo('#img_box');
        });

        $("#aaa").click(function () {
            var url = "http://127.0.0.1:3000/artist/list?cat=1001";
            $.get(url, function (data) {
                data = data.artists;
                $("#img_box").html('');
                $("#demo").tmpl(data).appendTo('#img_box');
            });
        });


    });
</script>
</body>
</html>