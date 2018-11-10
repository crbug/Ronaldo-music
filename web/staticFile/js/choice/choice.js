﻿(function ($, window, document) {
    let timestamp = Date.parse(new Date()); //获取时间戳
    function lazyLoad() { //懒加载
        setTimeout(function () {
            $('img').lazyload({
                threshold: 200, effect: "fadeIn", failure_limit: 20, skip_invisible: false
            });
        }, 500);
    }

    /*歌单*/
    $.ajax({
        url: 'http://127.0.0.1:3000/personalized?limit=10' + '&timestamp=' + timestamp,
        xhrFields: {withCredentials: true},
        success: function (data) {
            $('#songsheet_top').empty();
            $("#song_sheet").tmpl(data.result).appendTo('#songsheet_top');
            lazyLoad();
        }
    });

    /*乐人*/
    $.ajax({
        url: 'http://127.0.0.1:3000/top/artists?offset=2&limit=5' + '&timestamp=' + timestamp,
        xhrFields: {withCredentials: true},
        success: function (data) {
            $('#singer_top').empty();
            $("#singer").tmpl(data.artists).appendTo('#singer_top');
            lazyLoad();
        }
    });

    /*音乐排行榜*/
    $.ajax({
        url: 'http://127.0.0.1:3000/top/list?idx=0' + '&timestamp=' + timestamp,
        xhrFields: {withCredentials: true},
        success: function (data) {
            $("#ranking").tmpl(data.playlist.tracks).appendTo('#pop_song');
        }
    });
    $.ajax({
        url: 'http://127.0.0.1:3000/top/list?idx=1' + '&timestamp=' + timestamp,
        xhrFields: {withCredentials: true},
        success: function (data) {
            $("#ranking").tmpl(data.playlist.tracks).appendTo('#hot_song');
        }
    });
    $.ajax({
        url: 'http://127.0.0.1:3000/top/list?idx=3' + '&timestamp=' + timestamp,
        xhrFields: {withCredentials: true},
        success: function (data) {
            $("#ranking").tmpl(data.playlist.tracks).appendTo('#new_song');
        }
    });
    $.ajax({
        url: 'http://127.0.0.1:3000/top/list?idx=6' + '&timestamp=' + timestamp,
        xhrFields: {withCredentials: true},
        success: function (data) {
            $("#ranking").tmpl(data.playlist.tracks).appendTo('#eur_song');
        }
    });

    /*mv*/
    $.ajax({
        url: 'http://127.0.0.1:3000/top/mv?limit=8' + '&timestamp=' + timestamp,
        xhrFields: {withCredentials: true},
        success: function (data) {
            $("#mv").tmpl(data.data).appendTo('#mv_top');
            lazyLoad();
        }
    });

    /*轮播*/
    new zturn({
        id: "zturn",
        opacity: 0.9,
        width: 382,
        Awidth: 1024,
        scale: 0.9
    });
    $('#zturn li').click(function () {
        if ($(this).css('opacity') == 1 && $(this).attr('data_n') == 1) {
            window.location.href = 'album_info.jsp?abId=' + 73876805 + '&siId=' + 189873;
        }
    });
    /*---------------------------- DOM加载完后的点击事件 ----------------------------*/
    $(document).on('click', '#songsheet_top li >div', function () {
        window.location.href = 'songsheet_info.jsp?slistId=' + $(this).find('h1').text().trim();
    });
    $(document).on('click', "#singer_top li >div", function () {
        window.location.href = 'singer_info.jsp?siId=' + $(this).find('h1').text() + '&siName=' + $(this).find('h2').text();
    });
    $(document).on('click', '#mv_top li >div', function () {
        window.location.href = 'play-mv.jsp?plId=' + $(this).find('h1').text() + '&siId=' + $(this).find('h2 span:eq(0)').text().trim();
    });
})(jQuery, window, document);
