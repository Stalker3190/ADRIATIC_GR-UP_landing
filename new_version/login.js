document.getElementById("login-form").addEventListener("submit", async function (e) {
    e.preventDefault();

    const login = document.getElementById("login").value.trim();
    const password = document.getElementById("accessCode").value.trim();
    const apiUrl = "https://script.google.com/macros/s/AKfycbxU4ApN721p1UBZsn1Eiuu99Pkm9unvS7ljz9lZQwiH0l9e9k7Eq9tpSD-lkUsmn1BqwQ/exec";


    const spinner = document.getElementById("loading-spinner");
    spinner.style.display = "block"; // Показываем спиннер

    
    try {
        const response = await fetch(apiUrl);
        const text = await response.text(); // Читаем как текст
        console.log("Ответ сервера:", text); // Логируем ответ

        if (!text) throw new Error("Пустой ответ от сервера");

        const users = JSON.parse(text); // Пробуем разобрать JSON

        let accessGranted = users.some(user => 
            user.login.trim() === login &&
            String(user.password).trim() === password &&  // Преобразуем пароль в строку
            user.status.trim().toLowerCase() === "ok"    // Убираем пробелы и проверяем "ok"
        );

        if (accessGranted) {
            alert("✅ Вход выполнен успешно!");
            window.location.href = "index.html";
        } else {
            alert("❌ Ошибка! Проверьте логин или пароль.");
        }
    } catch (error) {
        console.error("Ошибка при получении данных из Google Sheets:", error);
        alert("⚠ Ошибка соединения с сервером. Попробуйте позже.");
    }
});
