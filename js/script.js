"use struct";

window.addEventListener('DOMContentLoaded', () => {

    // TABS START // 
    const tabs = document.querySelectorAll('.tabheader__item'),
        tabsContent = document.querySelectorAll('.tabcontent'),
        tabsParent = document.querySelector('.tabheader__items');

    function hideTabContent() {
        tabsContent.forEach(item => {
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
        });

        tabs.forEach(item => {
            item.classList.remove('tabheader__item_active');
        });

    }

    function showTabContent(i = 0) { // vmesto togo chtobi peredavat znachenie "i" v vizov funkcii, mozhno ego propisat pryam tut//
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');
        tabs[i].classList.add('tabheader__item_active');
    }

    hideTabContent();
    showTabContent();

    tabsParent.addEventListener('click', (event) => {

        const target = event.target; //chtobi vse vremya ne propisivat event.target, mozhem ego zapisat srazu v peremennuu // 
        if (target && target.classList.contains('tabheader__item')) {
            tabs.forEach((item, i) => {
                if (target == item) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }

    });

    // TABS END // 

    // TIMER // 

    const deadline = '2021-06-23'; // oprdelyaem deadline promo akcii // 

    function getTimeRemaining(endtime) { // etoi funkciei opredelyaem raznicu mezhdu deadline i nashim tekushim vremenem // 
        const t = Date.parse(endtime) - Date.parse(new Date()), //New Date() позволяет вам получить текущую дату. А parse позволяет засунуть во внутрь метода дату в виде строки (например "Dec 25, 1995") и при этом мы получим количество миллисекунд (таймстамп)// 
            days = Math.floor(t / (1000 * 60 * 60 * 24)),
            hours = Math.floor((t / (1000 * 60 * 60) % 24)),
            minutes = Math.floor((t / 1000 / 60) % 60),
            seconds = Math.floor((t / 1000) % 60);

        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };

    }

    function getZero(num) { // etoi funkciei dobavlyaem 0 pered znacheniemm esli ono menshe 10 // 
        if (num >= 0 && num < 10) {
            return `0${num}`;
        } else {
            return num;
        }
    }

    function setClock(selector, endtime) {
        const timer = document.querySelector(selector),
            days = timer.querySelector('#days'),
            hours = timer.querySelector('#hours'),
            minutes = timer.querySelector('#minutes'),
            seconds = timer.querySelector('#seconds'),

            timeInterval = setInterval(updateClock, 1000); // zapuskaem funkciyu updateclock, cherez kazhduu sekundu // 

        updateClock(); // vizivaem funkciyu v ruchnuu, chtobi ne migal schetchik pri obnovleni s iznachalnimi znacheniyami iz verstki //

        function updateClock() { // eta funkciya obnovlyaet timer kazhduu sekundu // 
            const t = getTimeRemaining(endtime); // delaem rasshet vremeni, kotori ostalsya na etu sekundu, v "t" zapisivaetsya resultat raboty "getTimeRemaining" // 

            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);

            if (t.total <= 0) { // usloviya dlya prekrasheniya raboty timera // 
                clearInterval(timeInterval);
            }
        }

    }
    setClock('.timer', deadline);

    // modal window start//

    const modalTrigger = document.querySelectorAll('[data-modal]'),
        modal = document.querySelector('.modal'),
        modalClose = document.querySelector('[data-close]');

    function openModal() { // vinosim otkritie okna v ordelnuu funkciyu // 
        modal.classList.add('show');
        modal.classList.remove('hide');
        document.body.style.overflow = 'hidden';
        clearInterval(modalTimerId); // prerivaem pokaz modalnogo okna, posle vipolneniya ModalTimerId // 
    }

    modalTrigger.forEach(item => { // perebiraem massiv knopok // 
        item.addEventListener('click', openModal // naznachaem vsplitie modalnogo okna po kliku // 
            /*  modal.classList.add('show');
            modal.classList.remove('hide');
             document.body.style.overflow = 'hidden'; */
        );
    });



    function closeModal() { // vinosim zakritie modalnogo okna v otdelnuu funkciyu chotbi ne povtoryat kod // 
        modal.classList.add('hide');
        modal.classList.remove('show');
        document.body.style.overflow = '';
    }

    modalClose.addEventListener('click', closeModal); // naznachaem proslushivanie na nazhatie na krestik close i peredaem funckciyu zakritiya modalnogo okna //


    modal.addEventListener('click', (e) => { // naznachaem proslushivanie na nazhatie na block modal i vizivaem funkciyu zakritiya modalnogo okna//
        if (e.target === modal) {
            closeModal();
        }
    });


    document.addEventListener('keydown', (e) => { // dobavlyaem zakritie modalnogo okna po nazhatiu na ESC // 
        if (e.code === 'Escape' && modal.classList.contains('show')) {
            closeModal();
        }
    });


    const modalTimerId = setTimeout(openModal, 5000); // vizivaem pokaz modalnogo okna cherez 5s vremeni// 

    function showModalByScroll() { // naznachaem otdelnuu funkciyu, chtobi okno pokazivalos tolko 1 raz v konce stranici, zatem ubiraem proslushivanie //
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            openModal();
            window.removeEventListener('scroll', showModalByScroll); 
        }
    }

    window.addEventListener('scroll', showModalByScroll); // peredaem funkciyu showModalByScroll v proslushovanie okna // 



    // modal window ends // 




});