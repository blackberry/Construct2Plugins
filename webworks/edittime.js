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
 
function GetPluginSettings() {
	return {
		"name":			"WebWorks",				// as appears in 'insert object' dialog, can be changed as long as "id" stays the same
		"id":			"webworks",					// this is used to identify this plugin and is saved to the project; never change it
		"version":		"1.0",					// (float in x.y format) Plugin version - C2 shows compatibility warnings based on this
		"description":	"Access to WebWorks 2.0 APIs.",
		"author":		"Erik Oros, BlackBerry",
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
};

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
// AddNumberParam("Number", "Enter a number to test if positive.");
// AddCondition(0, cf_none, "Is number positive", "My category", "{0} is positive", "Description for my condition!", "MyCondition");

	/* Payment Callbacks */
	AddCondition( 0, cf_trigger, "On Cancel Subscription",    "WebWorks 2.0: In-App Payment Callbacks", "Success: Cancel Subscription",    "Called on successful Cancel Subscription.",    "onCancelSubscription");
	AddCondition( 1, cf_trigger, "On Check App Subscription", "WebWorks 2.0: In-App Payment Callbacks", "Success: Check App Subscription", "Called on successful Check App Subscription.", "onCheckAppSubscription");
	AddCondition( 2, cf_trigger, "On Check Existing",         "WebWorks 2.0: In-App Payment Callbacks", "Success: Check Existing",         "Called on successful Check Existing.",         "onCheckExisting");
	AddCondition( 3, cf_trigger, "On Get Existing Purchases", "WebWorks 2.0: In-App Payment Callbacks", "Success: Get Existing Purchases", "Called on successful Get Existing Purchases.", "onGetExistingPurchases");
	AddCondition( 4, cf_trigger, "On Get Price",              "WebWorks 2.0: In-App Payment Callbacks", "Success: Get Price",              "Called on successful Get Price.",              "onGetPrice");
	AddCondition( 5, cf_trigger, "On Purchase",               "WebWorks 2.0: In-App Payment Callbacks", "Success: Purchase",               "Called on successful Purchase.",               "onPurchase");

	/* Payment Errors */
	AddCondition( 6, cf_trigger, "On Any Payment Error",            "WebWorks 2.0: In-App Payment Errors", "PaymentError: Any",                          "Called on any payment error.", "onPaymentError");
	AddCondition( 7, cf_trigger, "On Unexpected Application Error", "WebWorks 2.0: In-App Payment Errors", "PaymentError: Unexpected Application Error", "Payment Error ID: -1",         "onUnexpectedApplicationError");
	AddCondition( 8, cf_trigger, "On User Cancelled",               "WebWorks 2.0: In-App Payment Errors", "PaymentError: User Cancelled",               "Payment Error ID: 1",          "onUserCancelled");
	AddCondition( 9, cf_trigger, "On Payment System Busy",          "WebWorks 2.0: In-App Payment Errors", "PaymentError: Payment System Busy",          "Payment Error ID: 2",          "onPaymentSystemBusy");
	AddCondition(10, cf_trigger, "On General Payment System Error", "WebWorks 2.0: In-App Payment Errors", "PaymentError: General Payment System Error", "Payment Error ID: 3",          "onGeneralPaymentSystemError");
	AddCondition(11, cf_trigger, "On Digital Good Not Found",       "WebWorks 2.0: In-App Payment Errors", "PaymentError: Digital Good Not Found",       "Payment Error ID: 4",          "onDigitalGoodNotFound");

	/* Initialization */
	AddCondition(12, cf_trigger, "On Device Ready", "WebWorks 2.0: Initialization", "On Device Ready", "Triggered when WebWorks APIs are ready to be used.", "onDeviceReady");

	/* Cache Reset */
	AddCondition(13, cf_trigger, "On Cache Reset", "WebWorks 2.0: Utility", "On Cache Reset", "Called on successful cache reset.", "onCacheReset");

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
// AddStringParam("Message", "Enter a string to alert.");
// AddAction(0, af_none, "Alert", "My category", "Alert {0}", "Description for my action!", "MyAction");

	/* cancelSubscription() */
	AddStringParam("Purchase ID", "The purchase ID when the subscription was purchased.");
	AddAction(1, af_none, "Cancel Subscription", "WebWorks 2.0: In-App Payments", "Cancel Subscription (Purchase ID: {0})", "Initiates a request to cancel a subscription for a digital good.", "cancelSubscription");

	/* checkAppSubscription() */
	AddAction(2, af_none, "Check App Subscription", "WebWorks 2.0: In-App Payments", "Check App Subscription", "Initiates a call to check whether the currently logged in BBID user has rights to the current app-level subscription. If the calling application is not a subscription app, this will return false.", "checkAppSubscription");

	/* checkExisting() */
	AddStringParam("ID", "One of ID or SKU needs to be specified, and if both are specified, the ID takes precedence and SKU will be ignored.");
	AddStringParam("SKU", "One of ID or SKU needs to be specified, and if both are specified, the ID takes precedence and SKU will be ignored.");
	AddAction(3, af_none, "Check Existing", "WebWorks 2.0: In-App Payments", "Check Existing (ID: {0}, SKU: {1})", "Initiates a call to check whether the currently logged in BBID user has rights to the provided digital good subscription at this time.", "checkExisting");

	/* getExistingPurchases() */
	AddAction(4, af_none, "Get Existing Purchases", "WebWorks 2.0: In-App Payments", "Get Existing Purchases", "Retrieves the previous successful purchases made by the user from within the calling application.", "getExistingPurchases");

	/* getPrice() */
	AddStringParam("ID", "One of ID or SKU needs to be specified, and if both are specified, the ID takes precedence and SKU will be ignored.");
	AddStringParam("SKU", "One of ID or SKU needs to be specified, and if both are specified, the ID takes precedence and SKU will be ignored.");
	AddAction(5, af_none, "Get Price", "WebWorks 2.0: In-App Payments", "Get Price (ID: {0}, SKU: {1})", "Initiates a request for the price of a digital good. The request can be initiated using either the ID or the SKU of the digital good to be purchased.", "getPrice");

	/* purchase() */
	AddStringParam("ID", "One of ID or SKU needs to be specified, and if both are specified, the ID takes precedence and SKU will be ignored.");
	AddStringParam("SKU", "One of ID or SKU needs to be specified, and if both are specified, the ID takes precedence and SKU will be ignored.");
	AddAction(6, af_none, "Purchase", "WebWorks 2.0: In-App Payments", "Purchase (ID: {0}, SKU: {1})", "Initiates the purchase of a digital good. Purchases can be initiated using either the ID or the SKU of the digital good to be purchased, but it is not necessary to provide both.", "purchase");

	/* Initialization */
	AddAction(7, af_none, "Wait For Device Ready", "WebWorks 2.0: Initialization", "Wait For Device Ready", "Triggers On Device Ready when WebWorks APIs can be used.", "waitForDeviceReady");

	/* resetCache */
	AddAction(8, af_none, "Reset Purchase Cache", "WebWorks 2.0: Utility", "Reset Purchase Cache", "Clears all cached purchases. To be used with SANDBOX testing mode.", "resetCache");

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
// AddExpression(0, ef_return_number, "Leet expression", "My category", "MyExpression", "Return the number 1337.");

	AddExpression( 0, ef_return_number, "ExistingPurchaseCount",    "WebWorks", "ExistingPurchaseCount",    "The number of existing purchases as returned by calling Get Existing Purchases.");
	AddExpression( 1, ef_return_number, "ExistingPurchaseIndex",    "WebWorks", "ExistingPurchaseIndex",    "The current item being processed by Get Existing Purchases.");
	AddExpression( 2, ef_return_string, "DigitalGoodPrice",         "WebWorks", "DigitalGoodPrice",         "The cost of the digital good.");
	AddExpression( 3, ef_return_string, "DigitalGoodInitialPeriod", "WebWorks", "DigitalGoodInitialPeriod", "The number of days in the subscriptions initial period. This will only be present if the digital good represents a subscription item.");
	AddExpression( 4, ef_return_string, "DigitalGoodRenewalPrice",  "WebWorks", "DigitalGoodRenewalPrice",  "The subscription renewal price. This will only be present if the digital good represents a subscription item.");
	AddExpression( 5, ef_return_string, "DigitalGoodRenewalPeriod", "WebWorks", "DigitalGoodRenewalPeriod", "The number of days in the subscription renewal period. This will only be present if the digital good represents a subscription item.");
	AddExpression( 6, ef_return_string, "PurchaseDate",             "WebWorks", "PurchaseDate",             "The Epoch time representation of the date this purchase was made.");
	AddExpression( 7, ef_return_string, "PurchaseDigitalGoodID",    "WebWorks", "PurchaseDigitalGoodID",    "The digital good ID for this purchase.");
	AddExpression( 8, ef_return_string, "PurchaseDigitalGoodSKU",   "WebWorks", "PurchaseDigitalGoodSKU",   "The digital Good SKU for this purchase.");
	AddExpression( 9, ef_return_string, "PurchaseLicenseKey",       "WebWorks", "PurchaseLicenseKey",       "Represents the license key for this purchase, or null if the purchased digital good does not have a license key.");
	AddExpression(10, ef_return_string, "PurchaseMetaData",         "WebWorks", "PurchaseMetaData",         "The metadata for this purchase, or null if no metadata was included with the purchase.");
	AddExpression(11, ef_return_string, "PurchaseID",               "WebWorks", "PurchaseID",               "The purchaseID for this purchase.");
	AddExpression(12, ef_return_string, "PurchaseTransactionID",    "WebWorks", "PurchaseTransactionID",    "The transaction ID for this purchase");
	AddExpression(13, ef_return_string, "PaymentText",              "WebWorks", "PaymentText",              "Additional information regarding successful callbacks.");
	AddExpression(14, ef_return_number, "PaymentErrorID",           "WebWorks", "PaymentErrorID",           "The reference number associated with the specific error in corresponding to the following values.");
	AddExpression(15, ef_return_string, "PaymentErrorText",         "WebWorks", "PaymentErrorText",         "The message for the particular error. In addition to descriptive text, error code may appear at the end of the message.");
	AddExpression(16, ef_return_string, "IsBlackBerryAvailable",    "WebWorks", "IsBlackBerryAvailable",    "Returns 'true' or 'false' to indicate whether the BlackBerry platform is available.");

////////////////////////////////////////
ACESDone();

////////////////////////////////////////
// Array of property grid properties for this plugin
// new cr.Property(ept_integer,		name,	initial_value,	description)		// an integer value
// new cr.Property(ept_float,		name,	initial_value,	description)		// a float value
// new cr.Property(ept_text,		name,	initial_value,	description)		// a string
// new cr.Property(ept_color,		name,	initial_value,	description)		// a color dropdown
// new cr.Property(ept_font,		name,	"Arial,-16", 	description)		// a font with the given face name and size
// new cr.Property(ept_combo,		name,	"Item 1",		description, "Item 1|Item 2|Item 3")	// a dropdown list (initial_value is string of initially selected item)
// new cr.Property(ept_link,		name,	link_text,		description, "firstonly")		// has no associated value; simply calls "OnPropertyChanged" on click

var property_list = [
	new cr.Property(ept_combo, "In-App Payment Mode", "Release", "The following values should be set under specific conditions. RELEASE: Resulting BAR file is being uploaded to the BlackBerry World storefront for public release. SANDBOX: Resulting BAR file is being uploaded to the BlackBerry World storefront as a DRAFT for sandbox testing. SIDELOAD: Resulting BAR file is being directly loaded onto a BlackBerry 10 device.", "Release|Sandbox|Sideload"),
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
}

// Class representing an individual instance of an object in the IDE
function IDEInstance(instance, type) {
	assert2(this instanceof arguments.callee, "Constructor called as a function");

	// Save the constructor parameters
	this.instance = instance;
	this.type = type;

	// Set the default property values from the property table
	this.properties = {};

	for (var i = 0; i < property_list.length; i++)
		this.properties[property_list[i].name] = property_list[i].initial_value;

	// Plugin-specific variables
	// this.myValue = 0...
}

// Called when inserted via Insert Object Dialog for the first time
IDEInstance.prototype.OnInserted = function () {
}

// Called when double clicked in layout
IDEInstance.prototype.OnDoubleClicked = function () {
}

// Called after a property has been changed in the properties bar
IDEInstance.prototype.OnPropertyChanged = function (property_name) {
}

// For rendered objects to load fonts or textures
IDEInstance.prototype.OnRendererInit = function (renderer) {
}

// Called to draw self in the editor if a layout object
IDEInstance.prototype.Draw = function (renderer) {
}

// For rendered objects to release fonts or textures
IDEInstance.prototype.OnRendererReleased = function (renderer) {
}
