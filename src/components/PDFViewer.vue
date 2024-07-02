<template>
    <div ref="viewer" class="viewer-container"></div>
</template>
<script>
import * as UIExtension from '@foxitsoftware/foxit-pdf-sdk-for-web-library'
import "@foxitsoftware/foxit-pdf-sdk-for-web-library/lib/UIExtension.css";

export default {
    mounted() {
        const libPath = '/foxit-lib/';
        this.pdfui = new UIExtension.PDFUI({
            viewerOptions: {
                libPath,
                jr: {
                    readyWorker: window.readyWorker
                }
            },
            appearance: UIExtension.appearances.adaptive,
            renderTo: this.$refs.viewer,
            addons: UIExtension.PDFViewCtrl.DeviceInfo.isMobile ?
                '/foxit-lib/uix-addons/allInOne.mobile.js' :
                '/foxit-lib/uix-addons/allInOne.js'
        });

        window.addEventListener('resize', () => {
            this.pdfui.redraw();
        });
    }
}
</script>
<style>
.viewer-container, .viewer-container > .fv__ui-webpdf {
    height: 100%;
}
</style>
