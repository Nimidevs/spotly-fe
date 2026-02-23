const locationUpdatesHandler = (data: any, ws: WebSocket) => {
    navigator.geolocation.getCurrentPosition((position) => {
        console.log(position);
        ws.send(JSON.stringify({
            event: "location:update",
            payload: {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            },
        }));
    }, (error) => {
        console.log(error);
    }, {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
    });
}

export default locationUpdatesHandler;