// create foursquare data model and venue information formatting
var venue = function (data) {
    this.venueName = data.venue.name;
    this.id = data.venue.id;
    this.lat = data.venue.location.lat;
    this.lng = data.venue.location.lng;
    this.fourSquareUrl = "https://foursquare.com/v/" + this.id;
    this.category = data.venue.categories[0].name;
    this.formattedPhone = this.venuePhone(data);
    this.formattedAddress = data.venue.location.formattedAddress;
    this.tips = this.venueTips(data);
    this.url = this.venueUrl(data);
    this.rating = this.venueRating(data);
};

venue.prototype = {
    venuePhone: function (data) {
        if (!data.venue.contact.formattedPhone)
            return 'Phone Number Not Available';
        else
            return data.venue.contact.formattedPhone;
    },
    venueTips: function (data) {
        if (!data.tips)
            return 'Tips Not Available';
        else
            return data.tips[0].text;
    },
    venueUrl: function (data) {
        if (!data.venue.url)
            return 'Website Not Available';
        else
            return data.venue.url;
    },
    venueRating: function (data) {
        if (!data.venue.rating)
            return 'n/a';
        else
            return data.venue.rating;
    }
};