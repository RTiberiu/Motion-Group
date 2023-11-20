function buttonAction(cell) {
    switch (cell) {

        /*Top layer buttons */
        case "outside":
            switchTop(cell);

            break;

        case "configurator":
            switchTop(cell);

            break;


        /*Middle layer first set of buttons */
        case "side1":
            $('.content').append(`<img src='Images/loader.gif' class='loader'>`);

            setTimeout(function () {
                $('.content').html('');
                $('.content').html(`<img src='Images/x23.png' class='interior'>`);
            }, 2000);
            switchMid(cell);
            break;

        case "side2":
            $('.content').append(`<img src='Images/loader.gif' class='loader'>`);

            setTimeout(function () {
                $('.content').html('');
                $('.content').html(`<img src='Images/Bike_path2-1.jpg' class='interior'>`);
            }, 2000);
            switchMid(cell);
            break;

        case "side3":
            $('.content').append(`<img src='Images/loader.gif' class='loader'>`);

            setTimeout(function () {
                $('.content').html('');
                $('.content').html(`<img src='Images/HighresScreenshot_2022.07.01-02.00.03.png' class='interior'>`);
            }, 2000);
            switchMid(cell);
            break;
        case "side4":
            $('.content').append(`<img src='Images/loader.gif' class='loader'>`);

            setTimeout(function () {
                $('.content').html('');
                $('.content').html(`<img src='Images/x23.png' class='interior'>`);
            }, 2000);
            switchMid(cell);
            break;

        case "side5":
            $('.content').append(`<img src='Images/loader.gif' class='loader'>`);

            setTimeout(function () {
                $('.content').html('');
                $('.content').html(`<img src='Images/x23.png' class='interior'>`);
            }, 2000);
            switchMid(cell);
            break;

        case "side6":
            $('.content').append(`<img src='Images/loader.gif' class='loader'>`);

            setTimeout(function () {
                $('.content').html('');
                $('.content').html(`<img src='Images/x23.png' class='interior'>`);
            }, 2000);
            switchMid(cell);
            break;

        case "inside":
            $('.content').append(`<img src='Images/loader.gif' class='loader'>`);

            setTimeout(function () {
                $('.content').html('');
                $('.content').html(`<img src='Images/x23.png' class='interior'>`);
            }, 2000);
            switchMid(cell);
            break;

        case "show-size1":

            $('.content').append(`<img src='Images/loader.gif' class='loader'>`);

            setTimeout(function () {
                $('.content').html('');
                $('.content').html(`<img src='Images/x23.png' class='interior'>`);
            }, 2000);
            toggleSize(cell);
            break;


        /*Middle layer second set of buttons */
        case "top-down":

            $('.content').append(`<img src='Images/loader.gif' class='loader'>`);

            setTimeout(function () {
                $('.content').html('');
                $('.content').html(`<img src='Images/x23.png' class='interior'>`);
            }, 2000);
            switchMid(cell);
            break;

        case "toggle-size":
            $('.content').append(`<img src='Images/loader.gif' class='loader'>`);

            setTimeout(function () {
                $('.content').html('');
                $('.content').html(`<img src='Images/x23.png' class='interior'>`);
            }, 2000);
            switchMid(cell);
            break;

        case "show-size2":
            $('.content').append(`<img src='Images/loader.gif' class='loader'>`);

            setTimeout(function () {
                $('.content').html('');
                $('.content').html(`<img src='Images/x23.png' class='interior'>`);
            }, 2000);
            toggleSize(cell);
            break;

        case "exit":
            $('.content').append(`<img src='Images/loader.gif' class='loader'>`);

            setTimeout(function () {
                $('.content').html('');
                $('.content').html(`<img src='Images/x23.png' class='interior'>`);
            }, 2000);
            switchMid(cell);
            break;


        /*Lower layer of buttons*/
        case "living":
            $('.content').append(`<img src='Images/loader.gif' class='loader'>`);

            setTimeout(function () {
                $('.content').html('');
                $('.content').html(`<img src='Images/x23.png' class='interior'>`);
            }, 2000);
            switchLow(cell);
            break;

        case "bath":
            $('.content').append(`<img src='Images/loader.gif' class='loader'>`);

            setTimeout(function () {
                $('.content').html('');
                $('.content').html(`<img src='Images/x23.png' class='interior'>`);
            }, 2000);
            switchLow(cell);
            break;

        case "single":
            $('.content').append(`<img src='Images/loader.gif' class='loader'>`);

            setTimeout(function () {
                $('.content').html('');
                $('.content').html(`<img src='Images/x23.png' class='interior'>`);
            }, 2000);
            switchLow(cell);
            break;

        case "double":
            $('.content').append(`<img src='Images/loader.gif' class='loader'>`);

            setTimeout(function () {
                $('.content').html('');
                $('.content').html(`<img src='Images/x23.png' class='interior'>`);
            }, 2000);
            switchLow(cell);
            break;
    };

};

function switchTop(cell) {
    oldSelect = document.querySelector(".selectedTop");
    oldSelect.classList.toggle("selectedTop");

    newSelect = document.getElementById(cell);
    newSelect.classList.toggle("selectedTop");

    /*showing and hiding layer 3, resets show sizes*/
    if (cell == "configurator") {
        showSmol = document.getElementById("layer2List2");
        showSmol.classList.remove("smolhidden");

        hideSmol = document.getElementById("layer2List1");
        hideSmol.classList.add("smolhidden");

        size = document.getElementById("show-size1");
        size.classList.remove("selected");

        size = document.getElementById("show-size2");
        size.classList.remove("selected");

        showBig = document.getElementById("layer3");
        showBig.classList.add("bighidden");

        showSmol = document.getElementById("layer3List");
        showSmol.classList.add("smolhidden");

        /*uncomment if you want selected to follow*/
        oldSelect = document.querySelector(".selectedMid");
        oldSelect.classList.toggle("selectedMid");

        newSelect = document.getElementById("top-down");
        newSelect.classList.toggle("selectedMid");

    }
    else {
        showSmol = document.getElementById("layer2List2");
        showSmol.classList.add("smolhidden");

        hideSmol = document.getElementById("layer2List1");
        hideSmol.classList.remove("smolhidden");

        size = document.getElementById("show-size1");
        size.classList.remove("selected");

        size = document.getElementById("show-size2");
        size.classList.remove("selected");

        /*uncomment if you want selected to follow*/
        oldSelect = document.querySelector(".selectedMid");
        oldSelect.classList.toggle("selectedMid");

        newSelect = document.getElementById("side1");
        newSelect.classList.toggle("selectedMid");

    };
};

function switchMid(cell) {
    oldSelect = document.querySelector(".selectedMid");
    oldSelect.classList.toggle("selectedMid");
    newSelect = document.getElementById(cell);
    newSelect.classList.toggle("selectedMid");

    if (cell == "inside") {
        showBig = document.getElementById("layer3");
        showBig.classList.remove("bighidden");
        showSmol = document.getElementById("layer3List");
        showSmol.classList.remove("smolhidden");
    }
    else {
        showBig = document.getElementById("layer3");
        showBig.classList.add("bighidden");
        showSmol = document.getElementById("layer3List");
        showSmol.classList.add("smolhidden");
    };
};

function switchLow(cell) {
    oldSelect = document.querySelector(".selectedBot");
    oldSelect.classList.toggle("selectedBot");
    newSelect = document.getElementById(cell);
    newSelect.classList.toggle("selectedBot");
};

function toggleSize(cell) {
    size = document.getElementById(cell);
    if (size.classList.contains("selected")) {
        size.classList.remove("selected");
    }
    else {
        size.classList.add("selected");
    }
};