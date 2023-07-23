const options ={
    task: 'regression'
}

const nn = ml5.neuralNetwork(options);

const modelInfo = {
    model: './model.json',
    metadata: './model_meta.json',
    weights: './model.weights.bin',
  };

  nn.load(modelInfo, regression);


  // Step 8: make a regression

  // Use this function to test specific shots:

  function regression(){
    const input = {
        speed: 64, 
        launch: 30,
        sideAngle: 3,
        backspin: 6244,
        sidespin: 268
    }
    // nn.predict(input, handleResults);

}

function regressionFromGivenData(){

    const input = {
        speed: parseFloat(document.getElementById("speed").value),
        launch: parseFloat(document.getElementById("launch").value),
        sideAngle: parseFloat(document.getElementById("sideAngle").value),
        backspin: parseFloat(document.getElementById("backspin").value),
        sidespin: parseFloat(document.getElementById("sidespin").value)
    }
    
    nn.predict(input, handleResults);
}

let answer;
  // Step 9: define a function to handle the results of your classification
  function handleResults(error, result) {
      if(error){
        console.error(error);
        return;
      }
      answer = result[0].carry;
    }








let result = document.getElementById("result");

document.getElementById("calculate").addEventListener("click", function(event){

  if(!document.getElementById("speed").value || !document.getElementById("launch").value || !document.getElementById("sideAngle").value || !document.getElementById("backspin").value || !document.getElementById("sidespin").value){
    result.innerHTML = "Please make sure all fields are filled in";
    return;
  }
  else{
    regressionFromGivenData();
    setTimeout(() => {
      let rawAnswer = answer;
      let errorFactored = rawAnswer >= 250 ? (rawAnswer - 116.9)/0.48873 : rawAnswer - 6.5;
      result.innerHTML = "Your calculated distance is: " + (Math.round(errorFactored*100)/100).toString() + " yards";
    }, 500);
  }
    
});

