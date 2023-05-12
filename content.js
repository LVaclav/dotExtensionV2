console.log('From content: script loaded');

if (document.title === 'PDA Bookings') {
  const parentElement = document.querySelector('#id7 > div.licensing-big-form');
  const menuTemplate = `
    <div id="MyExtension" style="border-style: solid; border-width: 4px;">
      <input type="checkbox" value="ROCK">
      <label> Book the test (if not it will jsut alert you) </label>
      <input type="submit" value="Ahoj!!" class="licensing-button-short">
    </div>
  `;
  parentElement.insertAdjacentHTML('beforeend', menuTemplate);
}

console.log(name);
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
