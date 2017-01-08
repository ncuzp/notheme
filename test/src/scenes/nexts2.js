(function(bm){

var nexts2 = bm.scenes.nexts2 = Hilo.Class.create({
    Extends: Hilo.Container,
    Mixes: Hilo.EventMixin,

    enterEase: Hilo.Ease.Linear.EaseNone,
    outEase: Hilo.Ease.Linear.EaseNone,
    constructor: function(bg){
        this.bmp = this.toBitmap(bg);
        nexts2.superclass.constructor.call(this, {
            children: [this.bmp]
        });

        this.alpha = 0.2;
        this.scaleX = 1.2;
        this.scaleY = 1.2;
        this.x = -100;
        this.y = -100;
        this.width = this.bmp.width;
        this.height = this.bmp.height;
    },

    toBitmap: function(img){
        var content = img.content;
        return new Hilo.Bitmap({
            id: img.id,
            image: content,
            width: content.width,
            height: content.height,
            rect: [0, 0, content.width, content.height]
        });
    },

    start: function(){
        var self = this;

        bm.tween.to(self, {
            x: 0,
            y: 0,
            alpha: 1
        }, {
            duration: 3000,
            delay: 100,
            ease: self.enterEase,
            onComplete: function(){
                self.back();
            }
        });
    },

    back: function(){
        var self = this;

        bm.tween.to(self, {
            scaleX: 1,
            scaleY: 1
        }, {
            duration: 2500,
            ease: self.enterEase,
            onComplete: function(){
                self.hide();
            }
        });
    },

    hide: function(){
        var self = this;

        bm.tween.to(self, {
            alpha: 0
        }, {
            duration: 4500,
            ease: self.outEase,
            onStart: function(){
                bm.loadNext('s3');
            },
            onComplete: function(){
                bm.stage.removeChild(self);
            }
        });
    }
});

})(window.BM);