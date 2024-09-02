import './style.css'
import ReactDOM from 'react-dom/client'
import { Suspense, useEffect, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { useGLTF,OrbitControls,ContactShadows,Environment } from '@react-three/drei'
import { proxy, useSnapshot } from 'valtio'
import { HexColorPicker } from "react-colorful";


const root = ReactDOM.createRoot(document.querySelector('#root'))

const state = proxy({ 
  current: null,
  // items: {
  //   laces: "#ffffff",
  //   mesh: "#ffffff",
  //   caps: "#ffffff",
  //   inner: "#ffffff",
  //   sole: "#ffffff",
  //   stripes: "#ffffff",
  //   band: "#ffffff",
  //   patch: "#ffffff",

  // }
  items: {

    sofa_accents: "#ffffff",
    sofa_cushions: "#ffffff",
    sofa_pattern_1: "#ffffff",
    sofa_pattern_2: "#ffffff",
    sofa_wood: "#ffffff",

  }
})

 function Shoe(props) {
    const snap = useSnapshot(state)
    const { nodes, materials } = useGLTF('gaudy_couch.glb') 
    
    const [hovered, set] = useState(null)

    Object.keys(materials).forEach(materialName => {
      const material = materials[materialName]
      material.map = null  // Removes the texture map
      // Set a plain color (light gray in this case)
  })

    useEffect(() => {
      const cursor = `<svg width="64" height="64" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0)"><path fill="rgba(255, 255, 255, 0.5)" d="M29.5 54C43.031 54 54 43.031 54 29.5S43.031 5 29.5 5 5 15.969 5 29.5 15.969 54 29.5 54z" stroke="#000"/><g filter="url(#filter0_d)"><path d="M29.5 47C39.165 47 47 39.165 47 29.5S39.165 12 29.5 12 12 19.835 12 29.5 19.835 47 29.5 47z" fill="${snap.items[hovered]}"/></g><path d="M2 2l11 2.947L4.947 13 2 2z" fill="#000"/><text fill="#000" style="#fff-space:pre" font-family="Inter var, sans-serif" font-size="10" letter-spacing="-.01em"><tspan x="35" y="63">${name[hovered]}</tspan></text></g><defs><clipPath id="clip0"><path fill="#fff" d="M0 0h64v64H0z"/></clipPath><filter id="filter0_d" x="6" y="8" width="47" height="47" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"/><feOffset dy="2"/><feGaussianBlur stdDeviation="3"/><feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0"/><feBlend in2="BackgroundImageFix" result="effect1_dropShadow"/><feBlend in="SourceGraphic" in2="effect1_dropShadow" result="shape"/></filter></defs></svg>`
      const auto = `<svg width="64" height="64" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill="rgba(255, 255, 255, 0.5)" d="M29.5 54C43.031 54 54 43.031 54 29.5S43.031 5 29.5 5 5 15.969 5 29.5 15.969 54 29.5 54z" stroke="#000"/><path d="M2 2l11 2.947L4.947 13 2 2z" fill="#000"/></svg>`
      if (hovered) {
        document.body.style.cursor = `url('data:image/svg+xml;base64,${btoa(cursor)}'), auto`
        return () => (document.body.style.cursor = `url('data:image/svg+xml;base64,${btoa(auto)}'), auto`)
      }
    }, [hovered])
    return (
      <group {...props} dispose={null} 
        onPointerOver={(e) => {e.stopPropagation(), set(e.object.material.name)}}
        onPointerOut={ (e) => {e.intersections.length===0 && set(null)}}
        onPointerDown={ (e) => {e.stopPropagation();state.current = e.object.material.name}}
        onPointerMissed={ (e) => {state.current = null}}
        >
        {/* <mesh material-color={snap.items.laces} geometry={nodes.shoe.geometry} material={materials.laces} />
        <mesh material-color={snap.items.mesh} geometry={nodes.shoe_1.geometry} material={materials.mesh} />
        <mesh material-color={snap.items.caps} geometry={nodes.shoe_2.geometry} material={materials.caps} />
        <mesh material-color={snap.items.inner} geometry={nodes.shoe_3.geometry} material={materials.inner} />
        <mesh material-color={snap.items.sole} geometry={nodes.shoe_4.geometry} material={materials.sole} />
        <mesh material-color={snap.items.stripes} geometry={nodes.shoe_5.geometry} material={materials.stripes} />
        <mesh material-color={snap.items.band} geometry={nodes.shoe_6.geometry} material={materials.band} />
        <mesh material-color={snap.items.patch} geometry={nodes.shoe_7.geometry} material={materials.patch} /> */}

        <group scale={0.01}>
        <group rotation={[-Math.PI / 2, 0, 0]} scale={100}>
          <mesh material-color={snap.items.sofa_accents} geometry={nodes.LP_Square_cushion_02_sofa_accents_0.geometry} material={materials.sofa_accents} />
          <mesh material-color={snap.items.sofa_cushions} geometry={nodes.LP_Square_cushion_02_sofa_cushions_0.geometry} material={materials.sofa_cushions} />
          <mesh material-color={snap.items.sofa_pattern_1} geometry={nodes.LP_Square_cushion_02_sofa_pattern_1_0.geometry} material={materials.sofa_pattern_1} />
          <mesh material-color={snap.items.sofa_pattern_2} geometry={nodes.LP_Square_cushion_02_sofa_pattern_2_0.geometry} material={materials.sofa_pattern_2} />
          <mesh material-color={snap.items.sofa_wood} geometry={nodes.LP_Square_cushion_02_sofa_wood_0.geometry} material={materials.sofa_wood} />
        </group>
      </group>
      </group>
    )
  }

  const name = {
    "sofa_cushions": "Pillows",
    "sofa_pattern_1": "Sofa back",
    "sofa_pattern_2": "Cushions",
    "sofa_wood": "Sofa frame",
  }

  function Picker() {
    const snap = useSnapshot(state)
    return(
      <div style={{display: snap.current?"block":"none"}}> 
      <HexColorPicker className='picker' 
        color={snap.items[snap.current]}
        onChange={(color) => {state.items[snap.current]=color}}
      ></HexColorPicker>
      <h1>{name[snap.current]} </h1> 
      
      </div>
    )
  }


root.render(
    <>
    <Picker />
        <Canvas camera={{position: [4,4,4]}}>
        <ambientLight intensity={0} /> 
        <spotLight intensity={0} position={[5,20,20]}/>  
        <Suspense fallback={null}>
        <Environment preset='forest' />
        <Shoe/>
        <directionalLight
            position={[5, 20, 20]}
            intensity={0}
            castShadow
            shadow-mapSize-height={512}
            shadow-mapSize-width={512}
            shadow-camera-far={50}
            shadow-camera-left={-10}
         />
        <ContactShadows position={[0, 0, 0 ]} opacity={0.075} scale={10} blur={1.5} far={10} />

        </Suspense>
        <OrbitControls />
        </Canvas>
        
    </>
)