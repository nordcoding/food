
    let slideIndex = 1;  //stavim schetchik na iznachalni index slidov // 

// 1. zapisivaem peremennie elementov s html // 
    const slides    = document.querySelectorAll('.offer__slide'),
        prevArrow = document.querySelector('.offer__slider-prev'),
        nextArrow = document.querySelector('.offer__slider-next'),
        total     = document.querySelector('#total'),
        current   = document.querySelector('#current');

    showSlides(slideIndex); // !!!chtobi vse zarabotalo, vizivaem function slidera!!! // 

    if (slides.length < 10) { // dobavlyaem uslovie pri kotorm budem vivodit text s nomerom slaida // 
        total.textContent = `0${slides.length}`;
    } else {
        total.textContent = slides.length;
    }

    // pishem function dlya schetchika // 
    function showSlides(n) {
        if (n > slides.length) { // esli peredanni argument v vide n > checm vse slidi v slidere, to //
            slideIndex = 1;  // ustanavlivaem schetchik slidov na 1, tem samim peremeshaemsya k pervomu slidu // 
        }
        if (n < 1) { // analogichno, tolko v obratnuu storonu // 
            slideIndex = slides.length;
        }

        slides.forEach((item) => item.style.display = 'none'); // perebiraem vse slidy i skrivaem ih vse // 
        slides[slideIndex - 1].style.display = 'block';  // vibiraem slide iz massiva, kotori hotim pokazat, to est 0 slide // 
        
        if (slides.length < 10) { // dobavlyaem uslovie pri kotorm budem vivodit text s nomerom slaida // 
            current.textContent = `0${slideIndex}`;
        } else {
            current.textContent = slideIndex;
        }
    }

    // sozdaem dopolnitelnuu function, kotoraya //  
    function plusSlides(n){ // poluchaet argument n // 
        showSlides(slideIndex += n ); // vizivaem function showSlides i peredaem tuda index i argument polucheni v function plusSlides,dobavlyaa 1 ili otnimaya 1 ot obsheg indexa // 
    }


    prevArrow.addEventListener('click', ()=>{
        plusSlides(-1); 
    }); 

    nextArrow.addEventListener('click', ()=>{
        plusSlides(1); 
    });