// ==========================================================================
// Project:   TagNav - adminMediaPage
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals TagNav */

// This page describes the administrator user interface
TagNav.adminMediaPage = SC.Page.design({

  mainPane: SC.MainPane.design({
    childViews: 'backgroundView topBar mainContent'.w(),
	defaultResponder: TagNav,

	backgroundView: SC.View.design({
		backgroundColor: 'black'
	}),
	
	topBar: SC.ToolbarView.design({
	  layout: { top: 0, left: 0, right: 0, height: 50 },
	  anchorLocation: SC.ANCHOR_TOP,
	  childViews: 'labelView'.w(),
	
	    labelView: SC.LabelView.design({
			layout: { left: 0, height: 30 },
			value: 'PhotoBook Admin'
		})
    }),
	
	/*
    mainContent: SC.ContainerView.design({
		layout: { left: 0, right: 0, top: 100, bottom: 30 },
		nowShowingBinding: 'TagNav.navigatorController.mainContentNowShowing'
    }),
    */
    mainContent: SC.View.design({
	  layout: { left: 0, right: 0, top: 80, bottom: 30 },
	  childViews: 'mediaGrid editorView'.w(),

	    mediaGrid: SC.ScrollView.design({
		    layout: { left: 0, right: 300, top: 0, bottom: 0 },
		    hasHorizontalScroller: YES,
	        hasVerticalScroller: YES,
		    borderStyle: SC.BORDER_NONE,
		
			contentView: SC.GridView.design({
			  backgroundColor: 'black',
			  contentBinding: 'TagNav.adminMediaArrayController.arrangedObjects',
			  selectionBinding: 'TagNav.adminMediaArrayController.selection',
			  contentValueKey: 'title',
			  columnWidth: 200,
			  rowHeight: 200,
			  isEditable: NO,
			  contentExampleViewKey: 'createCoverExampleView'
		      //action: 'mediaSelected',
		      //target: 'TagNav.releventMediaController',
		      //actOnSelect: YES
		    })
		 }),
		
		editorView: SC.View.design({
			layout: { right: 0, width: 300, top: 0, bottom: 0 },
			backgroundColor: 'green',
			childViews: 'newButton typeLabel typeText  tagsLabel tagsText  saveButton deleteButton'.w(),
			
			newButton: SC.ButtonView.design({
			  layout: { top: 20, right: 20, left: 20, height: 36 },
			  title: "_addNewMedia".loc(),
              target: 'TagNav.adminMediaController',
              action: 'showAddNewDialog'
			}),
			
			typeLabel: SC.LabelView.design({
				layout: { top: 60, right: 0, width: 50, height: 18 },
				textAlign: SC.ALIGN_LEFT,
				value: 'סוג'
			}),
			
			typeText: SC.TextFieldView.design({
				layout: { top: 60, left: 5, height: 20, width: 240 },
				valueBinding: 'TagNav.adminMediaController._id',
				isEditable: NO
			}),
			
			tagsLabel: SC.LabelView.design({
				layout: { top: 90, right: 0, width: 50, height: 18 },
				textAlign: SC.ALIGN_LEFT,
				value: 'תוויות'
			}),
			
			tagsText: SC.TextFieldView.design({
				layout: { top: 90, left: 5, height: 40, width: 240 },
				valueBinding: 'TagNav.adminMediaController.editableTags',
				isTextArea: YES,
				isEnabledBinding: 'TagNav.adminMediaController.hasMediaToEdit'
			}),
			
			saveButton: SC.ButtonView.design({
				layout: { top: 140, right: 5, width: 90, height: 26 },
				title: "_save".loc(),
				isDefault: YES,
				target: 'TagNav.adminMediaController',
				action: 'saveMedia',
				isEnabledBinding: 'TagNav.adminMediaController.isAbleToSave'
			}),
			
			deleteButton: SC.ButtonView.design({
				layout: { top: 140, left: 5, width: 90, height: 26 },
				title: "_deleteMedia".loc(),
				action: 'deleteMedia',
				target: 'TagNav.adminMediaController',
				i1sEnabledBinding: 'TagNav.adminMediaController.hasMediaToEdit'
			})
		})
	})
  }),

	addNewSheet: SC.SheetPane.design({
		layout: { width: 400, height: 106, centerX: 0 },
		contentView: SC.View.design({
			childViews: 'explainLabel urlText okButton cancelButton'.w(),
			
			explainLabel: SC.LabelView.design({
				layout: { top: 10, left: 10, right: 10, height: 26 },
				value: '_addMediaExplanation'.loc()
			}),
			
			urlText: SC.TextFieldView.design({
				layout: { top: 40, left: 10, right: 10, height: 18 },
				valueBinding: 'TagNav.adminMediaController.newMediaUrl'
			}),
			
			okButton: SC.ButtonView.design({
				layout: { top: 70, left: 10, width: 100, height: 26 },
				title: '_ok'.loc(),
				target: 'TagNav.adminMediaController',
				action: 'addNewMedia'
			}),

			cancelButton: SC.ButtonView.design({
				layout: { top: 70, right: 10, width: 100, height: 26 },
				title: '_cancel'.loc(),
				target: 'TagNav.adminMediaController',
				action: 'cancelNewMedia'
			})
		})
	})

});