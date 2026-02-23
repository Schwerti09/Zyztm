import { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

function Particles() {
  const meshRef = useRef<THREE.Points>(null);
  const { mouse } = useThree();
  
  const { positions, colors } = useMemo(() => {
    const count = 2000;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
      
      if (Math.random() > 0.5) {
        colors[i * 3] = 1; colors[i * 3 + 1] = 0; colors[i * 3 + 2] = 0.33;
      } else {
        colors[i * 3] = 0; colors[i * 3 + 1] = 0.95; colors[i * 3 + 2] = 1;
      }
    }
    return { positions, colors };
  }, []);
  
  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.y = state.clock.elapsedTime * 0.05;
    meshRef.current.rotation.x = mouse.y * 0.2;
    meshRef.current.rotation.z = mouse.x * 0.1;
  });
  
  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.05} vertexColors transparent opacity={0.8} sizeAttenuation />
    </points>
  );
}

export default function ParticleField() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
        <Particles />
      </Canvas>
    </div>
  );
}
