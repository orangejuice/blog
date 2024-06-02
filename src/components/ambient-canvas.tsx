"use client"
import {useEffect, useMemo, useRef, useState} from "react"
import {Canvas, GroupProps, MeshProps, useFrame} from "@react-three/fiber"
import {CameraControls, SoftShadows} from "@react-three/drei"
import {useSpring} from "@react-spring/core"
import {a} from "@react-spring/three"
import {motion} from "framer-motion"
import {Group, Mesh} from "three"
import {useTheme} from "next-themes"

const easeInOutCubic = (t: number) => t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1

function Sphere({position, ...props}: MeshProps & {position: number[]}) {
  const ref = useRef<Mesh>(null)
  const factor = useMemo(() => 0.5 + Math.random(), [])

  useFrame((state) => {
    const t = easeInOutCubic((1 + Math.sin(state.clock.getElapsedTime() * factor)) / 2)
    ref.current!.position.y = position[1] + t
  })
  return (<>
    <mesh ref={ref} position={position} {...props} castShadow receiveShadow>
      <sphereGeometry args={[0.2, 6, 6]}/>
    </mesh>
  </>)
}

function Plant({position, ...props}: MeshProps & {position: [number, number, number]}) {
  const ref = useRef<Mesh>(null)
  const factor = useMemo(() => 0.5 + Math.random(), [])
  useFrame((state) => {
    const t = easeInOutCubic((1 + Math.sin(state.clock.getElapsedTime() * factor)) / 2)
    ref.current!.position.y = position[1] + t * 2
  })
  return (<>
    <mesh ref={ref} position={position} {...props} castShadow receiveShadow>
      <sphereGeometry args={[7, 6, 6, 0.1, 0.1, 0.1, 1]}/>
    </mesh>
  </>)
}

function Spheres({number, position}: GroupProps & {number: number}) {
  const ref = useRef<Group>(null)
  const positions: [number, number, number][] = useMemo(() =>
    [...Array(number)].map(() => [3 - Math.random() * 6, Math.random() * 4, 3 - Math.random() * 6]), [number])

  useFrame((state) =>
    (ref.current!.rotation.y = Math.sin(state.clock.getElapsedTime() / 10) * Math.PI))

  return (<>
    <group ref={ref} position={position}>
      {positions.map((pos, index) => <Sphere key={index} position={pos}/>)}
    </group>
  </>)
}

function Plants({number, position}: GroupProps & {number: number}) {
  const ref = useRef<Group>(null)
  const positions: [number, number, number][] = useMemo(() =>
    [...Array(number)].map((_, index) => [0, index * 0.01, 0]), [number])
  const rotations: [number, number, number][] = useMemo(() =>
    [...Array(number)].map((_, index) => [0.3, ((Math.PI * 2) / number) * 2 * index, Math.PI / 2]), [number])

  return (
    <group ref={ref} position={position}>
      {rotations.map((rot, index) => (
        <Plant key={index} rotation={rot} position={positions[index]}/>
      ))}
    </group>
  )
}

export function AmbientCanvas({ambience = true}) {
  const {resolvedTheme} = useTheme()
  const [threeLoading, setThreeLoading] = useState(false)
  const cameraControlRef = useRef<CameraControls>(null)
  const {spring} = useSpring({
    spring: resolvedTheme == "dark" ? 1 : 0,
    config: {mass: 5, tension: 400, friction: 200, precision: 0.0001}
  })

  const rotation_x = spring.to([0, 1], [0, Math.PI])
  const rotation_y = spring.to([0, 1], [Math.PI * 0.1, Math.PI * 0.14])

  useEffect(() => {
    cameraControlRef.current?.rotatePolarTo(0)
    cameraControlRef.current?.rotateAzimuthTo(0)
    cameraControlRef.current?.setLookAt(-20, 20, -30, -8, -10, -28)
  }, [threeLoading])

  if (resolvedTheme === "dark") return null

  return (
    <motion.div style={{width: "100vw", height: "100vh", position: "fixed", top: 0, left: 0, zIndex: 2, mixBlendMode: "multiply", pointerEvents: "none"}}
      animate={{opacity: (ambience && threeLoading) ? 1 : 0}}>
      <Canvas shadows camera={{fov: 45, position: [-20, 20, -30]}}
        style={{pointerEvents: "none", width: "100vw", height: "100vh", position: "fixed", top: 0, left: 0, zIndex: 2}}
        onCreated={() => {setThreeLoading(true)}}>
        <CameraControls ref={cameraControlRef} makeDefault={true}/>
        <SoftShadows size={25} focus={0.53} samples={10}/>
        <fog attach="fog" args={["black", 0, 40]}/>
        <a.group rotation-z={rotation_x} rotation-y={rotation_y}>
          <directionalLight castShadow position={[2.5, 10, 20]} intensity={3} shadow-mapSize={1024}>
            <orthographicCamera attach="shadow-camera" args={[-30, 30, -30, 100, 0.5, 80]}/>
          </directionalLight>
          <directionalLight castShadow position={[-2.5, -10, 20]} intensity={6} shadow-mapSize={1024}>
            <orthographicCamera attach="shadow-camera" args={[-10, 10, -10, 100, 0.5, 80]}/>
          </directionalLight>
        </a.group>
        <group position={[0, -3.5, 0]}>
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]} receiveShadow>
            <planeGeometry args={[1000, 1000]}/>
            <shadowMaterial opacity={0.4}/>
          </mesh>
          <Spheres position={[5, 10, 8]} number={200}/>
          <Plants position={[5, 11, 8]} number={300}/>
          <Spheres position={[-6, 8, 3]} number={200}/>
          <Plants position={[-6, 10, 3]} number={300}/>
        </group>
      </Canvas>
    </motion.div>
  )
}
