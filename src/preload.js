import preloadJrWorker from '@foxitsoftware/foxit-pdf-sdk-for-web-library/lib/preload-jr-worker';
import { licenseKey, licenseSN } from './license-key';

window.readyWorker = preloadJrWorker({
    workerPath: '/foxit-lib/',
    enginePath: '/foxit-lib/jr-engine/gsdk',
    fontPath: '/external/brotli',
    licenseSN,
    licenseKey,
});
