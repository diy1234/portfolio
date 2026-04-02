// components/3d/Scene3D.jsx
// Background-only canvas: subtle particles + ambient atmosphere
import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Stars } from '@react-three/drei'
import * as THREE from 'three'
import { useMouseParallax } from '../../hooks/useMouseParallax'

function Particles({ count = 120 }) {
  const ref = useRef()
  const { positions, colors } = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const colors    = new Float32Array(count * 3)
    const c1 = new THREE.Color('#00d4ff')
    const c2 = new THREE.Color('#7c3aed')
    for (let i = 0; i < count; i++) {
      positions[i*3]   = (Math.random()-0.5)*24
      positions[i*3+1] = (Math.random()-0.5)*14
      positions[i*3+2] = (Math.random()-0.5)*10 - 4
      const c = Math.random() > 0.5 ? c1 : c2
      colors[i*3]=c.r; colors[i*3+1]=c.g; colors[i*3+2]=c.b
    }
    return { positions, colors }
  }, [count])

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.015
      ref.current.rotation.x += delta * 0.004
    }
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color"    args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.035} vertexColors transparent opacity={0.5} sizeAttenuation />
    </points>
  )
}

function CameraRig() {
  const mouse = useMouseParallax()
  useFrame((state) => {
    state.camera.position.x += (mouse.x * 0.5 - state.camera.position.x) * 0.03
    state.camera.position.y += (-mouse.y * 0.3 - state.camera.position.y) * 0.03
    state.camera.lookAt(0, 0, 0)
  })
  return null
}

export default function Scene3D() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <Canvas camera={{ position:[0,0,6], fov:55 }} gl={{ antialias:true, alpha:true }}
        style={{ background:'transparent' }}>
        <ambientLight intensity={0.2} />
        <Stars radius={80} depth={40} count={1000} factor={3} fade speed={0.4} />
        <Particles count={120} />
        <CameraRig />
      </Canvas>
    </div>
  )
}
