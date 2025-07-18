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
            products: "Продукция",
            services: "Услуги",
            noResults: "❌ Ничего не найдено."
        },
        sr: {
            searchResultsTitle: "Rezultati pretrage",
            backToHome: "🏠 Nazad na početnu",
            products: "Proizvodi",
            services: "Usluge",
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
            },
            services: {
                ru: [
                    "Производство и заморозка ягод высокого качества",
                    "Оптовая продажа свежих и замороженных ягод",
                    "Экологически чистые методы выращивания и обработки",
                    "Современные технологии IQF заморозки",
                    "Индивидуальная упаковка и логистика",
                    "Гарантия контроля качества на всех этапах"
                ],
                sr: [
                    "Proizvodnja i zamrzavanje visokokvalitetnog voća",
                    "Veleprodaja svežeg i zamrznutog bobičastog voća",
                    "Ekološki čiste metode uzgoja i obrade",
                    "Savremene IQF tehnologije zamrzavanja",
                    "Individualno pakovanje i logistika",
                    "Garancija kontrole kvaliteta u svim fazama"
                ]
            }
        },
        { 
            name: "MMN Fruit", 
            description: { ru: "Поставщик свежих фруктов", sr: "Dobavljač svežeg voća" },
            website: "https://mmnfruit.com",
            products: {
                ru: ["Малина замороженная", "Клубника замороженная", "Черника замороженная"],
                sr: ["Zamrznuta malina", "Zamrznuta jagoda", "Zamrznuta borovnica"]
            },
            services: {
                ru: [
                    "Оптовая поставка свежих и замороженных ягод и фруктов",
                    "Контроль качества продукции на всех этапах",
                    "Индивидуальная упаковка и маркировка под заказ",
                    "Логистика и организация доставки",
                    "Консультации по ассортименту и хранению продукции",
                    "Закупка ягод и фруктов у производителей"
                ],
                sr: [
                    "Veleprodaja svežeg i zamrznutog voća i bobičastog voća",
                    "Kontrola kvaliteta proizvoda u svim fazama",
                    "Individualno pakovanje i označavanje po narudžbini",
                    "Logistika i organizacija isporuke",
                    "Konsultacije o asortimanu i skladištenju proizvoda",
                    "Nabavka voća i bobica od proizvođača"
                ]
            }
        },
        {
            name: "Sinagoga doo",
            description: { ru: "Оптовая торговля, упаковка, производство хлопьев и орехов.", sr: "Veleprodaja, pakovanje, proizvodnja pahuljica i orašastih plodova." },
            website: "https://www.sinagoga.co.rs/",
            products: {
                ru: ["Мак", "Подсолнечник", "Арахис", "Овсяные хлопья", "Ржаные хлопья", "Пшеничные хлопья", "Соевые хлопья"],
                sr: ["Mak", "Suncokret", "Kikiriki", "Ovsene pahuljice", "Ražene pahuljice", "Pšenične pahuljice", "Sojine pahuljice"]
            },
            services: {
                ru: [
                    "Оптовая торговля сельскохозяйственными продуктами",
                    "Упаковка и фасовка продукции",
                    "Производство и переработка хлопьев",
                    "Контроль качества сырья и готовой продукции",
                    "Логистика и транспортировка",
                    "Консультации по выбору продукции и сотрудничеству"
                ],
                sr: [
                    "Veleprodaja poljoprivrednih proizvoda",
                    "Pakovanje i pakovanje proizvoda",
                    "Proizvodnja i prerada pahuljica",
                    "Kontrola kvaliteta sirovina i gotovih proizvoda",
                    "Logistika i transport",
                    "Konsultacije o izboru proizvoda i saradnji"
                ]
            }
        },
        {
            name: "Уладар",
            description: { ru: "Крупнейшее зерноперерабатывающее предприятие Республики Беларусь", sr: "Najveće preduzeće za preradu žitarica u Republici Belorusiji" },
            website: "https://uladar.by/",
            products: {
                ru: ["Мука пшеничная", "Макаронные изделия", "Крупы", "Комбикорм", "Мясные полуфабрикаты", "Молочная продукция"],
                sr: ["Pšenično brašno", "Testenine", "Žitarice", "Stočna hrana", "Mesni poluproizvodi", "Mlečni proizvodi"]
            },
            services: {
                ru: [
                    "Производство и продажа комбикормов для сельскохозяйственных животных",
                    "Поставка зерновых и кормовых добавок",
                    "Анализ и разработка рационов питания для животных",
                    "Консультации по кормлению и оптимизации кормовых программ",
                    "Транспортировка и логистика сельхозпродукции",
                    "Контроль качества продукции на всех этапах производства"
                ],
                sr: [
                    "Proizvodnja i prodaja smeša za ishranu poljoprivrednih životinja",
                    "Snabdevanje žitaricama i dodacima za hranu",
                    "Analiza i razvoj ishrane za životinje",
                    "Konsultacije o ishrani i optimizaciji hranidbenih programa",
                    "Transport i logistika poljoprivrednih proizvoda",
                    "Kontrola kvaliteta proizvoda u svim fazama proizvodnje"
                ]
            }
        },
        {
            name: "SadBerry",
            description: { ru: "Оптовая торговля свежими и замороженными ягодами. Прием ягод у населения", sr: "Veleprodaja svežeg i zamrznutog bobičastog voća. Otkupljivanje voća od stanovništva" },
            website: "https://sadberry.by/",
            products: {
                ru: ["Свежие ягоды", "Замороженные ягоды", "Замороженная вишня без косточки", "Овощи для заморозки", "Полуфабрикаты из ягод"],
                sr: ["Sveže bobice", "Zamrznute bobice", "Zamrznuta višnja bez koštica", "Povrće za zamrzavanje", "Poluproizvodi od bobičastog voća"]
            },
            services: {
                ru: [
                    "Оптовая торговля свежими и замороженными ягодами",
                    "Прием ягод у населения и фермерских хозяйств",
                    "Услуги по удалению косточки из вишни",
                    "Современные технологии заморозки IQF",
                    "Строгий контроль качества на всех этапах",
                    "Гибкие условия сотрудничества"
                ],
                sr: [
                    "Veleprodaja svežih i zamrznutih bobica",
                    "Prijem bobica od stanovništva i poljoprivrednih gazdinstava",
                    "Usluge uklanjanja koštica iz višanja",
                    "Savremene tehnologije zamrzavanja IQF",
                    "Stroga kontrola kvaliteta na svim fazama",
                    "Fleksibilni uslovi saradnje"
                ]
            }
        }
    ];

    let filteredCompanies = companies.filter(company =>
        company.name.toLowerCase().includes(query) || 
        company.description[lang].toLowerCase().includes(query) || 
        company.products[lang].some(product => product.toLowerCase().includes(query))||
        (company.services?.[lang]?.some(service => service.toLowerCase().includes(query)))
    );

    resultsContainer.innerHTML = "";

    if (filteredCompanies.length > 0) {
        filteredCompanies.forEach(company => {
            const companyCard = `
                <div class="company-card">
                    <h2 class="company-name">${company.name}</h2>
                    <p class="company-description">${company.description[lang]}</p>
                    <p><strong>🛒 ${translations[lang]["products"]}:</strong> ${company.products[lang].join(", ")}</p>
                    ${
                        company.services && company.services[lang]?.length
                        ? `<p><strong>🛠️ ${translations[lang]["services"]}:</strong></p>
                        <ul class="services-list">
                            ${company.services[lang].map(service => `<li>${service}</li>`).join("")}
                        </ul>`
                        : ""
                    }
                </div>
            `;
            resultsContainer.innerHTML += companyCard;
        });
    } else {
        resultsContainer.innerHTML = `<p class="no-results">${translations[lang]["noResults"]}</p>`;
    }
});
