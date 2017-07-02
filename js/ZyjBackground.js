/**
 * Created by 朱圆基 on 2017/5/10.
 */
(function () {
    window.Background=Class.extend({
        init:function (option) {
            option=option||{};
            this.x=0;
            this.y=option.y||0;
            this.image=option.image;
            this.width=option.width||0;
            this.height=option.height||0;
            this.count=parseInt(game.canvas.width/this.width)+1;
            this.speed=option.speed||1;
        },
        render:function () {
            for (var i = 0; i < 2*this.count; i++) {
                game.context.drawImage(this.image,this.x+i*this.width,this.y,this.width,this.height);
            }
        },
        update:function () {
            this.x-=this.speed;
            if(this.x<-this.count * this.width){
                this.x=0;
            }
        },
        pause:function () {
            this.speed=0;
        }
    });
})();