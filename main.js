function switchCase(called){
switch(called){
    case 1: /*Switch to layer2List1 */
        oldSelect=document.querySelector(".selected");
        oldSelect.classList.replace("selected","");
        newSelect=document.querySelector("#1");
        newSelect.classList.replace("","selected");
        /*TODO: figure out how to add check again*/
        break;
    
    case 2: /*Switch to layer2List2 */
        oldSelect=document.querySelector(".selected");
        oldSelect.classList.replace("selected","");
        newSelect=document.querySelector("#2");
        newSelect.classList.replace("","selected");
        newShowSmol=document.querySelector("#layer2List2");
        newShowSmol.classList.replace("smolhidden","");
        break;

    case 3:/*buttons 3-8 are different OUTSIDE views */
        oldSelect=document.querySelector(".selected");
        oldSelect.classList.replace("selected","");
        newSelect=document.querySelector("#3");
        newSelect.classList.replace("","selected");
        break;

    case 4:
        oldSelect=document.querySelector(".selected");
        oldSelect.classList.replace("selected","");
        newSelect=document.querySelector("#4");
        newSelect.classList.replace("","selected");
        break;

    case 5:
        oldSelect=document.querySelector(".selected");
        oldSelect.classList.replace("selected","");
        newSelect=document.querySelector("#5");
        newSelect.classList.replace("","selected");
        break;

    case 6:
        oldSelect=document.querySelector(".selected");
        oldSelect.classList.replace("selected","");
        newSelect=document.querySelector("#6");
        newSelect.classList.replace("","selected");
        break;

    case 7:
        oldSelect=document.querySelector(".selected");
        oldSelect.classList.replace("selected","");
        newSelect=document.querySelector("#7");
        newSelect.classList.replace("","selected");
        break;

    case 8:
        oldSelect=document.querySelector(".selected");
        oldSelect.classList.replace("selected","");
        newSelect=document.querySelector("#8");
        newSelect.classList.replace("","selected");
        break;

    case 9: /*Switch to inside view and reveal layer2List*/
        oldSelect=document.querySelector(".selected");
        oldSelect.classList.replace("selected","");
        newSelect=document.querySelector("#9");
        newSelect.classList.replace("","selected");
        newShowBig=document.querySelector("#layer3");
        newShowBig.classList.replace("bighidden","")
        newShowSmol=document.querySelector("#layer3List");
        newShowSmol.classList.replace("smolhidden","")
        break;

    case 10:/*Show sizes (toggle?)*/
        oldSelect=document.querySelector(".selected");
        oldSelect.classList.replace("selected","");
        newSelect=document.querySelector("#10");
        newSelect.classList.replace("","selected");
        break;

    case 11: /*11-14 layer2List2*/
        oldSelect=document.querySelector(".selected");
        oldSelect.classList.replace("selected","");
        newSelect=document.querySelector("#11");
        newSelect.classList.replace("","selected");
        break;

    case 12:
        oldSelect=document.querySelector(".selected");
        oldSelect.classList.replace("selected","");
        newSelect=document.querySelector("#12");
        newSelect.classList.replace("","selected");
        break;

    case 13:
        oldSelect=document.querySelector(".selected");
        oldSelect.classList.replace("selected","");
        newSelect=document.querySelector("#13");
        newSelect.classList.replace("","selected");
        break;

    case 14:
        oldSelect=document.querySelector(".selected");
        oldSelect.classList.replace("selected","");
        newSelect=document.querySelector("#14");
        newSelect.classList.replace("","selected");
        break;

    case 15:/*layer3List*/
        oldSelect=document.querySelector(".selected");
        oldSelect.classList.replace("selected","");
        newSelect=document.querySelector("#15");
        newSelect.classList.replace("","selected");
        break;

    case 16:
        oldSelect=document.querySelector(".selected");
        oldSelect.classList.replace("selected","");
        newSelect=document.querySelector("#16");
        newSelect.classList.replace("","selected");
        break;

    case 17:
        oldSelect=document.querySelector(".selected");
        oldSelect.classList.replace("selected","");
        newSelect=document.querySelector("#17");
        newSelect.classList.replace("","selected");
        break;

    case 18:
        oldSelect=document.querySelector(".selected");
        oldSelect.classList.replace("selected","");
        newSelect=document.querySelector("#18");
        newSelect.classList.replace("","selected");
        break;                                                                                      
}
}