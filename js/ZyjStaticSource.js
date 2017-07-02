/**
 * Created by 朱圆基 on 2017/5/10.
 */
(function () {
    window.StaticSource=Class.extend({
        init:function (option) {
            this.allImages={};
        },
        loadImage:function (jsonUrl,callBack) {
            var self=this;
            var xmlHttp=new XMLHttpRequest();
            xmlHttp.open('get',jsonUrl);
            xmlHttp.send();
            xmlHttp.onreadystatechange=function () {
                if(this.readyState==4&&this.status==200){
                    var loadImageCount=0;
                    var resText=xmlHttp.responseText;
                    var imgDataArr=JSON.parse(resText).images;
                    for (var i = 0; i < imgDataArr.length; i++) {
                        var img=new Image();
                        img.index=i;
                        img.src=imgDataArr[i].src;
                        img.onload=function () {
                            loadImageCount++;
                            self.allImages[imgDataArr[this.index].name]=this;
                            callBack(self.allImages,imgDataArr.length,loadImageCount);
                        }
                    }
                }
            }
        }
    });
})();