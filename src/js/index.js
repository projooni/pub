(function(){
    var index = {
        $el: {
            menu1 : $('#menu1'), 
            menu2 : $('#menu2'),
            menu3 : $('#menu3'),
            contentsArea: $('#contents-area')
        },
        init: function(){
            this.eventHandler();
        }, 
        eventHandler: function(){
            var that = this;
            that.$el.menu1.on('click', function(e){
                that.$el.contentsArea.load('../html/about.html');
            });

            that.$el.menu2.on('click', function(e){
                that.$el.contentsArea.load('../html/project-list.html');
            });

            that.$el.menu3.on('click', function(e){
                that.$el.contentsArea.load('../html/contact.html');
            });
            
        }
    };
    index.init();
})();