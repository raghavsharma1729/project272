import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
import React, { Component } from "react";


export class MapContainer extends Component {
  // constructor(props) {
  //   super(props);        

  // }

  displayMarkers = (position) => {
    return <Marker key="Marker_1" position={{
      lat: position.lat,
      lng: position.lon
    }}


      onClick={() => console.log("You clicked me!")} />

    //   if(!this.props.latlng){
    //     return
    //   }
    //   return this.props.latlng.map((latlng, index) => {
    //     return <Marker key={index} id={index} position={{
    //      lat: latlng.latitude,
    //      lng: latlng.longitude
    //    }}


    //    onClick={() => console.log("You clicked me!")} />

    //   })

  }


  render() {
    // return (<div className="map-area">

    //     <Map

    //         google={this.props.google}

    //         zoom={14}

    //         center={{

    //             lat: 37.3541,

    //             lng: -121.9552

    //         }}>

    //         <Marker key="marker_1"

    //             position={{

    //                 lat: 37.336015,

    //                 lng: -121.885912

    //             }}

    //         />

    //     </Map>

    // </div>);

    return (

      <Map
        google={this.props.google}
        zoom={25}
        style={mapStyles}
      // initialCenter={{ lat:37.3541, lng: -121.9552}}
      >
        {/* <LocationPin
          lat={location.lat}
          lng={location.lng}
          text={location.address}
        /> */}
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
  // width: '50%',
  // height: '100%',
  width: '100%',
  height: '40vh',
};

export default GoogleApiWrapper({
  // apiKey: 'AIzaSyAD0ljZQ6iObBbIIKqnPMI3I-ttV_rirMw'
  apiKey: 'AIzaSyBxkJfhY7V0ZRI3soiSyuOd4ZASll9MQUM'
})(MapContainer);