var numOfButton = document.querySelectorAll(".pricing").length;

for(let i = 0; i < numOfButton; i++){
    document.querySelectorAll(".pricing")[i].addEventListener("click", warning);
    
    function warning(){
        alert("Do you want to continue?");
        
    }

}


var onclick = $0.addEventListener("click", function(event){
    console.log(event);

});
// function toggle() {
// }