document.addEventListener("DOMContentLoaded", function () {
    // Получаем язык из URL или localStorage, если нет — используем по умолчанию "ru"
    const urlParams = new URLSearchParams(window.location.search);
    let lang = urlParams.get("lang") || localStorage.getItem("selectedLanguage") || "ru";

    if (!urlParams.has("lang")) {
        window.history.replaceState({}, "", `?lang=${lang}`);
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

    localStorage.setItem("selectedLanguage", lang);

    // Объект с переводами
    const translations = {
        ru: {
            headerTitle: "ООО Адриатик Групп",

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

            backToHome: "На главную",

            company_list_title: "Компании-партнеры",
        },
        sr: {
            headerTitle: "ADRIATIC GROUP DOO",

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

            backToHome: "Nazad na početnu",

            company_list_title: "Partnerske kompanije",
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

    // Переводим страницу при загрузке
    translatePage(lang);

    // Обработчик для переключения языка
    function switchLanguage(language) {
        // Обновляем URL с параметром языка
        const url = new URL(window.location);
        url.searchParams.set('lang', language);
        window.history.pushState({}, '', url);

        localStorage.setItem("selectedLanguage", language); // Сохраняем язык
       
        const elements = document.querySelectorAll('[data-translate]');
        elements.forEach(el => {
            const key = el.getAttribute('data-translate');
            el.innerHTML = translations[language][key];
        });
    }

    // Обработчик нажатия на кнопки смены языка
    document.querySelectorAll('.language-switcher button').forEach(button => {
        button.addEventListener('click', function () {
            switchLanguage(button.textContent === 'Русский' ? 'ru' : 'sr');
        });
    });

    // Функция для возврата на главную
    document.getElementById("backToHome").addEventListener("click", function () {
        let lang = localStorage.getItem("selectedLanguage") || "ru";
        window.location.href = `index.html?lang=${lang}`;
    });
});