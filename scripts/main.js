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
    const countryButtons = document.querySelectorAll('.country-button');
    const maps = document.querySelectorAll('.map');
    const mapPoints = document.querySelectorAll('.map-point');
    const popup = document.getElementById('popup');
    const popupText = document.getElementById('popup-text');
    const companyDetails = document.getElementById('company-details');
    const close = document.getElementById('close');

    const companies = {
        moscow: [
            {
                name: 'Компания 1',
                description: 'Краткое описание компании 1 в Москве.',
                moreInfo: 'Полное описание компании 1 в Москве.'
            }
        ],
        belgrade: [
            {
                name: 'Компания A',
                description: 'Краткое описание компании A в Белграде.',
                moreInfo: 'Полное описание компании A в Белграде.'
            },
            {
                name: 'Компания B',
                description: 'Краткое описание компании B в Белграде.',
                moreInfo: 'Полное описание компании B в Белграде.'
            },
            {
                name: 'Компания C',
                description: 'Краткое описание компании C в Белграде.',
                moreInfo: 'Полное описание компании C в Белграде.'
            }
        ],
        minsk: [
            {
                name: 'Компания X',
                description: 'Краткое описание компании X в Минске.',
                moreInfo: 'Полное описание компании X в Минске.'
            }
        ]
    };

    countryButtons.forEach(button => {
        button.addEventListener('click', function() {
            const country = this.getAttribute('data-country');
            maps.forEach(map => {
                map.style.display = map.id === country ? 'block' : 'none';
            });
        });
    });

    mapPoints.forEach(point => {
        point.addEventListener('click', function() {
            const city = this.getAttribute('data-city');
            popupText.textContent = `Компании в ${translations[currentLanguage][city]}:`;
            displayCompanyDetails(city);
            popup.style.display = 'block';
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

    function displayCompanyDetails(city) {
        const companiesList = companies[city] || [];
        companyDetails.innerHTML = '';

        companiesList.forEach(company => {
            const companyDiv = document.createElement('div');
            companyDiv.className = 'company';

            const name = document.createElement('h3');
            name.textContent = company.name;
            companyDiv.appendChild(name);

            const description = document.createElement('p');
            description.textContent = company.description;
            companyDiv.appendChild(description);

            const moreInfoButton = document.createElement('button');
            moreInfoButton.textContent = 'Подробнее';
            companyDiv.appendChild(moreInfoButton);

            const moreInfoDiv = document.createElement('div');
            moreInfoDiv.className = 'more-info';
            moreInfoDiv.textContent = company.moreInfo;
            moreInfoDiv.style.display = 'none';  // Initially hide the additional information
            companyDiv.appendChild(moreInfoDiv);

            moreInfoButton.addEventListener('click', function() {
                if (moreInfoDiv.style.display === 'none') {
                    moreInfoDiv.style.display = 'block';
                    moreInfoButton.textContent = 'Скрыть';
                } else {
                    moreInfoDiv.style.display = 'none';
                    moreInfoButton.textContent = 'Подробнее';
                }
            });

            companyDetails.appendChild(companyDiv);
        });
    }
});

let currentLanguage = 'ru';

function switchLanguage(language) {
    currentLanguage = language;
    const elements = document.querySelectorAll('[data-translate]');

    elements.forEach(el => {
        const key = el.getAttribute('data-translate');
        el.innerText = translations[language][key];
    });
}

const translations = {
    ru: {
        headerTitle: "ООО Адриатик Групп",
        navAbout: "О нас",
        navServices: "Услуги",
        navContact: "Контакты",
        countrySelectionTitle: "Выберите страну",
        countrySerb: "Сербия",
        countryRus: "Россия",
        countryBel: "Беларусь",
        mapTitle: "Карта",
        belgrade: "Белград",
        moscow: "Москва",
        minsk: "Минск",
        aboutUsTitle: "О нас",
        aboutUsText: "Наша миссия: обеспечить компаниям ответственного партнёра и посредника в бизнесе консалтинга и логистики...",
        servicesTitle: "Услуги",
        service1: "Агентские услуги",
        service2: "Экспорт импорт",
        service3: "Поиск надёжных партнёров в Сербии",
        service4: "Консультационные услуги поставки товаров на Сербию и из Сербии",
        contactTitle: "Контакты",
        contactText: "ООО Адриатик Групп",
        contactPhone: "Контакт телефон Viber/WhatsApp: +375292815954",
        contactEmail1: "Email: jadran3110@gmail.com",
        contactEmail2: "Email: adriatikgrupp@mail.ru"
    },
    sr: {
        headerTitle: "ADRIATIC GROUP DOO",
        navAbout: "O nama",
        navServices: "Usluge",
        navContact: "Kontakti",
        countrySelectionTitle: "Izaberite zemlju",
        countrySerb: "Србија",
        countryRus: "Русија",
        countryBel: "Белорусија",
        mapTitle: "Mapa",
        belgrade: "Beograd",
        moscow: "Moskva",
        minsk: "Minsk",
        aboutUsTitle: "O nama",
        aboutUsText: "Naša misija je da obezbedimo firmama odgovornog partnera i posrednika u poslovanju, konsaltingu i logistici...",
        servicesTitle: "Usluge",
        service1: "Agentske usluge",
        service2: "Uvoz i izvoz",
        service3: "Pretraga pouzdanih partnera u Srbiji",
        service4: "Konsultantske usluge u vezi sa isporukom roba u Srbiju i iz Srbije",
        contactTitle: "Kontakti",
        contactText: "ADRIATIC GROUP DOO",
        contactPhone: "Kontakt telefon Viber/WhatsApp: +375292815954",
        contactEmail1: "Email: jadran3110@gmail.com",
        contactEmail2: "Email: adriatikgrupp@mail.ru"
    }
};
