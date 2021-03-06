/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/modules/calc.js":
/*!********************************!*\
  !*** ./src/js/modules/calc.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function calc(){
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
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (calc); 

/***/ }),

/***/ "./src/js/modules/cards.js":
/*!*********************************!*\
  !*** ./src/js/modules/cards.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function cards(){
    // DELAEM ZAPROS NA OBNOVLENIE KARTOCHEK MENU, to est nastraivaem poluchenie dannih s servera //

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


    // ???????????????????? ???????????? ?????? ???????????????? ???????????????? ???????? // 

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
                    <div class="menu__item-cost">????????:</div>
                    <div class="menu__item-total"><span>${this.price}</span> ??????/????????</div>
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
    //                 <div class="menu__item-cost">????????:</div>
    //                 <div class="menu__item-total"><span>${price}</span> ??????/????????</div>
    //             </div>
    //         `;
    //         document.querySelector(".menu .container").append(element);
    //     });
    // }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (cards); 

/***/ }),

/***/ "./src/js/modules/forms.js":
/*!*********************************!*\
  !*** ./src/js/modules/forms.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal */ "./src/js/modules/modal.js");
 
  

function forms(){
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
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (forms); 

/***/ }),

/***/ "./src/js/modules/modal.js":
/*!*********************************!*\
  !*** ./src/js/modules/modal.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "closeModal": () => (/* binding */ closeModal),
/* harmony export */   "openModal": () => (/* binding */ openModal)
/* harmony export */ });

function openModal() { // vinosim otkritie okna v ordelnuu funkciyu // 
    modal.classList.add('show');
    modal.classList.remove('hide');
    document.body.style.overflow = 'hidden';
    clearInterval(modalTimerId); // prerivaem pokaz modalnogo okna, posle vipolneniya ModalTimerId // 
}

function closeModal() { // vinosim zakritie modalnogo okna v otdelnuu funkciyu chotbi ne povtoryat kod // 
    modal.classList.add('hide');
    modal.classList.remove('show');
    document.body.style.overflow = '';
}

function modal(){
    // modal window start//

    const modalTrigger = document.querySelectorAll('[data-modal]'),
        modal = document.querySelector('.modal');
    //modalClose = document.querySelector('[data-close]');

    modalTrigger.forEach(item => { // perebiraem massiv knopok // 
        item.addEventListener('click', openModal // naznachaem vsplitie modalnogo okna po kliku // 
            /*  modal.classList.add('show');
            modal.classList.remove('hide');
             document.body.style.overflow = 'hidden'; */
        );
    });




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
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (modal);

  

/***/ }),

/***/ "./src/js/modules/popups.js":
/*!**********************************!*\
  !*** ./src/js/modules/popups.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function popups(){
    // SHOW ANOTHER POPUP START // 
    function showThanksModal(message) {
        const prevModalDialog = document.querySelector('.modal__dialog');
        prevModalDialog.classList.add('hide');
        openModal();

        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
            <div class = 'modal__content'>
                <div class = 'modal__close' data-close>??</div>
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
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (popups); 

/***/ }),

/***/ "./src/js/modules/slider.js":
/*!**********************************!*\
  !*** ./src/js/modules/slider.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function slider(){
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
`; // ???????? ???????????? - ???????????????? ?? ??????????, ???? ???????????? ?? ?????? ?????? ?????????????? ?? ????????????
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
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (slider); 

/***/ }),

/***/ "./src/js/modules/tabs.js":
/*!********************************!*\
  !*** ./src/js/modules/tabs.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function tabs(){
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
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (tabs); 

/***/ }),

/***/ "./src/js/modules/timer.js":
/*!*********************************!*\
  !*** ./src/js/modules/timer.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function timer(){
    // TIMER // 

    const deadline = '2021-06-23'; // oprdelyaem deadline promo akcii // 

    function getTimeRemaining(endtime) { // etoi funkciei opredelyaem raznicu mezhdu deadline i nashim tekushim vremenem // 
        const t = Date.parse(endtime) - Date.parse(new Date()), //New Date() ?????????????????? ?????? ???????????????? ?????????????? ????????. ?? parse ?????????????????? ???????????????? ???? ???????????? ???????????? ???????? ?? ???????? ???????????? (???????????????? "Dec 25, 1995") ?? ?????? ???????? ???? ?????????????? ???????????????????? ?????????????????????? (??????????????????)// 
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
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (timer); 

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**************************!*\
  !*** ./src/js/script.js ***!
  \**************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/tabs */ "./src/js/modules/tabs.js");
/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/modal */ "./src/js/modules/modal.js");
/* harmony import */ var _modules_cards__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/cards */ "./src/js/modules/cards.js");
/* harmony import */ var _modules_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/forms */ "./src/js/modules/forms.js");
/* harmony import */ var _modules_slider__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/slider */ "./src/js/modules/slider.js");
/* harmony import */ var _modules_timer__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/timer */ "./src/js/modules/timer.js");
/* harmony import */ var _modules_popups__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/popups */ "./src/js/modules/popups.js");
/* harmony import */ var _modules_calc__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./modules/calc */ "./src/js/modules/calc.js");


// IMPORTIRUEM VSE MODULI ES6 STANDART // 







 

window.addEventListener('DOMContentLoaded', () => {

    // VIZIVAEM MODULI // 

    (0,_modules_tabs__WEBPACK_IMPORTED_MODULE_0__.default)();
    (0,_modules_cards__WEBPACK_IMPORTED_MODULE_2__.default)();
    (0,_modules_forms__WEBPACK_IMPORTED_MODULE_3__.default)();
    (0,_modules_slider__WEBPACK_IMPORTED_MODULE_4__.default)();
    (0,_modules_timer__WEBPACK_IMPORTED_MODULE_5__.default)();
    (0,_modules_popups__WEBPACK_IMPORTED_MODULE_6__.default)();
    (0,_modules_modal__WEBPACK_IMPORTED_MODULE_1__.default)(); 
    (0,_modules_calc__WEBPACK_IMPORTED_MODULE_7__.default)(); 
});
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map