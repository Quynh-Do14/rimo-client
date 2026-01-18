'use client';

import { useState, useEffect, useRef } from 'react';
import Map, { Marker, Popup, MapRef } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Location } from './page';

type Props = {
    dataLocation: Location
    zoom?: number
}

const MAPBOX_TOKEN = "pk.eyJ1IjoibnRkMTAxMDIwMDAiLCJhIjoiY2tvbzJ4anl1MDZjMzJwbzNpcnA5NXZpcCJ9.dePfFDv0RlCLnWoDq1zHlw";

const LocationAgency = (props: Props) => {
    const { dataLocation, zoom = 12 } = props;
    const latitude = Number(dataLocation.lat);
    const longitude = Number(dataLocation.long);

    const mapRef = useRef<MapRef>(null);

    const [viewState, setViewState] = useState({
        latitude: latitude || 21.0285,
        longitude: longitude || 105.8542,
        zoom: zoom
    });

    const [showPopup, setShowPopup] = useState(true);

    // Hiệu ứng bay đến vị trí mới khi dữ liệu thay đổi
    useEffect(() => {
        if (latitude && longitude && mapRef.current) {
            // Tạo hiệu ứng bay mượt đến vị trí mới
            mapRef.current.flyTo({
                center: [longitude, latitude],
                zoom: zoom,
                duration: 2000, // Thời gian bay (ms)
                essential: true // Đảm bảo animation chạy
            });

            // Cũng cập nhật viewState để Popup và Marker hiển thị đúng
            setViewState(prev => ({
                ...prev,
                latitude,
                longitude
            }));
        }
    }, [latitude, longitude, zoom]);

    // Xử lý khi dữ liệu rỗng
    if (!dataLocation || Object.keys(dataLocation).length === 0) {
        return (
            <div style={{ width: '100%', height: '50vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <p>Không có dữ liệu vị trí</p>
            </div>
        );
    }

    // Kiểm tra lat/long hợp lệ
    const isValidLocation = latitude && longitude &&
        !isNaN(latitude) && !isNaN(longitude) &&
        Math.abs(latitude) <= 90 && Math.abs(longitude) <= 180;

    return (
        <div style={{ width: '100%', height: '50vh' }}>
            <Map
                ref={mapRef}
                {...viewState}
                onMove={(evt: any) => setViewState(evt.viewState)}
                mapStyle="mapbox://styles/mapbox/streets-v11"
                mapboxAccessToken={MAPBOX_TOKEN}
                style={{ width: '100%', height: '100%' }}
            >
                {isValidLocation && (
                    <>
                        <Marker
                            latitude={latitude}
                            longitude={longitude}
                        >
                            <div
                                style={{
                                    width: '30px',
                                    height: '30px',
                                    background: '#ff0000',
                                    borderRadius: '50%',
                                    border: '2px solid white',
                                    boxShadow: '0 2px 5px rgba(0,0,0,0.3)',
                                    cursor: 'pointer'
                                }}
                                onClick={() => setShowPopup(true)}
                            />
                        </Marker>

                        {showPopup && (
                            <Popup
                                latitude={latitude}
                                longitude={longitude}
                                anchor="bottom"
                                onClose={() => setShowPopup(false)}
                                closeOnClick={false}
                            >
                                <div style={{ padding: '8px' }}>
                                    <strong>{dataLocation.name || 'Địa điểm'}</strong>
                                    <p>{dataLocation.address || 'Chưa có địa chỉ'}</p>
                                </div>
                            </Popup>
                        )}
                    </>
                )}
            </Map>
        </div>
    );
}

export default LocationAgency;