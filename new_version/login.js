document.getElementById("login-form").addEventListener("submit", async function (e) {
    e.preventDefault();

    const login = document.getElementById("login").value.trim();
    const password = document.getElementById("accessCode").value.trim(); // Используем пароль
    const apiUrl = "https://script.google.com/macros/s/AKfycbwgEK0AHrN6Wxug-M_ecTwCo9Uv8l9YlfhRrdKlqVSlcXEaiU3T0AZd2oa9wsXXG7sOVA/exec"; // Вставь свою ссылку

    try {
        const response = await fetch(apiUrl, { mode: "cors" });
        if (!response.ok) throw new Error("Ошибка запроса к API");

        const users = await response.json();

        if (!Array.isArray(users) || users.length === 0) {
            throw new Error("Список пользователей пуст или данные некорректны");
        }

        let accessGranted = users.some(user => 
            user.login === login &&
            String(user.password) === password &&  // Приводим к строке для корректного сравнения
            user.status.toLowerCase() === "ok"    // Делаем регистронезависимую проверку
        );

        if (accessGranted) {
            alert("✅ Вход выполнен успешно!");
            window.location.href = "/index.html"; // Перенаправление на защищённую страницу
        } else {
            alert("❌ Ошибка! Проверьте логин или пароль.");
        }
    } catch (error) {
        console.error("Ошибка при получении данных из Google Sheets:", error);
        alert("⚠ Ошибка соединения с сервером. Попробуйте позже.");
    }
});
