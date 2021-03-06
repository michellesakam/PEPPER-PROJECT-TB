// keeping a pointer to the session is very useful!
var session;

try {
  QiSession( function (s) {
    console.log('connected!');
    session = s;
    // now that we are connected, we can use the buttons on the page
    $('button').prop('disabled', false);
    s.service('ALMemory').then(function (memory) {
      memory.subscriber('TouchChanged').then(function (subscriber) {
        subscriber.signal.connect(changeTitle);
      });
    });
  });
} catch (err) {
  console.log("Error when initializing QiSession: " + err.message);
  console.log("Make sure you load this page from the robots server.")
}

$(function () {
  $('#start').click(gameStart);
  
});

function changeTitle() {
  $('button').text('Game start!')
}

function gameStart() {
  session.service('ALTextToSpeech').then(function (tts) {
    tts.say("ok!");
  }, function (error) {
    console.log(error);
  })

  session.service('ALMemory').then(function (memory) {
    memory.insertData('GameStart',1);
  }, function (error) {
    console.log(error);
  })

  
}

