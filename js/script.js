// ----------JAVASCRIPT---------- //
document.addEventListener("DOMContentLoaded", function () { // Varmistaa, että JS ajetaan vasta HTML:n jälkeen

    // -----LATAUSRUUTU----- //
    const loadingScreen = document.getElementById("loading-screen");
    loadingScreen.style.display = "none";

    // -----LOGON RESPONSIIVISUUS----- //
    function updateNavbarText() {
        const navbarText = document.getElementById("navbar-text");

        if (window.innerWidth <= 500) { // Jos näytön leveys on alle 500px
            navbarText.textContent = "KMJT";
        } else {
            navbarText.textContent = "Kotkantien maalaus- ja tapetointi";
        }
    }

    updateNavbarText(); // Kutsuu funktion heti sivun latautuessa puhelinkäyttäjiä varten

    window.addEventListener("resize", updateNavbarText); // Kuuntelee näytön kokoa ja kutsuu funktion sen muuttuessa

    // -----GALLERY MODAL----- //
    const images = document.querySelectorAll(".gallery-image");

    images.forEach(function (img) { // Käy läpi kaikki kuvat ja laittaa niihin eventListenerin
        img.addEventListener('click', function () { // "This" tarkoittaa painettua/klikattua kuvaa
            const modal = this.nextElementSibling; // Etsii seuraavan sisaruksen <img> elementin jälkeen
            const modalImg = modal.querySelector(".modal-content"); // Etsii modalista elementin, joka kuuluu "modal-content" classiin

            modal.style.display = 'block'; // Modali näkyviin
            modalImg.src = this.src; // Asettaa modal-kuvan lähteeksi painetun kuvan lähteen
        });
    });

    const closeButtons = document.querySelectorAll(".modal .close"); // Valitsee kaikki modalien sulkemisnapit
    closeButtons.forEach(function (button) { // Käy läpi kaikki napit ja laittaa niihin eventListenerin
        button.addEventListener('click', function () {
            this.parentElement.style.display = 'none'; // Valitaan napin parentti, eli modali ja piilotetaan se
        });
    });
});

// ----------JQUERY---------- //
$(document).ready(function () { // Varmistaa, että jQuery ajetaan vasta HTML:n jälkeen

    // -----YHTEYDENOTTOLOMAKE----- //
    $('#contact-email').on('change', function () { // Kuuntelee checkboxia ja kutsuu funktion sen muuttuessa
        $('#email').prop('disabled', !this.checked); // Poistaa email-kentän käytöstä, jos !this.checked == true (eli this.checked == false)
        $('#email').prop('required', this.checked); // Lisää vaatimuksen email-kenttään, jos this.checked == true
        if (!this.checked) {
            $('#email').val(''); // Tyhjentää kentän
        }
    });

    $('#contact-phone').on('change', function () { // Samat asiat puhelinnumerokentälle
        $('#number').prop('disabled', !this.checked);
        $('#number').prop('required', this.checked);
        if (!this.checked) {
            $('#number').val('');
        }
    });

    // -----VÄRIVALITSIN----- //
    const colorNames = { // Määrittää RGB-arvot ja värien nimet
        'rgb(221, 65, 50)': 'Fiesta',
        'rgb(158, 16, 48)': 'Jester Red',
        'rgb(254, 132, 14)': 'Turmeric',
        'rgb(255, 111, 97)': 'Living Coral',
        'rgb(198, 33, 104)': 'Pink Peacock',
        'rgb(141, 148, 64)': 'Pepper Stem',
        'rgb(255, 214, 98)': 'Aspen Gold',
        'rgb(0, 83, 156)': 'Princess Blue',
        'rgb(117, 81, 57)': 'Toffee',
        'rgb(214, 156, 47)': 'Mango Mojito',
        'rgb(97, 98, 71)': 'Terrarium Moss',
        'rgb(232, 181, 206)': 'Sweet Lilac',
        'rgb(210, 194, 157)': 'Soybean',
        'rgb(52, 49, 72)': 'Eclipse',
        'rgb(240, 234, 214)': 'Sweet Corn',
        'rgb(97, 85, 80)': 'Brown Granite',
        'rgb(255, 255, 255)': 'Väri' // Oletusväri
    };

    $('.colorbutton').on('click', function () { // Kuuntelee värinappeja ja kutsuu funktion painettaessa
        const targetWallClass = $(this).data('target'); // Tallentaa data-targetin vakioon, jotta tietää kumpi seinä kyseessä (st1 || st2)
        const newColor = $(this).css('background-color'); // Tallentaa painetun napin RGB-arvon vakioon
        const colorName = colorNames[newColor] || 'Tuntematon väri'; // Tallentaa värin nimen RGB-arvon perusteella

        $(`.${targetWallClass}`).css('fill', newColor); // Päivittää valitun seinän valitulla värillä

        $(`.colorbutton[data-target="${targetWallClass}"]`).removeClass('active'); // Ottaa kaikilta seinän napeilta 'active'-tilan pois
        $(this).addClass('active'); // Lisää 'active'-tilan painettuun nappiin

        // Päivittää tekstien sisällön ja värin
        if (targetWallClass === 'st1') {
            $('#colorText1').text(`${colorName} (${newColor})`).css('color', newColor);
        } else if (targetWallClass === 'st2') {
            $('#colorText2').text(`${colorName} (${newColor})`).css('color', newColor);
        }
    });

    // "Poista väri" -nappi seinälle 1
    $('#reset-wall1').on('click', function () {
        $('.st1').css('fill', '#fff'); // Palauttaa seinän värin valkoiseksi
        $('#colorText1').text('Väri').css('color', '#fff'); // Palauttaa tekstin sisällön ja värin oletukseksi
        $('.colorbutton[data-target="st1"]').removeClass('active'); // Ottaa st1-seinän kaikilta napeilta 'active'-tilan pois
    });

    // "Poista väri" -nappi seinälle 2
    $('#reset-wall2').on('click', function () {
        $('.st2').css('fill', '#fff'); // Palauttaa seinän värin valkoiseksi
        $('#colorText2').text('Väri').css('color', '#fff'); // Palauttaa tekstin sisällön ja värin oletukseksi
        $('.colorbutton[data-target="st2"]').removeClass('active'); // Ottaa st1-seinän kaikilta napeilta 'active'-tilan pois
    });
});