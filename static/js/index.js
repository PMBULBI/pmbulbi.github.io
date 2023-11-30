import {
    CihuyDataAPI,
    CihuyPostApi,
    CihuyDeleteAPI,
    CihuyUpdateApi,
  } from "https://c-craftjs.github.io/lulu/api.js";
import {qrController,deleteCookie} from "https://cdn.jsdelivr.net/gh/whatsauth/js@0.1.6/whatsauth.js";
import { wauthparam } from "https://cdn.jsdelivr.net/gh/whatsauth/js@0.1.6/config.js";
import { UrlLoginMhsEmail } from "./controller/template";
import { CihuyGetCookie } from "https://c-craftjs.github.io/cookies/cookies.js";

export const token = CihuyGetCookie("login");

// Untuk Login QR Code
wauthparam.keyword = "aHR0cHM6Ly93YS5tZS82MjgxMTIwMDAyNzk/dGV4dD13aDR0NWF1dGgwLmtleS4=";
deleteCookie(wauthparam.tokencookiename);
qrController(wauthparam);

// Untuk Login via Email
const apiUrlLoginMhsEmail = UrlLoginMhsEmail

CihuyPostApi(apiUrlLoginMhsEmail, token, data)
  .then((responseText) => {
    console.log("Respon sukses : ", responseText);
    // Menampilkan pesan sukses
    Swal.fire({
        icon: "success",
        title: "Sukses!",
        text: "Berhasil masuk ke PMB Mahasiswa.",
        showConfirmButton: false,
        timer: 1500,
    }).then(() => {
        // Refresh halaman atau tindakan lain jika diperlukan
        window.location.href = 'https://pmb.ulbi.ac.id/pmb-mhs';
    });
  })
  .catch((error) => {
    console.error("Terjadi kesalahan : ", error);
    Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Terjadi kesalahan saat login akun.",
    });
});