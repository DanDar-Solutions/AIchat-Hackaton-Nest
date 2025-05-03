const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const forgotPasswordLink = document.getElementById('forgotPassword');
const backToLoginLink = document.getElementById('backToLogin');
const container = document.getElementById('container');

// Бүртгүүлэх товч
signUpButton.addEventListener('click', () => {
	container.classList.add("right-panel-active");
});

// Нэвтрэх товч
signInButton.addEventListener('click', () => {
	container.classList.remove("right-panel-active");
});

// Нууц үг мартсан уу? холбоос
forgotPasswordLink.addEventListener('click', (e) => {
	e.preventDefault();
	container.classList.add("forgot-active");
});

// Буцах холбоос
backToLoginLink.addEventListener('click', (e) => {
	e.preventDefault();
	container.classList.remove("forgot-active");
});
