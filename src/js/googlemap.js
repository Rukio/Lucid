function initMap() {
    var targetPlace = {lat: 25.7635612, lng: -80.1893174};
    var map = new google.maps.Map(document.getElementById('google-map'), {
      zoom: 18,
      center: targetPlace,
      styles: [
        {
          "featureType": "poi.business",
          "elementType": "labels",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        },
        {
          "featureType": "poi.government",
          "elementType": "labels",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        }
      ]
    });
    var marker = new google.maps.Marker({
      position: targetPlace,
      map: map
    });
  }
