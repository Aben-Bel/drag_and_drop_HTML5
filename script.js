function addDnDHandlers(){

    // selecting all dragable stuffs
    let draggalbes = document.getElementsByClassName("draggable");
    // selecting all dropzones
    let dropzones = document.getElementsByClassName("dropzone");

    let right = false;

    for (let i = 0; i < draggalbes.length; i++){
        draggalbes[i].addEventListener("dragstart", (ev) => {
            // Add the target element's id to the data transfer object
            ev.dataTransfer.setData("Text", ev.srcElement.id);
            ev.dataTransfer.dropEffect = "move";
           }, false);
    };

    for (let i = 0; i < dropzones.length; i++){
        dropzones[i].addEventListener("dragover", (evt)=>{
            evt.preventDefault();
        }, false);
    }

    for (let i = 0; i < dropzones.length; i++){
        dropzones[i].addEventListener("drop", (ev) => {
            ev.preventDefault();
            // Get the id of the target and add the moved element to the target's DOM
            var data = ev.dataTransfer.getData("Text");
            ev.target.children[0].appendChild(document.getElementById(data));
            check();
           }, false);
    }

    
}

check = ()=>{
    let dropzones = document.getElementsByClassName("dropzone");

    let right = false;
    correct = [[],['cat', 'dog'], ['pillow','bed cover'], ['water', 'bread']];

    for (let i = 1; i < dropzones.length; i++){
        right = false;
        if(dropzones[i].children[0].children[0] &&
        dropzones[i].children[0].children[1] ){

            first = dropzones[i].children[0].children[0].innerText || '';
            second = dropzones[i].children[0].children[1].innerText || '';

            if( ( first == correct[i][0] && second == correct[i][1] ) ||
            ( first == correct[i][1] && second == correct[i][0] )    ){
                right=true;
            }else{
                right=false;
                break;
            }
        }

        
    }

    if (right){
        alert("you completed the challenge");

    }
}

document.addEventListener("DOMContentLoaded", addDnDHandlers,false);