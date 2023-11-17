function buttonAction(cell){
switch(cell){

    /*Top layer buttons */
    case "outside":
        switchTop(cell);
        
        break;

    case "configurator":
        switchTop(cell);
        
    break;


    /*Middle layer first set of buttons */
    case "side1":
        switchMid(cell);
        break;

    case "side2": 
        switchMid(cell);
        break;

    case "side3": 
        switchMid(cell);
        break;
    case "side4": 
        switchMid(cell);
        break;

    case "side5": 
        switchMid(cell);
        break;

    case "side6": 
        switchMid(cell);
        break;
    
    case "inside": 
        switchMid(cell);
        break;

    case "show-size1": 
        toggleSize(cell);
        break;


    /*Middle layer second set of buttons */
    case "top-down":
        switchMid(cell);
        break;
    
    case "toggle-size":
        switchMid(cell);
        break;

    case "show-size2": 
        toggleSize(cell);
        break;

    case "exit":
        switchMid(cell);
        break;

    
    /*Lower layer of buttons*/
    case "living":
       switchLow(cell);
        break;

    case "bath":
        switchLow(cell);
        break;

    case "single":
        switchLow(cell);
        break;

    case "double":
        switchLow(cell);
        break;
    };
    
};

function switchTop(cell){
    oldSelect=document.querySelector(".selectedTop");
    oldSelect.classList.toggle("selectedTop");

    newSelect=document.getElementById(cell);
    newSelect.classList.toggle("selectedTop");
    
    /*showing and hiding layer 3, resets show sizes*/
    if(cell =="configurator"){
        showSmol=document.getElementById("layer2List2");
        showSmol.classList.remove("smolhidden");

        hideSmol=document.getElementById("layer2List1");
        hideSmol.classList.add("smolhidden");

        size=document.getElementById("show-size1");
        size.classList.remove("selected");

        size=document.getElementById("show-size2");
        size.classList.remove("selected");

        showBig=document.getElementById("layer3");
        showBig.classList.add("bighidden");

        showSmol=document.getElementById("layer3List");
        showSmol.classList.add("smolhidden");

        /*uncomment if you want selected to follow*/
        oldSelect=document.querySelector(".selectedMid");
        oldSelect.classList.toggle("selectedMid");

        newSelect=document.getElementById("top-down");
        newSelect.classList.toggle("selectedMid");
            
    }
    else{
        showSmol=document.getElementById("layer2List2");
        showSmol.classList.add("smolhidden");

        hideSmol=document.getElementById("layer2List1");
        hideSmol.classList.remove("smolhidden");

        size=document.getElementById("show-size1");
        size.classList.remove("selected");

        size=document.getElementById("show-size2");
        size.classList.remove("selected");

        /*uncomment if you want selected to follow*/
        oldSelect=document.querySelector(".selectedMid");
        oldSelect.classList.toggle("selectedMid");

        newSelect=document.getElementById("side1");
        newSelect.classList.toggle("selectedMid");
            
    };
};

function switchMid(cell){
    oldSelect=document.querySelector(".selectedMid");
    oldSelect.classList.toggle("selectedMid");
    newSelect=document.getElementById(cell);
    newSelect.classList.toggle("selectedMid");

    if(cell =="inside"){
        showBig=document.getElementById("layer3");
        showBig.classList.remove("bighidden");
        showSmol=document.getElementById("layer3List");
        showSmol.classList.remove("smolhidden");
    }
    else{
        showBig=document.getElementById("layer3");
        showBig.classList.add("bighidden");
        showSmol=document.getElementById("layer3List");
        showSmol.classList.add("smolhidden");
    };
};

function switchLow(cell){
    oldSelect=document.querySelector(".selectedBot");
    oldSelect.classList.toggle("selectedBot");
    newSelect=document.getElementById(cell);
    newSelect.classList.toggle("selectedBot");
};

function toggleSize(cell){
    size=document.getElementById(cell);
    if(size.classList.contains("selected")){
        size.classList.remove("selected");
    }
    else{
        size.classList.add("selected");
    }
};