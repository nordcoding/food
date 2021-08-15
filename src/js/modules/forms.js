import {closeModal} from './modal'; 
import {openModal} from './modal';  

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

export default forms; 