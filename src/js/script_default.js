"use strict";
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
        modal = document.querySelector('.modal');
    //modalClose = document.querySelector('[data-close]');

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

    //modalClose.addEventListener('click', closeModal); // naznachaem proslushivanie na nazhatie na krestik close i peredaem funckciyu zakritiya modalnogo okna //


    modal.addEventListener('click', (e) => { // naznachaem proslushivanie na nazhatie na block modal i vizivaem funkciyu zakritiya modalnogo okna//
        if (e.target === modal || e.target.getAttribute('data-close') == '') {
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

    // Slider 2 START // 

let offset = 0;
let slideIndex = 1;

const slides = document.querySelectorAll('.offer__slide'),
    slider = document.querySelector('.offer__slider'),
    prev = document.querySelector('.offer__slider-prev'),
    next = document.querySelector('.offer__slider-next'),
    total = document.querySelector('#total'),
    current = document.querySelector('#current'),
    slidesWrapper = document.querySelector('.offer__slider-wrapper'),
    width = window.getComputedStyle(slidesWrapper).width,
    slidesField = document.querySelector('.offer__slider-inner');

if (slides.length < 10) {
    total.textContent = `0${slides.length}`;
    current.textContent =  `0${slideIndex}`;
} else {
    total.textContent = slides.length;
    current.textContent =  slideIndex;
}

slidesField.style.width = 100 * slides.length + '%';
slidesField.style.display = 'flex';
slidesField.style.transition = '0.5s all';

slidesWrapper.style.overflow = 'hidden';

slides.forEach(slide => {
    slide.style.width = width;
});

slider.style.position = 'relative';

const indicators = document.createElement('ol'),
      dots = [];
indicators.classList.add('carousel-indicators');
indicators.style.cssText = `
    position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 15;
    display: flex;
    justify-content: center;
    margin-right: 15%;
    margin-left: 15%;
    list-style: none;
`; // Если хотите - добавьте в стили, но иногда у нас нет доступа к стилям
slider.append(indicators);

for (let i = 0; i < slides.length; i++) {
    const dot = document.createElement('li');
    dot.setAttribute('data-slide-to', i + 1);
    dot.style.cssText = `
        box-sizing: content-box;
        flex: 0 1 auto;
        width: 30px;
        height: 6px;
        margin-right: 3px;
        margin-left: 3px;
        cursor: pointer;
        background-color: #fff;
        background-clip: padding-box;
        border-top: 10px solid transparent;
        border-bottom: 10px solid transparent;
        opacity: .5;
        transition: opacity .6s ease;
    `;
    if (i == 0) {
        dot.style.opacity = 1;
    }
    indicators.append(dot);
    dots.push(dot);
}

    function deleteNotDigits(str){
        return +str.replace(/\D/g, ''); 
    }

next.addEventListener('click', () => {
    if (offset == deleteNotDigits(width) * (slides.length - 1)) {
        offset = 0;
    } else {
        offset += deleteNotDigits(width); 
    }

    slidesField.style.transform = `translateX(-${offset}px)`;

    if (slideIndex == slides.length) {
        slideIndex = 1;
    } else {
        slideIndex++;
    }

    if (slides.length < 10) {
        current.textContent =  `0${slideIndex}`;
    } else {
        current.textContent =  slideIndex;
    }

    dots.forEach(dot => dot.style.opacity = ".5");
    dots[slideIndex-1].style.opacity = 1;
});

prev.addEventListener('click', () => {
    if (offset == 0) {
        offset = deleteNotDigits(width) * (slides.length - 1);
    } else {
        offset -= deleteNotDigits(width);
    }

    slidesField.style.transform = `translateX(-${offset}px)`;

    if (slideIndex == 1) {
        slideIndex = slides.length;
    } else {
        slideIndex--;
    }

    if (slides.length < 10) {
        current.textContent =  `0${slideIndex}`;
    } else {
        current.textContent =  slideIndex;
    }

    dots.forEach(dot => dot.style.opacity = ".5");
    dots[slideIndex-1].style.opacity = 1;
});

dots.forEach(dot => {
    dot.addEventListener('click', (e) => {
        const slideTo = e.target.getAttribute('data-slide-to');

        slideIndex = slideTo;
        offset = deleteNotDigits(width) * (slideTo - 1);

        slidesField.style.transform = `translateX(-${offset}px)`;

        if (slides.length < 10) {
            current.textContent =  `0${slideIndex}`;
        } else {
            current.textContent =  slideIndex;
        }

        dots.forEach(dot => dot.style.opacity = ".5");
        dots[slideIndex-1].style.opacity = 1;
    });
});

  // Slider 2 END // 

    


    /* let testId = document.getElementById('test'); 
    testId+=testId.textContent = 'some text'; */
    let testId = document.getElementById('test');
    let newDescr = testId.lastChild.nodeValue;
    /* newDescr = newDescr.replace('Наша основная идея - это правильное питание. Оно может быть простым и вкусным. Мы не просто доставка, мы сервис! Мы взяли на себя все расчеты БЖУ, калорийности, объемов порций и прочие важные, но скучные аспекты. Вам остается только полезная, сытная и правильная еда, которую мы привозим прямо под дверь.', 'some new text'); 
     */

    let newText = '<li>some new text testing</li>';
    newDescr = newText;
    testId.lastChild.nodeValue = newDescr;

    console.log(newDescr);


    let htmlTest = document.getElementById('test').innerHTML;

    let link = testId.innerHTML;
    testId.innerHTML = '<a href=\"http://example.org\">' + link + '</a>';

    let newTextNode = '<li>some new text node testing</li>';
    let newDescrNode = testId.lastChild.nodeValue;
    newTextNode = newDescrNode;
    testId.lastChild.nodeValue = newTextNode;
    console.log(newTextNode);



    // Delaem zapros na obnovlenie kartochek menu, to est nastraivaem poluchenie dannih s servera //

    const getResource = async (url) => { // v etoi function declaration mi ikazivaem async, chto eto asinchronnaya function // 
        const res = await fetch(url);
        // esli fetch stolknetsya s kakoi-to oshibkoi v http zaprose (404, 502 etc), to on nam ne vidast catch, ne vidast reject,potomushto dlyas nergo eto ne budet oshibkoi, poetomu takoe povedenie obrabativaem v ruchnuu! // 
        if(!res.ok){ // .ok - eto svoistvo promisov, kotoroe govorit libo vse ok, libo ne ok // 
            throw new Error(`Could not fetch ${url}, status: ${res.status}`); // .status - tozhe svoistvo promisov, govorit nam kakoi status servera (200ok, 404, 500 etc) //  
        }

        return await res.json();
    };

    // POSTIM DANNIE S SERVERA NA SAIT VARIANT 1, ISPOLZUYA SHABLON MENUCARD  // 

    /* getResource('http://localhost:3000/menu') // nastraivaem post dannih s shablona MenuCard na sait // 
        .then(data => {
            data.forEach(({img, altimg, title, descr, price}) => { // {} - ispolzuem distrikturizaciyu objecta, chtobi ne ukazivat kazhdi raz obj.title, obj.img etc  // 
                new MenuCard(img, altimg, title, descr, price, ".menu .container").render();
            });
        });  */
    
    // ISPOLZUEM AXIOS BIBLIOTEKU, POSTIM DANNIE S SERVERA NA SAIT VARIANT 2, ISPOLZUYA SHABLON MENUCARD  // 

    axios.get('http://localhost:3000/menu') // nastraivaem post dannih s shablona MenuCard na sait, ispolzuya Axios // 
    .then(data => {
        data.data.forEach(({img, altimg, title, descr, price}) => { // eshe odna .data eto uzhe default iz biblioteki Axios, Response Scheme//  
            new MenuCard(img, altimg, title, descr, price, ".menu .container").render();
        });
    });


    // Используем классы для создание карточек меню // 

    class MenuCard {
        constructor(src, alt, title, descr, price, parentSelector, ...classes) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.classes = classes;
            this.parent = document.querySelector(parentSelector);
            this.transfer = 27;
            this.changeToUAH(); 
        }

        changeToUAH() {
            this.price = this.price * this.transfer; 
        }

        render() {
            const element = document.createElement('div');

            if (this.classes.length === 0) {
                this.classes = "menu__item";
                element.classList.add(this.classes);
            } else {
                this.classes.forEach(className => element.classList.add(className));
            }

            element.innerHTML = `
                <img src=${this.src} alt=${this.alt}>
                <h3 class="menu__item-subtitle">${this.title}</h3>
                <div class="menu__item-descr">${this.descr}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                </div>
            `;
            this.parent.append(element);
        }
    }


    // VTOROI METOD, bez ispolzovaniya shablona MenuCard, generiruem html na letu // 

    // getResource('http://localhost:3000/menu')
    //     .then(data => createCard(data));

    // function createCard(data) {
    //     data.forEach(({img, altimg, title, descr, price}) => {
    //         const element = document.createElement('div');

    //         element.classList.add("menu__item");

    //         element.innerHTML = `
    //             <img src=${img} alt=${altimg}>
    //             <h3 class="menu__item-subtitle">${title}</h3>
    //             <div class="menu__item-descr">${descr}</div>
    //             <div class="menu__item-divider"></div>
    //             <div class="menu__item-price">
    //                 <div class="menu__item-cost">Цена:</div>
    //                 <div class="menu__item-total"><span>${price}</span> грн/день</div>
    //             </div>
    //         `;
    //         document.querySelector(".menu .container").append(element);
    //     });
    // }


    // FORMS START //
    const forms = document.querySelectorAll('form');
    const message = { // sozdaem, object s soobhseniyami dlya usera // 
        loading: 'img/form/spinner.svg',
        success: 'thanx, we contact u soon!',
        failure: 'smth went wrong'
    };

    forms.forEach(item => { // v zavershenie podvyazivaem nashu function postData k kazhdoi forme na saite // 
        bindPostData(item);
    });

    //const json = JSON.stringify(object); // i zatem uzhe object convertiruem v JSON // 

    // SOZDAEM FUNCTION KOTORAYA BUDET OBRABATIVAT NASH ZAPROS K SERVERU // 
    const postData = async (url, data) => { // v etoi function declaration mi ukazivaem async, chto eto asinchronnaya function // 
        const res = await fetch(url,{ // ispolzuem operator await, kotori VSEGDA rabotaet v pare s async! i govorit funkcii, chto nuzhno vnachale dozhdatsya zaprosa servera // 
            method : "POST",
            headers : {
                    'Content-type': 'application/json' 
                },
            body: data
        }); 

        return await res.json();
    };



    function bindPostData(form) { // sozdaem function dlya, kotoruu budem vizivat dlya otpravki formy // 
        form.addEventListener('submit', (e) => { // naznachaem proslushivanie na 'submit'//
            e.preventDefault(); // ubiraem defoltnuu perezagruzku stranicy // 

            //const statusMessage = document.createElement('div'); // sozdaem novi div // 
            const statusMessage = document.createElement('img');
            //statusMessage.classList.add('status'); // dobavlyaem emu class 'status'//
            statusMessage.src = message.loading;
            //statusMessage.textContent = message.loading; // dobavlyaem v nego soobshenie loading //
            statusMessage.style.cssText = `
                display:block;
                margin: 0 auto;  
            `;
            form.append(statusMessage); // i zatem uzhe dobavlyaem vsu etu konstrukciyu k forme // 

            //const request = new XMLHttpRequest(); // sozdaem zapros k serveru // 
            //request.open('POST', 'server.php'); // vizivaem metod open, chtobi nastroit etot zapros, pishem otpravka i url // 
            

            //request.setRequestHeader('Content-type', 'multipart/form-data'); // dlya form-data zagolovok formiruetsya avtomatichski //

            /* NASTRAIVAEM PEREDACHU DANNIH NA SERVER V FORMATE JSON start   */
            //request.setRequestHeader('Content-type', 'application/json'); // nastraivaem zagolovki, chtobi server ponimal, kakie dannie k nemu prihodyat //


            //request.send(json); // otpravlyaem JSON // 

            /* NASTRAIVAEM PEREDACHU DANNIH NA SERVER V FORMATE JSON end   */

            const formData = new FormData(form); // ispolzuem format formData, chtobi sobrat vse dannie inputov s formy i otravit na server uzhe v formate formData, ne JSON!! (dannie inputov dolzhni imet value name = "name"  v verstke!!) // 

            //request.send(formData); // otpravlyaem dannie na server //
            
            /* ISPOLZUEM METHOD fetch() , VMESTO XMLHttpRequest */

            //const object = {}; // transformiruem formData v object // 
            //formData.forEach(function(value, key){
            //object[key] = value;
            //});

            const json = JSON.stringify(Object.fromEntries(formData.entries())); // metod fromEntries prevrashaet array obratno v object
             // poluchaetsya, kak tolko formData sobrala vse dannie s form: 1. Prevrashaem ih v format array 2. v format object i 3. uzhe v format JSON i postim na server v db.json //   
            
        

            postData('http://localhost:3000/requests', json) 
            //.then(data => data.text()) // tranformaciya texta nam uzhe ne nuzhna, ona proishodit na etape postData // 
            .then(data=>{
                console.log(data);
                showThanksModal(message.success);
                statusMessage.remove();
            })
            .catch(()=>{
                showThanksModal(message.failure);
            })
            .finally(()=>{
                form.reset();
            }); 

            //request.addEventListener('load', () => { // dobavlyaem proslushivanie na zagruzku // 
                //if (request.status === 200) { // esli otpravka formy postit status 200 // 
                    //statusMessage.textContent = message.success; // vivodim soobshenie iz sozdannogo vishe objecta // 
                    //showThanksModal(message.success);
                   // form.reset();
                    /* setTimeout(()=>{
                        statusMessage.remove(); 
                    }, 2000);  */
                    //statusMessage.remove();
                //} else {
                    //statusMessage.textContent = message.failure; // vivodim soobshenie iz sozdannogo vishe objecta //
                    //showThanksModal(message.failure);
                //}
            //});

        });
    }
    // FORMS END //

    // SHOW ANOTHER POPUP START // 
    function showThanksModal(message) {
        const prevModalDialog = document.querySelector('.modal__dialog');
        prevModalDialog.classList.add('hide');
        openModal();

        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
            <div class = 'modal__content'>
                <div class = 'modal__close' data-close>×</div>
                <div class = 'modal__title'>${message}</div>
            </div>
        `;

        document.querySelector('.modal').append(thanksModal);

        setTimeout(() => {
            thanksModal.remove();
            prevModalDialog.classList.add('show');
            prevModalDialog.classList.remove('hide');
            closeModal();
        }, 4000);
    }

    // SHOW ANOTHER POPUP END // 


    /* API SAMPLE  */

    fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: JSON.stringify({name: 'Alex'}),
        headers: {
            'Content-type' : 'application/json' 
        }
        })
        .then(response => response.json())
        .then(json => console.log(json));

/* fetch('http://localhost:3000/menu') 
    .then(data => data.json())
    .then(res => console.log(res));  */

    /* WEB CALCULATOR START */
    const result = document.querySelector('.calculating__result span');

    let sex, height, weight, age, ratio;

    if(localStorage.getItem('sex')){
        let sex = localStorage.getItem('sex'); 
    }else{
        sex = 'female'; 
        localStorage.setItem('sex', 'female'); 
    }

    if(localStorage.getItem('ratio')){
        let ratio = localStorage.getItem('ratio'); 
    }else{
        ratio = 1.375; 
        localStorage.setItem('ratio', 'female'); 
    }

    function initLocalSettings(selector, activeClass){
        const elements = document.querySelectorAll(selector); 

        elements.forEach(elem =>{
            elem.classList.remove(activeClass); 
            if(elem.getAttribute('id')=== localStorage.getItem('sex')){
                elem.classList.add(activeClass); 
            }

            if(elem.getAttribute('data-ratio')=== localStorage.getItem('ratio')){
                elem.classList.add(activeClass); 
            }
        }); 
    }

    initLocalSettings('#gender div', 'calculating__choose-item_active'); 
    initLocalSettings('.calculating__choose_big div', 'calculating__choose-item_active'); 

    function calcTotal(){
        if(!sex || !height || !weight || !age || !ratio){
            result.textContent = 'no value'; 
            return; 
        }

        if(sex === 'female'){
            result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio); 
        }else{
            result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age))* ratio); 
        }
    }

    calcTotal();
    
    function getStaticInformation(selector, activeClass){
        const elements = document.querySelectorAll(selector);
        
        elements.forEach(elem=>{
            elem.addEventListener('click', (e)=> {
                if(e.target.getAttribute('data-ratio')){
                    ratio = +e.target.getAttribute('data-ratio');
                    localStorage.setItem('ratio', +e.target.getAttribute('data-ratio')); 
                }else{
                    sex = e.target.getAttribute('id');
                    localStorage.setItem('sex', +e.target.getAttribute('id')); 
                }
                
                elements.forEach(elem =>{
                    elem.classList.remove(activeClass); 
                });
    
                e.target.classList.add(activeClass); 
                
                calcTotal(); 
            }); 
        }); 
    }


    getStaticInformation('#gender div', 'calculating__choose-item_active'); 
    getStaticInformation('.calculating__choose_big div', 'calculating__choose-item_active');
    
    function getDynamicInformation(selector){
        const input = document.querySelector(selector); 

        input.addEventListener('input', ()=>{

            if (input.value.match(/\D/g)){
                input.style.border = '1px solid red'; 
            }else{
                input.style.border = 'none'; 
            }

            switch(input.getAttribute('id')){
                case 'height':
                    height = +input.value;
                    break; 
                case 'weight':
                    weight = +input.value;
                    break; 
                case 'age':
                    age = +input.value;
                    break; 
            }
            calcTotal(); 
        });
        
    }

    getDynamicInformation('#height'); 
    getDynamicInformation('#weight'); 
    getDynamicInformation('#age'); 


    /* WEB CALCULATOR ENDS  */



});