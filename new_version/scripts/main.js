document.addEventListener('DOMContentLoaded', function() {  
    
    //куки
    function getCookie(name) {
        let match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
        return match ? match[2] : null;
    }

    function setCookie(name, value, days) {
        let expires = new Date();
        expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
        document.cookie = `${name}=${value}; path=/; expires=${expires.toUTCString()}; SameSite=Lax`;
    }

    const cookieBanner = document.getElementById("cookie-banner");
        const acceptButton = document.getElementById("accept-cookies");

        if (!getCookie("cookiesAccepted")) {
            cookieBanner.classList.add("show");
        }

        acceptButton.addEventListener("click", function () {
            setCookie("cookiesAccepted", "true", 365);
            cookieBanner.classList.remove("show");
        });

    //конец куки



    const user = JSON.parse(localStorage.getItem("user"));
    const logoutBtn = document.getElementById("logout-btn");

    const urlParams = new URLSearchParams(window.location.search);
    let lang = urlParams.get("lang") || localStorage.getItem("selectedLanguage") || "ru";
    if (!urlParams.has("lang")) {
        window.history.replaceState({}, "", `?lang=${lang}`);
    }
    switchLanguage(lang);
    

    if (user && user.status.toLowerCase() === "ok") {
        document.getElementById("partnersTitle-btn").style.display = "block";
        
        logoutBtn.style.display = "block";

        document.getElementById("login-btn").style.display = "none";
        document.getElementById("register-btn").style.display = "none";
        
    } else {
        document.getElementById("partnersTitle-btn").style.display = "none";
        
        logoutBtn.style.display = "none";

        document.getElementById("login-btn").style.display = "block";
        document.getElementById("register-btn").style.display = "block";
    }

    logoutBtn.addEventListener("click", function () {
        localStorage.removeItem("user"); // Удаляем пользователя
        alert("You've logged out of your account!");
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
    const close = document.getElementById('close');

    const popupCompanyDetailsContainer = document.getElementById("popup-company-details");
    
    

    const yearSpan = document.getElementById('current-year');

    function showMap(countryId) {
        if (window.innerWidth > 768) {  // Проверка на мобильное устройство
            console.log(`Показываем карту: ${countryId}`);
            maps.forEach(map => {
                map.style.display = 'none';
                console.log(`Скрываем карту: ${map.id}`);
            });
    
            const selectedMap = document.getElementById(countryId);
            if (selectedMap) {
                selectedMap.style.display = 'block';
                console.log(`Отобразили карту: ${countryId}`);
            } else {
                console.log(`Карта ${countryId} не найдена!`);
            }
        }
    }
    

    countryButtons.forEach(button => {
        button.addEventListener('click', function () {
            const selectedCountry = this.getAttribute('data-country');
            console.log(`Выбрана страна: ${selectedCountry}`); // Логируем выбранную страну
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
        const companyDetailsContainer = document.getElementById("company-details");
        companyDetailsContainer.style.display = "block";

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
        }

        popup.style.display = "block";
        console.log("Current language:", currentLanguage);
        console.log("City:", city);
        console.log("Translation:", translations[currentLanguage]['companiesInCity']);

        popupText.textContent = `${translations[currentLanguage]['companiesInCity']}: ${translations[currentLanguage][city] || city}`;
    }


    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector(".nav");

    const navLinks = document.querySelectorAll('.nav ul li a');

    menuToggle.addEventListener("click", function () {
        if (window.innerWidth <= 1280) { 
            nav.classList.toggle("nav-open");
            this.classList.toggle("open");
        }
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




    // Цифры

    const counters = document.querySelectorAll(".stat-number");

    counters.forEach(counter => {
        const target = +counter.getAttribute("data-target"); // Получаем целевое значение
        const unit = counter.getAttribute("data-unit") || ""; // Получаем единицу измерения

        let count = 0;
        const increment = target / 300; // Делим число на 100 шагов

        const updateCounter = () => {
            if (count < target) {
                count += increment;
                counter.textContent = Math.floor(count) + unit; // Добавляем единицу измерения
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target + unit; // Финальное значение с единицей измерения
            }
        };

        updateCounter();
    });

    // Кнопка вверх

    const scrollBtn = document.getElementById("scrollToTop");

    window.addEventListener("scroll", function () {
        if (window.scrollY > 300) {
            scrollBtn.style.display = "flex";
        } else {
            scrollBtn.style.display = "none";
        }
    });

    scrollBtn.addEventListener("click", function () {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });

});

function saveSearchQuery() {
    const searchLang = document.getElementById("searchLang");
    searchLang.value = localStorage.getItem("selectedLanguage") || "ru";
}


const searchLang = document.getElementById("searchLang");
    if (searchLang) {
        searchLang.value = localStorage.getItem("selectedLanguage") || "ru";
    }

let currentLanguage = 'ru';

function switchLanguage(language) {
    
    currentLanguage = language;
    localStorage.setItem("selectedLanguage", language); // Сохраняем язык
    const elements = document.querySelectorAll('[data-translate]');

    elements.forEach(el => {
        const key = el.getAttribute('data-translate');
        el.innerHTML = translations[language][key];
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
        borisov: "Борисов",
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
        arile: "Арилье",
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

        company_list_title: "Компании-партнеры",

        aboutUsTitle: "О нас",
        aboutUsText: "Наша миссия обеспечить компаниям ответственного партнёра и посредника в бизнесе консалтинга и логистики, быстрее получать информацию и вместе решать выставленные задачи и самое главное быть главным звеном по сотрудничеству между Сербии, России и Беларуси и вместе с нашими партнёрами поднимать экономику наших историческо дружественных стран.",
        
        servicesTitle: "Наши услуги",
        service1: "Экспорт импорт",
        service2: "Агентские услуги",
        service3: "Поиск и подбор надёжных контрагентов в Сербии, России и Беларуси",
        service4: "Проверка компании в Сербии, России и Беларуси",
        service5: "Выступаем от Вашего лица в переговорах на сербском и русском языках",
        service6: "Юридические услуги и поддержка",
        service7: "Составление договоров",

        contactTitle: "Контакты",
        contactText: "ООО Адриатик Групп",
        contactPhone: "Контакт телефон Viber/WhatsApp: +375292815954",

        advertisementTitle: "Рекламное место доступно! 🚀",
        advertisementText: "Хотите, чтобы о вашей компании узнали? Разместите рекламу здесь и привлеките новых клиентов!",
        advertisementCallToAction: "📢 Закажите рекламу уже сегодня!",
        advertisementContact: "Для подробной информации свяжитесь с нами:",

        statsTitle: "Наши достижения",
        GlassJar: "Стеклянная банка тип 720 <br> Беларусь → Сербия",
        SemiFinishedMix: "Смесь полуфабрикатов <br> Беларусь → Сербия",
        FoodPotato: "Картофель продовольственный <br> Беларусь → Сербия",
        FrozenPotato: "Картофель замороженный <br> Беларусь → Сербия",
        Raspberry: "Малина гриз <br> Сербия → Беларусь",
        FrozenCherry: "Вишня замороженная <br> Сербия → Беларусь",
        Onion: "Лук репчатый <br> Россия → Сербия",
        FrozenPotatoRU: "Замороженный картофель <br> Россия → Сербия",
        


        ProductsWeOffer: "Продукция, с которой мы работаем",
  
        // Категории
        FrozenFruits: "🧊 Замороженная продукция",
        FrozenVegetables: "🥕 Замороженные овощи",
        FreshProducts: "🌱 Свежая продукция",
        PackagingAndDelivery: "📦 Упаковка и поставка",
      
        // Замороженные фрукты
        Raspberry9010: "Малина 90/10",
        Raspberry905: "Малина 90/5",
        RaspberryCrumb: "Малина грис",
        CherryBK: "Вишня БК",
        Blueberry: "Черника",
        Bilberry: "Голубика",
      
        // Замороженные овощи
        FriesStrips: "Картофель соломка 4x4 – 10x10",
        PotatoCubes: "Картофель кубик 4x4 – 10x10",
        Wedges: "Картофельные дольки",
        CarrotStrips: "Морковь соломка 4x4 – 10x10",
        CarrotCubes: "Морковь кубик 4x4 – 10x10",
        CarrotDiscs: "Морковь шайба (1.5–9мм, 1–4см)",
        BeetCubes: "Свекла кубик 4x4 – 10x10",
      
        // Свежая продукция
        PotatoFresh: "Картофель продовольственный 5+",
        CarrotFresh: "Морковь",
        CabbageFresh: "Капуста",
        BeetFresh: "Свекла",
      
        // Упаковка
        FrozenPackaging: "Заморозка: коробки по 10 кг, 63 коробки на паллете, 20 160 кг в машине.",
        FreshPackaging: "Свежая продукция: мешки-сетка 10 и 25 кг, Биг Беги, возможна поставка на паллетах и без.",



        partnersTitle: "Наши партнёры",

        // Черный список
        blacklistTitle: "Черный список компаний",
        company1Name: "КФХ АГРОМАРАФОН",
        inn: "ИНН:",
        head: "Глава:",
        address: "Юридический адрес:",
        company1Head: "Борисов Евгений Владимирович",
        company1Address: "241029, Брянская область, г Брянск, Красноармейская ул. д. 126/1 офис 202а",
        reason: "Причина не работать с этой компанией:",
        company1Reason: "Брали денег от сербской компании на поставку картофеля в размере 688.000 рублей и не поставили картофель, а деньги присвоили, вернули только 50 тысяч рублей. Рекомендуем не работать с данной компанией.",

        company2Name: "ООО САУЛ-КОРП",
        unp: "УНП:",
        director: "Директор:",
        company2Director: "Миранович Вадим Владимирович",
        company2Address: "223039, Минская обл., Минский р-н, Ждановичский с/с, район деревни Таборы, здание административно-хозяйственное, комната 39А",
        otherCompanies: "У этого поставщика есть и другие компании и просим Вас обратить внимание:",
        company2Other1: "ООО ВИТАДИМ",
        company2Other2: "ИП Миранович Вадим Владимирович",
        company2Other3: "ООО Эмерсис Трейд",
        company2Other4: "ООО Белорехпром",
        company2Other5: "ООО СВ-фрукт",
        company2Reason: "Поставляли некачественный товар, конкретно картофель на сумму 6.020€, и в итоге отказались принять ответственность вернуть средства на плохой товар. Рекомендуем не работать с данной компанией.",


        footerContacts: "Контакты",
        footerPhone: "Телефон Viber/WhatsApp: +375292815954",
        footerEmail1: "Email: jadran3110@gmail.com",
        footerEmail2: "Email: adriatikgrupp@mail.ru",
        footerLinks: "Полезные ссылки",
        footerPrivacy: "Политика конфиденциальности",
        footerTerms: "Пользовательское соглашение",
        placement_rules: "Правила размещения информации",
        footerFAQ: "Часто задаваемые вопросы",
        footerCopy: "© ООО Адриатик Групп. Все права защищены.",

        GoldenFruit: "Golden Fruit d.o.o. - ведущий производитель и поставщик замороженных ягод и фруктов, специализирующийся на высококачественной чернике и других продуктах. Они предлагают надежные и экологически чистые продукты для клиентов по всему миру.",
        MMNFruit: "MMN Fruit - крупный поставщик фруктов, специализирующийся на различных видах свежих и замороженных продуктов. Компания обеспечивает высокое качество и широкий ассортимент продукции для удовлетворения потребностей клиентов.",
    
        MMNFruit_arile: "Компания MMN Fruit, основанная в 2011 году, специализируется на экспорте премиальных замороженных фруктов клиентам в Европе, Азии и США.",
        GoldenFruit_arile: "Компания уделяет особое внимание качеству и безопасности своей продукции, сотрудничая с местными производителями и контролируя весь процесс — от сбора до поставки. Продукция экспортируется в страны Европейского Союза, включая Германию и государства Скандинавии, где используется в производстве десертов, мороженого, соков и джемов.",
        
        Sinagoga_sombor: "Оптовая и розничная торговля продуктами питания, импорт упаковочной бумаги, производство и упаковка мака, подсолнечника, арахиса, овсяных, ржаных, пшеничных и соевых хлопьев",

        Uladar_borisov: "Крупнейшее зерноперерабатывающее предприятие Республики Беларусь",

        Sinagoga_sombor1: "Kratke informacije o kompaniji 1 u Beogradu.",
        Sinagoga_sombor2: "Kratke informacije o kompaniji 1 u Beogradu.",


        cookie_accept: "Мы используем файлы cookie для улучшения работы сайта. Продолжая использовать сайт, вы соглашаетесь с их использованием.",


        searchResultsTitle: "Результаты поиска",
        backToHome: "🏠 На главную",
        website: "Вебсайт",
        products: "Продукция",
        noResults: "❌ Ничего не найдено.",
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
        borisov: "Borisov",
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
        arile: "Arile",
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

        company_list_title: "Partnerske kompanije",

        aboutUsTitle: "O nama",
        aboutUsText: "Naša misija je da našim partnerima obezbedimo odgovornog partnera i posrednika u poslovima konsaltinga i logistike, brzo dobijamo informacije i rešavamo postavljene zadatke, i što je najvažnije, budemo glavna karika u saradnji Srbije,Rusije i Belorusije,i da zajedno sa našim partnerima  unapredimo ekonomski razvoj naših istorijski prijateljskih zemalja.",
        
        servicesTitle: "NAŠE USLUGE",
        service1: "Uvoz-izvoz",
        service2: "Posredničke usluge",
        service3: "Pretraga i izbor pouzdanih partnera u Srbiji, Rusiji i Belorusiji",
        service4: "Provera kompanija u Srbiji, Rusiji i Belorusiji",
        service5: "U Vaše ime vršimo pregovore na srpskom i ruskom jeziku",
        service6: "Pravne usluge i podrška",
        service7: "Sastavljanje ugovora",

        contactTitle: "Kontakti",
        contactText: "ADRIATIC GROUP DOO",
        contactPhone: "Kontakt telefon Viber/WhatsApp: +375292815954",
        contactEmail1: "Email: jadran3110@gmail.com",
        contactEmail2: "Email: adriatikgrupp@mail.ru",

        advertisementTitle: "Reklamni prostor dostupan! 🚀",
        advertisementText: "Želite da vaša kompanija bude primećena? Oglasite se ovde i privucite nove klijente!",
        advertisementCallToAction: "📢 Postavite svoju reklamu već danas!",
        advertisementContact: "Za više informacija kontaktirajte nas:",

        statsTitle: "Naša dostignuća",
        GlassJar: "Staklena tegla tip 720 <br> Belorusija → Srbija",
        SemiFinishedMix: "Mešavina poluproizvoda <br> Belorusija → Srbija",
        FoodPotato: "Krompir za ishranu <br> Belorusija → Srbija",
        FrozenPotato: "Zamrznuti krompir <br> Belorusija → Srbija",
        Raspberry: "Malina griz <br> Srbija → Belorusija",
        FrozenCherry: "Zamrznuta višnja <br> Srbija → Belorusija",
        Onion: "Crni luk <br> Rusija → Srbija",
        FrozenPotatoRU: "Zamrznuti krompir <br> Rusija → Srbija",




        ProductsWeOffer: "PROIZVODI KOJE REALIZUJEMO",

        // Категории
        FrozenFruits: "🧊 ZAMRZNUTI PROIZVODI",
        FrozenVegetables: "🥕 ZAMRZNUTO POVRĆE",
        FreshProducts: "🌱 SVEŽI PRODUKCIJA",
        PackagingAndDelivery: "📦 Pakovanje i isporuka",
      
        // Замороженные фрукты
        Raspberry9010: "Smrznute maline 90/10",
        Raspberry905: "Smrznute maline 90/5",
        RaspberryCrumb: "Malina gris",
        CherryBK: "Smrznute višnje BK",
        Blueberry: "Smrznute šumske borovnice",
        Bilberry: "Smrznute kultivisane borovnice",
      
        // Замороженные овощи
        FriesStrips: "Smrznuti blanširani kompir slamka 4x4/6x6/8x8/10x10",
        PotatoCubes: "Smrznuta kocka krompira 4x4/6x6/8x8/10x10",
        Wedges: "Krompir kriške sa i bez kore",
        CarrotStrips: "Smrznuta šargarepa slamka 4x4/6x6/8x8/10x10",
        CarrotCubes: "Kocka smrznute šargarepe 4x4/6x6/8x8/10x10",
        CarrotDiscs: "Smrznuta šargarepa disk reljefna od 1,5 mm do 9 mm i prečnika od 1 cm do 4 cm",
        BeetCubes: "Smrznuta cvekla kocka 4x4/6x6/8x8/10x10",
      
        // Свежая продукция
        PotatoFresh: "Krompir 5+",
        CarrotFresh: "Sveža šargarepa",
        CabbageFresh: "Svež kupus",
        BeetFresh: "Sveža cvekla",
      
        // Упаковка
        FrozenPackaging: "Svi smrznuti proizvodi su pakovani u kutije od 10 kg, 63 kutije na paletama, 20.160 kg u kamionu.",
        FreshPackaging: "Sveži proizvodi se po zahtevu pakuju u džakovima od 10kg / Uglavnom u džakovima od 25 kg, u Big Beg vrećama na paletama i bez njih.",




        partnersTitle: "Naši partneri",

        // Crna lista
        blacklistTitle: "Crna lista kompanija",
        company1Name: "KFH AGROMARAFON",
        inn: "PIB:",
        head: "Direktor:",
        address: "Pravna adresa:",
        company1Head: "Borisov Evgenij Vladimirovič",
        company1Address: "241029, Brjanska oblast, grad Brjansk, Krasnoarmejska ul. br. 126/1, kancelarija 202a",
        reason: "Razlog za izbegavanje poslovanja sa ovom kompanijom:",
        company1Reason: "Uzeli su novac od srpske kompanije za isporuku krompira u iznosu od 688.000 rubalja, ali krompir nisu isporučili, a novac su prisvojili, vratili su samo 50.000 rubalja. Preporučujemo da ne sarađujete sa ovom kompanijom.",

        company2Name: "OOO SAUL-KORP",
        unp: "Matični broj:",
        director: "Direktor:",
        company2Director: "Miranović Vadim Vladimirovič",
        company2Address: "223039, Minska oblast, Minski region, Ždanovički s/s, oblast sela Tabory, administrativno-gospodarska zgrada, soba 39A",
        otherCompanies: "Ovaj dobavljač ima i druge kompanije, obratite pažnju:",
        company2Other1: "OOO VITADIM",
        company2Other2: "IP Miranović Vadim Vladimirovič",
        company2Other3: "OOO Emersis Trejd",
        company2Other4: "OOO Belorehprom",
        company2Other5: "OOO SV-frukt",
        company2Reason: "Isporučili su nekvalitetnu robu, konkretno krompir u vrednosti od 6.020€, i na kraju odbili da preuzmu odgovornost i vrate sredstva za lošu robu. Preporučujemo da ne sarađujete sa ovom kompanijom.",


        footerContacts: "Kontakti",
        footerPhone: "Telefon Viber/WhatsApp: +375292815954",
        footerLinks: "Korisni linkovi",
        footerPrivacy: "Politika privatnosti",
        footerTerms: "Korisnički sporazum",
        placement_rules: "Pravila objavljivanja informacija",
        footerFAQ: "Često postavljana pitanja",
        footerCopy: "© ADRIATIC GROUP DOO. Sva prava zadržana.",

        GoldenFruit: "Golden Fruit d.o.o. je vodeći proizvođač i dobavljač smrznutog bobičastog voća i voća, specijalizovan za kvalitetne borovnice i druge proizvode. Oni nude pouzdane i ekološke proizvode kupcima širom sveta.",
        MMNFruit: "MMN Voće je veliki dobavljač voća specijalizovan za razne vrste svežih i smrznutih proizvoda. Kompanija obezbeđuje visok kvalitet i širok spektar proizvoda kako bi zadovoljila potrebe kupaca.",
    
        MMNFruit_arile: "Kompanija MMN Fruit, osnovana 2011. godine, specijalizovana je za izvoz premium smrznutog voća klijentima u Evropi, Aziji i SAD-u.",
        GoldenFruit_arile: "Kompanija posebnu pažnju posvećuje kvalitetu i bezbednosti svojih proizvoda, sarađujući sa lokalnim proizvođačima i kontrolišući ceo proces – od berbe do isporuke. Proizvodi se izvoze u zemlje Evropske unije, uključujući Nemačku i skandinavske države, gde se koriste u proizvodnji poslastica, sladoleda, sokova i džemova.",
        Sinagoga_sombor: "Veleprodaja i maloprodaja prehrambene robe, uvoz ambalažnog papira, proizvodnja i pakovanje maka, suncokreta, kikirikija, ovsenih, raženih, pšeničnih i sojinih pahuljica",
        
        Uladar_borisov: "Najveće preduzeće za preradu žitarica u Republici Belorusiji",

        Sinagoga_sombor1: "Kratke informacije o kompaniji 1 u Beogradu.",
        Sinagoga_sombor2: "Kratke informacije o kompaniji 1 u Beogradu.",


        cookie_accept: "Koristimo kolačiće za poboljšanje rada sajta. Nastavljajući da koristite sajt, slažete se sa njihovom upotrebom.",

        searchResultsTitle: "Rezultati pretrage",
        backToHome: "🏠 Nazad na početnu",
        website: "Vebsajt",
        products: "Proizvodi",
        noResults: "❌ Ništa nije pronađeno.",
    }
};



