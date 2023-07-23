const options ={
    task: 'regression',
    debug: true
}

const nn = ml5.neuralNetwork(options);


data.forEach(shot => {
    const inputs = {
      speed: shot.ballSpeed, 
      launch: shot.launchAngle, 
      sideAngle: shot.sideAngle,
      backspin: shot.backspin,
      sidespin: shot.sidespin
    };
    const output = {
      carry: shot.carry
    };
  
    nn.addData(inputs, output);
  });



  nn.normalizeData();

  const trainingOptions = {
    epochs: 32,
    batchSize: 12
  }

  nn.train(trainingOptions, finishedTraining);


  function finishedTraining(){
    console.log("model trained")
    regression();
  }
  
  // Step 8: make a regression
  function regression(){
    const input = {
        speed: 167, 
        launch: 10.9,
        sideAngle: 5,
        backspin: 2600,
        sidespin: 0
      }
    nn.predict(input, handleResults);
  }
  
  // Step 9: define a function to handle the results of your classification
  function handleResults(error, result) {
      if(error){
        console.error(error);
        return;
      }
      console.log(result); 
      nn.save();

  }

