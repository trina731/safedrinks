import React, { Component } from 'react';
import { GoogleApiWrapper} from 'google-maps-react';
import { InfoWindow, Marker } from 'google-maps-react';
import CurrentLocation from './Map';

const mapStyles = {
  width: '100%',
  height: '100%'
};


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
      <CurrentLocation
        centerAroundCurrentLocation
        google={this.props.google}
      >
        <Marker onClick={this.onMarkerClick} name={'Devon\'s Current Location'} />
        <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}
          onClose={this.onClose}
        >
          <div>
            <h4 style={{float : 'left', paddingRight : '5px'}}>{this.state.selectedPlace.name}</h4>
            <img alt="avatar" src="https://randomuser.me/api/portraits/men/86.jpg"></img>
          </div>
        </InfoWindow>
      </CurrentLocation>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyBGxejpcRtzOGdlo7nRvEx1Q0n5gpl7Kvk'
})(MapPage);