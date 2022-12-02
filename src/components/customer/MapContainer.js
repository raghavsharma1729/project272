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
    console.log(this.props.latlng.lon);
    return (

      <Map
        google={this.props.google}
        zoom={12}
        style={mapStyles}
        initialCenter={{ lat: 37.3541, lng: -121.9552 }}
      >
        <Marker key="Marker_1" position={{
          lat: this.props.latlng.lat ? this.props.latlng.lat : 37.37784069926635,
          lng: this.props.latlng.lon ? this.props.latlng.lon : -122.04813115184348
        }}
          onClick={() => console.log("You clicked me!")} />
      </Map>
    );
  }
}
const mapStyles = {
  width: '100%',
  height: '40vh',
};
const apiKey = process.env.REACT_APP_API_KEY;
export default GoogleApiWrapper({
  apiKey: apiKey
})(MapContainer);