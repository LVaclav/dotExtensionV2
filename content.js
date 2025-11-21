console.log('From content: script loaded');

if (document.title === 'PDA Bookings') {
  // Look for the main form area where we can inject our UI
  let parentElement = $('.licensing-big-form').last();
  if (parentElement.length === 0) {
    // Fallback: if licensing-big-form doesn't exist, try other selectors
    parentElement = $('#id9');
  }
  if (parentElement.length === 0) {
    // Final fallback: inject in the main content area
    parentElement = $('#content');
  }
  const menuTemplate = `
    <div id="MyExtension" style="border: 2px solid #4CAF50; border-radius: 10px; padding: 15px; margin: 15px 0; background-color: #f9f9f9; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
        <h3 style="color: #2E7D32; margin: 0; font-size: 1.4em;">🚗 DOT Automatic Test Booker</h3>
        <span id="status" style="font-weight: bold; color: #f44336;">🔴 Not Running</span>
      </div>

      <div style="margin: 12px 0;">
        <label style="font-weight: bold; display: inline-block; width: 140px;">Mode:</label>
        <input id="bookSwitch" type="checkbox" checked="checked" value="ROCK" style="margin-right: 8px; transform: scale(1.2);" />
        <label id="bookLabel" style="font-weight: bold; color: #2E7D32;">AUTO BOOK</label>
        <span style="margin: 0 15px; color: #757575;">|</span>
        <span style="color: #666; font-style: italic;">When available test is found:</span>
      </div>

      <div style="margin: 12px 0;">
        <label style="font-weight: bold; display: inline-block; width: 140px;">Refresh interval:</label>
        <select id="refreshInterval" style="padding: 5px; border-radius: 4px; border: 1px solid #ccc;">
          <option value="3000">3 seconds</option>
          <option value="5000" selected>5 seconds</option>
          <option value="10000">10 seconds</option>
          <option value="15000">15 seconds</option>
          <option value="30000">30 seconds</option>
        </select>
        <span style="margin: 0 15px; color: #757575;">|</span>
        <span style="color: #f57c00; font-weight: 500;">ℹ️ Lower = faster but more requests</span>
      </div>

      <div id="advancedSettings" style="margin: 12px 0; padding: 10px; background-color: #e8f5e9; border-radius: 5px; display: none;">
        <div style="margin: 8px 0;">
          <label style="font-weight: bold; display: inline-block; width: 140px;">Earliest Time:</label>
          <input type="time" id="earliestTime" />
          <label style="margin-left: 20px; font-weight: bold; display: inline-block; width: 100px;">Latest Time:</label>
          <input type="time" id="latestTime" />
        </div>
        <div style="margin: 8px 0;">
          <label style="font-weight: bold; display: inline-block; width: 140px;">Preferred Site:</label>
          <input type="text" id="preferredSite" placeholder="e.g. Success, Joondalup..." style="padding: 5px; width: 200px;" />
        </div>
      </div>

      <div style="margin: 15px 0; text-align: center;">
        <input type="button" value="🔍 Start Search" id="StartLooking" style="background-color: #4CAF50; color: white; padding: 10px 20px; border: none; border-radius: 5px; cursor: pointer; font-size: 16px; margin-right: 10px;" />
        <input type="button" value="⏹️ Stop Search" id="StopLooking" style="background-color: #f44336; color: white; padding: 10px 20px; border: none; border-radius: 5px; cursor: pointer; font-size: 16px;" disabled />
        <input type="button" value="⚙️ Advanced" id="toggleAdvanced" style="background-color: #2196F3; color: white; padding: 10px 15px; border: none; border-radius: 5px; cursor: pointer; font-size: 14px; margin-left: 10px;" />
      </div>

      <div style="font-size: 0.9em; color: #666; margin-top: 10px; padding: 8px; background-color: #fff3e0; border-left: 3px solid #ff9800; border-radius: 0 4px 4px 0;">
        <strong>ℹ️ Pro tip:</strong> Use Alert mode first to find available slots, then switch to Auto Book mode when ready.
      </div>
    </div>
  `;
  // Only inject if we found a valid parent element
  if (parentElement.length > 0) {
    parentElement.append(menuTemplate);
  }

  // Get references to all the new UI elements
  var checkbox = document.getElementById('bookSwitch');
  var label = document.getElementById('bookLabel');
  var statusElement = document.getElementById('status');
  var startButton = document.getElementById('StartLooking');
  var stopButton = document.getElementById('StopLooking');
  var advancedToggle = document.getElementById('toggleAdvanced');
  var advancedSettings = document.getElementById('advancedSettings');

  // Mode toggle functionality
  checkbox.onclick = function updateLabel() {
    if (checkbox.checked) {
      label.textContent = 'AUTO BOOK';
      label.style.color = '#2E7D32';
    } else {
      label.textContent = 'ALERT ONLY';
      label.style.color = '#1976D2';
    }
  };

  // Advanced settings toggle
  advancedToggle.onclick = function() {
    if (advancedSettings.style.display === 'none' || advancedSettings.style.display === '') {
      advancedSettings.style.display = 'block';
      advancedToggle.value = '⚙️ Basic';
    } else {
      advancedSettings.style.display = 'none';
      advancedToggle.value = '⚙️ Advanced';
    }
  };

  //Script

  let myInterval = null;

  // Start Search
  startButton.onclick = function RunScript() {
    // Update UI state
    statusElement.innerHTML = '🟢 Running';
    statusElement.style.color = '#4CAF50';
    startButton.disabled = true;
    stopButton.disabled = false;

    // Get the selected refresh interval
    const refreshInterval = parseInt(document.getElementById('refreshInterval').value);

    // Search Loop
    myInterval = setInterval(function () {
      // Check if search button exists before clicking
      if ($('#idb').length === 0) {
        console.error('Search button not found! The page structure may have changed.');
        statusElement.innerHTML = '❌ Error: Button not found';
        statusElement.style.color = '#f44336';
        clearInterval(myInterval);
        startButton.disabled = false;
        stopButton.disabled = true;
        return;
      }

      // Click the actual search button
      $('#idb').click();
      var now = new Date(); //date
      var current_time = now.toLocaleTimeString();
      var current_date = now.toLocaleDateString();

      // Update status to indicate searching
      if (statusElement.innerHTML !== '📝 Booking...' &&
          statusElement.innerHTML !== '🔔 Found!' &&
          statusElement.innerHTML !== '✅ Booked!' &&
          statusElement.innerHTML !== '🔔 Available!') {
        statusElement.innerHTML = '🔎 Searching...';
        statusElement.style.color = '#2196F3';
      }

      // Wait a bit for results to load before checking
      setTimeout(function() {
        try {
          // Check if there are error messages (meaning no bookings available)
          let state = document.getElementsByClassName('feedbackPanelERROR');
          if (state.length > 0 && state[0].innerText.toLowerCase().includes('no bookings available')) {
            console.log('No bookings available: ' + current_time);
            // Only update status if we're still searching (not booking)
            if (statusElement.innerHTML === '🔎 Searching...') {
              statusElement.innerHTML = '⏳ Waiting...';
              statusElement.style.color = '#FF9800';
            }
          } else {
            // Check if booking results are available
            let booking = document.querySelectorAll('#searchResultRadioLabel');
            if (booking.length > 0) {
              for (let i = 0; i < booking.length; i++) {
                console.log(booking[i].innerHTML);

                // Parse components
                const components = booking[i].innerHTML.split(' at ');
                if (components.length < 2) {
                  console.warn('Could not parse booking result:', booking[i].innerHTML);
                  continue;
                }

                const booking_date = components[0];
                const timeAndLocation = components[1];

                // Extract time (assumes format like " at 9:45 AM Success")
                const timeMatch = timeAndLocation.match(/(\d{1,2}:\d{2}\s*(?:AM|PM))/i);
                const booking_time_12h = timeMatch ? timeMatch[0] : '';

                // Extract location (everything after the time)
                let booking_location = timeAndLocation.replace(timeMatch ? timeMatch[0] : '', '').trim();
                // Clean up the location by removing leading "at " if present
                if (booking_location.startsWith('at ')) {
                  booking_location = booking_location.substring(3);
                }

                // Check if the result matches our preferences
                const earliestTime = document.getElementById('earliestTime') ? document.getElementById('earliestTime').value : '';
                const latestTime = document.getElementById('latestTime') ? document.getElementById('latestTime').value : '';
                const preferredSite = document.getElementById('preferredSite') ? document.getElementById('preferredSite').value.toLowerCase() : '';

                // Time filtering
                let timeMatchFilter = true;
                if (earliestTime || latestTime) {
                  // Convert 12-hour format to 24-hour for comparison
                  const bookingTime24 = convertTo24Hour(booking_time_12h);
                  if (!bookingTime24) {
                    console.warn('Could not convert time:', booking_time_12h);
                    continue; // Skip if time couldn't be parsed
                  }

                  if (earliestTime) {
                    if (bookingTime24 < earliestTime) {
                      timeMatchFilter = false; // Skip if earlier than preferred
                    }
                  }

                  if (latestTime) {
                    if (bookingTime24 > latestTime) {
                      timeMatchFilter = false; // Skip if later than preferred
                    }
                  }
                }

                // Site filtering
                let siteMatchFilter = true;
                if (preferredSite && !booking_location.toLowerCase().includes(preferredSite)) {
                  siteMatchFilter = false; // Skip if doesn't match preferred site
                }

                // Only process if both filters pass
                if (timeMatchFilter && siteMatchFilter) {
                  if (checkbox.checked) {
                    statusElement.innerHTML = '📝 Booking...';
                    statusElement.style.color = '#FF9800';

                    // Click the specific booking radio button
                    $(`input#searchResultRadio${i}`).click(); // Use the specific radio button for this result

                    // Check if the next step element exists before clicking
                    if ($('input#id3e').length > 0) {
                      $('input#id3e').click();
                    } else {
                      console.log('Element #id3e not found, may need to adjust selector for next step in booking process');
                    }
                    clearInterval(myInterval);

                    // Update UI
                    statusElement.innerHTML = '✅ Booked!';
                    statusElement.style.color = '#4CAF50';
                    startButton.disabled = false;
                    stopButton.disabled = true;

                    alert(
                      '🎉 Test booked successfully! 🎉\n\n' +
                      'Date: ' + booking_date + '\n' +
                      'Time: ' + booking_time_12h + '\n' +
                      'Location: ' + booking_location
                    );
                  } else {
                    statusElement.innerHTML = '🔔 Found!';
                    statusElement.style.color = '#FF9800';

                    clearInterval(myInterval);

                    // Update UI
                    statusElement.innerHTML = '🔔 Available!';
                    statusElement.style.color = '#FF9800';
                    startButton.disabled = false;
                    stopButton.disabled = true;

                    alert(
                      '📅 Test Available! 📅\n\n' +
                      'Date: ' + booking_date + '\n' +
                      'Time: ' + booking_time_12h + '\n' +
                      'Location: ' + booking_location + '\n\n' +
                      'Switch to AUTO BOOK mode to book automatically.'
                    );
                  }
                  return; // Exit after handling the first matching booking
                }
              }

              // If we got here, no matching bookings were found with filters
              if (statusElement.innerHTML === '🔎 Searching...') {
                statusElement.innerHTML = '⏳ Filtering...';
                statusElement.style.color = '#FF9800';
              }
            } else {
              console.log('Still searching... ' + current_time);
              // Only update if still in searching state
              if (statusElement.innerHTML === '🔎 Searching...') {
                statusElement.innerHTML = '⏳ Waiting...';
                statusElement.style.color = '#FF9800';
              }
            }
          }
        } catch (error) {
          console.error('Error during search cycle:', error);
          statusElement.innerHTML = '❌ Error occurred';
          statusElement.style.color = '#f44336';
          clearInterval(myInterval);
          startButton.disabled = false;
          stopButton.disabled = true;
        }
      }, 2000); // Wait 2 seconds for results to load
    }, refreshInterval); // Use the selected refresh interval
  };

  // Stop Search
  stopButton.onclick = function stopSearch() {
    if (myInterval) {
      clearInterval(myInterval);
      myInterval = null;
    }
    statusElement.innerHTML = '🔴 Not Running';
    statusElement.style.color = '#f44336';
    startButton.disabled = false;
    stopButton.disabled = true;
  };

  // Helper function to convert 12-hour time format to 24-hour for comparison
  function convertTo24Hour(time12h) {
    if (!time12h) return null;

    const [time, modifier] = time12h.split(/\s+/);
    let [hours, minutes] = time.split(':');

    if (hours === '12') {
      hours = (modifier === 'AM') ? '00' : '12';
    } else {
      hours = (modifier === 'PM') ? (parseInt(hours, 10) + 12).toString() : hours;
    }

    if (hours.length === 1) hours = '0' + hours;

    return `${hours}:${minutes}`;
  }
}
