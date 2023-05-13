console.log('From content: script loaded');

if (document.title === 'PDA Bookings') {
  const parentElement = $('td.ct-active');
  const menuTemplate = `
    <div class="container" id="MyExtension" style="border-style: solid; border-width: 4px">
    <h3>DOT Automatic Test Booker</h3>
    <h5 id="status" style="font-style: italic; color: red;" >Not Running</h5>
      <ol>
        <li>
          <span class="emphasized-plain">Book or Alert</span>
          <input id="bookSwitch" type="checkbox" checked="cheked" value="ROCK" />
          <label id="bookLabel"> Book </label>
        </li>
        <br/>

       <!--

        <li>
          <span class="emphasized-plain">Earliest Start Time</span>
          <input type="time" />
          <label> Earliest </label>
        </li>

        <li>
          <span class="emphasized-plain">Latest Start Time</span>
          <input type="time" />
          <label> Latest </label>
          
        </li>

        <li><span style="font-style: italic;">(Leave blank if you have no time prefernece. Will get test quicker)</span></li>

        --!>

        <li style="text-align: right">
          <input type="button" value="Start Looking!!" id="StartLooking" class="licensing-button-short" />
          <input type="button" value="Stop Search" id="StopLooking" class="licensing-button-short" />
        </li>
      </ol>
    </div>
  `;
  parentElement.insertAdjacentHTML('beforeend', menuTemplate);

  //Alert Or booking Settings
  var checkbox = document.getElementById('bookSwitch');
  var label = document.getElementById('bookLabel');
  checkbox.onclick = function updateLabel() {
    // Check if the checkbox is checked
    if (checkbox.checked) {
      // If the checkbox is checked, set the label text to "Book"
      label.textContent = 'Book Test';
    } else {
      // If the checkbox is not checked, set the label text to "Alert"
      label.textContent = 'Alert ';
    }
  };

  //Script

  // Start Search
  var searchButton = document.getElementById('StartLooking');
  searchButton.onclick = function RunScript() {
    var status = (document.getElementById('status').innerHTML = ' Running');
    var status = (document.getElementById('status').style =
      'font-style: italic; color: green;');

    //Search Loop
    myIntervel = setInterval(function () {
      try {
        $('div#mnbbuttonBar>table>tbody>tr>td').click();
        var now = new Date(); //date
        var current_time = now.toLocaleTimeString();
        var current_date = now.toLocaleDateString();
        let state = document.getElementsByClassName('feedbackPanelERROR');
        let stateParsed = state[0].innerText;
        var noBook =
          'Sorry, there are no bookings available for the date requested. Please alter your requested booking date and try again.';
        console.log('nada ' + current_time);
      } catch (err) {
        let booking = document.querySelectorAll('#searchResultRadioLabel');
        for (let i = 0; i < booking.length; i++) {
          console.log(booking[i].innerHTML);

          //define components
          const components = booking[i].innerHTML.split(' at ');
          const booking_date = components[0];
          const timeAndLocation = components[1];
          const booking_time_12h =
            timeAndLocation.split(' ')[1] + ' ' + timeAndLocation.split(' ')[2];
          const booking_location = timeAndLocation
            .split(' ')
            .slice(3)
            .join(' ');
          [];

          if (checkbox.checked) {
            $('input#searchResultRadio0').click();
            $('input#id3e').click();
            clearInterval(myIntervel);
            alert(
              'test booked :) for:' +
                booking_date +
                ' ' +
                booking_time_12h +
                ' at ' +
                booking_location
            );
          } else {
            alert(
              'A Test Is available: ' +
                booking_date +
                ' ' +
                booking_time_12h +
                ' at ' +
                booking_location
            );
          }
        }
      }
    }, 5000);
  };
  // Stop Search
  var stopSearch = document.getElementById('StopLooking');
  stopSearch.onclick = function stopSearch() {
    clearInterval(myIntervel);
    var status = (document.getElementById('status').innerHTML = 'Not Running');
    var status = (document.getElementById('status').style =
      'font-style: italic; color: red;');
  };
}
