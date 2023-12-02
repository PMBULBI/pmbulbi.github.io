import { CihuyPostApi } from "https://c-craftjs.github.io/lulu/api.js";
import {qrController,deleteCookie} from "https://cdn.jsdelivr.net/gh/whatsauth/js@0.1.6/whatsauth.js";
import { wauthparam } from "https://cdn.jsdelivr.net/gh/whatsauth/js@0.1.6/config.js";
import { UrlLoginMhsEmail } from "./controller/template.js";
import { CihuyGetCookie } from "https://c-craftjs.github.io/cookies/cookies.js";
import {setCookieWithExpireHour} from "https://jscroot.github.io/cookie/croot.js";
import { CihuyPostWithoutToken } from "https://c-craftjs.github.io/lulu/api.js";


export const token = CihuyGetCookie("login");

// Untuk Login QR Code
wauthparam.keyword = "aHR0cHM6Ly93YS5tZS82MjgxMTIwMDAyNzk/dGV4dD13aDR0NWF1dGgwLmtleS4=";
deleteCookie(wauthparam.tokencookiename);
qrController(wauthparam);

// // Login Mahasiswa with Email & Password
// document.getElementById("masukButton").addEventListener("click", function () {
//     // Untuk ambil nilai dari form
//     const email = document.getElementById("Email").value;
//     const password = document.getElementById("Password").value;

//     // Buat Data untuk postnya
//     const data = {
//         email: email,
//         password: password
//     };

//     // Untuk Login via Email
//     const apiUrlLoginMhsEmail = UrlLoginMhsEmail

//     CihuyPostApi(apiUrlLoginMhsEmail, token, data)
//     .then((responseText) => {
//         console.log("Respon sukses : ", responseText);
//         const jsonParser = JSON.parse(responseText);
//         setCookieWithExpireHour("login", jsonParser.data.token, 2);
//         // Menampilkan pesan sukses
//         Swal.fire({
//             icon: "success",
//             title: "Sukses!",
//             text: "Berhasil masuk ke PMB Mahasiswa.",
//             showConfirmButton: false,
//             timer: 1500,
//         }).then(() => {
//             // Refresh halaman atau tindakan lain jika diperlukan
//             window.location.href = 'https://pmb.ulbi.ac.id/pmb-mhs';
//         });
//     })
//     .catch((error) => {
//         console.error("Terjadi kesalahan : ", error);
//         Swal.fire({
//             icon: "error",
//             title: "Oops...",
//             text: "Terjadi kesalahan saat login akun.",
//         });
//     });
// })

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
        window.location.href = 'https://pmb.ulbi.ac.id/pmb-mhs';
      } else {
        console.error('Login failed:', responSiJson.status);
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
});
