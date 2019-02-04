$(document).ready(function () {

      // Initialize Firebase
      var config = {
        apiKey: "AIzaSyD6WygoZGScIsZSOPbpgmbXE4BKUGpV_zs",
        authDomain: "ja-train-homework.firebaseapp.com",
        databaseURL: "https://ja-train-homework.firebaseio.com",
        projectId: "ja-train-homework",
        storageBucket: "ja-train-homework.appspot.com",
        messagingSenderId: "733133930897"
      };
    firebase.initializeApp(config);
  
    var database = firebase.database();

    var trainName;
    var trainDestination;
    var trainTime;
    var trainFrequency;


    //calculate on fly: employeeMonthsWorked, employeeTotalBilled


    //addEmployee function
    $(".form-submit").on("submit", function (event) {
        event.preventDefault();
        trainName = $("#trainName").val().trim();
        trainDestination = $("#trainDestination").val().trim();
        trainFrequency = $("#trainFrequency").val().trim();
        trainTime = $("#trainTime").val().trim();

        database.ref().push({
            trainName: trainName,
            trainDestination: trainDestination,
            trainFrequency: trainFrequency,
            trainTime: trainTime
        });
        trainName = $("#trainName").val("");
        trainDestination = $("#trainDestination").val("");
        trainFrequency = $("#trainFrequency").val("");
        trainTime = $("#trainTime").val("");

    });

    //listen for added child function
    database.ref().on("child_added", function (snapshot) {

        let thetrainName = snapshot.val().trainName;
        let thetrainDestination = snapshot.val().trainDestination;
        let thetrainFrequency = snapshot.val().trainFrequency;

        //TODO: Math to calculate minAway and next train

        // Chang year so first train comes before now
        let firstTrainNew = moment(snapshot.val().trainTime, "hh:mm").subtract(1, "years");
        // Difference between the current and firstTrain
        let diffTime = moment().diff(moment(firstTrainNew), "minutes");
        let remainder = diffTime % snapshot.val().trainFrequency;
        // Minutes until next train
        let minAway = snapshot.val().trainFrequency - remainder;
        // Next train time
        let nextTrain = moment().add(minAway, "minutes");
        nextTrain = moment(nextTrain).format("hh:mm");

        if (thetrainName) {
            let theTdString = "<tr><td>" + thetrainName + "</td><td>" + thetrainDestination + "</td><td>" + thetrainFrequency + "</td><td>" + nextTrain + "</td><td>" + minAway + "</td></tr>"
         $("#trainAdd").append(theTdString);
        }

        // create td
        


    }, function (errorObject) {
        console.log("entries-error: " + errorObject.code);


    });


});



