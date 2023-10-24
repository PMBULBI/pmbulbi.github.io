import {qrController,deleteCookie} from "https://cdn.jsdelivr.net/gh/whatsauth/js@0.1.2/whatsauth.js";
import { wauthparam } from "https://cdn.jsdelivr.net/gh/whatsauth/js@0.1.2/config.js";


deleteCookie(wauthparam.tokencookiename);
qrController(wauthparam);
