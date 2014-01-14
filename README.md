Construct2Plugins
=================

## Requirements

* BlackBerry WebWorks SDK 2.0+
* BlackBerry Device (10.2.1+); for testing.

This plugin is designed to provide Construct 2 developers with access to BlackBerry 10 native APIs
for integration in their Construct 2 games. Currently supported APIs include:
* **BlackBerry Messenger**
  * Register With BBM Platform
  * Invite To Download
  * Set Personal Status Message
* **In-App Payments**
  * Purchase Digital Good
  * Get Existing Purchases
  * Get Digital Good Price
  * Check If Digital Good Is Purchased

To fully test these APIs, you will need a physical BlackBerry 10 device.

Please report any issues with this plugin through the [Github Issue Tracker](https://github.com/blackberry/Construct2Plugins/issues).
Any additional feedback can be sent to **Erik Oros** via Twitter ([@WaterlooErik](https://twitter.com/WaterlooErik))
or email (eoros@blackberry.com).

## blackberry10

This folder contains the actual plugin that provides native API functionality for your Construct 2 application.
The **blackberry10** folder should be copied as a subfolder of your **plugins** folder.
Example:

*C:\Program Files\Construct 2\exporters\html5\plugins\blackberry10*

## Usage

* From the Command-Line Interface (CLI) create a new WebWorks project.

	`webworks create Construct2Test`

* Remove all files **except config.xml** from:

	`...\Construct2Test\www`

* Export your project from Construct2 as an **HTML5** project.
* Copy the exported files to:

	`...\Construct2Test\www`

* From the CLI, navigate to:

	`...\Construct2Test`

* Depending on the BlackBerry functionality you are using, you will need to add the following plugins:

	`webworks plugin add com.blackberry.bbm.platform`
	`webworks plugin add com.blackberry.payment`

* Open **index.html** and import the **cordova.js** script:

	`<script src="cordova.js"></script>`

	This should be done immediately before the jQuery and Construct2 \<script\> elements.

* From the CLI, leverage the webworks commands to test/deploy/release your project.

	`https://developer.blackberry.com/html5/documentation/beta/building_and_testing.html`

	Example:
	
	`webworks run --devicepass 123456`
	
	*This will build and deploy the project to your device; connected via USB.*
	
## CAPX

The CAPX file provided is a full Hello World sample to demonstrate the usage of the plugin. Before opening the CAPX file, you will need to
*install* the **blackberry10** plugin by copying the folder to your Construct 2 plugins folder as noted above.

## DISCLAIMER

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
