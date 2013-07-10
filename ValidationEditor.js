dojo.provide("custom.dijit.ValidationEditor");
dojo.require("dijit.Editor");
dojo.require("dijit.form.ValidationTextBox");

dojo.declare(
    "custom.dijit.ValidationEditor",
    [dijit.Editor],
    {
        invalidMessage: "This field is required",
        regExp: "(.|\\s)*",

        onFocus: function() {
          var obj = this;
            if (!this.isValid()) {
                this.displayMessage(this.invalidMessage);
                require(["dojo/dom-class"], function(domClass){            		
            		domClass.add(obj.domNode.id, "dijitErrorFocused");            		
            	}); 
                dijit.showTooltip(message, obj.domNode.id, obj.tooltipPosition);
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
        	if(this.value === '') return false;
        	
        	
        	return true;
        },
        
        onBlur: function()
        {
        	var obj = this;
        	require(["dojo/dom-class"], function(domClass){
        		if(!obj.isValid())
        			domClass.add(obj.domNode.id, "dijitError");
        		else {
        			domClass.remove(obj.domNode.id, "dijitError");
        			domClass.remove(obj.domNode.id, "dijitErrorFocused");
        		}
        	}); 
        	
        	dijit.hideTooltip(this.domNode.id);         
        }
     }
);
