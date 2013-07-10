dojo.provide("custom.dijit.ValidationEditor");
dojo.require("dijit.Editor");
dojo.require("dijit.form.ValidationTextBox");

dojo.declare(
    "custom.dijit.ValidationEditor",
    [dijit.Editor],
    {
        invalidMessage: "This field is required",

        onFocus: function() {
            var obj = this;
            if (!this.isValid()) {
                this.displayMessage(this.invalidMessage);
                require(["dojo/dom-class"], function(domClass){            		
            		domClass.add(obj.domNode.id, "dijitErrorFocused");            		
            	});                 
            }
            else {            	
            	require(["dojo/dom-class"], function(domClass){            		
            		domClass.remove(obj.domNode.id, "dijitErrorFocused");
            		domClass.remove(obj.domNode.id, "dijitError");
            		dijit.hideTooltip(obj.domNode.id);
            	}); 
            }
            
        },

        displayMessage: function(/*String*/ message){
            // summary:
            //        Overridable method to display validation errors/hints.
            //        By default uses a tooltip.
            // tags:
            //        extension
            if(this._message == message){ return; }
            this._message = message;
            dijit.hideTooltip(this.domNode.id);
            if(message){
                dijit.showTooltip(message, this.domNode.id, this.tooltipPosition);
            }
        },
        
        isValid: function()
        {
        	var value = this.value;

        	if(dojo.string.trim(value.replace('<br />', '')) == ''){        		
        		return false;
        	}
        	
        	return true;
        },
        
        onBlur: function()
        {
        	var obj = this;
        	
        	if(!this.isValid()){
        		require(["dojo/dom-class"], function(domClass){
        			domClass.add(obj.domNode.id, "dijitError");        			
        		});
        	}
        	else {
        		require(["dojo/dom-class"], function(domClass){        			
        			domClass.remove(obj.domNode.id, "dijitError");
        			domClass.remove(obj.domNode.id, "dijitErrorFocused");        			
        		});
        	}     
        	
        	dijit.hideTooltip(this.domNode.id);         
        }
     }
);
