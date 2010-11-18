// ==========================================================================
// Project:   TagNav.MediaListItemView
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals TagNav */

/** @class

  Represent a single PicasaWeb album cover in a grid.

  @extends SC.View
*/
TagNav.PicasaAlbumCoverListItemView = SC.View.extend(
/** @scope TagNav.MediaListItemView.prototype */ {

  classNames: ['picasa-album-cover'],

  albumInfo: null,

  createChildViews: function(){ 
    var childViews = []; 
    var content = this.get('content'); 
    if(SC.none(content)) return; 

	var albumUser = content.get('user');
	var albumID = content.get('album');
	var albumInfo = TagNav.picasaAlbumMgr.getAlbum(albumUser, albumID, content.get('title'));
    this.albumInfo = albumInfo;

    var backThumbnailView = this.createChildView( 
      SC.ImageView.extend({ 
        layout: {top: 0, centerX: 0, width: 200, height: 200},
        valueBinding: SC.binding('.thumbnailUrl', albumInfo)
      }) 
    ); 
    childViews.push(backThumbnailView);

    var photoView = this.createChildView( 
      SC.ImageView.extend({ 
        layout: {top: 0, centerX: 0, width: 200, height: 200},
        valueBinding: SC.binding('.activeThumbnailUrl', albumInfo)
      }) 
    ); 
    childViews.push(photoView);

    var titleView = this.createChildView( 
      SC.LabelView.extend({ 
        layout: { bottom: 0, centerX: 0, width: 200, height: 35 }, 
        content: albumInfo, 
        valueBinding: SC.binding('.title', albumInfo),
		textAlign: SC.ALIGN_CENTER
      }) 
    ); 

    if (-1 == titleView.classNames.indexOf('media-title')) {
	  titleView.classNames.push('media-title');
    }
    childViews.push(titleView); 

    var picasaLogoView = this.createChildView(
	  SC.ImageView.extend({
	    layout: { top: 5, right: 10, width: 26, height: 26 },
	    value: static_url('picasa.gif')	
	  })
	);
	childViews.push(picasaLogoView);
	
    this.set('childViews', childViews); 
  },

  mouseEntered: function(evt) {
  },

  mouseExited: function(evt) {
	var albumInfo = this.albumInfo;
	if (albumInfo == null) return;
	if (albumInfo.photos == null) return;
	albumInfo.set('activeThumbnailIndex', (-1));
  },

  mouseMoved: function(evt) {
	var albumInfo = this.albumInfo;
	if (albumInfo == null) return;
	if (albumInfo.photos == null) return;

	var l = this.get('layer');
	if (l == null) return;
	var left = l.offsetLeft;
	var width = l.offsetWidth;
	var mouseX = evt.clientX;
	var photoCount = albumInfo.photos.length;
	
	var photoSliceWidth = width / photoCount;
	var photoIndex = ((mouseX - left) / photoSliceWidth);
	photoIndex = Math.round(photoIndex);
	
	//console.log(['move', evt, photoIndex]);
	albumInfo.set('activeThumbnailIndex', photoIndex);
  }
});
