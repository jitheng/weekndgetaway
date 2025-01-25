"use client";

import { useCallback, useRef, useState, useEffect } from "react";
import { GoogleMap, Marker, InfoWindow, useLoadScript, Circle } from "@react-google-maps/api";
import { supabase } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Clock, Navigation } from "lucide-react";

const BENGALURU_CENTER = {
  lat: 12.9716,
  lng: 77.5946,
};

// Distance circles in kilometers
const DISTANCE_CIRCLES = [50, 100, 200, 300];

const mapContainerStyle = {
  width: "100%",
  height: "600px",
};

const options = {
  disableDefaultUI: false,
  zoomControl: true,
  mapTypeControl: true,
  streetViewControl: false,
  fullscreenControl: true,
};

type Destination = {
  id: string;
  name: string;
  description: string;
  distance_from_bangalore: number;
  trip_duration: string;
  latitude: number;
  longitude: number;
};

type Filter = {
  maxDistance: number;
  tripDuration: string | null;
};

export default function GoogleMapComponent() {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
  });
  
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [selectedDestination, setSelectedDestination] = useState<Destination | null>(null);
  const [filters, setFilters] = useState<Filter>({
    maxDistance: 300,
    tripDuration: null,
  });
  
  const mapRef = useRef<google.maps.Map | null>(null);

  const onMapLoad = useCallback((map: google.maps.Map) => {
    mapRef.current = map;
  }, []);

  // Fetch destinations from Supabase
  useEffect(() => {
    async function fetchDestinations() {
      let query = supabase
        .from('destinations')
        .select('*')
        .lte('distance_from_bangalore', filters.maxDistance);

      if (filters.tripDuration) {
        query = query.eq('trip_duration', filters.tripDuration);
      }

      const { data, error } = await query;
      
      if (error) {
        console.error('Error fetching destinations:', error);
        return;
      }

      setDestinations(data || []);
    }

    fetchDestinations();
  }, [filters]);

  const filteredDestinations = destinations.filter((dest) => 
    dest.distance_from_bangalore <= filters.maxDistance &&
    (!filters.tripDuration || dest.trip_duration === filters.tripDuration)
  );

  if (loadError) {
    return (
      <div className="text-center p-4 text-red-500">
        Error loading maps. Please try again later.
      </div>
    );
  }

  if (!isLoaded) {
    return (
      <div className="text-center p-4">
        Loading maps...
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Filters */}
      <Card className="p-4">
        <div className="flex flex-wrap gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Distance</label>
            <div className="flex gap-2">
              {[50, 100, 200, 300].map((distance) => (
                <Button
                  key={distance}
                  size="sm"
                  variant={filters.maxDistance === distance ? "default" : "outline"}
                  onClick={() => setFilters(f => ({ ...f, maxDistance: distance }))}
                >
                  <Navigation className="mr-1 h-4 w-4" />
                  {distance} km
                </Button>
              ))}
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Duration</label>
            <div className="flex gap-2">
              {["Day Trip", "2-Day Trip"].map((duration) => (
                <Button
                  key={duration}
                  size="sm"
                  variant={filters.tripDuration === duration ? "default" : "outline"}
                  onClick={() => setFilters(f => ({
                    ...f,
                    tripDuration: f.tripDuration === duration ? null : duration
                  }))}
                >
                  <Clock className="mr-1 h-4 w-4" />
                  {duration}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </Card>

      {/* Map */}
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={8}
        center={BENGALURU_CENTER}
        options={options}
        onLoad={onMapLoad}
      >
        {/* Distance Circles */}
        {DISTANCE_CIRCLES.map((radius) => (
          <Circle
            key={radius}
            center={BENGALURU_CENTER}
            radius={radius * 1000} // Convert km to meters
            options={{
              strokeColor: "#FF0000",
              strokeOpacity: 0.2,
              strokeWeight: 1,
              fillColor: "#FF0000",
              fillOpacity: 0.05,
              clickable: false,
              zIndex: 1,
            }}
          />
        ))}

        {/* Bengaluru Center Marker */}
        <Marker
          position={BENGALURU_CENTER}
          icon={{
            url: "https://maps.google.com/mapfiles/ms/icons/blue-dot.png",
          }}
        />

        {/* Destination Markers */}
        {filteredDestinations.map((destination) => (
          <Marker
            key={destination.id}
            position={{ lat: destination.latitude, lng: destination.longitude }}
            onClick={() => setSelectedDestination(destination)}
          />
        ))}

        {/* Info Window for selected destination */}
        {selectedDestination && (
          <InfoWindow
            position={{
              lat: selectedDestination.latitude,
              lng: selectedDestination.longitude
            }}
            onCloseClick={() => setSelectedDestination(null)}
          >
            <div className="p-2 max-w-xs">
              <h3 className="font-semibold text-lg mb-1">{selectedDestination.name}</h3>
              <p className="text-sm text-gray-600 mb-2">{selectedDestination.description}</p>
              <div className="text-sm">
                <p>Distance: {selectedDestination.distance_from_bangalore} km</p>
                <p>Duration: {selectedDestination.trip_duration}</p>
              </div>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </div>
  );
}