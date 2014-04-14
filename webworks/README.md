## Requirements
* BlackBerry 10 WebWorks SDK 2.0
* BlackBerry 10 Code Signing Keys.
* Construct 2 r163 or greater.

#### Export Process

The WebWorks plugin has three primary modes:
* Release: The BAR file you are building will be signed and distributed through the BlackBerry World storefront.
* Sandbox: The BAR file will be uploaded to BlackBerry World as a draft and used solely for **sandbox** testing.
* Sideload: The BAR file will be **sideloaded** to the device for **local mode** testing.

For more information on **sandbox** and **local mode** testing, please refer to this documentation:
https://developer.blackberry.com/native/documentation/cascades/device_platform/paymentservice/testing.html


Once ready, export your application by navigating:
**File > Export Project > Web > HTML5 Website**

Under **Export Options**
* Be sure to leave **Minify script** unchecked; even for release versions.
* Choose **Embed style** for your template.

#### Post-Export

After you export your Construct 2 project, you will need to create a WebWorks 2.0 project and import your HTML5 files. These next steps assume you have downloaded and installed the WebWorks 2.0 SDK:
https://developer.blackberry.com/html5/download/

In the command-line (CLI) navigate to a folder you wish to create your project in. Example:

    C:\webworks

Execute the following command to create a new project:

    C:\webworks> webworks create AAAAAA

Where:
* AAAAAA refers to the name of your project.

Navigate into the newly created folder. Example:

    C:\webworks> cd MyProject
	C:\webworks\MyProject>

Execute the following command to import the BlackBerry Payment APIs:

    C:\webworks\MyProject> webworks plugin add com.blackberry.payment

Next, copy your HTML5 export files into the **www** folder of your newly created project, example:

    C:\webworks\MyProject\www

Modify your **index.html** to include the following **<script>** element. You will want to place this immediately **before** the closing **<\/head>** tag.

        ...
        <script type="text/javascript" src="cordova.js"></script>
    </head> 

You may want to make additional modifications to **config.xml** to reflect your application details (name, description, etc.) as well as assign a unique **id** to your project along with appropriate version. For more information on modifying your config.xml file, please see:
https://developer.blackberry.com/html5/documentation/v2_0/modifying_your_config_file.html

You **do not** need to manually set any **feature** or **permission** elements to use the APIs. This is automatically taken care of when you execute the command to add **com.blackberry.payment**

At this point, you should be ready to build your application. For more information, please see:
https://developer.blackberry.com/html5/documentation/v2_0/build_and_sign_your_app.html#kba1371063698995