let currentUser = localStorage.getItem("currentUser");

if (!currentUser) {
    window.location.href = "index.html";
}

let users = JSON.parse(localStorage.getItem("users")) || {};

// پر کردن خودکار فیلدها (خیلی باحال 😎)
document.getElementById("newUsername").value = currentUser;

document.getElementById("saveBtn").addEventListener("click", () => {

    let newUsername = document.getElementById("newUsername").value.trim();
    let newPassword = document.getElementById("newPassword").value.trim();

    if (!newUsername || !newPassword) {
        alert("همه فیلدها را پر کن");
        return;
    }

    // اطلاعات کاربر فعلی
    let userData = users[currentUser];

    if (!userData) {
        alert("کاربر پیدا نشد");
        return;
    }

    // حذف کاربر قدیمی
    delete users[currentUser];

    // ساخت کاربر جدید
    users[newUsername] = {
        password: newPassword
    };

    // ذخیره
    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("currentUser", newUsername);

    alert("تغییرات ذخیره شد 🔥");

    window.location.href = "game.html";
});

document.getElementById("backBtn").addEventListener("click", () => {
    window.location.href = "game.html";
});