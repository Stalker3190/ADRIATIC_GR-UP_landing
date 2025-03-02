document.addEventListener("DOMContentLoaded", function () {
    const urlParams = new URLSearchParams(window.location.search);
    let lang = urlParams.get("lang") || localStorage.getItem("selectedLanguage") || "ru";

    if (!urlParams.has("lang")) {
        window.history.replaceState({}, "", `?lang=${lang}`);
    }

    localStorage.setItem("selectedLanguage", lang);

    // Объект с переводами
    const translations = {
        ru: {
            loginTitle: "Вход",
            loginLabel: "Логин:",
            loginPlaceholder: "Введите логин",
            passwordLabel: "Код доступа:",
            passwordPlaceholder: "Введите код",
            loginButton: "Войти",
            registerText: "Еще нет аккаунта?",
            registerLink: "Зарегистрироваться",
            backToHome: "На главную"
        },
        sr: {
            loginTitle: "Prijava",
            loginLabel: "Korisničko ime:",
            loginPlaceholder: "Unesite korisničko ime",
            passwordLabel: "Lozinka:",
            passwordPlaceholder: "Unesite lozinku",
            loginButton: "Prijavi se",
            registerText: "Još nemate nalog?",
            registerLink: "Registrujte se",
            backToHome: "Nazad na početnu"
        }
    };
    

    // Функция для перевода страницы
    function translatePage(lang) {
        document.querySelectorAll("[data-translate]").forEach(element => {
            const key = element.getAttribute("data-translate");
            if (translations[lang][key]) {
                element.textContent = translations[lang][key];
            }
        });

        document.querySelectorAll("[data-translate-placeholder]").forEach(element => {
            const key = element.getAttribute("data-translate-placeholder");
            if (translations[lang][key]) {
                element.placeholder = translations[lang][key];
            }
        });
    }

    // 🔹 ВЫЗЫВАЕМ ФУНКЦИЮ ПЕРЕВОДА ПРИ ЗАГРУЗКЕ
    translatePage(lang);

    // 🔹 Функция для локализации ошибок
    function setValidationMessages(input) {
        const message = lang === "sr" ? "Molimo vas da popunite ovo polje!" : "Пожалуйста, заполните это поле!";
        
        input.addEventListener("input", function () {
            this.setCustomValidity(""); // Сбрасываем ошибку при вводе
            this.classList.remove("error"); // Убираем стили ошибки
        });

        input.addEventListener("blur", function () {
            if (!this.value.trim()) {
                this.setCustomValidity(message);
                this.reportValidity(); // Показываем ошибку явно
                this.classList.add("error"); // Добавляем стили ошибки
            }
        });

        input.addEventListener("invalid", function (event) {
            event.preventDefault(); // Блокируем стандартное сообщение браузера
            this.setCustomValidity(message);
            this.reportValidity(); // Показываем ошибку явно
            this.classList.add("error"); // Добавляем стили ошибки
        });
    }

    // 🔹 Применяем валидацию ко всем required-полям
    document.querySelectorAll("input[required]").forEach(setValidationMessages);

    document.getElementById("backToHome").addEventListener("click", function () {
        let lang = localStorage.getItem("selectedLanguage") || "ru";
        window.location.href = `index.html?lang=${lang}`;
    });
    
});

document.getElementById("login-form").addEventListener("submit", async function (e) {
    e.preventDefault();

    const login = document.getElementById("login").value.trim();
    const password = document.getElementById("accessCode").value.trim();
    const apiUrl = "https://script.google.com/macros/s/AKfycbziHoFe73z8xxinNQ1sATU9B-m-mcxrvsHv-NPcj20lC9mwmjts2bh0Pbpb890GcQsNZQ/exec";

    const spinner = document.getElementById("loading-spinner");
    spinner.style.display = "block";

    try {
        const response = await fetch(apiUrl);
        const text = await response.text();
        console.log("Ответ сервера:", text);

        if (!text) throw new Error("Пустой ответ от сервера");

        const users = JSON.parse(text);

        const user = users.find(user => 
            user.login.trim() === login &&
            String(user.password).trim() === password &&
            user.status.trim().toLowerCase() === "ok"
        );

        if (user) {
            alert("✅ Вход выполнен успешно!");
            localStorage.setItem("user", JSON.stringify(user));

            let lang = localStorage.getItem("selectedLanguage") || "ru";
            window.location.href = `index.html?lang=${lang}`;
        } else {
            alert("❌ Ошибка! Проверьте логин или пароль.");
        }
    } catch (error) {
        console.error("Ошибка при получении данных из Google Sheets:", error);
        alert("⚠ Ошибка соединения с сервером. Попробуйте позже.");
    } finally {
        spinner.style.display = "none";
    }
});
