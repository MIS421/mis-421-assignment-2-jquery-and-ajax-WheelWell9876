$(document).ready(function() {
  var len;
  var results = '';
  var firstUrl = ''; // Variable to store the first URL2

  function apiSearch(callback) {
    var params = {
      "q": $("#query").val(),
      "count": "50",
      "offset": "0",
      "mkt": "en-us"
    };

    $.ajax({
      url: 'https://api.bing.microsoft.com/v7.0/search?' + $.param(params),
      beforeSend: function (xhrObj) {
        xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", "8ea62c36719a405b93ca37d583579b7c");
      },
      type: "GET",
    })
    .done(function (data) {
      len = data.webPages.value.length;
      results = '';
      for (var i = 0; i < len; i++) {
        results += "<p><a href='" + data.webPages.value[i].url + "' target='_blank'>" + data.webPages.value[i].name + "</a>: " + data.webPages.value[i].snippet + "</p>";
        if (i === 0) {
          firstUrl = data.webPages.value[i].url; // Store the first URL
        }
      }

      $('#time').slideUp(); // Hide the time div
      $('#searchResults').html(results);
      $('#searchResults').slideDown(); // Show the search results div

      if (callback) {
        callback(); // Call the callback function if provided
      }
    })
    .fail(function () {
      alert("error");
    });
  }

  $('#query').keypress(function(e) {
    if (e.which == 13) {  // 13 is the ASCII code for Enter
      $('#searchBtn').click();  // Trigger the search button click event
      return false;  // Prevent the default action
    }
  });

  // Initialize with the default background
  $('body').css('background-image', 'url("https://images.squarespace-cdn.com/content/v1/5a766a60bce176c268d99786/1627570654446-OBJSPQAZY0K5US179ZNW/unsplash-image--OOGt3Yede0.jpg")'); // 1200 X 900

  $('#searchBtn').click(function() {
    apiSearch();
    $('body').css('background-image', 'url("https://images.squarespace-cdn.com/content/v1/5a766a60bce176c268d99786/1627570654446-OBJSPQAZY0K5US179ZNW/unsplash-image--OOGt3Yede0.jpg")');
  });

  $('#luckyBtn').click(function() {
    apiSearch(function() {
      if (firstUrl) {
        window.open(firstUrl, '_blank'); // Open the first URL in a new tab
      }
    });
    $('body').css('background-image', 'url("https://images.squarespace-cdn.com/content/v1/5a766a60bce176c268d99786/1627570654446-OBJSPQAZY0K5US179ZNW/unsplash-image--OOGt3Yede0.jpg")');
  });

  $('#timeBtn').click(function() {
    var currentTime = new Date();
    
    var hours = currentTime.getUTCHours() - 5; // Convert to CST
    var minutes = currentTime.getUTCMinutes();
  
    // Add leading zeros if needed
    hours = (hours < 10 ? "0" : "") + hours;
    minutes = (minutes < 10 ? "0" : "") + minutes;
  
    var formattedTime = hours + ":" + minutes;
  
    $('#searchResults').slideUp(); // Hide the search results div
    $('#time').html(formattedTime + " CST(UTC -5)");
    $('#time').slideDown(); // Show the time div
    $('body').css('background-image', 'url("https://www.sellingantiques.co.uk/photosnew/dealer_ukhorology/dealer_ukhorology_superhighres_1630947872309-5080166500.jpg")'); // Replace with your third image URL
  });
  

  $('#time').click(function() {
    $('#time').slideUp(); // Hide the time div when clicked
  });

  $('#clearBtn').click(function() {
    $('#searchResults').slideUp(); // Hide the search results div
    $('#time').slideUp(); // Hide the time div
    $('#query').val(''); // Clear the search query
    $('body').css('background-image', 'url("https://images.squarespace-cdn.com/content/v1/5a766a60bce176c268d99786/1627570654446-OBJSPQAZY0K5US179ZNW/unsplash-image--OOGt3Yede0.jpg")'); // Reset to default background
  });
  
});
