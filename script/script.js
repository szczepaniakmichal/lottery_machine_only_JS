const divContainer = document.createElement('div');
document.body.appendChild(divContainer);
divContainer.classList = 'container-fluid no-gutters';

const headerDiv = document.createElement('div');
let divTwo = document.body.childNodes;
divTwo[2].appendChild(headerDiv);
console.log(divTwo[2]);

headerDiv.classList = 'row no-gutters';

// let p = document.createElement("p");
//
// p.innerText = "extra";
//
// const count = document.getElementById("d1").appendChild(p);
// console.log(count);
//
// let text = ["text1", "tex2", "text3", "text4"];
// text.forEach(function (el) {
//     var div = document.createElement("div");
//     div.className = "finalBlock";
//     div.innerHTML = el;
//     document.body.appendChild(div);
//     document.getElementById("d1").appendChild(div);
// });


// <div class="row no-gutters">
//     <h1 class="col-xl-12">Maszyna losująca</h1>
// </div>
// <div class="row no-gutters">
//     <h3>Wybierz rodzaj gry: </h3>
// <select class="margin rodzaj_gry" name="" id="rodzajGry">
//     <option value="duzyMottek">Duzy Mottek</option>
// <option value="malyMottek">Mały Mottek</option>
// </select>
// <!--        <label class="col-xl-6 col-sm-12" for="duzyMottek"><input type="checkbox" name="" id="duzyMottek" value="duzyMottek">Duzy Mottek</label>-->
// <!--        <label class="col-xl-6 col-sm-12" for="malyMottek"><input type="checkbox" name="" id="malyMottek" value="malyMottek">Mały Mottek</label>-->
// </div>
// <div class="row no-gutters">
//     <button class="col-xl-12 start_game" onclick="wszystkieFunkcje()">Rozpocznij losowanie</button>
// </div>


let wszystkie_liczby = [];
let liczby_chybil_trafil = [];
let liczby_wylosowane_dzis = [];
let liczby_trafione = [];
let liczby_gracza = [];
let rodzaj_gry = '';
let iloscLosowan = 0;
let duzyMottek = false;
let malyMottek = false;

let time = '';
let iloscLosowan2 = 0;

const timeStart = new Date();

const timeEnd = () => {
    return new Date();
};

const timeCurrentLos = (timeStart) => {
    const timeEnd = new Date();
    let different = (timeEnd - timeStart) / 1000;
    time = different;
    return document.getElementById('czasLosowania').innerHTML = `Czas trwania skryptu to: ${different.toFixed(2)} sukund`;
};

const losowanie_wszystkich_liczb = (howManyNumber) => {
    for (let i = 1; i <= howManyNumber; i++) {
        wszystkie_liczby.push(i);
    }
};

const losowanieLiczbWybranejGry = () => {
    if (rodzaj_gry === 'duzyMottek') {
        losowanie_wszystkich_liczb(40);
        duzyMottek = true;
    }
    if (rodzaj_gry === 'malyMottek') {
        losowanie_wszystkich_liczb(30);
        malyMottek = true;
    }
};

const wyborGry = () => {
    $('#rodzajGry > option:selected').each(function () {
        rodzaj_gry = $(this).val();
    });
};

const getUserValue = () => {
    $("input:checked").each(function () {
        liczby_gracza.push($(this).val());
    });
    if ((liczby_gracza.length > 6) && (duzyMottek === true)) {
        $('#alert').addClass('display');
    } else {
        $('#alert').removeClass('display');
    }

    if ((liczby_gracza.length > 5) && (malyMottek === true)) {
        $('#alert').addClass('display');
    } else if (duzyMottek === false) {
        $('#alert').removeClass('display');
    }
};

const howManyNumbers = () => {
    if ($('#alert').hasClass('display')) {
        return false;
    }
};

const losowanie = (los, ilosc) => {
    while (los.length < ilosc) {
        let wylosowanaLiczba = Math.floor(Math.random() * wszystkie_liczby.length + 1);
        if (los.includes(wylosowanaLiczba) === false) {
            los.push(wylosowanaLiczba);
        }
    }
    los.sort(function (a, b) {
        return a - b
    });
};

const userOrRandomNumbers = () => {
    if (liczby_gracza.length === 0) {
        losowanie(liczby_chybil_trafil, 6);
    }
};

const sprawdzenie_trafien = () => {
    if (liczby_gracza.length > 0) {
        liczby_gracza.forEach(e => {
            liczby_wylosowane_dzis.forEach(f => {
                if (e == f) {
                    liczby_trafione.push(e);
                }
            })
        })
    } else {
        liczby_chybil_trafil.forEach(e => {
            liczby_wylosowane_dzis.forEach(f => {
                if (e === f) {
                    liczby_trafione.push(e);
                }
            })
        })
    }
};

const updateIloscLosowan = () => {
    iloscLosowan++;
};

const renderowanie = () => {
    document.getElementById('wszystkieLiczby').innerHTML = `Wszystkie liczby: ${wszystkie_liczby}`;
    document.getElementById('UserNumbers').innerHTML = `Twoje liczby: ${liczby_gracza}`;
    document.getElementById('liczbyChybiłTrafił').innerHTML = `Liczby chybił trafił: ${liczby_chybil_trafil}`;
    document.getElementById('liczbyWylosowaneDzis').innerHTML = `Liczby wylosowane dziś: ${liczby_wylosowane_dzis}`;
    document.getElementById('liczbyTrafione').innerHTML = `Liczby trafione: ${liczby_trafione}`;
    document.getElementById('iloscLiczbTrafionych').innerHTML = `Ilość liczb trafionych: ${liczby_trafione.length}`;
    document.getElementById('iloscLosowan').innerHTML = `Ilość odbytych losowań to: ${iloscLosowan}`;
};

const reset = () => {
    wszystkie_liczby = [];
    liczby_chybil_trafil = [];
    liczby_wylosowane_dzis = [];
    liczby_trafione = [];
    liczby_gracza = [];
    duzyMottek = false;
    malyMottek = false;
};

const wszystkieFunkcje = () => {
    wyborGry();
    losowanieLiczbWybranejGry();
    getUserValue();
    howManyNumbers();
    userOrRandomNumbers();
    losowanie(liczby_wylosowane_dzis, 6);
    sprawdzenie_trafien();
    timeEnd();
    timeCurrentLos(timeStart);
    updateIloscLosowan();
    renderowanie();
    reset();

};

// let ciagleLosowanie = window.setInterval(function () {
//     wszystkieFunkcje();
//     iloscLosowan2++;
//     console.log(iloscLosowan2);
// }, 1000);












