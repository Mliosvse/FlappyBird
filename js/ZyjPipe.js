/**
 * Created by 朱圆基 on 2017/5/10.
 */
(function () {
    window.Pipe=Class.extend({
        init:function () {
            this.dir=_.random(0,1);
            this.height=_.random(100,game.canvas.height*0.5);
            this.width=148;
            this.x=game.canvas.width;
            this.y=this.dir==0?0:(game.canvas.height-this.height-48);
            this.speed=4;
        },
        render:function () {
            if(this.dir==0){
                game.context.drawImage(game.imagesData['pipe1'],0,1664-this.height,this.width,this.height,this.x,this.y,this.width,this.height);
            }else if(this.dir==1){
                game.context.drawImage(game.imagesData['pipe0'],0,0,this.width,this.height,this.x,this.y,this.width,this.height);
            }
        },
        update:function () {
            this.x-=this.speed;
            if(this.x<-this.width){
                game.pipeArr=_.without(game.pipeArr,this);
            }

            if(game.bird.x+game.bird.width>this.x&&game.bird.x<this.x+this.width){
                if(this.dir==0&&this.height>game.bird.y){
                    game.gameOver();
                }else if(this.dir==1&&game.bird.y>this.y-game.bird.height){
                    game.gameOver();
                }
            }
        },
        pause:function () {
            this.speed=0;
        }
    });
})();
