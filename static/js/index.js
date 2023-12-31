import { CihuyPostApi } from "https://c-craftjs.github.io/lulu/api.js";
import {qrController,deleteCookie} from "https://cdn.jsdelivr.net/gh/whatsauth/js@0.2.2/whatsauth.js";
import { wauthparam } from "https://cdn.jsdelivr.net/gh/whatsauth/js@0.2.2/config.js";
import { UrlLoginMhsEmail } from "./controller/template.js";
import { CihuyGetCookie } from "https://c-craftjs.github.io/cookies/cookies.js";
import {setCookieWithExpireHour} from "https://jscroot.github.io/cookie/croot.js";
import { CihuyPostWithoutToken } from "https://c-craftjs.github.io/lulu/api.js";


export const token = CihuyGetCookie("login");

// Untuk Login QR Code
wauthparam.keyword = "aHR0cHM6Ly93YS5tZS82MjgxMTIwMDAyNzk/dGV4dD13aDR0NWF1dGgwLmtleS4=";
deleteCookie(wauthparam.tokencookiename);
qrController(wauthparam);

document.getElementById('masukButton').addEventListener('click', function () {
  const emailOrPhone = document.getElementById('handphoneoremail').value;
  const password = document.getElementById('Password').value;

  const postData = {
    email: emailOrPhone,
    password: password
  };

  const apiUrl = 'https://komarbe.ulbi.ac.id/pendaftar/login/email';
  CihuyPostWithoutToken(apiUrl, postData)
    .then(responnya => {
      console.log('Response:', responnya);
      const responSiJson = JSON.parse(responnya);
      if (responSiJson.code === 200 && responSiJson.success) {
        const token = responSiJson.data.token;
        document.cookie = `login=${token}; path=/`;

        // Menampilkan swal untuk pesan keberhasilan
        Swal.fire({
          icon: 'success',
          title: 'Login Berhasil',
          text: 'Anda berhasil login!',
          showConfirmButton: false,
          timer: 1500
        }).then(() => {
          // Redirect ke halaman auth setelah menekan OK pada swal success
          window.location.href = 'https://pmb.ulbi.ac.id/auth';
        });
      } else {
        console.error('Login failed:', responSiJson.status);
        
        // Menampilkan swal untuk pesan kesalahan
        Swal.fire({
          icon: 'error',
          title: 'Login Gagal',
          text: `Username dan Password Salah!`
        });
        console.log(responSiJson.status)
      }
    })
    .catch(error => {
      console.error('Error:', error);

      // Menampilkan swal untuk pesan kesalahan
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: `Username dan Password Salah`
      });
    });
});