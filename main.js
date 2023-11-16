function switchCase(layer,cell){
switch(layer){
    case 1: /*Top layer buttons */
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

            /*uncomment if you want selected to follow
            oldSelect=document.querySelector(".selectedMid");
            oldSelect.classList.toggle("selectedMid");
            newSelect=document.getElementById("top-down");
            newSelect.classList.toggle("selectedMid");
            */
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

            /*uncomment if you want selected to follow
            oldSelect=document.querySelector(".selectedMid");
            oldSelect.classList.toggle("selectedMid");
            newSelect=document.getElementById("side1");
            newSelect.classList.toggle("selectedMid");
            */
        }
        
        break;
    
    case 2: /*Switch to layer2List2 */
        oldSelect=document.querySelector(".selectedMid");
        oldSelect.classList.toggle("selectedMid");
        newSelect=document.getElementById(cell);
        newSelect.classList.toggle("selectedMid");

        if(cell =="inside"){
            console.log("in if");
            showBig=document.getElementById("layer3");
            showBig.classList.remove("bighidden");
            showSmol=document.getElementById("layer3List");
            showSmol.classList.remove("smolhidden");
        }
        else{
            console.log("in else");
            showBig=document.getElementById("layer3");
            showBig.classList.add("bighidden");
            showSmol=document.getElementById("layer3List");
            showSmol.classList.add("smolhidden");
        }
        break;

    case 3:/*buttons 3-8 are different OUTSIDE views */
        oldSelect=document.querySelector(".selectedBot");
        oldSelect.classList.toggle("selectedBot");
        newSelect=document.getElementById(cell);
        newSelect.classList.toggle("selectedBot");
        break;
        
    case 4:
        size=document.getElementById(cell);
        if(size.classList.contains("selected")){
            size.classList.remove("selected");
        }
        else{
            size.classList.add("selected");
        }
        break;
    }
}