import React from 'react'
import ReactDOM from 'react-dom'

const mapStyles = {
  map: {
    position: 'absolute',
    width: '375px',
    height: '300px'
  }
}

export class CurrentLocation extends React.Component {
    constructor(props) {
        super(props)
    
        const { lat, lng } = this.props.initialCenter
        this.state = {
          currentLocation: {
            lat: lat,
            lng: lng
          },
          map: undefined
        }
      }

      componentDidUpdate(prevProps, prevState) {
        if (prevProps.google !== this.props.google) {
          this.loadMap()
        }
        if (prevState.currentLocation !== this.state.currentLocation) {
          this.recenterMap()
        }
      }
      
      recenterMap() {
        const map = this.map
        const current = this.state.currentLocation
    
        const google = this.props.google
        const maps = google.maps
    
        if (map) {
          let center = new maps.LatLng(current.lat, current.lng)
          map.panTo(center)
        }
      }
      
      componentDidMount() {
        this.loadMap()
        // if (this.props.centerAroundCurrentLocation) {
        //   if (navigator && navigator.geolocation) {
        //     navigator.geolocation.getCurrentPosition(pos => {
        //       const coords = pos.coords
        //       console.log('Hello')
        //       this.setState({
        //         currentLocation: {
        //           lat: coords.latitude,
        //           lng: coords.longitude
        //         }
        //       }, () => {
        //         console.log('set state')
        //         this.loadMap()
        //       })
        //     })
        //   }
        // }
      }

      loadMap() {
        if (this.props && this.props.google) {
          // checks if google is available
          const { google } = this.props
          const maps = google.maps
    
          const mapRef = this.refs.map
    
          // reference to the actual DOM element
          const node = ReactDOM.findDOMNode(mapRef)
    
          let { zoom } = this.props
          const { lat, lng } = this.state.currentLocation
          const center = new maps.LatLng(lat, lng)
          const mapConfig = Object.assign(
            {},
            {
              center: center,
              zoom: zoom
            }
          )
    
          // maps.Map() is constructor that instantiates the map
          this.setState({
            map: new maps.Map(node, mapConfig)
          })
          this.forceUpdate()
        }
      }

      renderChildren() {
        const { children } = this.props
    
        if (!children) return
    
        return React.Children.map(children, c => {
          if (!c) return
          return React.cloneElement(c, {
            map: this.state.map,
            google: this.props.google,
            mapCenter: this.state.currentLocation
          })
        })
      }
      
      render() {
        const style = Object.assign({}, mapStyles.map)
       return (
         <div className={this.props.className}>
           <div style={style} ref="map">
             Loading map...
           </div>
           {this.renderChildren()}
         </div>
       )
     }
   
}

CurrentLocation.defaultProps = {
  zoom: 12,
  initialCenter: {
    lat: 37.427940,
    lng: -122.174220
  },
  centerAroundCurrentLocation: false,
  visible: true
}

export default CurrentLocation
