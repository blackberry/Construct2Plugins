BlackBerry Messenger
====================

This plugin is designed to provide Construct 2 developers with access to BlackBerry 10 native APIs
for BlackBerry Messenger integration in their Construct 2 games.

This plugin has limited functionality on a PC browser and will only generate **alerts** to signify the action that
would be taken. To view the full behaviour of this plugin, you will need to test on a BlackBerry 10 simulator
or device.

Please report any issues with this plugin through the [Github Issue Tracker](https://github.com/blackberry/Construct2Plugins/issues).
Any additional feedback can be sent to **Erik Oros** via Twitter ([@WaterlooErik](https://twitter.com/WaterlooErik))
or email (eoros@blackberry.com).

## Requirements
* BlackBerry 10 WebWorks SDK.
* BlackBerry 10 Code Signing Keys.
* Construct 2 r129 or greater.

For detailed information on configuring the BlackBerry 10 WebWorks SDK and your BlackBerry 10 Code Signing Keys,
please refer to our [WebWorks documentation](https://developer.blackberry.com/html5/documentation/using_javascript_libraries_frameworks_in_webworks.html)
for Construct 2.

## Usage

#### Installation

First, you will need to close any open instances of Construct 2, download the **blackberry.bbm* folder
from this repo, and save it to your Construct 2 plugins directory. Example:

    C:\Program Files\Construct 2\exporters\html5\plugins\blackberry.bbm

Once this has been included, you can re-launch Construct 2 and add the BlackBerry Messenger plugin to
your project by navigating: **Insert new object > BlackBerry 10: BBM**

#### Action: inviteToDownload

To access this action, you will need to create a **condition** in your event sheets that will trigger this action.
Once this condition exists, you can navigate: **Add action > BBM > users: inviteToDownload**

By including this action, when the action is triggered, the BlackBerry 10 operating system will display a card
of the current users's BlackBerry Messenger contacts. The user can select multiple contacts to receive an invitation
to download your application through BlackBerry Messenger.

#### Action: setPersonalMessage

To access this action, you will need to create a **condition** in your event sheets that will trigger this action.
Once this condition exists, you can navigate: **Add action > BBM > self: setPersonalMessage**

You will be prompted to specify a message to be displayed; be sure to include quotation marks. Example:
**"I am playing an amazing Construct 2 game."**

By including this action, when the action is triggered, the user will be prompted to accept or deny the update to
their BlackBerry Messsenger personal message. If they accept, their BlackBerry Messenger profile will update
with your desired message and will be displayed to all of their BlackBerry Messenger contacts.
