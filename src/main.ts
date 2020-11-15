import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import { library } from "@fortawesome/fontawesome-svg-core";
// import { faBars, faHardHat, faExternalLinkAlt, faPaperclip, faLeaf, faHouseUser, faFileSignature, faCoins, faSign, faPizzaSlice, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { faFacebook, faLinkedin, faInstagram, faGithub, faTelegram } from "@fortawesome/free-brands-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
library.add(faFacebook, faLinkedin, faInstagram, faGithub, faLinkedin, faTelegram);

const app = createApp(App);

app.component("fai", FontAwesomeIcon);
app.use(router).mount('#app')
