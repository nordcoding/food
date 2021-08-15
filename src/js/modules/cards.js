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
}

export default cards; 