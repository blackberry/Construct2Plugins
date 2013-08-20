/*
 * Copyright (c) 2013 Research In Motion Limited.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
 
/*global AddCondition, AddAction, AddExpression, AddStringParam, pf_singleglobal, cf_none, af_none, ACESDone, IDEObjectType, IDEInstance, assert2 */

function GetPluginSettings() {
	return {
		"name":			"BlackBerry 10",		// as appears in 'insert object' dialog, can be changed as long as "id" stays the same
		"id":			"blackberry10",			// this is used to identify this plugin and is saved to the project; never change it
		"version":		"1.0",					// (float in x.y format) Plugin version - C2 shows compatibility warnings based on this
		"description":	"Access BlackBerry 10 specific features like BlackBerry Messenger and In-App Payments.",
		"author":		"Erik Oros",
		"help url":		"http://developer.blackberry.com/html5",
		"category":		"Platform specific",	// Prefer to re-use existing categories, but you can set anything here
		"type":			"object",				// either "world" (appears in layout and is drawn), else "object"
		"rotatable":	false,					// only used when "type" is "world".  Enables an angle property on the object.
		"flags":		0						// uncomment lines to enable flags...
						| pf_singleglobal		// exists project-wide, e.g. mouse, keyboard.  "type" must be "object".
					//	| pf_texture			// object has a single texture (e.g. tiled background)
					//	| pf_position_aces		// compare/set/get x, y...
					//	| pf_size_aces			// compare/set/get width, height...
					//	| pf_angle_aces			// compare/set/get angle (recommended that "rotatable" be set to true)
					//	| pf_appearance_aces	// compare/set/get visible, opacity...
					//	| pf_tiling				// adjusts image editor features to better suit tiled images (e.g. tiled background)
					//	| pf_animations			// enables the animations system.  See 'Sprite' for usage
					//	| pf_zorder_aces		// move to top, bottom, layer...
					//  | pf_nosize				// prevent resizing in the editor
					//	| pf_effects			// allow WebGL shader effects to be added
					//  | pf_predraw			// set for any plugin which draws and is not a sprite (i.e. does not simply draw
												// a single non-tiling image the size of the object) - required for effects to work properly
	};
}

////////////////////////////////////////
// Parameter types:
// AddNumberParam(label, description [, initial_string = "0"])			// a number
// AddStringParam(label, description [, initial_string = "\"\""])		// a string
// AddAnyTypeParam(label, description [, initial_string = "0"])			// accepts either a number or string
// AddCmpParam(label, description)										// combo with equal, not equal, less, etc.
// AddComboParamOption(text)											// (repeat before "AddComboParam" to add combo items)
// AddComboParam(label, description [, initial_selection = 0])			// a dropdown list parameter
// AddObjectParam(label, description)									// a button to click and pick an object type
// AddLayerParam(label, description)									// accepts either a layer number or name (string)
// AddLayoutParam(label, description)									// a dropdown list with all project layouts
// AddKeybParam(label, description)										// a button to click and press a key (returns a VK)
// AddAnimationParam(label, description)								// a string intended to specify an animation name
// AddAudioFileParam(label, description)								// a dropdown list with all imported project audio files

////////////////////////////////////////
// Conditions

// AddCondition(id,					// any positive integer to uniquely identify this condition
//				flags,				// (see docs) cf_none, cf_trigger, cf_fake_trigger, cf_static, cf_not_invertible,
//									// cf_deprecated, cf_incompatible_with_triggers, cf_looping
//				list_name,			// appears in event wizard list
//				category,			// category in event wizard list
//				display_str,		// as appears in event sheet - use {0}, {1} for parameters and also <b></b>, <i></i>
//				description,		// appears in event wizard dialog when selected
//				script_name);		// corresponding runtime function name

// example				
//AddNumberParam("Number", "Enter a number to test if positive.");
//AddCondition(0, cf_none, "Is number positive", "My category", "{0} is positive", "Description for my condition!", "MyCondition");

/* Callbacks: registerBBM */
AddCondition(13370, cf_trigger, "onRegisterSuccess", "Callbacks: BlackBerry Messenger", "onRegisterSuccess", "Executes associated actions after succeeding to register with BlackBerry Messenger.", "onRegisterSuccess");
AddCondition(13369, cf_trigger, "onRegisterFailure", "Callbacks: BlackBerry Messenger", "onRegisterFailure", "Executes associated actions after failing to register with BlackBerry Messenger.", "onRegisterFailure");

/* Callbacks: setPersonalMessage */
AddCondition(13371, cf_trigger, "onSetPersonalMessageSuccess", "Callbacks: BlackBerry Messenger", "onSetPersonalMessageSuccess", "Executes associated actions after succeeding to set personal BBM message.", "onSetPersonalMessageSuccess");
AddCondition(13372, cf_trigger, "onSetPersonalMessageFailure", "Callbacks: BlackBerry Messenger", "onSetPersonalMessageFailure", "Executes associated actions after failing to set personal BBM message.", "onSetPersonalMessageFailure");

/* Callbacks: purchase */
AddCondition(13373, cf_trigger, "onPurchaseSuccess", "Callbacks: In-App Payment", "onPurchaseSuccess", "Executes associated actions after succeeding to purchase a Digital Good.", "onPurchaseSuccess");
AddCondition(13374, cf_trigger, "onPurchaseFailure", "Callbacks: In-App Payment", "onPurchaseFailure", "Executes associated actions after failing to purchase a Digital Good.", "onPurchaseFailure");

/* Callbacks: getExistingPurchases */
AddCondition(13375, cf_trigger, "onGetPurchasesSuccess", "Callbacks: In-App Payment", "onGetPurchasesSuccess", "Executes associated actions after succeeding to retrieve purchases.", "onGetPurchasesSuccess");
AddCondition(13376, cf_trigger, "onGetPurchasesFailure", "Callbacks: In-App Payment", "onGetPurchasesFailure", "Executes associated actions after failing to retrieve purchases.", "onGetPurchasesFailure");

/* Custom API: checkPurchaseExists */
AddStringParam("Digital Good SKU", "Check if a purchases exists based on SKU.", "\"\"");
AddCondition(13377, cf_none, "Check if purchases exists", "In-App Payments", "Purchase exists (SKU: {0})", "Check if a purchases exists based on SKU.", "checkPurchaseExists");

/* Callbacks: getPrice */
AddCondition(13378, cf_trigger, "onGetPriceSuccess", "Callbacks: In-App Payment", "onGetPriceSuccess", "Executes associated actions after succeeding to retrieve the price of a Digital Good.", "onGetPriceSuccess");
AddCondition(13379, cf_trigger, "onGetPriceFailure", "Callbacks: In-App Payment", "onGetPriceFailure", "Executes associated actions after failing to retrieve the price of a Digital Good.", "onGetPriceFailure");

////////////////////////////////////////
// Actions

// AddAction(id,				// any positive integer to uniquely identify this action
//			 flags,				// (see docs) af_none, af_deprecated
//			 list_name,			// appears in event wizard list
//			 category,			// category in event wizard list
//			 display_str,		// as appears in event sheet - use {0}, {1} for parameters and also <b></b>, <i></i>
//			 description,		// appears in event wizard dialog when selected
//			 script_name);		// corresponding runtime function name

// example
//AddStringParam("Message", "Enter a string to alert.");
//AddAction(0, af_none, "Alert", "My category", "Alert {0}", "Description for my action!", "MyAction");

/* blackberry.bbm.platform.register */
AddAction(13370, af_none, "Register with BBM platform", "BlackBerry Messenger", "Register with BBM", "Register with BlackBerry Messenger platform; required before leveraging BlackBerry Messenger APIs.", "registerBBM");

/* blackberry.bbm.platform.users.inviteToDownload */
AddAction(13371, af_none, "Invite others to download this app", "BlackBerry Messenger", "Invite to download", "Invite BlackBerry Messenger contacts to download this application.", "inviteToDownload");

/* blackberry.bbm.platform.self.setPersonalMessage */
AddStringParam("Message", "Update the user's BlackBerry Messenger profile with a custom message.", "\"I'm playing an awesome Construct 2 game!\"");
AddAction(13372, af_none, "Update users's BBM profile", "BlackBerry Messenger", "Set personal message: {0}", "Update the user's BlackBerry Messenger profile.", "setPersonalMessage");

/* blackberry.payment.purchase */
AddStringParam("Digital Good SKU", "Purchase a Digital Good based on SKU.", "\"\"");
AddAction(13373, af_none, "Purchase Digital Good", "In-App Payments", "Purchase Digital Good (SKU: {0})", "Purchase a Digital Good based on SKU.", "purchase");

/* blackberry.payment.getExistingPurchases */
AddAction(13374, af_none, "Get existing purchases", "In-App Payments", "Get existing purchases", "Retrieves all purchases made by the user as a JSON object.", "getExistingPurchases");

/* blackberry.payment.getPrice */
AddStringParam("Digital Good SKU", "Get price of Digital Good based on SKU.", "\"\"");
AddAction(13375, af_none, "Get price of Digital Good", "In-App Payments", "Get price of Digital Good (SKU: {0})", "Get price of Digital Good based on SKU.", "getPrice");

////////////////////////////////////////
// Expressions

// AddExpression(id,			// any positive integer to uniquely identify this expression
//				 flags,			// (see docs) ef_none, ef_deprecated, ef_return_number, ef_return_string,
//								// ef_return_any, ef_variadic_parameters (one return flag must be specified)
//				 list_name,		// currently ignored, but set as if appeared in event wizard
//				 category,		// category in expressions panel
//				 exp_name,		// the expression name after the dot, e.g. "foo" for "myobject.foo" - also the runtime function name
//				 description);	// description in expressions panel

// example
//AddExpression(0, ef_return_number, "Leet expression", "My category", "MyExpression", "Return the number 1337.");
AddExpression(13369, ef_return_string, "BBM Error", "BlackBerry Messenger", "BBMError", "A string representing the BlackBerry Messenger registration error.");
AddExpression(13370, ef_return_string, "Existing Purchases", "In-App Payments", "ExistingPurchases", "A Stringified JSON Object representing our existing purchases.");
AddExpression(13371, ef_return_string, "Payment Error", "In-App Payments", "PaymentError", "A string representing our payment error message and code.");
AddExpression(13372, ef_return_string, "Purchase Price", "In-App Payments", "PurchasePrice", "A string representing the purchase price of a Digital Good.");

////////////////////////////////////////
ACESDone();

////////////////////////////////////////
// Array of property grid properties for this plugin
// new cr.Property(ept_integer,		name,	initial_value,	description)		// an integer value
// new cr.Property(ept_float,		name,	initial_value,	description)		// a float value
// new cr.Property(ept_text,		name,	initial_value,	description)		// a string
// new cr.Property(ept_color,		name,	initial_value,	description)		// a color dropdown
// new cr.Property(ept_font,		name,	"Arial,-16",	description)		// a font with the given face name and size
// new cr.Property(ept_combo,		name,	"Item 1",		description, "Item 1|Item 2|Item 3")	// a dropdown list (initial_value is string of initially selected item)
// new cr.Property(ept_link,		name,	link_text,		description, "firstonly")		// has no associated value; simply calls "OnPropertyChanged" on click

var property_list = [
	//new cr.Property(ept_integer, "My property", 77, "An example property.")
];

// Called by IDE when a new object type is to be created
function CreateIDEObjectType() {
	return new IDEObjectType();
}

// Class representing an object type in the IDE
function IDEObjectType() {
	assert2(this instanceof arguments.callee, "Constructor called as a function");
}

// Called by IDE when a new object instance of this type is to be created
IDEObjectType.prototype.CreateInstance = function (instance) {
	return new IDEInstance(instance);
};

// Class representing an individual instance of an object in the IDE
function IDEInstance(instance, type) {
	var i;

	assert2(this instanceof arguments.callee, "Constructor called as a function");

	// Save the constructor parameters
	this.instance = instance;
	this.type = type;

	// Set the default property values from the property table
	this.properties = {};

	for (i = 0; i < property_list.length; i++) {
		this.properties[property_list[i].name] = property_list[i].initial_value;
	}

	// Plugin-specific variables
	// this.myValue = 0...
}

// Called when inserted via Insert Object Dialog for the first time
IDEInstance.prototype.OnInserted = function () {
};

// Called when double clicked in layout
IDEInstance.prototype.OnDoubleClicked = function () {
};

// Called after a property has been changed in the properties bar
IDEInstance.prototype.OnPropertyChanged = function (property_name) {
};

// For rendered objects to load fonts or textures
IDEInstance.prototype.OnRendererInit = function (renderer) {
};

// Called to draw self in the editor if a layout object
IDEInstance.prototype.Draw = function (renderer) {
};

// For rendered objects to release fonts or textures
IDEInstance.prototype.OnRendererReleased = function (renderer) {
};