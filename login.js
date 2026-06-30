const loginBtn = document.getElementById("loginBtn");
const registerBtn = document.getElementById("registerBtn");

registerBtn.addEventListener("click", register);
loginBtn.addEventListener("click", login);

function register(){

    let username = document.getElementById("username").value.trim();
    let password = document.getElementById("password").value.trim();

    if(username=="" || password==""){

        alert("همه فیلدها را پر کنید.");

        return;

    }

    let users = JSON.parse(localStorage.getItem("users")) || {};

    if(users[username]){

        alert("این نام کاربری قبلاً ثبت شده است.");

        return;

    }

    users[username] = {

        password: password

    };

    localStorage.setItem("users", JSON.stringify(users));

    alert("ثبت نام با موفقیت انجام شد 🎉");

}
function login(){

    let username = document.getElementById("username").value.trim();
    let password = document.getElementById("password").value.trim();

    let users = JSON.parse(localStorage.getItem("users")) || {};

    if(!users[username]){

        alert("کاربری پیدا نشد.");

        return;

    }

    if(users[username].password != password){

        alert("رمز عبور اشتباه است.");

        return;

    }

    localStorage.setItem("currentUser", username);

    window.location.href = "game.html";

}