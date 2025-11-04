import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Torus, Box, Sphere } from "@react-three/drei";
import * as THREE from "three";

// Interconnected nodes representing data/product ecosystem
function DataNodes() {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.15;
      groupRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.3) * 0.1;
    }
  });

  // Create node positions in a geometric pattern
  const nodes = useMemo(() => {
    const radius = 2;
    const positions = [];
    
    // Main ring of nodes
    for (let i = 0; i < 8; i++) {
      const angle = (i / 8) * Math.PI * 2;
      positions.push({
        x: Math.cos(angle) * radius,
        y: Math.sin(angle) * radius,
        z: 0,
        size: 0.15,
      });
    }
    
    // Center nodes
    positions.push({ x: 0, y: 0, z: 0, size: 0.25 });
    positions.push({ x: 0, y: 0, z: 1, size: 0.18 });
    positions.push({ x: 0, y: 0, z: -1, size: 0.18 });
    
    return positions;
  }, []);

  return (
    <group ref={groupRef}>
      {/* Connection lines */}
      {nodes.slice(0, 8).map((node, i) => (
        <mesh key={`line-${i}`} position={[node.x / 2, node.y / 2, 0]}>
          <boxGeometry args={[0.02, 2, 0.02]} />
          <meshStandardMaterial color="#7c3aed" emissive="#7c3aed" emissiveIntensity={0.3} />
        </mesh>
      ))}
      
      {/* Nodes */}
      {nodes.map((node, i) => (
        <Sphere key={i} position={[node.x, node.y, node.z]} args={[node.size, 32, 32]}>
          <meshStandardMaterial
            color={i === 8 ? "#a78bfa" : "#7c3aed"}
            emissive={i === 8 ? "#a78bfa" : "#7c3aed"}
            emissiveIntensity={0.4}
            roughness={0.3}
            metalness={0.8}
          />
        </Sphere>
      ))}
    </group>
  );
}

// Rotating geometric rings
function GeometricRings() {
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);
  const ring3Ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    
    if (ring1Ref.current) {
      ring1Ref.current.rotation.x = time * 0.3;
      ring1Ref.current.rotation.y = time * 0.2;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.x = time * -0.2;
      ring2Ref.current.rotation.z = time * 0.3;
    }
    if (ring3Ref.current) {
      ring3Ref.current.rotation.y = time * 0.25;
      ring3Ref.current.rotation.z = time * -0.15;
    }
  });

  return (
    <>
      <Torus ref={ring1Ref} args={[2, 0.05, 16, 100]}>
        <meshStandardMaterial
          color="#7c3aed"
          emissive="#7c3aed"
          emissiveIntensity={0.2}
          transparent
          opacity={0.6}
          metalness={0.8}
        />
      </Torus>
      <Torus ref={ring2Ref} args={[2.5, 0.05, 16, 100]} rotation={[Math.PI / 2, 0, 0]}>
        <meshStandardMaterial
          color="#a78bfa"
          emissive="#a78bfa"
          emissiveIntensity={0.2}
          transparent
          opacity={0.5}
          metalness={0.8}
        />
      </Torus>
      <Torus ref={ring3Ref} args={[3, 0.05, 16, 100]} rotation={[0, Math.PI / 2, 0]}>
        <meshStandardMaterial
          color="#c4b5fd"
          emissive="#c4b5fd"
          emissiveIntensity={0.2}
          transparent
          opacity={0.4}
          metalness={0.8}
        />
      </Torus>
    </>
  );
}

// Floating particles
function FloatingParticles() {
  const particlesRef = useRef<THREE.Points>(null);

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.getElapsedTime() * 0.03;
    }
  });

  const positions = useMemo(() => {
    const count = 150;
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i += 3) {
      const radius = 4 + Math.random() * 2;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;
      
      pos[i] = radius * Math.sin(phi) * Math.cos(theta);
      pos[i + 1] = radius * Math.sin(phi) * Math.sin(theta);
      pos[i + 2] = radius * Math.cos(phi);
    }
    return pos;
  }, []);

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        color="#a78bfa"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
}

export default function Scene3D() {
  return (
    <Canvas
      camera={{ position: [0, 0, 8], fov: 45 }}
      style={{ background: "transparent" }}
      gl={{ antialias: true, alpha: true }}
    >
      {/* Lighting */}
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 5, 5]} intensity={0.8} />
      <pointLight position={[-5, -5, -5]} intensity={0.4} color="#7c3aed" />
      <pointLight position={[5, -5, 5]} intensity={0.3} color="#a78bfa" />
      
      {/* 3D Elements */}
      <DataNodes />
      <GeometricRings />
      <FloatingParticles />
      
      {/* Controls */}
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.5}
        minPolarAngle={Math.PI / 3}
        maxPolarAngle={2 * Math.PI / 3}
      />
    </Canvas>
  );
}

