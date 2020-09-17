/**
 * Created by forfa on 2018/3/19.
 */

$(document).ready(function (e) {

    var fet=$('.f-feature');
    fet.after('<select id="mySelect"><option id="op1" value="1">自营</option><option id="op2" value="2">全部</option></select>');
    $('#mySelect').css('color','red');

    var islist=(window.location.href.search('list.jd.com')==-1?false:true);
    var mdiv=(islist?document.getElementById('J_goodsList'):document.getElementById('J_goodsList'));
    var warp=mdiv.querySelector('ul');
    var mlist=warp.querySelectorAll('li');

    console.log(mlist.length);
    var i=0;

    chrome.storage.local.get('JDself', function(ob) {
        if(ob){
            console.log(ob['JDself']);
            if(ob['JDself']) {
                window.setInterval(tt,400);
            }
            ob['JDself']?$('#op1').attr('selected','selected'):$('#op2').attr('selected','selected');

        }
    });

    $('#mySelect').on('change',function (e) {
        var value=$('#mySelect').val();
        if(value=='2'){
            $(mlist).css('display','list-item');
            chrome.storage.local.set({JDself: false}, function() {
                console.log('Value is set to: false' );
            });
        }
        else {
            for(i=0;i<mlist.length;i++){
                var tag=mlist[i].querySelector('.J-picon-tips');
                if(!tag||tag.innerHTML!=='自营')
                    $(mlist[i]).css('display','none');
            }
            chrome.storage.local.set({JDself: true}, function() {
                console.log('Value is set to: true' );
            });
        }
        location.reload();

    });
});

function tt() {
    mdiv=document.getElementById('J_goodsList');
    var warp=mdiv.querySelector('ul');
    var mlist=warp.querySelectorAll('li');
    console.log(mlist.length);
    var i=0;
    for(;i<mlist.length;i++){
        var tag=mlist[i].querySelector('.J-picon-tips');
        if(!tag||tag.innerHTML!=='自营')
            $(mlist[i]).css('display','none');
    }
    var scroll=$("#J_scroll_loading");
    scroll=$(warp).parent().parent().children('#J_scroll_loading');
    if(scroll&&scroll.length){
        var po=$(scroll[0]).offset();
        window.scrollTo(0, 10+po.top);
    }
}
