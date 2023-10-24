import {qrController,deleteCookie} from "https://cdn.jsdelivr.net/gh/whatsauth/js@0.0.9/whatsauth.js";
import { wauthparam } from "https://cdn.jsdelivr.net/gh/whatsauth/js@0.0.9/config.js";


deleteCookie(wauthparam.tokencookiename);
qrController(wauthparam);