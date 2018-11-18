  // Initialize Firebase
  var config = {
      apiKey: "AIzaSyCGWMtPXWy6wPnIPGx6Npj4PCRrry24HGE",
      authDomain: "mytestproject-1ac7b.firebaseapp.com",
      databaseURL: "https://mytestproject-1ac7b.firebaseio.com",
      projectId: "mytestproject-1ac7b",
      storageBucket: "mytestproject-1ac7b.appspot.com",
      messagingSenderId: "302917003026"
  };
  firebase.initializeApp(config);
  var db = firebase.database();
  var ref = db.ref('trains');

  // value change event listener
  ref.on('value', function (snapshot) {
      snapshot.forEach(function (train) {
          var tr = $("<tr>")
          var nameCell = $('<td>');
          nameCell.text(train.val().name)
          var destinationCell = $('<td>');
          destinationCell.text(train.val().destination)
          var frequencyCell = $('<td>');
          frequencyCell.text(train.val().frequency)
          var nextArrivalCell = $('<td>');
          nextArrivalCell.text(train.val().nextTrain)
          var minutesAwayCell = $('<td>');
          minutesAwayCell.text(moment().add(train.val().frequency, 'minutes').diff(moment(), 'minutes'))

          tr.append(nameCell);
          tr.append(destinationCell);
          tr.append(frequencyCell);
          tr.append(nextArrivalCell);
          tr.append(minutesAwayCell);
          $('.table').append(tr);
      })

  })
  // console.log(moment("1234", "hmm").format("HH:mm"))
  $(document).on('click', '.btn-danger', function () {
      var nextDate = moment().add($('#frequency').val(), 'minutes').format('hh:mm A');
      var train = {
          name: $('#train-name').val(),
          destination: $('#destination').val(),
          firstTime: $('#first-time').val(),
          frequency: $('#frequency').val(),
          nextTrain: nextDate
      }
      ref.push(train)
  });