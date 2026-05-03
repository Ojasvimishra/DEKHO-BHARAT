import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars, useTexture, Text, Plane } from '@react-three/drei';
import * as THREE from 'three';

const CityMarker = ({ position, label, color = "#ffcc00" }) => {
    const markerRef = useRef();
    
    useFrame(({ clock }) => {
        if (markerRef.current) {
            // Subtle pulse effect
            markerRef.current.scale.setScalar(1 + Math.sin(clock.elapsedTime * 3) * 0.1);
        }
    });

    return (
        <group position={position}>
            {/* The glowing dot */}
            <mesh ref={markerRef}>
                <sphereGeometry args={[0.06, 16, 16]} />
                <meshBasicMaterial color={color} />
            </mesh>
            
            {/* The floating text label */}
            <Text
                position={[0.2, 0, 0]}
                fontSize={0.12}
                color="white"
                anchorX="left"
                anchorY="middle"
                outlineWidth={0.015}
                outlineColor="#000"
            >
                {label}
            </Text>
        </group>
    );
};

const IndiaMap3D = () => {
    const mapRef = useRef();
    
    // Load the generated texture
    const texture = useTexture('/india-map.png');

    useFrame((state) => {
        if (mapRef.current) {
            // Gentle floating animation
            mapRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
            // Slow continuous rotation to show off 3D depth
            mapRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.2;
        }
    });

    return (
        <group ref={mapRef}>
            {/* The base map texture mapped to a 3D Plane */}
            <Plane args={[4, 4]} transparent>
                <meshBasicMaterial map={texture} transparent={true} opacity={0.8} />
            </Plane>

            {/* City Markers mapped onto the Plane */}
            {/* Note: Coordinates are approximated to fit standard India map bounds */}
            <CityMarker position={[-0.4, 1.4, 0.1]} label="Leh" />
            <CityMarker position={[-0.5, 0.8, 0.1]} label="Rishikesh" />
            <CityMarker position={[-0.9, 0.4, 0.1]} label="Jaipur" />
            <CityMarker position={[1.4, 0.3, 0.1]} label="Ziro Valley" color="#4ade80" />
            <CityMarker position={[-1.1, -0.6, 0.1]} label="Goa" color="#0ea5e9" />
            <CityMarker position={[-0.6, -1.2, 0.1]} label="Munnar" />
            <CityMarker position={[1.1, -1.1, 0.1]} label="Andaman" color="#ffcc00" />
        </group>
    );
};

const Scene3D = () => {
    return (
        <div style={{ width: '100%', height: '100%', cursor: 'grab', position: 'relative' }}>
            <Canvas camera={{ position: [0, 0, 4.5], fov: 60 }}>
                <ambientLight intensity={0.8} />
                <Stars radius={50} depth={20} count={1500} factor={4} saturation={0} fade speed={1} />
                <IndiaMap3D />
                <OrbitControls enableZoom={true} minDistance={2} maxDistance={8} enablePan={true} />
            </Canvas>
        </div>
    );
};

export default Scene3D;
