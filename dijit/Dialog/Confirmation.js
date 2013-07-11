dojo.provide('strick.dojo.dijit.Dialog.Confirmation');
dojo.require('dijit.Dialog');
dojo.require('dijit.form.Button');

dojo.declare('strick.dojo.dijit.Dialog.Confirmation', [dijit._Widget, dijit._Templated],
{  		
	templateString: dojo.cache('dijit.Dialog', 'Confirmation.html'),	
	popup:null,
	widgetsInTemplate: true,
	title: 'Confirm',
	message: 'Are you sure?',
	confirmLabel: 'OK',
	cancelLabel: 'Cancel',
	hideConfirm: false,
	confirmCallback: function(){
		
	},

	postMixInProperties: function() 
    {	    	 
    	this.popup = new dijit.Dialog({
    		title: this.title,
    		parseOnLoad:false
    	});
		this.inherited(arguments);		
    },
	
	show: function()
	{		
		this.popup.set("content", this.domNode);
		this.popup.show();
	},
	
	hide: function()
	{		
		this.popup.destroyRecursive();
	},
	
	postCreate: function() 
	{		
		var obj = this;
		
		if(this.hideConfirm){
			require(["dojo/dom-style"], function(domStyle){				  
				  domStyle.set(obj.confirmButton.domNode, 'display', 'none');
			});
		}
		else {
			this.confirmButton.onClick = function() {
				obj.hide();			
				obj.confirmCallback();
			};
		}
		
		this.cancelButton.onClick=function(){			
			obj.hide();
		};		
	}
});
