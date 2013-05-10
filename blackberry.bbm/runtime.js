/*
- Copyright (c) 2013 Research In Motion Limited.
-
- Licensed under the Apache License, Version 2.0 (the "License");
- you may not use this file except in compliance with the License.
- You may obtain a copy of the License at
-
- http://www.apache.org/licenses/LICENSE-2.0
-
- Unless required by applicable law or agreed to in writing, software
- distributed under the License is distributed on an "AS IS" BASIS,
- WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
- See the License for the specific language governing permissions and
- limitations under the License.
*/

/*global assert2, cr */

var blackberry = (typeof blackberry === 'object') ? blackberry : null;

assert2(cr, 'cr namespace not created');
assert2(cr.plugins_, 'cr.plugins_ not created');

/////////////////////////////////////
// Plugin class
cr.plugins_.bbm = function (runtime) {
	this.runtime = runtime;
};

(function () {
	/////////////////////////////////////
	// ECMAScript 5 strict mode
	'use strict';
	var pluginProto, typeProto, instanceProto;

	/////////////////////////////////////
	// Plugin prototype
	pluginProto = cr.plugins_.bbm.prototype;

	/////////////////////////////////////
	// Object type class
	pluginProto.Type = function (plugin) {
		this.plugin = plugin;
		this.runtime = plugin.runtime;
	};

	typeProto = pluginProto.Type.prototype;

	function registerBBM() {
		blackberry.event.addEventListener('onaccesschanged', function (accessible, status) {
			if (status === 'unregistered') {
				/* http://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid-in-javascript */
				var foo = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
					var r = Math.random() * 16 | 0,
						v = c === 'x' ? r : (r & 0x3 | 0x8);
					return v.toString(16);
				});

				blackberry.bbm.platform.register({
					uuid: foo
				});
			} else {
				blackberry.bbm.registered = accessible;
			}
		}, false);
	}

	typeProto.onCreate = function () {
		/* Configure any WebWorks APIs that will be used to avoid failure. */
		blackberry = (blackberry !== null) ? blackberry : {
			event: {
				addEventListener: function (event, success) {
					alert(event + ' listener added.');
					success(false, 'unregistered');
				}
			},
			bbm: {
				registered: false,
				platform: {
					register: function (params) {
						alert('bbm is now registered.');
						blackberry.bbm.registered = true;
					},
					users: {
						inviteToDownload: function () {
							alert('inviteToDownload invoked.');
						}
					},
					self: {
						setPersonalMessage: function (message) {
							alert('setPersonalMessage: ' + message);
						}
					}
				}
			}
		};
	};

	/////////////////////////////////////
	// Instance class
	pluginProto.Instance = function (type) {
		this.type = type;
		this.runtime = type.runtime;
	};

	instanceProto = pluginProto.Instance.prototype;

	instanceProto.onCreate = function () {
		/* Wait for webworkready. */
		document.addEventListener('webworksready', function () {
			registerBBM();
		}, false);
	};
	instanceProto.onDestroy = function () {};
	instanceProto.saveToJSON = function () { return {}; };
	instanceProto.loadFromJSON = function (o) {};
	instanceProto.draw = function (ctx) {};
	instanceProto.drawGL = function (glw) {};

	//////////////////////////////////////
	// Conditions
	function Cnds() {}

	pluginProto.cnds = new Cnds();

	//////////////////////////////////////
	// Actions
	function Acts() {}

	/* Action: inviteToDownload. */
	Acts.prototype.inviteToDownload = function () {
		if (blackberry.bbm.registered === true) {
			blackberry.bbm.platform.users.inviteToDownload();
		} else {
			alert("bbm was not yet registered.");
			registerBBM();
		}
	};

	/* Action: setPersonalMessage. */
	Acts.prototype.setPersonalMessage = function (message) {
		if (blackberry.bbm.registered === true) {
			blackberry.bbm.platform.self.setPersonalMessage(message);
		} else {
			alert("bbm was not yet registered.");
			registerBBM();
		}
	};

	pluginProto.acts = new Acts();

	//////////////////////////////////////
	// Expressions
	function Exps() {}

	pluginProto.exps = new Exps();
}());
