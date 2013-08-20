blackberry10
====================

This plugin is designed to provide Construct 2 developers with access to BlackBerry 10 native APIs
for integration in their Construct 2 games. Currently supported APIs include:
* **BlackBerry Messenger**
  * Invite To Download
* **In-App Payments**
  * Purchase Digital Good
  * Get Existing Purchases
  * Get Digital Good Price
  * Check If Digital Good Is Purchased

To fully test these APIs, you will need a physical BlackBerry 10 device.

Please report any issues with this plugin through the [Github Issue Tracker](https://github.com/blackberry/Construct2Plugins/issues).
Any additional feedback can be sent to **Erik Oros** via Twitter ([@WaterlooErik](https://twitter.com/WaterlooErik))
or email (eoros@blackberry.com).

## Requirements
* BlackBerry 10 WebWorks SDK 1.0.4.11.
* BlackBerry 10 Code Signing Keys.
* Construct 2 r129 or greater.

For detailed information on configuring the BlackBerry 10 WebWorks SDK and your BlackBerry 10 Code Signing Keys,
please refer to our [WebWorks documentation](https://developer.blackberry.com/html5/documentation/using_javascript_libraries_frameworks_in_webworks.html)
for Construct 2.

#### Post-Export

After you export your Construct 2 project with the BlackBerry 10 exporter, you will need to ensure
that you have enabled the following in your **config.xml** file that is generated during the export.

**Features**

    <feature id="blackberry.bbm.platform" />
	<feature id="blackberry.payment" />

**Permissions**

    <rim:permissions>
        <rim:permit>bbm_connect</rim:permit>
    </rim:permissions>

## Usage

This plugin consists of:
* **Actions**: BlackBerry 10 APIs that can be invoked.
* **Callbacks**: Triggered automatically by BlackBerry 10 APIs on success or failure.
* **Conditions**: Check whether a specific scenario exists or not.

#### Installation

First, you will need to close any open instances of Construct 2, download the **blackberry10* folder
from this repository, and save it to your Construct 2 plugins directory. Example:

    C:\Program Files\Construct 2\exporters\html5\plugins\blackberry10

Once this has been included, you can re-launch Construct 2 and add the **BlackBerry 10** plugin to
your project by navigating: **Insert new object > Platform specific: BlackBerry 10**

#### Action: BlackBerry Messenger > Register with BBM platform

**Callbacks**
* **onRegisterSuccess**
  * Triggered when the BlackBerry Messenger platform has registered.
  * Must occur before BlackBerry Messenger APIs can be used.
* **onRegisterFailure**
  * Triggered if the BlackBerry Messenger platform fails to register.
  * Can leverage the **BlackBerry10.BBMError** variable to obtain more information on the error.

You will need to create a **condition** in your events sheet to invoke this action.
In general, the **On loader layout complete** condition is a good condition.

When invoked, the application will automatically register with the BlackBerry Messenger
platform to enable access to additional BlackBerry Messenger APIs.

#### Action: BlackBerry Messenger > Invite others to download this app

**Callbacks**
* N/A.

You will need to create a **condition** in your events sheet to invoke this action.

When invoked, the BlackBerry 10 operating system will display a card
of the current users's BlackBerry Messenger contacts. The user can select multiple contacts to receive an invitation
to download your application through BlackBerry Messenger.

#### Action: BlackBerry Messenger > Update user's BBM profile

**Callbacks**
* **onSetPersonalMessageSuccess**
  * Triggered if the user accepts the dialog to update their personal message in BlackBerry Messenger.
* **onSetPersonalMessageFailure**
  * Triggered if the user declines the dialog to update their personal message in BlackBerry Messenger.

You will need to create a **condition** in your events sheet to invoke this action.

You will be prompted to specify a message to be displayed; be sure to include quotation marks. Example:
**"I am playing an amazing Construct 2 game."**

When invoked, the user will be prompted to accept or deny the update to
their BlackBerry Messsenger personal message. If they accept, their BlackBerry Messenger profile will update
with your desired message and will be displayed to all of their BlackBerry Messenger contacts.

#### Action: In-App Payments > Get existing purchases

**Callbacks**
* **onGetPurchasesSuccess**
  * Triggered if a list of existing purchases is successfully retrieved.
  * Will only function if the application was downloaded through BlackBerry World.
  * Can leverage the **BlackBerry10.ExistingPurchases** variable to obtain more information on existing purchases.
* **onGetPurchasesFailure**
  * Triggered if a list of existing purchases failed to be retrieved.
  * Can leverage the **BlackBerry10.PaymentError** variable to obtain more information on the error.

You will need to create a **condition** in your events sheet to invoke this action.
Generally you will want to do this once during the startup of your application.

When invoked, the BlackBerry 10 operating system will take over and
guide the end-user through the necessary BlackBerry World authentication to retrieve purchases.

#### Action: In-App Payments > Get price of Digital Good

**Callbacks**
* **onGetPriceSuccess**
  * Triggered if we successfully obtain the price of a Digital Good.
  * Can leverage the **BlackBerry10.PurchasePrice** variable to obtain the price of the Digital Good.
* **onGetPriceFailure**
  * Triggered if we failed to obtain the price of a Digital Good.
  * Can leverage the **BlackBerry10.PaymentError** variable to obtain more information on the error.

You will need to create a **condition** in your events sheet to invoke this action.

You will be prompted to specify an SKU for the Digital Good to get the price of; be sure to include quotation marks. Example:
**"MyDigitalGoodSKU"**

When invoked, the application will send a request to the BlackBerry World servers to obtain the price of the digital good.

#### Action: In-App Payments > Purchase Digital Good

**Callbacks**
* **onPurchaseSuccess**
  * Triggered if the end-user successfully completes the purchase.
  * Can leverage the **BlackBerry10.ExistingPurchases** variable to obtain more information about the purchase.
* **onPurchaseFailure**
  * Triggered fi the end-user fails to complete or cancels the purchase.
  * Can leverage the **BlackBerry10.PaymentError** variable to obtain more information on the error.

You will need to create a **condition** in your events sheet to invoke this action.

You will be prompted to specify an SKU for the Digital Good to purchase; be sure to include quotation marks. Example:
**"MyDigitalGoodSKU"**

When invoked, the BlackBerry 10 operating system will take over and
guide the end-user through the necessary BlackBerry World authentication and steps to complete the purchase.

#### Condition: In-App Payments > Check if purchase exists

**Callbacks**
* N/A.

This **condition** can be added to your events sheet by navigating: **Add event > BlackBerry 10 > In-App Payments > Check if purchases exists**

You will be promted to specify an SKU for the Digital Good you wish to check; be sure to include quotation marks. Example:
**"MyDigitalGoodSKU"**

This condition will check against the **BlackBerry10.ExistingPurchases** variable to determine whether an SKU exists. This variable can be populated by **Action: In-App Payments > Get existing purchases**
or will be updated following a successful **Action: In-App Payments > Purchase Digital Good** with the newly purchased Digital Good.
