(function () {

    // team slider ------------------------

    let currentImgSlider = 0;
    let employeeData;
    const fieldInformation = document.querySelector('.field-information');
    const employeNameNext = document.querySelector('.employe-name-next');
    const imgNext = document.querySelector('.img-next');
    const employeNamePrevious = document.querySelector('.employe-name-previous');
    const imgPrevious = document.querySelector('.img-previous');
    const employeNext = document.querySelector('.employe-next');
    const employePrevious = document.querySelector('.employe-previous');


    (function getAjaxJsonEmployeeData() {
        const xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                employeeData = JSON.parse(xhr.response);
                createPhotoEmployee();
            }
        }
        xhr.open('GET', 'employe_data.json', true);
        xhr.send();

    })();

    function createPhotoEmployee() {
        let photoEmployee = '';
        for (let i = 0; i < employeeData.length; i++) {
            photoEmployee += `
            <img class="employee-photo" data-id="${employeeData[i]["id"]}" data-position="${employeeData[i]["data-position"]}" src="${employeeData[i]["img-src"]}" alt="employee photo">
            `
        };
        document.querySelector('.teams-slider').innerHTML = photoEmployee;
        fillCadrEmployee()
    };

    function fillCadrEmployee() {
        fieldInformation.innerHTML = `
        <h2 class="employe-name">${employeeData[currentImgSlider]["employe-name"]}</h2>
        <h3 class="employe-position">${employeeData[currentImgSlider]["employe-position"]}</h3>
        <p class="information-about">${employeeData[currentImgSlider]["information-about"]}</p>
        <ul class="employe-social-link">
            <li><a href="${employeeData[currentImgSlider]["social-link"]["facebok"]}">Facebook</a></li>
            <li><a href="${employeeData[currentImgSlider]["social-link"]["linkedin"]}">Linkedin</a></li>
            <li><a href="${employeeData[currentImgSlider]["social-link"]["twitter"]}">Twitter</a></li>
        </ul>
       `
        fillFieldNextPrev();
    }

    function fillFieldNextPrev() {
        if (currentImgSlider > 0 && currentImgSlider < employeeData.length - 1) {
            employeNameNext.innerHTML = employeeData[currentImgSlider + 1]["employe-name"];
            imgNext.src = employeeData[currentImgSlider + 1]["img-src"];
            employeNamePrevious.innerHTML = employeeData[currentImgSlider - 1]["employe-name"];
            imgPrevious.src = employeeData[currentImgSlider - 1]["img-src"];
        } else if (currentImgSlider === 0) {
            employeNameNext.innerHTML = employeeData[currentImgSlider + 1]["employe-name"];
            imgNext.src = employeeData[currentImgSlider + 1]["img-src"];
            employeNamePrevious.innerHTML = '';
            imgPrevious.src = 'img/team/empty.png';
        } else {
            employeNameNext.innerHTML = '';
            imgNext.src = 'img/team/empty.png';
            employeNamePrevious.innerHTML = employeeData[currentImgSlider - 1]["employe-name"];
            imgPrevious.src = employeeData[currentImgSlider - 1]["img-src"];
        }

    };

    // click next ------------------
    employeNext.addEventListener('click', function () {
        let photoEmployee = document.querySelectorAll('.employee-photo')
        if (currentImgSlider < employeeData.length - 1) {
            photoEmployee[currentImgSlider].attributes[2].nodeValue = employeeData.length - 1
            let dataPosition = 0
            for (let i = currentImgSlider + 1; i < employeeData.length; i++) {
                photoEmployee[i].attributes[2].nodeValue = dataPosition;
                dataPosition++
            }
            currentImgSlider++
            fillCadrEmployee();
        }
    });

    // click previous ------------------
    employePrevious.addEventListener('click', function () {
        let photoEmployee = document.querySelectorAll('.employee-photo');
        if (currentImgSlider > 0) {
            photoEmployee[currentImgSlider - 1].attributes[2].nodeValue = 0;
            let dataPosition = 1;
            for (let i = currentImgSlider; i < employeeData.length; i++) {
                photoEmployee[i].attributes[2].nodeValue = dataPosition;
                dataPosition++;
            }
            currentImgSlider--;
            fillCadrEmployee();
        }
    });

})();