// const countries = {
//     serbia: {
//         name: "Сербия",
//         map: "images/serbia-map.png",
//         cities: {
//             "belgrade": {
//                 name: "Белград",
//                 companies: [
//                     { name: "Golden Fruit Доо", description: "Производство и реализация замороженной вишни, малины и других фруктов. Представители в России и Беларуси." }
//                 ]
//             },
//             "novi-sad": {
//                 name: "Нови-Сад",
//                 companies: [
//                     { name: "Компания 2", description: "Описание компании 2..." }
//                 ]
//             },
//             "nis": {
//                 name: "Ниш",
//                 companies: [
//                     { name: "Компания 3", description: "Описание компании 3..." }
//                 ]
//             }
//         }
//     },
//     russia: {
//         name: "Россия",
//         map: "images/russia-map.png",
//         cities: {
//             "moscow": {
//                 name: "Москва",
//                 companies: [
//                     { name: "Компания 4", description: "Описание компании 4..." }
//                 ]
//             }
//         }
//     },
//     belarus: {
//         name: "Беларусь",
//         map: "images/belarus-map.png",
//         cities: {
//             "minsk": {
//                 name: "Минск",
//                 companies: [
//                     { name: "Компания 5", description: "Описание компании 5..." }
//                 ]
//             }
//         }
//     }
// };


document.addEventListener('DOMContentLoaded', function() {

    const user = JSON.parse(localStorage.getItem("user"));
    const logoutBtn = document.getElementById("logout-btn");

    if (user && user.status.toLowerCase() === "ok") {
        document.getElementById("partners").style.display = "block";
        document.getElementById("blacklist").style.display = "block";
        
        logoutBtn.style.display = "block";

        document.getElementById("login-btn").style.display = "none";
        document.getElementById("register-btn").style.display = "none";
        
    } else {
        document.getElementById("partners").style.display = "none";
        document.getElementById("blacklist").style.display = "none";
        
        logoutBtn.style.display = "none";

        document.getElementById("login-btn").style.display = "block";
        document.getElementById("register-btn").style.display = "block";
    }

    logoutBtn.addEventListener("click", function () {
        localStorage.removeItem("user"); // Удаляем пользователя
        alert("Вы вышли из аккаунта!");
        window.location.reload(); // Перезагружаем страницу
    });

    const searchInput = document.querySelector(".search-input");

    if (searchInput) {
        searchInput.addEventListener("focus", function (event) {
            const user = JSON.parse(localStorage.getItem("user"));

            if (!user) {
                event.preventDefault();
                searchInput.blur(); // Убираем фокус с поля ввода
                alert("🔒 Чтобы воспользоваться поиском, авторизуйтесь!");
            }
        });
    }



    const countryButtons = document.querySelectorAll('.country-button');
    const maps = document.querySelectorAll('.map');
    const mapPoints = document.querySelectorAll('.map-point');
    const popup = document.getElementById('popup');

    const popupText = document.getElementById("popup-text");
    // const popupText = document.getElementById('popup-text');
    // const companyDetails = document.getElementById('company-details');
    const close = document.getElementById('close');

    const popupCompanyDetailsContainer = document.getElementById("popup-company-details");
    
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');
    const navLinks = document.querySelectorAll('.nav ul li a');

    const yearSpan = document.getElementById('current-year');

    // const companies = {
    //     moscow: [
    //         {
    //             name: 'Компания 1',
    //             description: 'Краткое описание компании 1 в Москве.',
    //             moreInfo: 'Полное описание компании 1 в Москве.'
    //         }
    //     ],
    //     belgrade: [
    //         {
    //             name: 'Компания A',
    //             description: 'Краткое описание компании A в Белграде.',
    //             moreInfo: 'Полное описание компании A в Белграде.'
    //         },
    //         {
    //             name: 'Компания B',
    //             description: 'Краткое описание компании B в Белграде.',
    //             moreInfo: 'Полное описание компании B в Белграде.'
    //         },
    //         {
    //             name: 'Компания C',
    //             description: 'Краткое описание компании C в Белграде.',
    //             moreInfo: 'Полное описание компании C в Белграде.'
    //         }
    //     ],
    //     minsk: [
    //         {
    //             name: 'Компания X',
    //             description: 'Краткое описание компании X в Минске.',
    //             moreInfo: 'Полное описание компании X в Минске.'
    //         }
    //     ]
    // };

    function showMap(countryId) {
        // Скрываем все карты
        maps.forEach(map => map.style.display = 'none');
        // Показываем выбранную карту
        document.getElementById(countryId).style.display = 'block';
    }

    countryButtons.forEach(button => {
        button.addEventListener('click', function () {
            const selectedCountry = this.getAttribute('data-country');
            setLanguageCookie(selectedCountry);
            switch (selectedCountry) {
                case 'sr':
                    showMap('serbia');
                    break;
                case 'ru':
                    showMap('russia');
                    break;
                case 'be':
                    showMap('belarus');
                    break;
            }
        });
    });

    function setLanguageCookie(lang) {
        document.cookie = `django_language=${lang}; path=/`;
    }

    mapPoints.forEach(point => {
        point.addEventListener("click", function () {
            const city = this.getAttribute("data-city");
            console.log(`Clicked city: ${city}`);
            showCompanies(city);
        });
    });

    close.addEventListener('click', function() {
        popup.style.display = 'none';
    });

    window.addEventListener('click', function(event) {
        if (event.target == popup) {
            popup.style.display = 'none';
        }
    });

    function showCompanies(city) {
        const companies = document.querySelectorAll(`.company[data-city='${city}']`);
        popupCompanyDetailsContainer.innerHTML = ""; // Очищаем только попап
    
        if (companies.length > 0) {
            let companyList = "<ul>";
            companies.forEach(company => {
                const companyName = company.querySelector("h3").textContent;
                const companyInfo = company.querySelector("p").textContent;
                companyList += `<li><strong>${companyName}</strong>: ${companyInfo}</li>`;
            });
            companyList += "</ul>";
            popupCompanyDetailsContainer.innerHTML = companyList;
        } else {
            companyDetailsContainer.innerHTML = `<p>${translations[currentLanguage]['noCompanies']}</p>`;
        }

        popup.style.display = "block";
        console.log("Current language:", currentLanguage);
        console.log("City:", city);
        console.log("Translation:", translations[currentLanguage]['companiesInCity']);

        popupText.textContent = `${translations[currentLanguage]['companiesInCity']}: ${translations[currentLanguage][city] || city}`;
    }

    menuToggle.addEventListener('click', () => {
        nav.classList.toggle('nav-open');
    });

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            // Закрытие меню
            nav.classList.remove('nav-open');

            // Плавный переход
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        });
    });

    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // function toggleMapAndList() {
    //     const mapSection = document.querySelector('.map-container');
    //     const companyListSection = document.getElementById('company-list-section');

    //     if (window.innerWidth <= 768) {
    //         mapSection.style.display = 'none';
    //         companyListSection.style.display = 'block';
    //     } else {
    //         mapSection.style.display = 'block';
    //         companyListSection.style.display = 'none';
    //     }
    // }

    // toggleMapAndList();

    // window.addEventListener('resize', toggleMapAndList);

});

let currentLanguage = 'ru';

function switchLanguage(language) {
    currentLanguage = language;
    const elements = document.querySelectorAll('[data-translate]');

    elements.forEach(el => {
        const key = el.getAttribute('data-translate');
        el.innerText = translations[language][key];
    });

    const searchInput = document.querySelector(".search-input");
    if (searchInput) {
        searchInput.placeholder = translations[language]["searchPlaceholder"];
    }
}

const translations = {
    ru: {
        headerTitle: "ООО Адриатик Групп",

        navAbout: "О нас",
        navServices: "Услуги",
        navContact: "Контакты",

        searchPlaceholder: "Что вы ищете?",

        logout: "Выйти из аккаунта",
        login: "Войти",
        register: "Регистрация",

        countrySelectionTitle: "Выберите страну",
        countrySerb: "Сербия",
        countryRus: "Россия",
        countryBel: "Беларусь",
        mapTitle: "Карта",
        belgrade: "Белград",
        moscow: "Москва",
        minsk: "Минск",
        brest: "Брест",
        grodno: "Гродно",
        gomel: "Гомель",
        vitebsk: "Витебск",
        mogilev: "Могилёв",
        kaliningrad: "Калининград",
        stPetersburg: "Санкт-Петербург",
        novosibirsk: "Новосибирск",
        yekaterinburg: "Екатеринбург",
        nn: "Нижний Новгород",
        samara: "Самара",
        omsk: "Омск",
        kazan: "Казань",
        chelyabinsk: "Челябинск",
        rostov: "Ростов-на-Дону",
        ufa: "Уфа",
        volgograd: "Волгоград",
        kraljevo: "Кралево",
        zrenjanin: "Зренянин",
        pirot: "Пирот",
        sombor: "Сомбор",
        knjazevac: "Княжевац",
        ivanica: "Иваница",
        negotin: "Неготин",
        zajecar: "Заечар",
        senica: "Сеница",

        companiesInCity: "Компании в городе",
        noCompanies:"Нет компаний в этом городе.",

        aboutUsTitle: "О нас",
        aboutUsText: "Наша миссия обеспечить компаниям ответственного партнёра и посредника в бизнесе консалтинга и логистики, быстрее получать информацию и вместе решать выставленные задачи и самое главное быть главным звеном по сотрудничеству между Сербии, России и Беларуси и вместе с нашими партнёрами поднимать экономику наших историческо дружественных стран.",
        
        servicesTitle: "Услуги",
        service1: "Агентские услуги",
        service2: "Экспорт импорт",
        service3: "Поиск надёжных партнёров в Сербии",
        service4: "Консультационные услуги поставки товаров на Сербию и из Сербии",

        contactTitle: "Контакты",
        contactText: "ООО Адриатик Групп",
        contactPhone: "Контакт телефон Viber/WhatsApp: +375292815954",

        advertisementTitle: "Реклама",

        partnersTitle: "Наши партнёры",

        blacklistTitle: "Черный список компаний",

        footerContacts: "Контакты",
        footerPhone: "Телефон Viber/WhatsApp: +375292815954",
        footerEmail1: "Email: jadran3110@gmail.com",
        footerEmail2: "Email: adriatikgrupp@mail.ru",
        footerLinks: "Полезные ссылки",
        footerPrivacy: "Политика конфиденциальности",
        footerTerms: "Условия использования",
        footerFAQ: "Часто задаваемые вопросы",
        footerCopy: "© ООО Адриатик Групп. Все права защищены.",

        GoldenFruit: "Golden Fruit d.o.o. - ведущий производитель и поставщик замороженных ягод и фруктов, специализирующийся на высококачественной чернике и других продуктах. Они предлагают надежные и экологически чистые продукты для клиентов по всему миру.",
        MMNFruit: "MMN Fruit - крупный поставщик фруктов, специализирующийся на различных видах свежих и замороженных продуктов. Компания обеспечивает высокое качество и широкий ассортимент продукции для удовлетворения потребностей клиентов.",
    
        company1_moscow: "Краткая информация о компании 1 в Москве.",
        company2_moscow: "Краткая информация о компании 2 в Москве.",
        company1_belgrade: "Краткая информация о компании 1 в Белграде.",
    },
    sr: {
        headerTitle: "ADRIATIC GROUP DOO",

        navAbout: "O nama",
        navServices: "Usluge",
        navContact: "Kontakti",

        searchPlaceholder: "Šta tražite?",

        logout: "Odjavi se",
        login: "Prijavi se",
        register: "Registracija",

        countrySelectionTitle: "Izaberite zemlju",

        countrySerb: "Србија",
        countryRus: "Русија",
        countryBel: "Белорусија",
        mapTitle: "Mapa",
        belgrade: "Beograd",
        moscow: "Moskva",
        minsk: "Minsk",
        brest: "Brest",
        grodno: "Grodno",
        gomel: "Gomel",
        vitebsk: "Vitebsk",
        mogilev: "Mogilev",
        kaliningrad: "Kaliningrad",
        stPetersburg: "Sankt Peterburg",
        novosibirsk: "Novosibirsk",
        yekaterinburg: "Jekaterinburg",
        nn: "Nižnji Novgorod",
        samara: "Samara",
        omsk: "Omsk",
        kazan: "Kazan",
        chelyabinsk: "Čeljabinsk",
        rostov: "Rostov na Donu",
        ufa: "Ufa",
        volgograd: "Volgograd",
        kraljevo: "Kraljevo",
        zrenjanin: "Zrenjanin",
        pirot: "Pirot",
        sombor: "Sombor",
        knjazevac: "Knjaževac",
        ivanica: "Ivanjica",
        negotin: "Negotin",
        zajecar: "Zaječar",
        senica: "Sjenica",

        companiesInCity: "Kompanije u gradu",
        noCompanies: "Nema kompanija u ovom gradu.",

        aboutUsTitle: "O nama",
        aboutUsText: "Naša misija je da našim partnerima obezbedimo odgovornog partnera i posrednika u poslovima konsaltinga i logistike, brzo dobijamo informacije i rešavamo postavljene zadatke, i što je najvažnije, budemo glavna karika u saradnji Srbije,Rusije i Belorusije,i da zajedno sa našim partnerima  unapredimo ekonomski razvoj naših istorijski prijateljskih zemalja.",
        
        servicesTitle: "Usluge",
        service1: "Agentske usluge",
        service2: "Uvoz i izvoz",
        service3: "Pretraga pouzdanih partnera u Srbiji",
        service4: "Konsultantske usluge u vezi sa isporukom roba u Srbiju i iz Srbije",

        contactTitle: "Kontakti",
        contactText: "ADRIATIC GROUP DOO",
        contactPhone: "Kontakt telefon Viber/WhatsApp: +375292815954",
        contactEmail1: "Email: jadran3110@gmail.com",
        contactEmail2: "Email: adriatikgrupp@mail.ru",

        advertisementTitle: "Reklama",

        partnersTitle: "Naši partneri",

        blacklistTitle: "Crna lista kompanija",

        footerContacts: "Kontakti",
        footerPhone: "Telefon Viber/WhatsApp: +375292815954",
        footerLinks: "Korisni linkovi",
        footerPrivacy: "Politika privatnosti",
        footerTerms: "Uslovi korišćenja",
        footerFAQ: "Često postavljana pitanja",
        footerCopy: "© ADRIATIC GROUP DOO. Sva prava zadržana.",

        GoldenFruit: "Golden Fruit d.o.o. je vodeći proizvođač i dobavljač smrznutog bobičastog voća i voća, specijalizovan za kvalitetne borovnice i druge proizvode. Oni nude pouzdane i ekološke proizvode kupcima širom sveta.",
        MMNFruit: "MMN Voće je veliki dobavljač voća specijalizovan za razne vrste svežih i smrznutih proizvoda. Kompanija obezbeđuje visok kvalitet i širok spektar proizvoda kako bi zadovoljila potrebe kupaca.",
    
        company1_moscow: "Kratke informacije o kompaniji 1 u Moskvi.",
        company2_moscow: "Kratke informacije o kompaniji 2 u Moskvi.",
        company1_belgrade: "Kratke informacije o kompaniji 1 u Beogradu.",
    }
};


