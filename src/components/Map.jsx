import React, { useRef, useEffect } from "react";
import mapboxgl from "mapbox-gl";
import Loading from "./Loading";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

export default function Map() {
  // const dispatch = useDispatch();
  mapboxgl.accessToken =
    "pk.eyJ1Ijoicm9oaXRzYWNoNTAiLCJhIjoiY2t6enB3NnJ2MGMzNzNibmFwa3cwMHBzcSJ9.WGPktzbJ7B1eZSkMR2djKw";
  const data =useSelector(state=>state.custom.data)
  const isLoading = useSelector((state) => state.custom.isLoading);
  const latlong = useSelector((state) => state.custom.latlong);
  const zoom = useSelector((state) => state.custom.zoom);
  const mapContainer = useRef(null);
  const mapHtml = useRef(null);

  useEffect(() => {
    mapHtml.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/rohitsach50/ckwkg30zm8rdv14oc4tmffjv0",
      center: [78.9629, 20.5937],
      zoom: 4,
    });

    // get data from server

    // add markers to map
 if(data !== null){
        // console.log(mapData);
        // add markers to map
        // console.log("abcsd",data);
        // data.forEach(function (marker) {
          // let tet = marker.station.name;
          data.forEach(function (parameter) {
            var el = document.createElement("section");
            var value = 0;
            if (
              parameter.station.name.includes("India") 
            ) {
              value = parseInt(parameter.aqi);
              if (value <= 50) {
                el.className = "marker-green";
              } else if (
                value >= 51 &&
                value <= 100
              ) {
                el.className = "marker-yellow";
              } else if (
                value >= 101 &&
                value <= 150
              ) {
                el.className = "marker-orange";
              } else if (
                value >= 151 &&
                value <= 200
              ) {
                el.className = "marker-red";
              } else if (
                value >= 201 &&
                value <= 300
              ) {
                el.className = "marker-purple";
              } else if (value >= 301) {
                el.className = "marker-brown";
              } else {
                el.className = "marker-white";
              }
            }
            new mapboxgl.Marker(el)
              .setLngLat([parameter["lon"], parameter["lat"]])
              .addTo(mapHtml.current)
              .setPopup(
                new mapboxgl.Popup({ offset: 5 }).setHTML(
                  "<h6>" +
                    parameter["station"]["name"] +
                    '</h6><p classname="value">' +
                    value +
                    "</p>"
                )
              );
          });

          
        // });
      }
      

    // cleanup function
  }, [data]);
  useEffect(() => {
    mapHtml.current.flyTo({
      center: latlong,
      essential: true,
      zoom: zoom,
    });
  });
  return (
    <>
      <div ref={mapContainer} className="map" />
    </>
  );
}
