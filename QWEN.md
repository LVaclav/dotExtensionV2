# DOT Extension (Automatic Test Booker)

## Project Overview

This is a Chrome browser extension called "Dot Booker" (version 2.0) that automatically searches for and books driving tests on the Western Australian Department of Transport Practical Driving Assessment booking site. It injects custom HTML and JavaScript into the booking website to provide users with an automated booking system.

**Important Notice**: According to the README, support has been dropped for this extension as the Department of Transport has implemented anti-scraping measures and refresh limits. The developer notes that it still works but users should set reasonable refresh times in the user parameters.

## Architecture & Technologies

- **Manifest Version**: 3 (Chrome Extension API)
- **Primary Language**: JavaScript
- **Library**: jQuery (both 1.10.2 and 3.7.0 referenced)
- **Content Script**: Injects into `https://*.transport.wa.gov.au/*` domains
- **UI**: Simple HTML overlay interface on the booking page

## Key Files

- `content.js`: Main logic for the auto-booking functionality
- `manifest.json`: Extension configuration and permissions
- `jquery-3.7.0.js`: jQuery library dependency
- `turt.png`: Extension icon
- `README.md`: Installation and usage instructions

## Functionality

The extension provides two main modes:
1. **Alert Mode**: Finds available tests and alerts the user
2. **Booking Mode**: Automatically books the first available test matching user parameters

The interface includes settings for:
- Date parameters
- Location preferences
- Time preferences
- Toggle between Alert/Booking modes

## Installation

This extension must be loaded as an unpacked extension through Chrome's extension developer panel by following the official Chrome extension tutorial for loading unpacked extensions.

## Development Notes

- The manifest.json references `thirdParty/jquery.1.10.2.min.js` which may not be present in the current directory
- A `background.js` file is referenced in the manifest but doesn't exist in the current directory
- The project uses a 5-second interval for searching for available tests
- Contains error handling for when no bookings are available

## Security & Legal Considerations

This extension scrapes and interacts with the Western Australia Department of Transport booking system. Users should be aware of:
- Terms of service restrictions on automated access
- Anti-scraping measures that may be in place
- The developer's note about refresh limits
- Ethical considerations of automated booking systems that may affect availability for other users

## Building and Running

1. Open Chrome and navigate to `chrome://extensions/`
2. Enable "Developer mode"
3. Click "Load unpacked" and select this directory
4. Navigate to the WA DOT booking website (`transport.wa.gov.au`)
5. The extension interface will appear on the booking page

## Limitations

- Only works on Western Australian Department of Transport booking site
- Subject to anti-scraping measures and rate limits
- May conflict with other booking systems or user sessions
- Uses fixed 5-second intervals for searching which may be detectable

## Code Structure

The main logic is contained in `content.js` which:
- Checks if the current page is the PDA Bookings page
- Injects a control panel into the page
- Provides UI controls for switching between modes
- Implements the automated search loop
- Handles booking confirmation or alerts