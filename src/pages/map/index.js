import React, { useState } from 'react'
import GoogleMapReact from 'google-map-react'
import { Button, Icon } from '@digihcs/innos-ui3'
import Marker from '@components/marker'
import Autocomplete from 'react-google-autocomplete'

const Map = () => {
  const [center] = useState({
    lat: 10.762913,
    lng: 106.679983
  })
  const [currentLocation, setCurrentLocation] = useState(null)
  const [zoom] = useState(17)
  const [places] = useState([])

  const handleApiLoaded = (map, maps, places) => {
    console.log(currentLocation, map, maps, places)
  }

  const getGeoLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          setCurrentLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          })
        },
        error => console.log(error)
      )
    } else {
      error => console.log(error)
    }
  }

  return (
    <div style={{ height: '100vh', width: '100%' }}>

      <div className="navigation" style={{ background: 'rgb(77,106,121)', height: 44, width: '100%', display: 'flex', alignItems: 'center', position: 'fixed', zIndex: 1 }}>
        <span><Icon name="map-2" style={{ fontSize: 35 }} /></span>
        <Button outline onClick={getGeoLocation} style={{ marginLeft: 10 }}>Geolocation</Button>
        <Autocomplete
          style={{ width: 300, height: 33, marginLeft: 10 }}
          onPlaceSelected={(place) => {
            console.log(place)
          }}
          types={['(regions)']}
          componentRestrictions={{ country: "VN" }}
        />
      </div>

      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyBGqInq5bA2DLbLpoMAU3CqUKcG1doeJzY", region: 'VN', language: 'VN' }}
        defaultCenter={center}
        center={currentLocation || center}
        defaultZoom={zoom}
        yesIWantToUseGoogleMapApiInternals
        onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps, places)}
      >
        {
          currentLocation ? (
            <Marker
              iconName="map"
              lat={currentLocation.lat}
              lng={currentLocation.lng}
              text="YOU ARE HERE"
            />
          ) : null
        }

      </GoogleMapReact>

    </div>
  )
}

export default Map
