import React, { Component } from 'react';
import { GoogleApiWrapper} from 'google-maps-react';
import { InfoWindow, Marker } from 'google-maps-react';
import CurrentLocation from './Map';
import './MapPage.scss'

export class MapPage extends Component {
  state = {
    showingInfoWindow: false,  //Hides or the shows the infoWindow
    activeMarker: {},          //Shows the active marker upon click
    selectedPlace: {}          //Shows the infoWindow to the selected place upon a marker
  };
  
  onMarkerClick = (props, marker, e) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true,

    });

  onClose = props => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  };

  render() {
    return (
      <div className="mapContainer">
        <h5>Map</h5>
        <CurrentLocation
          centerAroundCurrentLocation
          google={this.props.google}
          className="map"
        >
          <Marker onClick={this.onMarkerClick} name={'Isil\'s Current Location'}
            position={{lat: 37.423, lng: -122.174}}/>
          <Marker onClick={this.onMarkerClick} name={'Calvin\'s Current Location'}
            position={{lat: 37.42, lng: -122.17}}/>
          <Marker onClick={this.onMarkerClick} name={'Maruth\'s Current Location'}
            position={{lat: 37.42, lng: -122.15}}/>
          <Marker onClick={this.onMarkerClick} name={'Devon\'s Current Location'} />
          <InfoWindow
            marker={this.state.activeMarker}
            visible={this.state.showingInfoWindow}
            onClose={this.onClose}
          >
            <div>
              <h6 style={{float : 'left', paddingRight : '5px'}}>{this.state.selectedPlace.name}</h6>
              {/* <img alt="avatar" src="https://randomuser.me/api/portraits/men/86.jpg"></img> */}
            </div>
          </InfoWindow>
        </CurrentLocation>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyBGxejpcRtzOGdlo7nRvEx1Q0n5gpl7Kvk'
})(MapPage);