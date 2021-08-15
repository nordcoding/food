
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

export default modal;
export {closeModal};
export{openModal};  