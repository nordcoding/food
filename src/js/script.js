"use strict";

// IMPORTIRUEM VSE MODULI ES6 STANDART // 
import tabs from './modules/tabs';
import modal from './modules/modal';
import cards from './modules/cards';
import forms from './modules/forms';
import slider from './modules/slider';
import timer from './modules/timer';
import popups from './modules/popups';
import calc from './modules/calc'; 

window.addEventListener('DOMContentLoaded', () => {

    // VIZIVAEM MODULI // 

    tabs();
    cards();
    forms();
    slider();
    timer();
    popups();
    modal(); 
    calc(); 
});