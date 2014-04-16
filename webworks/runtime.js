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
 
/*global window, assert2, cr, blackberry */
"use strict";

assert2(cr, "cr namespace not created");
assert2(cr.plugins_, "cr.plugins_ not created");

cr.plugins_.webworks = function (runtime) {
	this.runtime = runtime;
};

(function () {
	var pluginProto = cr.plugins_.webworks.prototype;

	pluginProto.Type = function (plugin) {
		this.plugin = plugin;
		this.runtime = plugin.runtime;
	};

	var typeProto = pluginProto.Type.prototype;

	typeProto.onCreate = function () {
	};

	pluginProto.Instance = function (type) {
		this.type = type;
		this.runtime = type.runtime;
	};

	var instanceProto = pluginProto.Instance.prototype;

	instanceProto.onCreate = function () {
		this.isBlackBerryAvailable		= false;
		this.existingPurchaseCount		= 0;
		this.existingPurchaseIndex		= 0;
		this.digitalGoodPrice			= "";
		this.digitalGoodInitialPeriod	= "";
		this.digitalGoodRenewalPrice	= "";
		this.digitalGoodRenewalPeriod	= "";
		this.purchaseDate				= "";
		this.purchaseDigitalGoodID		= "";
		this.purchaseDigitalGoodSKU		= "";
		this.purchaseLicenseKey			= "";
		this.purchaseMetaData			= "";
		this.purchaseID					= "";
		this.purchaseTransactionID		= "";
		this.paymentText				= "";
		this.paymentErrorID				= 0;
		this.paymentErrorText			= "";
	};

	instanceProto.onDestroy = function () {
	};

	instanceProto.saveToJSON = function () {
		return {};
	};

	instanceProto.loadFromJSON = function (o) {
	};

	instanceProto.draw = function (ctx) {
	};

	instanceProto.drawGL = function (glw) {
	};

	// The comments around these functions ensure they are removed when exporting, since the
	// debugger code is no longer relevant after publishing.
	/**BEGIN-PREVIEWONLY**/
	instanceProto.getDebuggerValues = function (propsections) {
		propsections.push({
			"title": "My debugger section",
			"properties": []
		});
	};

	instanceProto.onDebugValueEdited = function (header, name, value) {
	};
	/**END-PREVIEWONLY**/

	function Cnds() {
	}

	Cnds.prototype.onCancelSubscription			= function () { return true; };
	Cnds.prototype.onGetExistingPurchases		= function () { return true; };
	Cnds.prototype.onGetPrice					= function () { return true; };
	Cnds.prototype.onPurchase					= function () { return true; };
	Cnds.prototype.onPaymentError				= function () { return true; };
	Cnds.prototype.onUnexpectedApplicationError	= function () { return true; };
	Cnds.prototype.onUserCancelled				= function () { return true; };
	Cnds.prototype.onPaymentSystemBusy			= function () { return true; };
	Cnds.prototype.onGeneralPaymentSystemError	= function () { return true; };
	Cnds.prototype.onDigitalGoodNotFound		= function () { return true; };
	Cnds.prototype.onDeviceReady				= function () { return true; };
	Cnds.prototype.onCacheReset					= function () { return true; };

	pluginProto.cnds = new Cnds();

	function Acts() {
	}

	/* Cancel Subscription */
	Acts.prototype.cancelSubscription = function (purchaseID) {
		var _this = this;

		try {
			if (_this.isBlackBerryAvailable === true) {
				blackberry.payment.developmentMode = (this.properties[0] === 2) ? true : false;

				blackberry.payment.cancelSubscription(
					purchaseID,
					function onSuccess(data) {
						if (data.subscriptionCancelled === false) {
							_this.paymentErrorID = -1;
							_this.paymentErrorText = "Subscription Cancellation Failed";
							_this.runtime.trigger(cr.plugins_.webworks.prototype.cnds.onPaymentError, _this);
							_this.runtime.trigger(cr.plugins_.webworks.prototype.cnds.onUnexpectedApplicationError, _this);
						} else {
							_this.paymentText = "Subscription cancellation succeeded.";
							_this.runtime.trigger(cr.plugins_.webworks.prototype.cnds.onCancelSubscription, _this);
						}
					},
					function onFailure(paymentError) {
						_this.paymentErrorID = paymentError.errorID;
						_this.paymentErrorText = paymentError.errorText;
						_this.runtime.trigger(cr.plugins_.webworks.prototype.cnds.onPaymentError, _this);

						if (_this.paymentErrorID === -1) {
							_this.runtime.trigger(cr.plugins_.webworks.prototype.cnds.onUnexpectedApplicationError, _this);
						} else if (_this.paymentErrorID === 1) {
							_this.runtime.trigger(cr.plugins_.webworks.prototype.cnds.onUserCancelled, _this);
						} else if (_this.paymentErrorID === 2) {
							_this.runtime.trigger(cr.plugins_.webworks.prototype.cnds.onPaymentSystemBusy, _this);
						} else if (_this.paymentErrorID === 3) {
							_this.runtime.trigger(cr.plugins_.webworks.prototype.cnds.onGeneralPaymentSystemError, _this);
						} else if (_this.paymentErrorID === 4) {
							_this.runtime.trigger(cr.plugins_.webworks.prototype.cnds.onDigitalGoodNotFound, _this);
						}
					}
				);
			} else {
				_this.paymentErrorID = -1;
				_this.paymentErrorText = "WebWorks APIs are not ready yet.";
				_this.runtime.trigger(cr.plugins_.webworks.prototype.cnds.onPaymentError, _this);
				_this.runtime.trigger(cr.plugins_.webworks.prototype.cnds.onUnexpectedApplicationError, _this);
			}
		} catch (err) {
			_this.paymentErrorID = -1;
			_this.paymentErrorText = err.toString();
			_this.runtime.trigger(cr.plugins_.webworks.prototype.cnds.onPaymentError, _this);
			_this.runtime.trigger(cr.plugins_.webworks.prototype.cnds.onUnexpectedApplicationError, _this);
		}
	};

	/* Get Existing Purchases */
	Acts.prototype.getExistingPurchases = function () {
		var _this = this;

		try {
			if (_this.isBlackBerryAvailable === true) {
				blackberry.payment.developmentMode = (this.properties[0] === 2) ? true : false;

				blackberry.payment.getExistingPurchases(
					(this.properties[0] === 0) ? true : false,
					function onSuccess(data) {
						var n, m;

						if (data.length === 0) {
							_this.existingPurchaseCount = 0;
							_this.existingPurchaseIndex = 0;
							_this.paymentErrorID = 4;
							_this.paymentErrorText = "No Existing Purchases";
							_this.runtime.trigger(cr.plugins_.webworks.prototype.cnds.onPaymentError, _this);
							_this.runtime.trigger(cr.plugins_.webworks.prototype.cnds.onDigitalGoodNotFound, _this);
						} else {
							_this.existingPurchaseCount = data.length;
							for (n = 0, m = _this.existingPurchaseCount; n < m; n = n + 1) {
								_this.existingPurchaseIndex = (n + 1);
								_this.purchaseDate = data[n].date;
								_this.purchaseDigitalGoodID = data[n].digitalGoodID;
								_this.purchaseDigitalGoodSKU = data[n].digitalGoodSKU;
								_this.purchaseLicenseKey = data[n].licenseKey;
								_this.purchaseMetaData = data[n].metaData;
								_this.purchaseID = data[n].purchaseID;
								_this.purchaseTransactionID = data[n].transactionID;
								_this.runtime.trigger(cr.plugins_.webworks.prototype.cnds.onGetExistingPurchases, _this);
							}
						}
					},
					function onFailure(paymentError) {
						_this.paymentErrorID = paymentError.errorID;
						_this.paymentErrorText = paymentError.errorText;
						_this.runtime.trigger(cr.plugins_.webworks.prototype.cnds.onPaymentError, _this);

						if (_this.paymentErrorID === -1) {
							_this.runtime.trigger(cr.plugins_.webworks.prototype.cnds.onUnexpectedApplicationError, _this);
						} else if (_this.paymentErrorID === 1) {
							_this.runtime.trigger(cr.plugins_.webworks.prototype.cnds.onUserCancelled, _this);
						} else if (_this.paymentErrorID === 2) {
							_this.runtime.trigger(cr.plugins_.webworks.prototype.cnds.onPaymentSystemBusy, _this);
						} else if (_this.paymentErrorID === 3) {
							_this.runtime.trigger(cr.plugins_.webworks.prototype.cnds.onGeneralPaymentSystemError, _this);
						} else if (_this.paymentErrorID === 4) {
							_this.runtime.trigger(cr.plugins_.webworks.prototype.cnds.onDigitalGoodNotFound, _this);
						}
					}
				);
			} else {
				_this.paymentErrorID = -1;
				_this.paymentErrorText = "WebWorks APIs are not ready yet.";
				_this.runtime.trigger(cr.plugins_.webworks.prototype.cnds.onPaymentError, _this);
				_this.runtime.trigger(cr.plugins_.webworks.prototype.cnds.onUnexpectedApplicationError, _this);
			}
		} catch (err) {
			_this.paymentErrorID = -1;
			_this.paymentErrorText = err.toString();
			_this.runtime.trigger(cr.plugins_.webworks.prototype.cnds.onPaymentError, _this);
			_this.runtime.trigger(cr.plugins_.webworks.prototype.cnds.onUnexpectedApplicationError, _this);
		}
	};

	/* Get Price */
	Acts.prototype.getPrice = function (id, sku) {
		var _this = this;

		try {
			if (_this.isBlackBerryAvailable === true) {
				blackberry.payment.developmentMode = (this.properties[0] === 2) ? true : false;

				blackberry.payment.getPrice(
					{
						"id": id,
						"sku": sku
					},
					function onSuccess(purchase) {
						_this.digitalGoodPrice = purchase.price;
						_this.digitalGoodInitialPeriod = purchase.initialPeriod;
						_this.digitalGoodRenewalPrice = purchase.renewalPrice;
						_this.digitalGoodRenewalPeriod = purchase.renewalPeriod;
						_this.runtime.trigger(cr.plugins_.webworks.prototype.cnds.onGetPrice, _this);
					},
					function onFailure(paymentError) {
						_this.paymentErrorID = paymentError.errorID;
						_this.paymentErrorText = paymentError.errorText;
						_this.runtime.trigger(cr.plugins_.webworks.prototype.cnds.onPaymentError, _this);

						if (_this.paymentErrorID === -1) {
							_this.runtime.trigger(cr.plugins_.webworks.prototype.cnds.onUnexpectedApplicationError, _this);
						} else if (_this.paymentErrorID === 1) {
							_this.runtime.trigger(cr.plugins_.webworks.prototype.cnds.onUserCancelled, _this);
						} else if (_this.paymentErrorID === 2) {
							_this.runtime.trigger(cr.plugins_.webworks.prototype.cnds.onPaymentSystemBusy, _this);
						} else if (_this.paymentErrorID === 3) {
							_this.runtime.trigger(cr.plugins_.webworks.prototype.cnds.onGeneralPaymentSystemError, _this);
						} else if (_this.paymentErrorID === 4) {
							_this.runtime.trigger(cr.plugins_.webworks.prototype.cnds.onDigitalGoodNotFound, _this);
						}
					}
				);
			} else {
				_this.paymentErrorID = -1;
				_this.paymentErrorText = "WebWorks APIs are not ready yet.";
				_this.runtime.trigger(cr.plugins_.webworks.prototype.cnds.onPaymentError, _this);
				_this.runtime.trigger(cr.plugins_.webworks.prototype.cnds.onUnexpectedApplicationError, _this);
			}
		} catch (err) {
			_this.paymentErrorID = -1;
			_this.paymentErrorText = err.toString();
			_this.runtime.trigger(cr.plugins_.webworks.prototype.cnds.onPaymentError, _this);
			_this.runtime.trigger(cr.plugins_.webworks.prototype.cnds.onUnexpectedApplicationError, _this);
		}
	};

	/* Purchase */
	Acts.prototype.purchase = function (id, sku) {
		var _this = this;

		try {
			if (_this.isBlackBerryAvailable === true) {
				blackberry.payment.developmentMode = (this.properties[0] === 2) ? true : false;

				blackberry.payment.purchase(
					{
						"digitalGoodID": id,
						"digitalGoodSKU": sku
					},
					function onSuccess(purchase) {
						_this.purchaseDate = purchase.date;
						_this.purchaseDigitalGoodID = purchase.digitalGoodID;
						_this.purchaseDigitalGoodSKU = purchase.digitalGoodSKU;
						_this.purchaseLicenseKey = purchase.licenseKey;
						_this.purchaseMetaData = purchase.metaData;
						_this.purchaseID = purchase.purchaseID;
						_this.purchaseTransactionID = purchase.transactionID;
						_this.runtime.trigger(cr.plugins_.webworks.prototype.cnds.onPurchase, _this);
					},
					function onFailure(paymentError) {
						_this.paymentErrorID = paymentError.errorID;
						_this.paymentErrorText = paymentError.errorText;
						_this.runtime.trigger(cr.plugins_.webworks.prototype.cnds.onPaymentError, _this);

						if (_this.paymentErrorID === -1) {
							_this.runtime.trigger(cr.plugins_.webworks.prototype.cnds.onUnexpectedApplicationError, _this);
						} else if (_this.paymentErrorID === 1) {
							_this.runtime.trigger(cr.plugins_.webworks.prototype.cnds.onUserCancelled, _this);
						} else if (_this.paymentErrorID === 2) {
							_this.runtime.trigger(cr.plugins_.webworks.prototype.cnds.onPaymentSystemBusy, _this);
						} else if (_this.paymentErrorID === 3) {
							_this.runtime.trigger(cr.plugins_.webworks.prototype.cnds.onGeneralPaymentSystemError, _this);
						} else if (_this.paymentErrorID === 4) {
							_this.runtime.trigger(cr.plugins_.webworks.prototype.cnds.onDigitalGoodNotFound, _this);
						}
					}
				);
			} else {
				_this.paymentErrorID = -1;
				_this.paymentErrorText = "WebWorks APIs are not ready yet.";
				_this.runtime.trigger(cr.plugins_.webworks.prototype.cnds.onPaymentError, _this);
				_this.runtime.trigger(cr.plugins_.webworks.prototype.cnds.onUnexpectedApplicationError, _this);
			}
		} catch (err) {
			_this.paymentErrorID = -1;
			_this.paymentErrorText = err.toString();
			_this.runtime.trigger(cr.plugins_.webworks.prototype.cnds.onPaymentError, _this);
			_this.runtime.trigger(cr.plugins_.webworks.prototype.cnds.onUnexpectedApplicationError, _this);
		}
	};

	/* Wait For Device Ready */
	Acts.prototype.waitForDeviceReady = function () {
		var _this = this;

		window.document.addEventListener('deviceready', function ondeviceready() {
			window.document.removeEventListener('deviceready', ondeviceready, false);
			_this.isBlackBerryAvailable = true;
			_this.runtime.trigger(cr.plugins_.webworks.prototype.cnds.onDeviceReady, _this);
		}, false);
	};

	/* Reset Cache */
	Acts.prototype.resetCache = function () {
		var _this = this;

		try {
			if (_this.isBlackBerryAvailable === true) {
				if (this.properties[0] === 1) {
					blackberry.payment.getExistingPurchases(
						true,
						function onSuccess(data) {
							_this.runtime.trigger(cr.plugins_.webworks.prototype.cnds.onCacheReset, _this);
						},
						function onFailure(paymentError) {
							_this.runtime.trigger(cr.plugins_.webworks.prototype.cnds.onCacheReset, _this);
						}
					);
				} else {
					_this.paymentErrorID = -1;
					_this.paymentErrorText = "Reset Cache can only be used in SANDBOX mode.";
					_this.runtime.trigger(cr.plugins_.webworks.prototype.cnds.onPaymentError, _this);
					_this.runtime.trigger(cr.plugins_.webworks.prototype.cnds.onUnexpectedApplicationError, _this);
				}
			} else {
				_this.paymentErrorID = -1;
				_this.paymentErrorText = "WebWorks APIs are not ready yet.";
				_this.runtime.trigger(cr.plugins_.webworks.prototype.cnds.onPaymentError, _this);
				_this.runtime.trigger(cr.plugins_.webworks.prototype.cnds.onUnexpectedApplicationError, _this);
			}
		} catch (err) {
			_this.paymentErrorID = -1;
			_this.paymentErrorText = err.toString();
			_this.runtime.trigger(cr.plugins_.webworks.prototype.cnds.onPaymentError, _this);
			_this.runtime.trigger(cr.plugins_.webworks.prototype.cnds.onUnexpectedApplicationError, _this);
		}
	};

	pluginProto.acts = new Acts();

	function Exps() {
	}

	Exps.prototype.ExistingPurchaseCount	= function (ret) { ret.set_string(this.existingPurchaseCount);		};
	Exps.prototype.ExistingPurchaseIndex	= function (ret) { ret.set_string(this.existingPurchaseIndex);		};
	Exps.prototype.DigitalGoodPrice			= function (ret) { ret.set_string(this.digitalGoodPrice);			};
	Exps.prototype.DigitalGoodInitialPeriod = function (ret) { ret.set_string(this.digitalGoodInitialPeriod);	};
	Exps.prototype.DigitalGoodRenewalPrice	= function (ret) { ret.set_string(this.digitalGoodRenewalPrice);	};
	Exps.prototype.DigitalGoodRenewalPeriod	= function (ret) { ret.set_string(this.digitalGoodRenewalPeriod);	};
	Exps.prototype.PurchaseDate				= function (ret) { ret.set_string(this.purchaseDate);				};
	Exps.prototype.PurchaseDigitalGoodID	= function (ret) { ret.set_string(this.purchaseDigitalGoodID);		};
	Exps.prototype.PurchaseDigitalGoodSKU	= function (ret) { ret.set_string(this.purchaseDigitalGoodSKU);		};
	Exps.prototype.PurchaseLicenseKey		= function (ret) { ret.set_string(this.purchaseLicenseKey);			};
	Exps.prototype.PurchaseMetaData			= function (ret) { ret.set_string(this.purchaseMetaData);			};
	Exps.prototype.PurchaseID				= function (ret) { ret.set_string(this.purchaseID);					};
	Exps.prototype.PurchaseTransactionID	= function (ret) { ret.set_string(this.purchaseTransactionID);		};
	Exps.prototype.PaymentText				= function (ret) { ret.set_string(this.paymentText);				};
	Exps.prototype.PaymentErrorID			= function (ret) { ret.set_string(this.paymentErrorID);				};
	Exps.prototype.PaymentErrorText			= function (ret) { ret.set_string(this.paymentErrorText);			};
	Exps.prototype.IsBlackBerryAvailable	= function (ret) { ret.set_string(this.isBlackBerryAvailable);		};

	pluginProto.exps = new Exps();
}());
