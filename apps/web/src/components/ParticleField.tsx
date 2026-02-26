import { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

function Particles() {
  const meshRef = useRef<THREE.Points>(null);
  const { mouse } = useThree();
  const lastFrameTime = useRef(0);
  
  const { positions, colors } = useMemo(() => {
    const count = 1500;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 25;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 25;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 25;
      
      const r = Math.random();
      if (r > 0.66) {
        // Neon pink
        colors[i * 3] = 1; colors[i * 3 + 1] = 0; colors[i * 3 + 2] = 0.33;
      } else if (r > 0.33) {
        // Neon blue
        colors[i * 3] = 0; colors[i * 3 + 1] = 0.95; colors[i * 3 + 2] = 1;
      } else {
        // Neon gold
        colors[i * 3] = 1; colors[i * 3 + 1] = 0.85; colors[i * 3 + 2] = 0;
      }
    }
    return { positions, colors };
  }, []);
  
  useFrame((state) => {
    // Throttle to ~30 fps
    const now = state.clock.elapsedTime;
    if (now - lastFrameTime.current < 0.033) return;
    lastFrameTime.current = now;

    if (!meshRef.current) return;
    meshRef.current.rotation.y = now * 0.05;
    meshRef.current.rotation.x = mouse.y * 0.2;
    meshRef.current.rotation.z = mouse.x * 0.1;
  });
  
  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.06} vertexColors transparent opacity={0.8} sizeAttenuation />
    </points>
  );
}

export default function ParticleField() {
  return (
    <div
      className="fixed inset-0 pointer-events-none z-0"
      style={{ contain: 'strict' }}
    >
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }} dpr={[1, 1.5]}>
        <Particles />
      </Canvas>
    </div>
  );
}
