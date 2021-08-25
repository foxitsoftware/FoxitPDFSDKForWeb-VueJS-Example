# FoxitPDFSDK for Web Example - Vue.js

This guide shows two examples. One introduces how to quickly run the out-of-the-box sample for Vue.js in FoxitPDFSDK for Web package, and the other presents a way to integrate FoxitPDFSDK for Web into an exiting Vue app.

## Quickly run the out-of-the-box example for Vue.js

FoxitPDFSDK for Web provides a boilerplate project for [@vue/cli](https://cli.vuejs.org/guide/) app.

### Prerequisites

- [Nodejs](https://nodejs.org/en/) and [npm](https://www.npmjs.com)
- [FoxitPDFSDK for Web](https://developers.foxit.com/products/web/)

### Getting started

Clone the repository to any location:

```bash
git clone https://github.com/foxitsoftware/FoxitPDFSDKForWeb-VueJS-Example.git
```

Navigate to `FoxitPDFSDKForWeb-VueJS-Example/`, and execute:

```bash
cd ./FoxitPDFSDKForWeb-VueJS-Example
npm install
```

This step will download all dependencies into `node_modules` folder.

### Runnning the example

```sh
npm start
```

Now you are ready to launch the app. Open your browser, navigate to `<http://127.0.0.1:9103/>` to load your example.

### Reference the fonts

If some text in a PDF document requires a specified font to be rendered correctly, you need to specify a font loading path during initialization. In this example, you can refer to the `fontPath` configuration in `src/preload.js`. What we need to do is to copy the `external` folder in the SDK to the public folder so that the special font can be rendered normally.

## Integrate FoxitPDFSDK for Web into existing Vue.js project

This integration assumes you have [@vue/cli](https://cli.vuejs.org/guide/) app installed with _all default settings_.

### Prerequisites

- [Nodejs](https://nodejs.org/en/) and [npm](https://www.npmjs.com)
- [@vue/cli](https://cli.vuejs.org/guide/)
- [FoxitPDFSDK for Web](https://www.npmjs.com/package/@foxitsoftware/foxit-pdf-sdk-for-web-library)

### Setup

Let's call the root folder of your exiting project as VueJS and FoxitPDFSDK for Web as SDK.

1. Install `@foxitsoftware/foxit-pdf-sdk-for-web-library`
2. To correctly reference your fonts lib, duplicate the `external` folder inside SDK to `VueJS/public`.
3. Run `npm i -D cross-env` to install `cross-env`, and add the following segments to `serve` and `build` in `VueJS/package.json`.

   ```sh
   cross-env NODE_OPTIONS=--max_old_space_size=8192 NODE_ENV=development vue-cli-service serve
   cross-env NODE_OPTIONS=--max_old_space_size=8192 NODE_ENV=production vue-cli-service build
   ```

   _The purpose of this step is to void memory leak error._

### Configuration

Add configurations onto the following files in your VueJS:

- `vue.config.js`
- `.eslintignore`

For the configuration details, refer to the counterpart files in SDK.

### Component

- Create `src/components/PDFViewer.vue` in your VueJS，and reference it in `src/App.vue`.

For the configuration details, refer to the counterpart files in SDK.

### Referene Addons

If you are integrating FoxitPDFSDK for Web into your existing Vue project, you should read this section before continue. You may want to check out [Addons](http://webviewer-demo.foxitsoftware.com/docs/developer-guide/ui-extension/addons/introduction.html) for detailed introductions.

Here we introduce three ways to reference SDK addons for Anguar project, you may choose one of them based on your needs. This [Comparison](#Addons reference methods comparison) will help you to better understand the difference of the three ways and make a choice.

#### 1. Reference fragmented addons

This method was used by default in past versions before version 7.2. You should open `PDFViewer.vue `, and referece addons as shown below:

```js
this.pdfui = new UIExtension.PDFUI({
    addons: [
        the_path_to_foxit_lib + '/uix-addons/file-property/addon.info.json',
        the_path_to_foxit_lib + '/uix-addons/full-screen/addon.info.json',
        // .etc
    ],
    // other options
});
```

Where `the_path_to_foxit_lib` is the SDK lib folder， 

#### 2. Import modular addons

1. Install

   ```sh
   npm i -D @foxitsoftware/addon-loader
   ```

2. Update `vue.config.js`，you may refer to `/integrations/vue.js/vue.config.js`

3. In`PDFViewer.vue`, import `addon.info.json` for each addon:

    ```js
        import * as UIExtension from '../foxit-lib/UIExtension.full.js'
        import filePropertyAddon from '@foxitsoftware/foxit-pdf-sdk-for-web-library/lib/uix-addons/file-property/addon.info.json';
        import multiMediaAddon from '@foxitsoftware/foxit-pdf-sdk-for-web-library/lib/uix-addons/multi-media/addon.info.json';
        import passwordProtectAddon from '@foxitsoftware/foxit-pdf-sdk-for-web-library/lib/uix-addons/password-protect/addon.info.json';
        import redactionAddon from '@foxitsoftware/foxit-pdf-sdk-for-web-library/lib/uix-addons/redaction/addon.info.json';
        import pathObjectsAddon from '@foxitsoftware/foxit-pdf-sdk-for-web-library/lib/uix-addons/path-objects/addon.info.json';
        import printAddon from '@foxitsoftware/foxit-pdf-sdk-for-web-library/lib/uix-addons/print/addon.info.json';
        import fullScreenAddon from '@foxitsoftware/foxit-pdf-sdk-for-web-library/lib/uix-addons/full-screen/addon.info.json';
        import importFormAddon from '@foxitsoftware/foxit-pdf-sdk-for-web-library/lib/uix-addons/import-form/addon.info.json';
        import exportFormAddon from '@foxitsoftware/foxit-pdf-sdk-for-web-library/lib/uix-addons/export-form/addon.info.json';
        import undoRedoAddon from '@foxitsoftware/foxit-pdf-sdk-for-web-library/lib/uix-addons/undo-redo/addon.info.json';
        import textObjectAddon from '@foxitsoftware/foxit-pdf-sdk-for-web-library/lib/uix-addons/text-object/addon.info.json';
        import thumbnailAddon from '@foxitsoftware/foxit-pdf-sdk-for-web-library/lib/uix-addons/thumbnail/addon.info.json';
        import formDesignerAddon from '@foxitsoftware/foxit-pdf-sdk-for-web-library/lib/uix-addons/form-designer/addon.info.json';
        import formToSheetAddon from '@foxitsoftware/foxit-pdf-sdk-for-web-library/lib/uix-addons/form-to-sheet/addon.info.json';
        import readAloudAddon from '@foxitsoftware/foxit-pdf-sdk-for-web-library/lib/uix-addons/read-aloud/addon.info.json';
        import hContinuesAddon from '@foxitsoftware/foxit-pdf-sdk-for-web-library/lib/uix-addons/h-continuous/addon.info.json';
        import RecognitionFormAddon from '@foxitsoftware/foxit-pdf-sdk-for-web-library/lib/uix-addons/recognition-form/addon.info.json';
        import pageTemplateAddon from '@foxitsoftware/foxit-pdf-sdk-for-web-library/lib/uix-addons/page-template/addon.info.json';
        import xfaFormAddon from '@foxitsoftware/foxit-pdf-sdk-for-web-library/lib/uix-addons/xfa-form/addon.info.json';

    ```

    And pass addons to the PDFUI constructor:

    ```js
    const libPath = '/foxit-lib/';
        this.pdfui = new UIExtension.PDFUI({
            addons: [
                filePropertyAddon,
                multiMediaAddon,
                passwordProtectAddon,
                redactionAddon,
                pathObjectsAddon,
                printAddon,
                fullScreenAddon,
                importFormAddon,
                exportFormAddon,
                undoRedoAddon,
                thumbnailAddon,
                formToSheetAddon,
                readAloudAddon,
                hContinuesAddon,
                RecognitionFormAddon,
                pageTemplateAddon,
                xfaFormAddon,
                pageTemplateAddon
            ].concat(
                // text-object addon is disabled on mobile platform
                UIExtension.PDFViewCtrl.DeviceInfo.isMobile
                    ? []
                    : [
                        textObjectAddon, 
                        formDesignerAddon
                    ]
            ),
            // other options
        });
    ```

#### 3. Reference allInOne.js

The allInOne.js already combines all addons, which locates in `foxit-lib/uix-addons/`. To refenece this file, open `PDFViewer.vue`, and update the code as follows:

```js
// ...
import * as UIExtension from '@foxitsoftware/foxit-pdf-sdk-for-web-library'
import * as Addons from '@foxitsoftware/foxit-pdf-sdk-for-web-library/lib/uix-addons/allInOne.js';
// ...
```

And pass parameters to the PDFUI constructor:

```js
const MOBILE_UNSUPPORTED_ADDONS = [
    'textEditObject', 'FormDesigner'
];
this.pdfui = new UIExtension.PDFUI({
    addons: UIExtension.PDFViewCtrl.DeviceInfo.isMobile
        ? Addons.filter(it => MOBILE_UNSUPPORTED_ADDONS.indexOf(it.getName()) === -1)
        : Addons,
    // other options
});
```

#### Comparions of addons reference methods

|Referene method|Configuration|HTTP Requests|Modifiable (e.g Localization resoures, and addon.info.json)|
|--|--|--|--|
|Fragmentized|No|n+|Yes|
|Modularized|Configure gulp|0|Yes,but should re-merge the addons after modification |
|allInOne.js|No|1|No|

Note: You can rebuild allInOne.js by using our [Addons merge tools](http://webviewer-demo.foxitsoftware.com/docs/developer-guide/ui-extension/addons/introduction.html#merge-addons)

### Running your application

```sh
npm start
```

Now everything is set up. Open your browser, input the address based on you set up to launch your application.
