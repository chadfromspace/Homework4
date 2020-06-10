var defineCardBody = document.querySelector(".card-body");
var startButton = document.querySelector(".btn");
var h1Selector = document.querySelector("H1");
var footerSelector = document.querySelector(".card-footer");
var questionArray = ["Commonly used data types <strong>DO NOT</strong> include:"];
var answerArray = ["1.Strings","2.Booleans","3.Alerts","4.Numbers"];

startButton.addEventListener("click", 
    function(event){
        event.preventDefault();
        defineCardBody.innerHTML = "";
        footerSelector.innerHTML = "";
        h1Selector.innerHTML = questionArray[0];
        for(i=0;i<4;i++){
            var newButton = document.createElement("BUTTON");
            var br = document.createElement("br");
            newButton.innerHTML = answerArray[i];
            footerSelector.appendChild(newButton);
            footerSelector.appendChild(br);
        }
    }
)