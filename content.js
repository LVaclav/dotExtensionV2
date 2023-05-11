console.log('From content: script loaded');
window.addEventListener(
  'message',
  (event) => {
    // We only accept messages from ourselves
    if (event.source !== window) {
      return;
      console.log('error1');
    }
    if (event.data.type && event.data.type === 'FROM_PAGE') {
      console.log('Content script received: ' + event.data.text);
      port.postMessage(event.data.text);
    } else {
      console.log('error2');
    }
  },
  false
);

function RunScript() {
  myIntervel = setInterval(function () {
    var now = new Date();
    var current_time = now.toLocaleTimeString();
    var current_date = now.toLocaleDateString();
    console.log('script running' + current_time);
    // try {
    //   //change 'id8' to 'idb' if you are using the change booking interface
    //   document.getElementById('id8').click();
    //   let state = document.getElementsByClassName('feedbackPanelERROR');
    //   let stateParsed = state[0].innerText;
    //   var noBook =
    //     'Sorry, there are no bookings available for the date requested. Please alter your requested booking date and try again.';
    //   console.log('nada ' + current_time);
    // } catch (err) {
    //   let booking = document.querySelectorAll('#searchResultRadioLabel');
    //   console.log('These results appeared at ' + current_time + ' :');
    //   for (let i = 0; i < booking.length; i++) {
    //     console.log(booking[i].innerHTML);

    //     //define components
    //     const components = booking[i].innerHTML.split(' at ');
    //     const booking_date = components[0];
    //     const timeAndLocation = components[1];
    //     const booking_time_12h =
    //       timeAndLocation.split(' ')[1] + ' ' + timeAndLocation.split(' ')[2];
    //     const booking_location = timeAndLocation.split(' ').slice(3).join(' ');
    //     [];
    //   }
    // }
  }, 20000);
  x;
}
