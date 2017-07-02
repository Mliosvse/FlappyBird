/**
 * Created by 朱圆基 on 2017/5/11.
 */
(function () {
    window.Bird=Class.extend({
       init:function () {
           this.height=60;
           this.width=85;
           this.x=(game.canvas.width-this.width)*0.5;
           this.y=200;
           this.wing=0;
           this.dy=0;
           this.rotateAngle=0;
           this.dropFrame=game.frameUtil.currentFrame;
           this.state=1;
           this.bindClick();
           this.bindKeydown();
           this.deleteY=1;
           this.die=false;
           this.dieAnimationIndex=0;
       },
        render:function () {
           if(this.die==true){
               var bloodWidth=1625/5,bloodHeight=828/6;
               var cols=this.dieAnimationIndex%5;
               var rows=parseInt(this.dieAnimationIndex/5);
               game.context.drawImage(game.imagesData['blood'],cols*bloodWidth,rows*bloodHeight,bloodWidth,bloodHeight,this.x-120,this.y,bloodWidth,bloodHeight);
               var gameoverX=(game.canvas.width-626)*0.5;
               var gameoverY=(game.canvas.height-144)*0.5;
               game.context.drawImage(game.imagesData['gameover'],gameoverX,gameoverY);
               return;
           }
            game.context.save();
            game.context.translate(this.x, this.y);
            game.context.rotate(this.rotateAngle * Math.PI / 180);
            game.context.drawImage(game.imagesData['bird'], this.width * this.wing, 0, this.width, this.height, 0, 0, this.width, this.height);
            game.context.restore();
        },
        update:function () {
           if(this.die==true){
               this.dieAnimationIndex++;
               if(this.dieAnimationIndex==30){
                   game.pause();
               }
               return;
           }

           if(this.state==1){
               this.dy=0.001*0.5*9.8*Math.pow(game.frameUtil.currentFrame-this.dropFrame,2);
           }else if(this.state==0){
               this.dy=-10+this.deleteY;
               this.deleteY++;
               if(this.dy>0){
                   this.state=1;
                   this.dropFrame=game.frameUtil.currentFrame;
               }
           }
           this.y+=this.dy;
           if(this.y<0){
               this.y=0;
           }

           if(this.y>game.canvas.height-this.height-48){
               game.gameOver();
           }
           if(game.frameUtil.currentFrame%5==0){
               this.wing+=1;
           }
           if(this.wing==3){
               this.wing=0;
           }
           this.rotateAngle++;
        },
        bindClick:function () {
           var self=this;
            game.canvas.addEventListener('mousedown',function () {
                self.state=0;
                self.rotateAngle=-25;
                self.deleteY=1;
            })
        },
        bindKeydown:function () {
            var self=this;
            window.onkeydown=function (e) {
                if(e.keyCode==38){
                    self.state=0;
                    self.rotateAngle=-25;
                    self.deleteY=1;
                }
                if(e.keyCode==37){
                    self.x-=40;
                }
                if(e.keyCode==39){
                   self.x+=40;
                }
            }
        }
    });
})();