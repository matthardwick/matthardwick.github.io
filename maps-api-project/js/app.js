// view model
function viewModel() {
  var that = this;
  var lat;
  var lng;
  var map;
  var service;
  var mapOptions;
  var infoWindow;
  var mapBounds;
  var defaultLocation = "Disneyland";
  var defaultKeyword = "Beer";
  var setMarkers = [];

  that.location = ko.observable(defaultLocation);
  that.keyword = ko.observable(defaultKeyword);
  that.filterResults = ko.observable('');
  that.dataList = ko.observableArray([]);
  that.filterList = ko.observableArray(that.dataList());
  that.formattedAddress = ko.observable('');

  /**
   * Get best nearby location venues data from foursquare API,
   * create venues markers on map
   */
  // get informationfrom foursquare and create markers on the map
  function loadFourSquare() {
    var keyword = that.keyword();
    // creating the foursquare url to request data, using
    // location and keyword input
    var urlStart =
      'https://api.foursquare.com/v2/venues/explore?client_id=';
    // api key and secret
    var clientId = 'LY5SLL43AUDYITSBN5YE5KY2DN5V5TK5KA2HFEX310H33ISP';
    var clientSecret =
      '&client_secret=NTCWDJRCOT45OTIKAEKBDVKDZQTDN0DC13SR3ZD23HWJAVDS';
    var version = '&v=20130815&venuePhotos=1';
    // location
    var location = '&ll=' + lat + ',' + lng;
    // search terms
    var search = '&query=' + keyword;
    // limit to 10 results for performance
    var limit = '&limit=10&'
      // compile
    var fourSquareUrl = urlStart + clientId + clientSecret + version +
      location + limit + search;

    // for each result place marker
    $.getJSON(fourSquareUrl, function (data) {
      var fourSquareData = data.response.groups[0].items;
      fourSquareData.forEach(function (data) {
        that.dataList.push(new venue(data));
      });
      that.filterList(that.dataList());
      that.dataList().forEach(function (venueItem) {
        displayMarker(venueItem);
      });
    });
  }

  // create infowindow
  function getMarkerInfo(data) {
    // create string to insert from requested data
    var infoWindowData =
      '<div class="infoWindow">' + '<div class="venue-name">' +
      '<a href ="' + data.fourSquareUrl + '">' + data.venueName +
      '</a>' + '<div class="list-rate-position">' +
      '<span class="venue-rating badge">' + data.rating +
      '</span>' + '</div>' + '</div>' +
      '<div class="venue-category">' + data.category + '</div>' +
      '<div class="venue-address">' + data.formattedAddress +
      '</div>' + '<div class="venue-phone">' +
      data.formattedPhone + '</div>' + '<div class="venue-url">' +
      data.url + '</div>' + '</div>';
    return infoWindowData;
  }

  // marker display
  function displayMarker(data) {

    var location = new google.maps.LatLng(data.lat, data.lng);
    // create a marker from selection
    var marker = new google.maps.Marker({
      map: map,
      position: location,
      title: data.venueName,
      marker_id: data.id
    });
    setMarkers.push(marker);

    var markerInfo = getMarkerInfo(data);
    // create marker animation and functionality
    marker.addListener('click', function () {
      // first stop any other animation when clicked
      for (var i in setMarkers) {
        setMarkers[i].setAnimation(null);
      }
      // animate marker
      marker.setAnimation(google.maps.Animation.BOUNCE);
      // open infoWindow
      infoWindow.open(map, marker);
      infoWindow.setContent(markerInfo);
      // move map to selection
      map.panTo(location);
    });
  }

  // list selection funcionality
  that.markerClick = function (data) {
    var markerInfo = getMarkerInfo(data);
    var place = new google.maps.LatLng(data.lat, data.lng);

    for (var i in setMarkers) {
      // stop any animations first
      setMarkers[i].setAnimation(null);
      // open info window, animate marker and move map
      if (setMarkers[i].marker_id === data.id) {
        setMarkers[i].setAnimation(google.maps.Animation.BOUNCE);
        infoWindow.open(map, setMarkers[i]);
        infoWindow.setContent(markerInfo);
      }
    }
    map.panTo(place);
  };

  // clear markers
  function clearMarkers() {
    setMarkers.forEach(function (place) {
      place.setMap(null);
    });
    setMarkers = [];
  }

  // initilize the map
  function initializeMap() {

    mapOptions = {
      zoom: 16,
      mapTypeControl: false,
      streetViewControl: false
    };


    map = new google.maps.Map(document.getElementById('map'),
      mapOptions);

    $('#map').height($(window).height());
    // set maximum infowindow size
    infoWindow = new google.maps.InfoWindow({
      maxWidth: 250
    });
    // stop animations if infowindow is closed
    google.maps.event.addListener(infoWindow, 'closeclick', function () {
      for (var i in setMarkers) {
        setMarkers[i].setAnimation(null);
      }
    });

    // responsive map centering when window is resized
    google.maps.event.addDomListener(window, "resize", function () {
      var center = map.getCenter();
      google.maps.event.trigger(map, "resize");
      map.setCenter(center);
    });
  }



  that.locationSearch = function () {

    if (that.location() !== '') {
      clearMarkers();
      that.dataList([]);
      getLocation(that.location());
      that.filterResults('');
    }
  };

  // filter results 
  that.venueFilter = function () {
    // new array to store list
    var list = [];
    var filterResults = that.filterResults().toLowerCase();
    // filter data
    for (var i in that.dataList()) {
      if (that.dataList()[i].venueName.toLowerCase().indexOf(
          filterResults) != -1 ||
        that.dataList()[i].category.toLowerCase().indexOf(
          filterResults) != -1) {
        list.push(that.dataList()[i]);
      }
    }
    // remove all markers and then create new ones based on filter
    clearMarkers();
    that.filterList(list);
    that.filterList().forEach(function (venueItem) {
      displayMarker(venueItem);
    });
  };

  // update list and info when search is made
  that.location.subscribe(that.locationSearch);
  that.keyword.subscribe(that.locationSearch);
  that.filterResults.subscribe(that.venueFilter);

  // get location info from maps api
  function getLocation(location) {

    var request = {
      query: location
    };
    service = new google.maps.places.PlacesService(map);
    service.textSearch(request, locationCallback);
  }

  // tests PlacesServiceStatus and displays if status is OK
  function locationCallback(results, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
      // results[0] is lat and lng info
      mapCenter(results[0]);
    }
  }

  // set map centered on location's lat and lng
  function mapCenter(locationPlace) {

    lat = locationPlace.geometry.location.lat();
    lng = locationPlace.geometry.location.lng();
    that.formattedAddress(locationPlace.formatted_address);
    var locationShowOnMap = new google.maps.LatLng(lat, lng);
    map.setCenter(locationShowOnMap);
    // load the foursquare info
    loadFourSquare();
  }

  function initLocation(location) {
    getLocation(location);
  }

  // initialize map
  initializeMap();

  // start with default location
  initLocation(defaultLocation);
}

// maps error handling
function mapsError() {
  alert('Google Maps Failed to Load. Try Refreshing the Page.');
}

// initialize mapViewModel 
function initViewModel() {
  if (typeof google !== 'undefined') {
    ko.applyBindings(new viewModel());
  } else {
    mapsError();
  }
}

// hide-show list toggle function
function toggle(id) {
  $('.' + id).toggle();
}