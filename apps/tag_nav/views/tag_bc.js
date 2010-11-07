// ==========================================================================
// Project:   TagNav.TagBc
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals TagNav */

/** @class

  (Document Your View Here)

  @extends SC.View
*/
TagNav.TagBc = SC.View.extend(SC.Control,
/** @scope TagNav.TagBc.prototype */ {

  tagName: 'div',
  classNames: ['tagbc-view'],
//  contentDisplayProperties: ['tags'],

  tags: [],
  tagsToAdd: [],

  _tags: null,

  init: function() {
	sc_super();
	
	this._tagnav_tagbd_tagsDidReplace();
	this._tagnav_tagbd_tagsToAddDidReplace();
  },

  /**
  called when the entier tags collection reassign.
  */
  _tagnav_tagbd_tagsDidReplace: function() {
	var currTags = this._tags;
	if (currTags) currTags.removeObserver('[]', this, this._tagnav_tagbc_tagsDidChange);

	var tags = this.get('tags');
	tags.addObserver('[]', this, this._tagnav_tagbc_tagsDidChange);
	
	this.updateLayer();
  }.observes('tags'),

  /**
  called when the content of the tags property has changed.
  */
  _tagnav_tagbc_tagsDidChange: function() {
    this.updateLayer();
  },

  /**
  called when the entier tagsToAdd collection reassign.
  */
  _tagnav_tagbd_tagsToAddDidReplace: function() {
	var currTags = this._tagsToAdd;
	if (currTags) currTags.removeObserver('[]', this, this._tagnav_tagbd_tagsToAddDidChange);

	var tagsToAdd = this.get('tagsToAdd');
	tagsToAdd.addObserver('[]', this, this._tagnav_tagbc_tagsToAddDidChange);
	
	this.updateTagsToAdd();
  }.observes('tags'),

  /**
  called when the content of the tagsToAdd property has changed.
  */
  _tagnav_tagbc_tagsToAddDidChange: function() {
    this.updateTagsToAdd();
  },

  updateTagsToAdd: function() {
	var addTag = this.$('#addtag');

    // TODO: add tagsToAdd to the select field.
  },

  render: function(context, firstTime) {
	var c = context;
	var tags = this.get('tags');
	
//	if (firstTime) {
		c.push('<div id="tagscope">');
		c.push('  <ul id="tagscopenav">');
		c.push('    <li class="scope">');
		c.push('      <a href="/tag" class="currscope" id="currscope">Tags</a>');
		c.push('    </li>');
//		c.push('	<li class="tags">');
//		c.push('       <ul>');
		tags.forEach(function(tag, idx) {
		  var liClass = idx == 0 ? 'tag first' : 'tag';
		  c.push('<li class="%@"><a class="onlytag" href="/tag/">%@</a>'.fmt(liClass, tag));
	      c.push('  <a class="removetag" href="?removetag=blogs"><span>[x]</span></a></li>');
		});
//		c.push('<li class="tag first"><a class="onlytag" href="/tag/blogs">blogs</a>');
//        c.push('  <a class="removetag" href="?removetag=blogs"><span>[x]</span></a></li>');
//		c.push('       </ul>');
//		c.push('    </li>');
		c.push('    <li class="box">');
//		c.push('        <form>');
		c.push('            <input type="hidden" name="tagtype" id="addtagType" value="tag">');
//		c.push('            <input type="text" size="25" name="addtag" id="addtag" autocomplete="off" value="Type another tag">');
		c.push('            <select name="addtag" id="addtag">');
		c.push('            <option></option>');
		c.push('            <option>tag1</option>');
		c.push('            <option>tag2</option>');
		c.push('            <option>tag3</option>');
		c.push('            <option>tag4</option>');
		c.push('            </select>');
		c.push('            <input type="submit" name="addtagSubmit" value="" id="addtagSubmit">');
//		c.push('        </form>');
		c.push('    </li>');
		c.push('  </ul>');
		c.push('</div>');
//	}

    return sc_super();
  },

  didCreateLayer: function() {
	var input = this.$('addtag');
    SC.Event.add(input, 'focus', this, this._input_DidKeyDown);
	SC.Event.add(input, 'onchange', this, this._input_DidChange);
    sc_super();
  },

  willDestroyLayer: function() {
	var input = this.$('addtag');
	SC.Event.remove(input, 'keydown',  this, this._input_DidKeyDown);
//	SC.Event.remove(input, 'onchange', this, this._input_DidChange);
    sc_super();
  },

  _input_DidKeyDown: function(evt) {
	console.log(['keydown_out', evt]);
    SC.run(function() {
      console.log(['keydown_in', evt]);
    }, this);
  },

  _input_DidChange: function(evt) {
	console.log('selected!');
	return YES;
  },
/*
<div id="tagscope">
  <ul id="tagscopenav">
    <li class="scope">
                        <a href="/tag" class="currscope" id="currscope">Tags</a>
                </li>

	<li class="tags">
                <ul>
                   <li class="tag first"><a class="onlytag" href="/tag/blogs">blogs</a>
                     <a class="removetag" href="?removetag=blogs"><span>[x]</span></a></li>
                   <li class="tag"><a class="onlytag" href="/tag/programming">programming</a>
                     <a class="removetag" href="?removetag=programming"><span>[x]</span></a></li>
                   <li class="tag"><a class="onlytag" href="/tag/android">android</a>
                     <a class="removetag" href="?removetag=android"><span>[x]</span></a></li>
                </ul>
            </li>
        <li class="box">
        <form id="magicboxform" name="magicboxform" action="/tag/blogs+programming+android">
            <input type="hidden" name="tagtype" id="addtagType" value="tag">
            <input type="text" size="25" name="addtag" id="addtag" autocomplete="off" value="Type another tag">
            <input type="submit" name="addtagSubmit" value="" id="addtagSubmit">
        </form>
    </li>
  </ul>
</div>
*/
});
