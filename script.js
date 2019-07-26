function addDnDHandlers(){

    // selecting all dragable stuffs
    let draggalbes = document.getElementsByClassName("draggable");
    // selecting all dropzones
    let dropzones = document.getElementsByClassName("dropzone");

    //adding event to all draggalbe elements to set transfer data to id of the dragged element
    for (let i = 0; i < draggalbes.length; i++){
        draggalbes[i].addEventListener("dragstart", (ev) => {
            // Add the target element's id to the data transfer object
            ev.srcElement.parentNode.classList.add('ondrag');
            ev.dataTransfer.setData("Text", ev.srcElement.id);
            ev.dataTransfer.dropEffect = "move";

           }, false);
    };

    // while on drag, hovering
    for (let i = 0; i < dropzones.length; i++){
        dropzones[i].addEventListener("dragover", (evt)=>{
            evt.preventDefault();
        }, false);
    }

    // after dropped or released
    for (let i = 0; i < dropzones.length; i++){
        dropzones[i].addEventListener("drop", (ev) => {
            ev.preventDefault();
            // Get the id of dragged element
            var data = ev.dataTransfer.getData("Text");
            // remove style of dragging over
            document.getElementById(data).parentNode.classList.remove('ondrag');
            // drop place validity
            var dropzone = !!ev.target.getAttribute('dropzone');

            // check valid drop place
            if(dropzone){

                // if drop area contain any element
                // set the first element to be dropped on the first div and the rest on second div. 
                if(ev.target.children[0].children[0].children.length){
                    div = ev.target.children[0].children[1]
                }else{
                    div = ev.target.children[0].children[0];
                }
                // move the element dragged to the new drop area
                div.appendChild(document.getElementById(data));
                ev.target.children[0].appendChild(div);
                check();
            }
            

           }, false);
    }

    
}

check = ()=>{
    let dropzones = document.getElementsByClassName("dropzone"); // collect all dropzones
    var right = [0,0,0]; // for counting correctly catagorized boxes

    // correct answer pairs
    correct = [[],['cat', 'dog'], ['pillow','bed cover'], ['water', 'bread']]; 

    for (let i = 1; i < dropzones.length; i++){
        // dropzones contain at least two elements
        if(dropzones[i].children[0].children[0] &&
        dropzones[i].children[0].children[1] ){

            // first div element in i-th dropzone
            first = dropzones[i].children[0].children[0].innerText || '';
            // second div element in i-th dropzone
            second = dropzones[i].children[0].children[1].innerText || '';

            //if dropped element pair in the dropzone match with array correct pair from above
            if( ( first == correct[i][0] && second == correct[i][1] ) ||
            ( first == correct[i][1] && second == correct[i][0] )    ){
                dropzones[i].style="background: lightgreen;"; 
                right[i-1] = 1;
            }else{
                dropzones[i].style="background: lightblue;"
                right[i-1] = 0;
            }
        }
    }
    if (right.reduce((acc,val)=>{ return acc + val},0) == 3){
        alert("you completed the challenge");

    }
}

document.addEventListener("DOMContentLoaded", addDnDHandlers,false);