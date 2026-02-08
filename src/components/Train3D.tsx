import { memo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import type { Group } from 'three';

interface Train3DProps {
  lightOn: boolean;
  isHonking: boolean;
  scale?: number;
}

function Train3DInner({ lightOn, isHonking, scale = 1 }: Train3DProps) {
  const groupRef = useRef<Group>(null);

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    if (isHonking) {
      groupRef.current.rotation.z = Math.sin(Date.now() * 0.015) * 0.08;
    } else {
      // Smoothly return to upright
      groupRef.current.rotation.z *= 1 - delta * 8;
    }
  });

  return (
    <group ref={groupRef} scale={scale}>
      {/* Main body */}
      <mesh position={[0, 0.35, 0]}>
        <boxGeometry args={[1.0, 0.5, 2.8]} />
        <meshStandardMaterial color="#3b82f6" />
      </mesh>

      {/* Roof - slightly rounded top */}
      <mesh position={[0, 0.65, 0]}>
        <boxGeometry args={[0.85, 0.1, 2.6]} />
        <meshStandardMaterial color="#2563eb" />
      </mesh>

      {/* Front nose cone */}
      <mesh position={[0, 0.35, 1.7]} rotation={[Math.PI / 2, 0, 0]}>
        <coneGeometry args={[0.4, 0.8, 8]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>

      {/* Side stripe - left */}
      <mesh position={[-0.505, 0.35, 0]}>
        <boxGeometry args={[0.02, 0.1, 2.8]} />
        <meshStandardMaterial color="#1d4ed8" />
      </mesh>

      {/* Side stripe - right */}
      <mesh position={[0.505, 0.35, 0]}>
        <boxGeometry args={[0.02, 0.1, 2.8]} />
        <meshStandardMaterial color="#1d4ed8" />
      </mesh>

      {/* Windows - left side */}
      {[-0.8, -0.3, 0.2, 0.7].map((z, i) => (
        <mesh key={`wl-${i}`} position={[-0.51, 0.45, z]}>
          <boxGeometry args={[0.02, 0.18, 0.3]} />
          <meshStandardMaterial color="#60a5fa" />
        </mesh>
      ))}

      {/* Windows - right side */}
      {[-0.8, -0.3, 0.2, 0.7].map((z, i) => (
        <mesh key={`wr-${i}`} position={[0.51, 0.45, z]}>
          <boxGeometry args={[0.02, 0.18, 0.3]} />
          <meshStandardMaterial color="#60a5fa" />
        </mesh>
      ))}

      {/* Windshield */}
      <mesh position={[0, 0.48, 1.35]}>
        <boxGeometry args={[0.6, 0.22, 0.02]} />
        <meshStandardMaterial color="#93c5fd" />
      </mesh>

      {/* Headlight */}
      <mesh position={[0, 0.25, 2.05]}>
        <circleGeometry args={[0.08, 16]} />
        <meshStandardMaterial
          color={lightOn ? '#fbbf24' : '#9ca3af'}
          emissive={lightOn ? '#fbbf24' : '#000000'}
          emissiveIntensity={lightOn ? 2 : 0}
        />
      </mesh>

      {/* Headlight glow (point light) */}
      {lightOn && (
        <pointLight
          position={[0, 0.25, 2.2]}
          color="#fbbf24"
          intensity={1.5}
          distance={3}
        />
      )}

      {/* Undercarriage */}
      <mesh position={[0, 0.05, 0]}>
        <boxGeometry args={[0.9, 0.1, 2.6]} />
        <meshStandardMaterial color="#374151" />
      </mesh>

      {/* Wheels - left side */}
      {[-0.9, -0.3, 0.3, 0.9].map((z, i) => (
        <mesh key={`whl-${i}`} position={[-0.4, 0, z]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.08, 0.08, 0.1, 12]} />
          <meshStandardMaterial color="#1f2937" />
        </mesh>
      ))}

      {/* Wheels - right side */}
      {[-0.9, -0.3, 0.3, 0.9].map((z, i) => (
        <mesh key={`whr-${i}`} position={[0.4, 0, z]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.08, 0.08, 0.1, 12]} />
          <meshStandardMaterial color="#1f2937" />
        </mesh>
      ))}
    </group>
  );
}

const Train3D = memo(Train3DInner);
export default Train3D;
