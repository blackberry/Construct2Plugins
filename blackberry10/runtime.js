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
 
/*global assert2, cr, blackberry */

assert2(cr, 'cr namespace not created');
assert2(cr.plugins_, 'cr.plugins_ not created');

/////////////////////////////////////
// Plugin class
cr.plugins_.blackberry10 = function (runtime) {
	this.runtime = runtime;
};

(function () {
	/////////////////////////////////////
	// ECMAScript 5 strict mode
	'use strict';
	var pluginProto, typeProto, instanceProto;

	/////////////////////////////////////
	// Plugin prototype
	pluginProto = cr.plugins_.blackberry10.prototype;

	/////////////////////////////////////
	// Object type class
	pluginProto.Type = function (plugin) {
		this.plugin = plugin;
		this.runtime = plugin.runtime;
	};

	typeProto = pluginProto.Type.prototype;

	typeProto.onCreate = function () {
	};

	/////////////////////////////////////
	// Instance class
	pluginProto.Instance = function (type) {
		this.type = type;
		this.runtime = type.runtime;
	};

	instanceProto = pluginProto.Instance.prototype;

	instanceProto.onCreate = function () {
		this.bbmError = '';
		this.existingPurchases = [];
		this.paymentError = '';
		this.purchasePrice = '';
	};

	instanceProto.onDestroy = function () {};
	instanceProto.saveToJSON = function () { return {}; };
	instanceProto.loadFromJSON = function (o) {};
	instanceProto.draw = function (ctx) {};
	instanceProto.drawGL = function (glw) {};

	//////////////////////////////////////
	// Conditions
	function Cnds() {}

	/* Callbacks. */
	Cnds.prototype.onBlackBerryReady = function () { return true; };
	Cnds.prototype.onRegisterSuccess = function () { return true; };
	Cnds.prototype.onSetPersonalMessageSuccess = function () { return true; };
	Cnds.prototype.onSetPersonalMessageFailure = function () { return true; };
	Cnds.prototype.onGetPurchasesSuccess = function () { return true; };
	Cnds.prototype.onGetPurchasesFailure = function () { return true; };
	Cnds.prototype.onPurchaseSuccess = function () { return true; };
	Cnds.prototype.onPurchaseFailure = function () { return true; };
	Cnds.prototype.onGetPriceSuccess = function () { return true; };
	Cnds.prototype.onGetPriceFailure = function () { return true; };

	/* Custom API. */
	Cnds.prototype.checkPurchaseExists = function (sku) {
		return (JSON.stringify(this.existingPurchases).indexOf(sku) !== -1);
	};

	pluginProto.cnds = new Cnds();

	//////////////////////////////////////
	// Actions
	function Acts() {}

	/* Action: registerBBM. */
	Acts.prototype.registerBBM = function () {
		var _this = this;

		if (typeof blackberry !== 'undefined') {
			window.webkitRequestAnimationFrame(function () {
				document.addEventListener('onaccesschanged', function (accessible, status) {
					if (status === 'unregistered') {
						/* http://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid-in-javascript */
						var foo = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
							var r, v;

							r = Math.random() * 16 | 0;
							v = c === 'x' ? r : (r & 0x3 | 0x8);

							return v.toString(16);
						});
						blackberry.bbm.platform.register({ uuid: foo });
					} else if (accessible === true) {
						_this.runtime.trigger(cr.plugins_.blackberry10.prototype.cnds.onRegisterSuccess, _this);
					} else if (accessible === false) {
						_this.bbmError = 'BlackBerry Messenger Access Denied (' + status + ')';
						_this.runtime.trigger(cr.plugins_.blackberry10.prototype.cnds.onRegisterFailure, _this);
					}
				}, false);
			});
		} else {
			alert('blackberry is undefined.');
		}
	};

	/* Action: inviteToDownload. */
	Acts.prototype.inviteToDownload = function () {
		if (typeof blackberry !== 'undefined') {
			window.webkitRequestAnimationFrame(function () {
				blackberry.bbm.platform.users.inviteToDownload();
			});
		}
	};

	/* Action: setPersonalMessage. */
	Acts.prototype.setPersonalMessage = function (message) {
		var _this = this;

		if (typeof blackberry !== 'undefined') {
			window.webkitRequestAnimationFrame(function () {
				blackberry.bbm.platform.self.setPersonalMessage(message, function onComplete(accepted) {
					if (accepted === true) {
						_this.runtime.trigger(cr.plugins_.blackberry10.prototype.cnds.onSetPersonalMessageSuccess, _this);
					} else {
						_this.runtime.trigger(cr.plugins_.blackberry10.prototype.cnds.onSetPersonalMessageFailure, _this);
					}
				});
			});
		}
	};

	/* Action: purchase */
	Acts.prototype.purchase = function (digitalGoodSKU) {
		var _this = this;

		if (typeof blackberry !== 'undefined') {
			window.webkitRequestAnimationFrame(function () {
				blackberry.payment.purchase(
					{
						'digitalGoodSKU': digitalGoodSKU
					},
					function onSuccess(data) {
						_this.existingPurchases.push(data);
						_this.runtime.trigger(cr.plugins_.blackberry10.prototype.cnds.onPurchaseSuccess, _this);
					},
					function onFailure(error) {
						_this.paymentError = error.errorText + ' (' + error.errorID + ')';
						_this.runtime.trigger(cr.plugins_.blackberry10.prototype.cnds.onPurchaseFailure, _this);
					}
				);
			});
		}
	};

	/* Action: getExistingPurchases */
	Acts.prototype.getExistingPurchases = function () {
		var _this = this;

		if (typeof blackberry !== 'undefined') {
			window.webkitRequestAnimationFrame(function () {
				blackberry.payment.getExistingPurchases(
					true,
					function onSuccess(data) {
						_this.existingPurchases = data;
						_this.runtime.trigger(cr.plugins_.blackberry10.prototype.cnds.onGetPurchasesSuccess, _this);
					},
					function onFailure(error) {
						_this.paymentError = error.errorText + ' (' + error.errorID + ')';
						_this.runtime.trigger(cr.plugins_.blackberry10.prototype.cnds.onGetPurchasesFailure, _this);
					}
				);
			});
		}
	};

	/* Action: getPrice */
	Acts.prototype.getPrice = function (digitalGoodSKU) {
		var _this = this;

		if (typeof blackberry !== 'undefined') {
			window.webkitRequestAnimationFrame(function () {
				blackberry.payment.getPrice(
					{
						'sku': digitalGoodSKU
					},
					function onSuccess(data) {
						_this.purchasePrice = data.price;
						_this.runtime.trigger(cr.plugins_.blackberry10.prototype.cnds.onGetPriceSuccess, _this);
					},
					function onFailure(error) {
						_this.paymentError = error.errorText + ' (' + error.errorID + ')';
						_this.runtime.trigger(cr.plugins_.blackberry10.prototype.cnds.onGetPriceFailure, _this);
					}
				);
			});
		}
	};

	pluginProto.acts = new Acts();

	//////////////////////////////////////
	// Expressions
	function Exps() {}

	/* BBMError */
	Exps.prototype.BBMError = function (ret) {
		ret.set_string(this.bbmError);
	};

	/* ExistingPurchases*/
	Exps.prototype.ExistingPurchases = function (ret) {
		ret.set_string(JSON.stringify(this.existingPurchases));
	};

	/* PaymentError */
	Exps.prototype.PaymentError = function (ret) {
		ret.set_string(this.paymentError);
	};

	/* PurchasePrice */
	Exps.prototype.PurchasePrice = function (ret) {
		ret.set_string(this.purchasePrice);
	};

	pluginProto.exps = new Exps();
}());