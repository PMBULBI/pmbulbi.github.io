import {qrController,deleteCookie} from "https://cdn.jsdelivr.net/gh/whatsauth/js@0.1.2/whatsauth.js";
import { wauthparam } from "https://cdn.jsdelivr.net/gh/whatsauth/js@0.1.2/config.js";

wauthparam.keyword = "aHR0cHM6Ly93YS5tZS82MjgxMTIwMDAyNzk/dGV4dD13aDR0NWF1dGgwLmtleS4=";
deleteCookie(wauthparam.tokencookiename);
qrController(wauthparam);
