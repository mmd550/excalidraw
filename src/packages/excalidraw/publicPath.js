import { ENV } from "../../constants";
if (process.env.NODE_ENV !== ENV.TEST) {
  /* eslint-disable */
  /* global __webpack_public_path__:writable */
  __webpack_public_path__ =
    window.EXCALIDRAW_ASSET_PATH ||
    `{{process.env.VITE_PACKAGES_FILES_CDN_BASE_URL}}/${process.env.VITE_PKG_NAME}@${process.env.VITE_PKG_VERSION}/dist/`;
}
