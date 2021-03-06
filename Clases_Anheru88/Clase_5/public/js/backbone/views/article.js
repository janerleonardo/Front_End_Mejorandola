Puls3.Views.ArticleView = Backbone.View.extend({
	events:{
		"click > article" : "navigate",
		"click .likes_up"  : "upvote",
		"click .likes_down"  : "downvote"
	},
	className:"",
	initialize : function(model){
		var self = this;
		
		this.model = model;

		this.model.on('change', function(){
			self.render();
		});
		this.template = swig.compile($("#Article_tpl").html());

	},
	navigate: function(e){
		Backbone.history.navigate('article/' + this.model.get('id'), {trigger : true});
	},
	upvote: function(e) {
		e.stopPropagation();
		var votes = this.model.get("votes");
		this.model.set("votes", parseInt(votes, 10) + 1);
	},
	downvote: function(e) {
		e.stopPropagation();
		var votes = this.model.get("votes");
		this.model.set("votes", parseInt(votes, 10) - 1);
	},
	render: function(data) {
		var self = this;
		var locals ={
			post : this.model.toJSON()
		};

		this.$el.html( this.template(locals) );

		return this;
	}
});
