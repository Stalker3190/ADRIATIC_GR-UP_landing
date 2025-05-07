document.addEventListener("DOMContentLoaded", function () {
    const resultsContainer = document.querySelector(".search-results");

    const urlParams = new URLSearchParams(window.location.search);
    let query = urlParams.get("q") ? urlParams.get("q").trim().toLowerCase() : "";
    let lang = urlParams.get("lang") || localStorage.getItem("selectedLanguage") || "ru";
    if (!urlParams.has("lang")) {
        window.location.replace(`${window.location.pathname}?q=${query}&lang=${lang}`);
    }
    

    if (query) {
        localStorage.setItem("searchQuery", query);
    } else {
        query = localStorage.getItem("searchQuery") || "";
    }

    localStorage.setItem("selectedLanguage", lang); // Запоминаем язык

    console.log("🔎 Итоговый запрос:", query);
    console.log("🌍 Язык:", lang);

    const translations = {
        ru: {
            searchResultsTitle: "Результаты поиска",
            backToHome: "🏠 На главную",
            website: "Вебсайт",
            products: "Продукция",
            noResults: "❌ Ничего не найдено."
        },
        sr: {
            searchResultsTitle: "Rezultati pretrage",
            backToHome: "🏠 Nazad na početnu",
            website: "Vebsajt",
            products: "Proizvodi",
            noResults: "❌ Ništa nije pronađeno."
        }
    };

    const h1Element = document.querySelector("h1");

    // Меняем заголовок только если в URL есть параметр "q" (поисковый запрос)
    if (urlParams.has("q")) {
        h1Element.textContent = translations[lang]["searchResultsTitle"];
    }
    document.querySelector(".back-button").textContent = translations[lang]["backToHome"];

    const companies = [
        { 
            name: "Golden Fruit", 
            description: { ru: "Производитель ягод", sr: "Proizvođač bobičastog voća" },
            website: "https://goldenfruit.com",
            products: {
                ru: ["Малина свежая", "Малина замороженная", "Ежевика культивированная"],
                sr: ["Sveža malina", "Zamrznuta malina", "Uzgojena kupina"]
            }
        },
        { 
            name: "MMN Fruit", 
            description: { ru: "Поставщик свежих фруктов", sr: "Dobavljač svežeg voća" },
            website: "https://mmnfruit.com",
            products: {
                ru: ["Малина замороженная", "Клубника замороженная", "Черника замороженная"],
                sr: ["Zamrznuta malina", "Zamrznuta jagoda", "Zamrznuta borovnica"]
            }
        },
        {
            name: "Sinagoga doo",
            description: { ru: "Оптовая торговля, упаковка, производство хлопьев и орехов.", sr: "Veleprodaja, pakovanje, proizvodnja pahuljica i orašastih plodova." },
            website: "https://www.sinagoga.co.rs/",
            products: {
                ru: ["Мак", "Подсолнечник", "Арахис", "Овсяные хлопья", "Ржаные хлопья", "Пшеничные хлопья", "Соевые хлопья"],
                sr: ["Mak", "Suncokret", "Kikiriki", "Ovsene pahuljice", "Ražene pahuljice", "Pšenične pahuljice", "Sojine pahuljice"]
            }
        },
        {
            name: "Уладар",
            description: { ru: "Крупнейшее зерноперерабатывающее предприятие Республики Беларусь", sr: "Najveće preduzeće za preradu žitarica u Republici Belorusiji" },
            website: "https://uladar.by/",
            products: {
                ru: ["Мука пшеничная", "Макаронные изделия", "Крупы", "Комбикорм", "Мясные полуфабрикаты", "Молочная продукция"],
                sr: ["Pšenično brašno", "Testenine", "Žitarice", "Stočna hrana", "Mesni poluproizvodi", "Mlečni proizvodi"]
            }
        }
    ];

    let filteredCompanies = companies.filter(company =>
        company.name.toLowerCase().includes(query) || 
        company.description[lang].toLowerCase().includes(query) || 
        company.products[lang].some(product => product.toLowerCase().includes(query))
    );

    resultsContainer.innerHTML = "";

    if (filteredCompanies.length > 0) {
        filteredCompanies.forEach(company => {
            const companyCard = `
                <div class="company-card">
                    <h2 class="company-name">${company.name}</h2>
                    <p class="company-description">${company.description[lang]}</p>
                    // <p><strong>🌍 ${translations[lang]["website"]}:</strong> <a href="${company.website}" target="_blank">${company.website}</a></p>
                    <p><strong>🛒 ${translations[lang]["products"]}:</strong> ${company.products[lang].join(", ")}</p>
                </div>
            `;
            resultsContainer.innerHTML += companyCard;
        });
    } else {
        resultsContainer.innerHTML = `<p class="no-results">${translations[lang]["noResults"]}</p>`;
    }
});
