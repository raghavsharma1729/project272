import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
import React, { Component } from "react";


export class MapContainer extends Component {

  displayMarkers = (position) => {
    return <Marker key="Marker_1" position={{
      lat: position.lat,
      lng: position.lon
    }}
      onClick={() => console.log("You clicked me!")} />
  }

  render() {
    console.log(this.props.latlng.lat);
    console.log(this.props.latlng.lon);
    return (

      <Map
        google={this.props.google}
        zoom={12}
        style={mapStyles}
        initialCenter={{ lat: 37.336381, lng: -121.880971 }}
      >
        <Marker key="Marker_1" position={{
          lat: this.props.latlng.lat,
          lng: this.props.latlng.lon
        }}
          onClick={() => console.log("You clicked me!")} />
      </Map>
    );
  }
}
const mapStyles = {
  width: '80%',
  height: '50vh',
};
const apiKey = process.env.REACT_APP_API_KEY;
export default GoogleApiWrapper({
  apiKey: apiKey
})(MapContainer);