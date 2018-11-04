$(function () {
    let abId = $('#abId').text().trim();
    let siId = $('#siId').text().trim();
    let url;
    /*获取专辑基本信息*/
    url = 'http://localhost:3000/album?id=' + abId;
    $.get(url, function (data) {
        $("#albuminfo_box").html('');
        $("#c-info").tmpl(data.album).appendTo('#albuminfo_box');
    });

    /*获取专辑歌曲*/
    url = 'https://api.bzqll.com/music/netease/album?key=579621905&id=' + abId;
    $.get(url, function (data) {
        $("#song").html('');
        $("#c-song").tmpl(data.data).appendTo('#song');
    });

    /*获取相关专辑*/
    url = 'http://localhost:3000/artist/album?id=' + siId + "&limit=10";
    $.get(url, function (data) {
        $("#album_box").html('');
        $("#c-album").tmpl(data.hotAlbums).appendTo('#album_box');
    });

    /*获取评论*/
    url = 'http://localhost:3000/comment/album?id=' + abId;
    $.get(url, function (data) {
        $("#content_top").html('');
        $("#t-comment").tmpl(data.hotComments).appendTo('#content_top');
    });
    $('#box').paging({
        initPageNo: 1, totalPages: 6, slideSpeed: 600, jump: true,
        callback: function (page) {
            url = 'http://localhost:3000/comment/album?id=' + abId + "&offset=" + page + "&limit=10";
            $.get(url, function (data) {
                $("#content_new").html('');
                $("#n-comment").tmpl(data.comments).appendTo('#content_new');
            });
        }
    });

    /*发送评论*/
    layui.use('layedit', function () {
        let index = layui.layedit.build('comment', {height: 80, tool: ['|']});
        $('#send').click(function () {
            let content = layui.layedit.getText(index);
            url = 'http://localhost:3000/comment?t=1' + '&type=2' + '&id=' + slistId + '&content=' + content;
            alert(url);
            $.get(url, function (data) {
                alert(data.msg);
                if (data.code === 302) {
                    alert('123');
                }
            });
        });
    });
});