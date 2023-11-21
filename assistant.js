function reply(button){
    switch(button){

    case "time":
        sendMessageUsr("Tell me about the time it would take.");
        revealcountry();
    break;


    case "materials":
        sendMessageUsr("Tell me about the materials used.");
        sendMessageBot();
        
    break;


    case "available":
        sendMessageUsr("Tell me if it's available in this are.");
        revealcountry();
    break;


    case "price":
        sendMessageUsr("Give me a cost estimate.");
        revealcountry();
    break;


    case "scot":
        sendMessageUsr("In Scotland.");
        revealdirection();
    break;


    case "eng":
        sendMessageUsr("In England.");
        revealdirection();
    break;


    case "north":
        sendMessageUsr("In the north.")
        revealterrain();
    break;


    case "east":
        sendMessageUsr("In the east.");
        revealterrain();
    break;


    case "south":
        sendMessageUsr("In the south");
        revealterrain();
    break;


    case "west":
        sendMessageUsr("In the west");
        revealterrain();
    break;


    case "forest":
        sendMessageUsr("In a forest");
        reset();
    break;


    case "cliffs":
        sendMessageUsr("On a cliffside.");
        reset();
    break;


    case "hills":
        sendMessageUsr("In the hills.");
        reset();
    break;


    case "plains":
        sendMessageUsr("On plains.");
        reset();
    break;

    };
}

function sendMessageUsr(msg){
    $('#messages').append("<li class='usr'>" +msg+"</li>");
  window.scrollTo(0, document.body.scrollHeight);
}

function sendMessageBot(msg){
    $('#messages').append("<li class='bot'>" +msg+"</li>");
  window.scrollTo(0, document.body.scrollHeight);
}

function revealcountry(){
    reveal=document.getElementById("locationCountry");
    reveal.classList.toggle("smolhidden");
    hide=document.getElementById("start");
    hide.classList.toggle("smolhidden");
};

function revealdirection(){
    reveal=document.getElementById("locationCountry");
    reveal.classList.toggle("smolhidden");
    hide=document.getElementById("locationDirection");
    hide.classList.toggle("smolhidden");
}

function revealterrain(){
    reveal=document.getElementById("locationTrerrain");
    reveal.classList.toggle("smolhidden");
    hide=document.getElementById("locationDirection");
    hide.classList.toggle("smolhidden");
}

function reset(){

}