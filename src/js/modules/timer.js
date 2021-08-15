function timer(){
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
}

export default timer; 