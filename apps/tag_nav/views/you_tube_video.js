// ==========================================================================
// Project:   TagNav.YouTubeVideoView
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals TagNav */

/** @class

  (Document Your View Here)

  @extends SC.View
*/
TagNav.YouTubeVideoView = SC.View.extend(SC.Control, {
/** @scope SC.WebView.prototype */
  classNames: 'youtube-video-view',
  displayProperties: ['value', 'shouldAutoResize'],

  /**
  The content of the iframe can be bigger than the size specifed when creating
  the view. If you want the view to be auto-resized to the dimensions of the 
  iframe, then set the value of this property to YES.
  The web view can be auto resized only if the contents are from the same
  domain as the parent domain.
  @property{Boolean}
  */
  shouldAutoResize: NO,

  render: function(context, firstTime) {
    var src = this.get('value');
    if (firstTime) {
      context.push('<iframe src="' + src + 
      '" class="youtube-player" type="text/html" frameborder="0" style="position: absolute; width: 100%; height: 100%; border: 0px; margin: 0px; padding: 0px;"></iframe>');
    } else {
      var iframe = this.$('iframe');
      // clear out the previous src, to force a reload
      iframe.attr('src', 'javascript:;');
      iframe.attr('src', src);
    }
  },

  /**
  Called when the layer gets created. 
  */
  didCreateLayer: function() {
    var f = this.$('iframe');
    // Attach an onload event to the iframe.
    SC.Event.add(f, 'load', this, this.iframeDidLoad);
  },


  /** 
  Called when iframe onload event is fired.
  1. Resizes the view to fit the contents of the iframe using the 
  scroll width and scroll height of the contents of the iframe
  
  The iframe contents can be accessed only when the src is from the same
  domain as the parent document
  @returns {void}
  */
  iframeDidLoad: function() {
    //fit the iframe to size of the contents.
    if (this.get('shouldAutoResize') === YES){
      var contentWindow;
      var iframeElt = this.$('iframe')[0];
      if(iframeElt && iframeElt.contentWindow){
        contentWindow = iframeElt.contentWindow;
        if(contentWindow && contentWindow.document && contentWindow.document.documentElement){
          var docElement = contentWindow.document.documentElement;
          // setting the width before the height gives more accurate results.. 
          // atleast for the test iframe content i'm using.
          //TODO: try out document flows other than top to bottom.
          if (!SC.browser.isIE){
            this.$().width(docElement.scrollWidth);
            this.$().height(docElement.scrollHeight);          
          } else {
            this.$().width(docElement.scrollWidth + 12);
            this.$().height(docElement.scrollHeight + 5);          
          }
        }
      }
    }
  }
});
