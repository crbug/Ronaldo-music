﻿(function ($, window, document) {
    let timestamp = (new Date()).getTime(); //时间戳
    let userId = $.cookie('nickname');  //当前用户id
    let slistId = $('#slistId').text().trim();    //歌单id

    /*获取歌单信息和歌曲*/
    function getSonglistInfo() {
        $.ajax({
            url: 'http://localhost:3000/playlist/detail?id=' + slistId + '&timestamp=' + timestamp,
            xhrFields: {withCredentials: true},
            success: function (data) {
                $("#ssheetinfo_box").empty();
                $("#song").empty();
                $("#c-song").tmpl(data.playlist).appendTo('#song');
                $("#c-info").tmpl(data.playlist).appendTo('#ssheetinfo_box');
            }
        });
    }

    getSonglistInfo();

    /*获取评论*/
    function getComment(offset, iden) {
        let url;
        if (0 == offset && 0 == iden) {
            url = 'http://localhost:3000/comment/playlist?id=' + slistId + '&timestamp=' + timestamp;
        } else if (1 == iden) {
            url = 'http://localhost:3000/comment/playlist?id=' + slistId + '&offset=' + (offset - 1) + '&timestamp=' + timestamp;
        }
        $.ajax({
            url: url,
            xhrFields: {withCredentials: true},
            success: function (data) {
                $("#total").empty();
                $("#content_new").empty();
                $("#content_top").empty();
                $("#c-total").tmpl(data).appendTo('#total');
                $("#n-comment").tmpl(data.comments).appendTo('#content_new');
                $("#t-comment").tmpl(data.hotComments).appendTo('#content_top');
            }
        });
    }

    /*获取评论总数*/
    getComment(0, 0);

    /*获取分页评论*/
    $('.layui-tab-title li').click(function () {
        layer.load();
        setTimeout(function () {
            layer.closeAll('loading');
        }, 1000);
        if ($(this).index() == 1) {
            setTimeout(function () {
                $('#box').paging({
                    initPageNo: 1,
                    totalPages: Math.ceil($('#total span b').text().trim() / 20),
                    slideSpeed: 600,
                    jump: true,
                    callback: function (page) {
                        getComment(page, 1);
                    }
                });
            }, 500);
        }
    });

    /*字数统计*/
    $('#comment').keyup(function () {
        let content = $('#comment').val().trim().length;
        for (let i = 0; i < content.length; i++) {
            let a = content.charAt(i);
            if (a.match(/[^\x00-\xff]/ig) != null) content += 2;
            else content += 1;
        }
        $('#num').text(content + '/140')
    });
    /*发送评论*/
    $('#send').click(function () {
        let content = $('#comment').val().trim();
        if (undefined == userId) {
            layer.msg('请先登陆 🙃', function () {
            });
        } else {
            let url = 'http://localhost:3000/comment?t=1' + '&type=2' + '&id=' + slistId + '&content=' + content + '&timestamp=' + timestamp;
            if (content.length > 0) {
                $.ajax({
                    url: url,
                    xhrFields: {withCredentials: true},
                    success: function (data) {
                        getComment(0, 0);
                        if (data.comment != null || data.comment != '') {
                            $('#comment').val('');
                            layer.msg('评论成功');
                            getComment(0, 0);
                        }
                    }
                });
                getComment(0, 0);
            } else {
                layer.msg('评论不能为空噢', function () {
                });
            }
        }
    });
    /*刷新评论*/
    $('#refresh').click(function () {
        layer.load(2);
        setTimeout(function () {
            layer.closeAll('loading');
        }, 400);
        getComment(0, 0);
    });

    /*---------------------------- DOM加载完后的点击事件 ----------------------------*/
    /*收藏 取消收藏歌单*/
    $(document).on('click', '#collection', function () {
        let ssId = $(this).find('h1').text().trim();
        let followed = $(this).find('h2').text().trim();
        if (undefined == userId) {
            layer.msg('请先登陆 🙃', function () {
            });
        } else {
            if (followed == 'false') {
                $.ajax({
                    url: 'http://localhost:3000/playlist/subscribe?id=' + ssId + '&t=1&timestamp=' + timestamp,
                    xhrFields: {withCredentials: true},
                    success: function (data) {
                        if (data.code === 200) {
                            getSonglistInfo();
                            layer.msg('收藏成功');
                        } else {
                            layer.msg('出现缓存异常请稍后');
                        }
                    }
                });
            } else if (followed == 'true') {
                $.ajax({
                    url: 'http://localhost:3000/playlist/subscribe?id=' + ssId + '&t=2&timestamp=' + timestamp,
                    xhrFields: {withCredentials: true},
                    success: function (data) {
                        if (data.code === 200) {
                            getSonglistInfo();
                            layer.msg('取消成功');
                        } else {
                            layer.msg('出现缓存异常请稍后');
                        }
                    }
                });
            }
        }
    });

    /*跳转到歌曲创作者主页*/
    $(document).on('click', '#uinfo', function () {
        window.location.href = 'friendpage.jsp?userId=' + $('#userId').text();
    });
    /*查看专辑详情*/
    $(document).on('click', '#song tr .album', function () {
        let abId = $(this).find('h1').text().trim();
        let siId = $(this).find('h2 span:eq(0)').text().trim();
        window.location.href = 'album_info.jsp?abId=' + abId + '&siId=' + siId;
    });
    /*点赞*/
    $(document).on('click', '#content_top li,#content_new li', function () {
        let commentId = $(this).find('h1').text().trim();
        let liked = $(this).find('h2').text().trim();
        let ssId = $(this).find('h3').text().trim();
        if (undefined == userId) {
            layer.msg('请先登陆 🙃', function () {
            });
        } else {
            if (liked == 'false') {
                let url = 'http://localhost:3000/comment/like?id=' + ssId + '&cid=' + commentId + '&t=1&type=2';
                $.ajax({
                    url: url,
                    xhrFields: {withCredentials: true},
                    success: function (data) {
                        if (data.code === 200) {
                            getComment(0, 0);
                        }
                    }
                });
            } else if (liked == 'true') {
                let url = 'http://localhost:3000/comment/like?id=' + ssId + '&cid=' + commentId + '&t=0&type=2';
                $.ajax({
                    url: url,
                    xhrFields: {withCredentials: true},
                    success: function (data) {
                        if (data.code === 200) {
                            getComment(0, 0);
                        }
                    }
                });
            }
        }
    });
})(jQuery, window, document);