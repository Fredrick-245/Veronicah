import React from "react";
import { extend } from "@react-three/fiber";
import { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";
import CanvasLoader from "../Loader";
import { styles } from "../../style";
extend({OrbitControls,Preload,useGLTF})


const Computers = ({isMobile}) => {
  const computer = useGLTF("../../../public/desktop_pc/scene.gltf");
  return (
      <mesh>
        <hemisphereLight intensity={0.15} groundColor={'black'} />
        <pointLight intensity={1} />
        <spotLight position={[-20,50,10]} angle={0.12} penumbra={1} intensity={1} castShadow />
        <primitive object={computer.scene} scale={isMobile?0.8:0.75} position={isMobile?[0,-3,-2.2]:[0,-4.25,-3,-1.5]} rotation={[-0.01,-0.2,-0.1]} />
      </mesh>
  );
};
const ComputerCanvas = () => {
  const [isMobile,setIsMobile]=useState(false)
  useEffect(()=>{
    const mediaQuery=window.matchMedia('(max-width:500px)')
    setIsMobile(mediaQuery.matches)
    const handleMediaQueryChange=(event)=>{
      setIsMobile(event.matches)
    }
    mediaQuery.addEventListener('change',handleMediaQueryChange)
    return ()=>{mediaQuery.removeEventListener('change',handleMediaQueryChange)}
  },[])
  return (
    <Canvas
      frameloop="demand"
      shadows
      camera={{ position: [20, 4, 5], fov: 25 }}
      gl={{ preserveDrawingBuffer: true }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls enableZoom={false} maxPolarAngle={Math.PI / 2} minPolarAngle={Math.PI/2} />
        <Computers isMobile={isMobile}/>
      </Suspense>
      <Preload all/>
    </Canvas>
  );
};

export default ComputerCanvas;
