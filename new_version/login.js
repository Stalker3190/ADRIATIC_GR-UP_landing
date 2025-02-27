document.getElementById("login-form").addEventListener("submit", async function (e) {
    e.preventDefault();

    const login = document.getElementById("login").value.trim();
    const password = document.getElementById("accessCode").value.trim();
    const apiUrl = "https://script.google.com/macros/s/AKfycbziHoFe73z8xxinNQ1sATU9B-m-mcxrvsHv-NPcj20lC9mwmjts2bh0Pbpb890GcQsNZQ/exec";

    const spinner = document.getElementById("loading-spinner");
    spinner.style.display = "block"; // Показываем спиннер

    try {
        const response = await fetch(apiUrl);
        const text = await response.text(); // Читаем как текст
        console.log("Ответ сервера:", text); // Логируем ответ

        if (!text) throw new Error("Пустой ответ от сервера");

        const users = JSON.parse(text); // Пробуем разобрать JSON

        // Ищем пользователя
        const user = users.find(user => 
            user.login.trim() === login &&
            String(user.password).trim() === password &&  // Преобразуем пароль в строку
            user.status.trim().toLowerCase() === "ok"    // Убираем пробелы и проверяем "ok"
        );

        if (user) {
            alert("✅ Вход выполнен успешно!");
            localStorage.setItem("user", JSON.stringify(user)); // Сохраняем пользователя
            window.location.href = "index.html";
        } else {
            alert("❌ Ошибка! Проверьте логин или пароль.");
        }
    } catch (error) {
        console.error("Ошибка при получении данных из Google Sheets:", error);
        alert("⚠ Ошибка соединения с сервером. Попробуйте позже.");
    } finally {
        spinner.style.display = "none"; // Прячем спиннер после завершения
    }
});
