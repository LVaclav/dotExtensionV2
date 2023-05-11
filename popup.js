chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
  const tab = tabs[0];
  if (
    tab.url.includes(
      'https://online.transport.wa.gov.au/pdabooking/manage/wicket/page?1'
    )
  ) {
    let html =
      '<div class="bg1 container text-center p-0" style="min-width: 25em">' +
      '<div class="">' +
      '<h1 class="text-white" id="title">Dot Booker</h1>' +
      '</div>' +
      '<div class="bg2 p-2">' +
      '<span class="text-white">' +
      'Welcome to the DOT Booker. <br />' +
      'This is the correct Page!!' +
      '</span>' +
      '</div>' +
      '<btn class="btn btn-primary" id="startBtn"> Start </btn>' +
      '</div>';
    // The user is on the specific page, modify the HTML of the menu accordingly
    document.getElementById('menu').innerHTML = html;
  }
});
document.getElementById('startBtn').addEventListener(
  'click',
  () => {
    window.postMessage(
      { type: 'FROM_PAGE', text: 'Hello from the webpage!' },
      '*'
    );
  },
  false
);
