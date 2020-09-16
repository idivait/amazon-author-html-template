// This is the main.js file. Import global CSS and scripts here.
// The Client API can be used here. Learn more: gridsome.org/docs/client-api
import VueClipboard from "vue-clipboard2";
import { VueShowdown } from "vue-showdown";
import DefaultLayout from "~/layouts/Default.vue";

export default function(Vue, { router, head, isClient }) {
  // Set default layout as a global component
  Vue.use(VueClipboard);
  Vue.component("Layout", DefaultLayout);
  Vue.component("VueShowdown", VueShowdown);
  // Import Google Fonts
  head.link.push({
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css?family=Open+Sans|Patrick+Hand",
  });
}
