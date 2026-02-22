import { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { SimulationState, HOSPITALS } from '@/lib/types';
import { MapPin } from 'lucide-react';

interface LiveResponseMapProps {
  state: SimulationState;
}

export function LiveResponseMap({ state }: LiveResponseMapProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const ambulanceMarker = useRef<mapboxgl.Marker | null>(null);
  const signalMarkers = useRef<mapboxgl.Marker[]>([]);

  const token = import.meta.env.VITE_MAPBOX_TOKEN;

  useEffect(() => {
    if (!mapContainer.current || !token) return;

    mapboxgl.accessToken = token;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/dark-v11',
      center: [78.45, 17.40],
      zoom: 12,
      maxBounds: [[78.30, 17.20], [78.60, 17.55]],
      attributionControl: false,
    });

    // Add hospital markers
    HOSPITALS.forEach(h => {
      const el = document.createElement('div');
      el.className = 'flex items-center justify-center w-6 h-6';
      el.innerHTML = `<div class="w-3 h-3 rounded-full bg-blue-500 border-2 border-white/50" style="box-shadow: 0 0 10px rgba(59,130,246,0.5)"></div>`;
      el.title = h.name;
      new mapboxgl.Marker(el).setLngLat(h.position).addTo(map.current!);
    });

    // Ambulance marker
    const ambEl = document.createElement('div');
    ambEl.innerHTML = `<div class="w-5 h-5 rounded-full bg-red-500 border-2 border-white" style="box-shadow: 0 0 20px rgba(239,68,68,0.8); animation: signal-pulse 1s ease-in-out infinite;"></div>`;
    ambulanceMarker.current = new mapboxgl.Marker(ambEl)
      .setLngLat(state.ambulancePosition)
      .addTo(map.current);

    // Signal markers
    state.activeSignals.forEach(signal => {
      const el = document.createElement('div');
      el.className = 'signal-marker';
      el.innerHTML = `<div class="w-2.5 h-2.5 rounded-full ${signal.status === 'priority' ? 'bg-green-500' : 'bg-red-500'}" style="box-shadow: 0 0 8px ${signal.status === 'priority' ? 'rgba(34,197,94,0.6)' : 'rgba(239,68,68,0.4)'}"></div>`;
      const marker = new mapboxgl.Marker(el).setLngLat(signal.position).addTo(map.current!);
      signalMarkers.current.push(marker);
    });

    return () => {
      map.current?.remove();
    };
  }, [token]);

  // Update ambulance position
  useEffect(() => {
    ambulanceMarker.current?.setLngLat(state.ambulancePosition);
  }, [state.ambulancePosition]);

  // Update signal colors
  useEffect(() => {
    signalMarkers.current.forEach((marker, i) => {
      const signal = state.activeSignals[i];
      if (signal) {
        const el = marker.getElement();
        const dot = el.querySelector('div > div') as HTMLElement;
        if (dot) {
          const isPriority = signal.status === 'priority';
          dot.className = `w-2.5 h-2.5 rounded-full ${isPriority ? 'bg-green-500 animate-signal-pulse' : 'bg-red-500'}`;
          dot.style.boxShadow = isPriority ? '0 0 12px rgba(34,197,94,0.8)' : '0 0 8px rgba(239,68,68,0.4)';
        }
      }
    });
  }, [state.activeSignals]);

  if (!token) {
    return (
      <div className="glass-panel h-full flex flex-col items-center justify-center gap-3 p-6">
        <MapPin className="w-12 h-12 text-primary opacity-50" />
        <p className="text-muted-foreground text-sm text-center font-mono">
          MAPBOX TOKEN REQUIRED
        </p>
        <p className="text-muted-foreground/60 text-xs text-center">
          Add VITE_MAPBOX_TOKEN to secrets
        </p>
      </div>
    );
  }

  return (
    <div className="glass-panel h-full overflow-hidden relative">
      <div className="absolute top-3 left-3 z-10 glass-panel-strong px-3 py-1.5">
        <span className="data-readout text-primary text-xs">LIVE RESPONSE VIEW</span>
      </div>
      {state.isActive && state.destination && (
        <div className="absolute top-3 right-3 z-10 glass-panel-strong px-3 py-1.5 flex items-center gap-2">
          <div className="status-dot-active" />
          <span className="data-readout text-success text-xs">EN ROUTE → {state.destination.toUpperCase()}</span>
        </div>
      )}
      {/* Progress bar */}
      {state.isActive && (
        <div className="absolute bottom-0 left-0 right-0 z-10 h-1 bg-muted/30">
          <div
            className="h-full bg-primary transition-all duration-300"
            style={{ width: `${state.progress}%` }}
          />
        </div>
      )}
      <div ref={mapContainer} className="w-full h-full" />
    </div>
  );
}
