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
        },
        en: {
            searchResultsTitle: "Search Results",
            backToHome: "🏠 Back to Home",
            products: "Products",
            services: "Services",
            noResults: "❌ Nothing found."
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
            description: {
                ru: "Производитель ягод",
                sr: "Proizvođač bobičastog voća",
                en: "Berry producer"
            },
            website: "https://goldenfruit.com",
            products: {
                ru: ["Малина свежая", "Малина замороженная", "Ежевика культивированная"],
                sr: ["Sveža malina", "Zamrznuta malina", "Uzgojena kupina"],
                en: ["Fresh raspberry", "Frozen raspberry", "Cultivated blackberry"]
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
                ],
                en: [
                    "Production and freezing of high-quality berries",
                    "Wholesale of fresh and frozen berries",
                    "Environmentally friendly cultivation and processing methods",
                    "Modern IQF freezing technologies",
                    "Custom packaging and logistics",
                    "Quality control guarantee at all stages"
                ]
            },
        },
        { 
            name: "MMN Fruit",
            description: {
                ru: "Поставщик свежих фруктов",
                sr: "Dobavljač svežeg voća",
                en: "Fresh fruit supplier"
            },
            website: "https://mmnfruit.com",
            products: {
                ru: ["Малина замороженная", "Клубника замороженная", "Черника замороженная"],
                sr: ["Zamrznuta malina", "Zamrznuta jagoda", "Zamrznuta borovnica"],
                en: ["Frozen raspberry", "Frozen strawberry", "Frozen blueberry"]
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
                ],
                en: [
                    "Wholesale supply of fresh and frozen berries and fruits",
                    "Quality control at all production stages",
                    "Custom packaging and labeling",
                    "Logistics and delivery organization",
                    "Consultations on product assortment and storage",
                    "Purchasing berries and fruits from producers"
                ]
            }
        },
        {
            name: "Sinagoga doo",
            description: {
                ru: "Оптовая торговля, упаковка, производство хлопьев и орехов.",
                sr: "Veleprodaja, pakovanje, proizvodnja pahuljica i orašastih plodova.",
                en: "Wholesale trade, packaging, production of flakes and nuts."
            },
            website: "https://www.sinagoga.co.rs/",
            products: {
                ru: ["Мак", "Подсолнечник", "Арахис", "Овсяные хлопья", "Ржаные хлопья", "Пшеничные хлопья", "Соевые хлопья"],
                sr: ["Mak", "Suncokret", "Kikiriki", "Ovsene pahuljice", "Ražene pahuljice", "Pšenične pahuljice", "Sojine pahuljice"],
                en: ["Poppy seeds", "Sunflower", "Peanuts", "Oat flakes", "Rye flakes", "Wheat flakes", "Soy flakes"]
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
                ],
                en: [
                    "Wholesale of agricultural products",
                    "Packaging and packing of products",
                    "Production and processing of flakes",
                    "Quality control of raw materials and finished products",
                    "Logistics and transportation",
                    "Consultations on product selection and cooperation"
                ]
            }
        },
        {
            name: "Уладар",
            description: {
                ru: "Крупнейшее зерноперерабатывающее предприятие Республики Беларусь",
                sr: "Najveće preduzeće za preradu žitarica u Republici Belorusiji",
                en: "The largest grain processing enterprise in the Republic of Belarus"
            },
            website: "https://uladar.by/",
            products: {
                ru: ["Мука пшеничная", "Макаронные изделия", "Крупы", "Комбикорм", "Мясные полуфабрикаты", "Молочная продукция"],
                sr: ["Pšenično brašno", "Testenine", "Žitarice", "Stočna hrana", "Mesni poluproizvodi", "Mlečni proizvodi"],
                en: ["Wheat flour", "Pasta products", "Groats", "Compound feed", "Meat semi-finished products", "Dairy products"]
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
                ],
                en: [
                    "Production and sale of compound feed for farm animals",
                    "Supply of grains and feed additives",
                    "Analysis and development of animal nutrition rations",
                    "Consultations on feeding and optimization of feeding programs",
                    "Transportation and logistics of agricultural products",
                    "Quality control of products at all stages of production"
                ]
            }
        },
        {
            name: "SadBerry",
            description: {
                ru: "Оптовая торговля свежими и замороженными ягодами. Прием ягод у населения",
                sr: "Veleprodaja svežeg i zamrznutog bobičastog voća. Otkupljivanje voća od stanovništva",
                en: "Wholesale trade of fresh and frozen berries. Berry procurement from the population"
            },
            website: "https://sadberry.by/",
            products: {
                ru: [
                    "Свежие ягоды",
                    "Замороженные ягоды",
                    "Замороженная вишня без косточки",
                    "Овощи для заморозки",
                    "Полуфабрикаты из ягод"
                ],
                sr: [
                    "Sveže bobice",
                    "Zamrznute bobice",
                    "Zamrznuta višnja bez koštica",
                    "Povrće za zamrzavanje",
                    "Poluproizvodi od bobičastog voća"
                ],
                en: [
                    "Fresh berries",
                    "Frozen berries",
                    "Frozen pitted cherries",
                    "Vegetables for freezing",
                    "Berry semi-finished products"
                ]
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
                ],
                en: [
                    "Wholesale trade of fresh and frozen berries",
                    "Berry procurement from the population and farms",
                    "Pitting services for cherries",
                    "Modern IQF freezing technologies",
                    "Strict quality control at all stages",
                    "Flexible cooperation terms"
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
