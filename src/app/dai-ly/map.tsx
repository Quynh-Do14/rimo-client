
import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';

import 'mapbox-gl/dist/mapbox-gl.css';
import { AgencyInterface } from '@/infrastructure/interface/agency/agency.interface';
mapboxgl.accessToken = 'pk.eyJ1IjoibnRkMTAxMDIwMDAiLCJhIjoiY2tvbzJ4anl1MDZjMzJwbzNpcnA5NXZpcCJ9.dePfFDv0RlCLnWoDq1zHlw';
type Props = {
    listAgency: AgencyInterface[]
    selectedAgency: AgencyInterface
}
const LocationAgency = (props: Props) => {
    const { listAgency, selectedAgency } = props
    const mapContainerRef = useRef<any>(null);
    const [coordinates, setCoordinates] = useState<any>({});

    useEffect(() => {
        const data = listAgency.map((item) => {
            const result = {
                "type": "Feature",
                "properties": {},
                "geometry": {
                    "coordinates": [
                        item.long,
                        item.lat
                    ],
                    "type": "Point"
                }
            }
            return result
        })
        const data1 = {
            "type": "FeatureCollection",
            "features": data
        }
        setCoordinates(data1)
    }, [listAgency])



    useEffect(() => {
        let map = new mapboxgl.Map({
            container: mapContainerRef.current,
            style: 'mapbox://styles/mapbox/streets-v12',
            zoom: 13,
            center: [108, 4]
        });
        map.on('load', () => {
            map.addSource('earthquakes', {
                type: 'geojson',
                data: coordinates
            });

            map.addLayer({
                id: 'earthquakes-layer',
                type: 'circle',
                source: 'earthquakes',
                paint: {
                    'circle-radius': 4,
                    'circle-stroke-width': 2,
                    'circle-color': 'red',
                    'circle-stroke-color': 'white'
                }
            });
        });

        // return () => mapRef.current.remove();
    }, [coordinates]);

    useEffect(() => {
        let map = new mapboxgl.Map({
            container: mapContainerRef.current,
            style: 'mapbox://styles/mapbox/street',
            zoom: 13,
            center: [108, 4]
        });
        if (Object.keys(selectedAgency).length) {
            map.flyTo({
                center: [105.79691347774877, 21.038582146742414],
                essential: true // this animation is considered essential with respect to prefers-reduced-motion
            });
            new mapboxgl.Marker()
                .setLngLat([105.79691347774877, 21.038582146742414])
                .addTo(map);
            new mapboxgl.Popup({ closeOnClick: false })
                .setLngLat([105.79691347774877, 21.038582146742414])
                .setHTML('<h1>Hello World!</h1>')
                .addTo(map);

        }
    }, [selectedAgency])
    return <div ref={mapContainerRef} id="map" style={{ height: '100vh' }}></div>;
};

export default LocationAgency;