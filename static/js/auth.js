// ===============================
// Email Login (Demo)
// ===============================
function loginUser() {

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    if (email === "" || password === "") {
        alert("Please enter email and password.");
        return;
    }

    // Demo login (no database)
    localStorage.setItem("userName", email.split("@")[0]);
    localStorage.setItem("userEmail", email);

   window.location.href = "/dashboard";
}


// ===============================
// Email Signup (Demo)
// ===============================
function signupUser() {

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const confirm = document.getElementById("confirmPassword").value.trim();

    if (!name || !email || !password || !confirm) {
        alert("Please fill all fields.");
        return;
    }

    if (password !== confirm) {
        alert("Passwords do not match.");
        return;
    }

    // Demo signup (no database)
    localStorage.setItem("userName", name);
    localStorage.setItem("userEmail", email);

    alert("Account created successfully!");

    window.location.href = "/login";
}


// ===============================
// Google Login
// ===============================
function handleCredentialResponse(response) {

    const data = parseJwt(response.credential);

    localStorage.setItem("userName", data.name);
    localStorage.setItem("userEmail", data.email);
    localStorage.setItem("userPicture", data.picture);

    window.location.href = "/dashboard";
}


// ===============================
// Logout
// ===============================
function logout() {

    // Clear stored user data
    localStorage.removeItem("userName");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userPicture");

    // Redirect to login page
    window.location.href = "/login";
}


// ===============================
// Decode Google JWT
// ===============================
function parseJwt(token) {

    const base64Url = token.split('.')[1];

    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');

    const jsonPayload = decodeURIComponent(
        atob(base64)
            .split('')
            .map(function (c) {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            })
            .join('')
    );

    return JSON.parse(jsonPayload);
}