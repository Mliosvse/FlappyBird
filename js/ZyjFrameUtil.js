/**
 * Created by 朱圆基 on 2017/5/10.
 */
(function () {
    window.FrameUtil=Class.extend({
        init:function () {
            this.sFrame=0;
            this.sTime=new Date();
            this.currentFrame=0;
            this.realFps=0;
        },
        render:function () {
            this.currentFrame+=1;
            var currentTime=new Date();
            if(currentTime-this.sTime>=1000){
                this.realFps=this.currentFrame-this.sFrame;
                this.sFrame=this.currentFrame;
                this.sTime=currentTime;
            }
        }
    });
})();