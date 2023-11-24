function reply(button){
    switch(button){

    case "time":
        sendMessageUsr("Tell me about the time it would take.");
        sendMessageBot("What country do you want it in?");
        createpath(button);
        revealcountry();
    break;


    case "materials":
        sendMessageUsr("Tell me about the materials used.");
        sendMessageBot("The materials used were: Locally sourced wood");
    break;


    case "available":
        sendMessageUsr("Tell me if it's available in this are.");
        sendMessageBot("What country are you thinking of?");
        createpath(button);
        revealcountry();
    break;


    case "price":
        sendMessageUsr("Give me a cost estimate.");
        sendMessageBot("Which country would it be in?");
        createpath(button);
        revealcountry();
    break;


    case "scot":
        sendMessageUsr("In Scotland.");
        sendMessageBot("Which part of Scotland?");
        createpath(button);
        revealdirection();
    break;


    case "eng":
        sendMessageUsr("In England.");
        sendMessageBot("Which part of England");
        createpath(button);
        revealdirection();
    break;


    case "north":
        sendMessageUsr("In the north.");
        sendMessageBot("What's the location like?");
        createpath(button);
        revealterrain();
    break;


    case "east":
        sendMessageUsr("In the east.");
        sendMessageBot("What's the location like?");
        createpath(button);
        revealterrain();
    break;


    case "south":
        sendMessageUsr("In the south");
        sendMessageBot("What's the location like?");
        createpath(button);
        revealterrain();
    break;


    case "west":
        sendMessageUsr("In the west");
        sendMessageBot("What's the location like?");
        createpath(button);
        revealterrain();
    break;


    case "forest":
        sendMessageUsr("In a forest");
        createpath(button);
        end();
    break;


    case "cliffs":
        sendMessageUsr("On a cliffside.");
        createpath(button);
        end();
    break;


    case "hills":
        sendMessageUsr("In the hills.");
        createpath(button);
        end();
    break;


    case "plains":
        sendMessageUsr("On plains.");
        createpath(button);
        end();
    break;

    };
}

function sendMessageUsr(msg){
    $('#messages').append("<li class='usr'><p>" +msg+"</p></li>");
  window.scrollTo(0, document.body.scrollHeight);
}

function sendMessageBot(msg){
    $('#messages').append("<li class='bot'><p>" +msg+"</p></li>");
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

function createpath(set){
    path=document.getElementById(set);
    path.classList.toggle("path");
}

function end(){
    /*checking construction time decision tree*/
    if(document.getElementById("time").classList.contains("path")){
        if(document.getElementById("scot").classList.contains("path")){
            if(document.getElementById("north").classList.contains("path")){
                if(document.getElementById("forest").classList.contains("path")){
                    sendMessageBot("The time it would take is [Insert time].");
                }
                else if(document.getElementById("cliffs").classList.contains("path")){
                    sendMessageBot("The time it would take is [Insert time].");
                }
                else if(document.getElementById("hills").classList.contains("path")){
                    sendMessageBot("The time it would take is [Insert time].");
                }
                else{
                    sendMessageBot("The time it would take is [Insert time].");
                }
            }
            /*Time, Scotland, east*/
            else if(document.getElementById("east").classList.contains("path")){
                if(document.getElementById("forest").classList.contains("path")){
                    sendMessageBot("The time it would take is [Insert time].")
                }
                else if(document.getElementById("cliffs").classList.contains("path")){
                    sendMessageBot("The time it would take is [Insert time].")
                }
                else if(document.getElementById("hills").classList.contains("path")){
                    sendMessageBot("The time it would take is [Insert time].")
                }
                else{
                    sendMessageBot("The time it would take is [Insert time].")
                }
            }
            /*Time, Scotland, south*/
            else if(document.getElementById("south").classList.contains("path")){
                if(document.getElementById("forest").classList.contains("path")){
                    sendMessageBot("The time it would take is [Insert time].")
                }
                else if(document.getElementById("cliffs").classList.contains("path")){
                    sendMessageBot("The time it would take is [Insert time].")
                }
                else if(document.getElementById("hills").classList.contains("path")){
                    sendMessageBot("The time it would take is [Insert time].")
                }
                else{
                    sendMessageBot("The time it would take is [Insert time].")
                }
            }
            else{
                /*Time, Scotland, west*/
                if(document.getElementById("forest").classList.contains("path")){
                    sendMessageBot("The time it would take is [Insert time].")
                }
                else if(document.getElementById("cliffs").classList.contains("path")){
                    sendMessageBot("The time it would take is [Insert time].")
                }
                else if(document.getElementById("hills").classList.contains("path")){
                    sendMessageBot("The time it would take is [Insert time].")
                }
                else{
                    sendMessageBot("The time it would take is [Insert time].")
                }
            }
        }
        else if(document.getElementById("eng").classList.contains("path")){
            if(document.getElementById("north").classList.contains("path")){
                if(document.getElementById("forest").classList.contains("path")){
                    sendMessageBot("The time it would take is [Insert time].")
                }
                else if(document.getElementById("cliffs").classList.contains("path")){
                    sendMessageBot("The time it would take is [Insert time].")
                }
                else if(document.getElementById("hills").classList.contains("path")){
                    sendMessageBot("The time it would take is [Insert time].")
                }
                else{
                    sendMessageBot("The time it would take is [Insert time].")
                }
            }
            /*Time, England, east*/
            else if(document.getElementById("east").classList.contains("path")){
                if(document.getElementById("forest").classList.contains("path")){
                    sendMessageBot("The time it would take is [Insert time].")
                }
                else if(document.getElementById("cliffs").classList.contains("path")){
                    sendMessageBot("The time it would take is [Insert time].")
                }
                else if(document.getElementById("hills").classList.contains("path")){
                    sendMessageBot("The time it would take is [Insert time].")
                }
                else{
                    sendMessageBot("The time it would take is [Insert time].")
                }
            }
            /*Time, England, south*/
            else if(document.getElementById("south").classList.contains("path")){
                if(document.getElementById("forest").classList.contains("path")){
                    sendMessageBot("The time it would take is [Insert time].")
                }
                else if(document.getElementById("cliffs").classList.contains("path")){
                    sendMessageBot("The time it would take is [Insert time].")
                }
                else if(document.getElementById("hills").classList.contains("path")){
                    sendMessageBot("The time it would take is [Insert time].")
                }
                else{
                    sendMessageBot("The time it would take is [Insert time].")
                }
            }
            else{
                /*Time, England, west*/
                if(document.getElementById("forest").classList.contains("path")){
                    sendMessageBot("The time it would take is [Insert time].")
                }
                else if(document.getElementById("cliffs").classList.contains("path")){
                    sendMessageBot("The time it would take is [Insert time].")
                }
                else if(document.getElementById("hills").classList.contains("path")){
                    sendMessageBot("The time it would take is [Insert time].")
                }
                else{
                    sendMessageBot("The time it would take is [Insert time].")
                }
            }
        }
    }
    /*Checking availability in area*/
    else if(document.getElementById("available").classList.contains("path")){
        if(document.getElementById("scot").classList.contains("path")){
            if(document.getElementById("north").classList.contains("path")){
                if(document.getElementById("forest").classList.contains("path")){
                    sendMessageBot("The cabin is/isn't available in that area.")
                }
                else if(document.getElementById("cliffs").classList.contains("path")){
                    sendMessageBot("The cabin is/isn't available in that area.")
                }
                else if(document.getElementById("hills").classList.contains("path")){
                    sendMessageBot("The cabin is/isn't available in that area.")
                }
                else{
                    sendMessageBot("The cabin is/isn't available in that area.")
                }
            }
            /*Available, Scotland, east*/
            else if(document.getElementById("east").classList.contains("path")){
                if(document.getElementById("forest").classList.contains("path")){
                    sendMessageBot("The cabin is/isn't available in that area.")
                }
                else if(document.getElementById("cliffs").classList.contains("path")){
                    sendMessageBot("The cabin is/isn't available in that area.")
                }
                else if(document.getElementById("hills").classList.contains("path")){
                    sendMessageBot("The cabin is/isn't available in that area.")
                }
                else{
                    sendMessageBot("The cabin is/isn't available in that area.")
                }
            }
            else if(document.getElementById("south").classList.contains("path")){
                if(document.getElementById("forest").classList.contains("path")){
                    sendMessageBot("The cabin is/isn't available in that area.")
                }
                else if(document.getElementById("cliffs").classList.contains("path")){
                    sendMessageBot("The cabin is/isn't available in that area.")
                }
                else if(document.getElementById("hills").classList.contains("path")){
                    sendMessageBot("The cabin is/isn't available in that area.")
                }
                else{
                    sendMessageBot("The cabin is/isn't available in that area.")
                }
            }
            else{
                if(document.getElementById("forest").classList.contains("path")){
                    sendMessageBot("The cabin is/isn't available in that area.")
                }
                else if(document.getElementById("cliffs").classList.contains("path")){
                    sendMessageBot("The cabin is/isn't available in that area.")
                }
                else if(document.getElementById("hills").classList.contains("path")){
                    sendMessageBot("The cabin is/isn't available in that area.")
                }
                else{
                    sendMessageBot("The cabin is/isn't available in that area.")
                }
            }
        }
        else if(document.getElementById("eng").classList.contains("path")){
            if(document.getElementById("north").classList.contains("path")){
                if(document.getElementById("forest").classList.contains("path")){
                    sendMessageBot("The cabin is/isn't available in that area.")
                }
                else if(document.getElementById("cliffs").classList.contains("path")){
                    sendMessageBot("The cabin is/isn't available in that area.")
                }
                else if(document.getElementById("hills").classList.contains("path")){
                    sendMessageBot("The cabin is/isn't available in that area.")
                }
                else{
                    sendMessageBot("The cabin is/isn't available in that area.")
                }
            }
            else if(document.getElementById("east").classList.contains("path")){
                if(document.getElementById("forest").classList.contains("path")){
                    sendMessageBot("The cabin is/isn't available in that area.")
                }
                else if(document.getElementById("cliffs").classList.contains("path")){
                    sendMessageBot("The cabin is/isn't available in that area.")
                }
                else if(document.getElementById("hills").classList.contains("path")){
                    sendMessageBot("The cabin is/isn't available in that area.")
                }
                else{
                    sendMessageBot("The cabin is/isn't available in that area.")
                }
            }
            else if(document.getElementById("south").classList.contains("path")){
                if(document.getElementById("forest").classList.contains("path")){
                    sendMessageBot("The cabin is/isn't available in that area.")
                }
                else if(document.getElementById("cliffs").classList.contains("path")){
                    sendMessageBot("The cabin is/isn't available in that area.")
                }
                else if(document.getElementById("hills").classList.contains("path")){
                    sendMessageBot("The cabin is/isn't available in that area.")
                }
                else{
                    sendMessageBot("The cabin is/isn't available in that area.")
                }
            }
            else{
                if(document.getElementById("forest").classList.contains("path")){
                    sendMessageBot("The cabin is/isn't available in that area.")
                }
                else if(document.getElementById("cliffs").classList.contains("path")){
                    sendMessageBot("The cabin is/isn't available in that area.")
                }
                else if(document.getElementById("hills").classList.contains("path")){
                    sendMessageBot("The cabin is/isn't available in that area.")
                }
                else{
                    sendMessageBot("The cabin is/isn't available in that area.")
                }
            }
        }

    }
    else{
        if(document.getElementById("scot").classList.contains("path")){
            if(document.getElementById("north").classList.contains("path")){
                if(document.getElementById("forest").classList.contains("path")){
                    sendMessageBot("The cabin would cost [Inset price].")
                }
                else if(document.getElementById("cliffs").classList.contains("path")){
                    sendMessageBot("The cabin would cost [Inset price].")
                }
                else if(document.getElementById("hills").classList.contains("path")){
                    sendMessageBot("The cabin would cost [Inset price].")
                }
                else{
                    sendMessageBot("The cabin would cost [Inset price].")
                }
            }
            else if(document.getElementById("east").classList.contains("path")){
                if(document.getElementById("forest").classList.contains("path")){
                    sendMessageBot("The cabin would cost [Inset price].")
                }
                else if(document.getElementById("cliffs").classList.contains("path")){
                    sendMessageBot("The cabin would cost [Inset price].")
                }
                else if(document.getElementById("hills").classList.contains("path")){
                    sendMessageBot("The cabin would cost [Inset price].")
                }
                else{
                    sendMessageBot("The cabin would cost [Inset price].")
                }
            }
            else if(document.getElementById("south").classList.contains("path")){
                if(document.getElementById("forest").classList.contains("path")){
                    sendMessageBot("The cabin would cost [Inset price].")
                }
                else if(document.getElementById("cliffs").classList.contains("path")){
                    sendMessageBot("The cabin would cost [Inset price].")
                }
                else if(document.getElementById("hills").classList.contains("path")){
                    sendMessageBot("The cabin would cost [Inset price].")
                }
                else{
                    sendMessageBot("The cabin would cost [Inset price].")
                }
            }
            else{
                if(document.getElementById("forest").classList.contains("path")){
                    sendMessageBot("The cabin would cost [Inset price].")
                }
                else if(document.getElementById("cliffs").classList.contains("path")){
                    sendMessageBot("The cabin would cost [Inset price].")
                }
                else if(document.getElementById("hills").classList.contains("path")){
                    sendMessageBot("The cabin would cost [Inset price].")
                }
                else{
                    sendMessageBot("The cabin would cost [Inset price].")
                }
            }
        }
        else if(document.getElementById("eng").classList.contains("path")){
            if(document.getElementById("north").classList.contains("path")){
                if(document.getElementById("forest").classList.contains("path")){
                    sendMessageBot("The cabin would cost [Inset price].")
                }
                else if(document.getElementById("cliffs").classList.contains("path")){
                    sendMessageBot("The cabin would cost [Inset price].")
                }
                else if(document.getElementById("hills").classList.contains("path")){
                    sendMessageBot("The cabin would cost [Inset price].")
                }
                else{
                    sendMessageBot("The cabin would cost [Inset price].")
                }
            }
            else if(document.getElementById("east").classList.contains("path")){
                if(document.getElementById("forest").classList.contains("path")){
                    sendMessageBot("The cabin would cost [Inset price].")
                }
                else if(document.getElementById("cliffs").classList.contains("path")){
                    sendMessageBot("The cabin would cost [Inset price].")
                }
                else if(document.getElementById("hills").classList.contains("path")){
                    sendMessageBot("The cabin would cost [Inset price].")
                }
                else{
                    sendMessageBot("The cabin would cost [Inset price].")
                }
            }
            else if(document.getElementById("south").classList.contains("path")){
                if(document.getElementById("forest").classList.contains("path")){
                    sendMessageBot("The cabin would cost [Inset price].")
                }
                else if(document.getElementById("cliffs").classList.contains("path")){
                    sendMessageBot("The cabin would cost [Inset price].")
                }
                else if(document.getElementById("hills").classList.contains("path")){
                    sendMessageBot("The cabin would cost [Inset price].")
                }
                else{
                    sendMessageBot("The cabin would cost [Inset price].")
                }
            }
            else{
                if(document.getElementById("forest").classList.contains("path")){
                    sendMessageBot("The cabin would cost [Inset price].")
                }
                else if(document.getElementById("cliffs").classList.contains("path")){
                    sendMessageBot("The cabin would cost [Inset price].")
                }
                else if(document.getElementById("hills").classList.contains("path")){
                    sendMessageBot("The cabin would cost [Inset price].")
                }
                else{
                    sendMessageBot("The cabin would cost [Inset price].")
                }
            }
        }
    }
}

function reset(){
    sendMessageBot("how can I help?");
    document.querySelector(".path").classList.toggle("path");
    document.getElementById("start").classList.toggle("smolhidden");
    document.getElementById("locationTrerrain").classList.add("smolhidden");
    document.getElementById("locationCountry").classList.add("smolhidden");
    document.getElementById("locationDirection").classList.add("smolhidden");

}