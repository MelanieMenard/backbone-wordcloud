/**********************************************************************************/
/*  Behaviours are methods shared between views to keep code DRY
/*  removeTemplateWrapperBehavior: prevent backbone from wrapping the template inside an extra div when inserting a view
/**********************************************************************************/

var RemoveTemplateWrapperBehavior = Backbone.Marionette.Behavior.extend({
 
  onRender: function() {
  
    // only remove the wrapper if the template has one inbuilt (i.e. a single top child element)
    // do not remove if the template comtains several top level elements
    if (this.view.el.childElementCount === 1) {

      this.view.$el = this.view.$el.children();
      // Unwrap the element to prevent infinitely nesting elements during re-render.
      this.view.$el.unwrap();
      // ? Vanilla JS equivalent
      //this.el.outerHTML = this.el.innerHTML;
      this.view.setElement(this.view.$el);
    }
  }
});