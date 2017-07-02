/**
 * Created by 朱圆基 on 2017/5/10.
 */
(function () {
    window.Game=Class.extend({
        init:function (option) {
            option=option||{};
            var self=this;
            this.fps=option.fps||50;
            this.frameUtil=new FrameUtil();
            this.canvas=document.getElementById(option.canvasId);
            this.context=this.canvas.getContext('2d');
            this.staticSource=new StaticSource();
            this.imagesData={};
            this.staticSource.loadImage('r.json',function (imgdata,imglengh,loadimg) {
                if(imglengh==loadimg){
                    self.imagesData=imgdata;
                    self.run();
                }
            });
            this.isRun=true;
        },
        run:function(){
            var self=this;
            this.timer=setInterval(function () {
                self.runLoop();
            },1000/this.fps);

            this.diban=new Background({
               image:this.imagesData['diban'],
                width:48,
                height:48,
                y:this.canvas.height-48,
                speed:4
            });

            this.shu=new Background({
                image:this.imagesData['shu'],
                width:300,
                height:216,
                y:this.canvas.height-48-216,
                speed:3
            });

            this.fangzi=new Background({
                image:this.imagesData['fangzi'],
                width:300,
                height:256,
                y:this.canvas.height-256-100,
                speed:2
            });

            this.pipeArr=[new Pipe()];
            this.bird=new Bird();
        },
        runLoop:function () {
            this.context.clearRect(0,0,this.canvas.width,this.canvas.height);
            this.frameUtil.render();
            this.context.fillText('FTP/'+this.frameUtil.realFps,15,15);
            this.context.fillText('FNO/'+this.frameUtil.currentFrame,15,30);

            this.fangzi.render();
            this.fangzi.update();

            this.shu.render();
            this.shu.update();

            this.diban.render();
            this.diban.update();

            if(this.isRun==true&&this.frameUtil.currentFrame%100==0){
                this.pipeArr.push(new Pipe());
            }
            for (var i = 0; i < this.pipeArr.length; i++) {
                this.pipeArr[i].update();
            }
            for (var i = 0; i < this.pipeArr.length; i++) {
                this.pipeArr[i].render();
            }
            this.bird.update();
            this.bird.render();
        },
        pause:function () {
            clearInterval(this.timer);
        },
        gameOver:function () {
            this.fangzi.pause();
            this.shu.pause();
            this.diban.pause();
            for (var i = 0; i < this.pipeArr.length; i++) {
                this.pipeArr[i].pause();
            }
            this.isRun=false;
            this.bird.die=true;
        }
    })
})();