document.addEventListener("DOMContentLoaded", function () {
    const resultsContainer = document.querySelector(".search-results");

    const urlParams = new URLSearchParams(window.location.search);
    let query = urlParams.get("q") ? urlParams.get("q").trim().toLowerCase() : "";

    if (query) {
        localStorage.setItem("searchQuery", query);  // Обновляем localStorage
    } else {
        query = localStorage.getItem("searchQuery") ? localStorage.getItem("searchQuery").trim().toLowerCase() : "";
    }

    console.log("🔎 Итоговый запрос:", query);

    const companies = [
        { 
            name: "Golden Fruit", 
            description: "Производитель ягод",
            website: "https://goldenfruit.com",
            products: ["Малина свежая", "Малина замороженная", "Ежевика культивированная", "Ежевика лесная", 
                "Слива - разные сорта", "Черника лесная"]
        },
        { 
            name: "MMN Fruit", 
            description: "Поставщик свежих фруктов",
            website: "https://mmnfruit.com",
            products: ["Малина замороженная", "Клубника замороженная", "Черника замороженная", 
                "Ежевика замороженная", "Слива замороженная", "Вишня замороженная"]
        }
    ];

    // Фильтруем компании
    let filteredCompanies = companies.filter(company =>
        company.name.toLowerCase().includes(query) || 
        company.description.toLowerCase().includes(query) || 
        company.products.some(product => product.toLowerCase().includes(query))
    );

    console.log("✅ Найденные компании:", filteredCompanies);

    // Очищаем контейнер перед выводом результатов
    resultsContainer.innerHTML = "";

    // Отображаем результаты
    if (filteredCompanies.length > 0) {
        filteredCompanies.forEach(company => {
            const companyCard = `
                <div class="company-card">
                    <h2 class="company-name">${company.name}</h2>
                    <p class="company-description">${company.description}</p>
                    <p><strong>🌍 Вебсайт:</strong> <a href="${company.website}" target="_blank">${company.website}</a></p>
                    <p><strong>🛒 Продукция:</strong> ${company.products.join(", ")}</p>
                </div>
            `;
            resultsContainer.innerHTML += companyCard;
        });
    } else {
        resultsContainer.innerHTML = `<p class="no-results">❌ Ничего не найдено.</p>`;
    }
});
