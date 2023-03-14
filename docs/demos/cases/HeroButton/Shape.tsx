//@ts-nocheck
import { Canvas, useThree } from '@react-three/fiber';
import { useTheme } from 'antd-style';
import { MotionConfig, useSpring, useTransform } from 'framer-motion';
import { motion } from 'framer-motion-3d';
import { useLayoutEffect, useRef } from 'react';
import { transition } from './settings';

export function useSmoothTransform(value, springOptions, transformer) {
  return useSpring(useTransform(value, transformer), springOptions);
}

export const Shapes = ({ isHover, isPress, mouseX, mouseY }) => {
  const lightRotateX = useSmoothTransform(mouseY, spring, mouseToLightRotation);
  const lightRotateY = useSmoothTransform(mouseX, spring, mouseToLightRotation);

  return (
    <Canvas shadows dpr={[1, 2]} resize={{ scroll: false, offsetSize: true }}>
      <Camera mouseX={mouseX} mouseY={mouseY} />
      <MotionConfig transition={transition}>
        <motion.group center={[0, 0, 0]} rotation={[lightRotateX, lightRotateY, 0]}>
          <Lights />
        </motion.group>
        <motion.group
          initial={false}
          animate={isHover ? 'hover' : 'rest'}
          dispose={null}
          variants={{
            hover: { z: isPress ? -0.9 : 0 },
          }}
        >
          <Sphere />
          <Cone />
          <Torus />
          <Icosahedron />
        </motion.group>
      </MotionConfig>
    </Canvas>
  );
};

export function Lights() {
  const theme = useTheme();
  return (
    <>
      <spotLight color={theme.blue} position={[-10, -10, -10]} intensity={0.2} />
      <spotLight color={theme.blue} position={[-10, 0, 15]} intensity={0.8} />
      <spotLight color={theme.blue} position={[-5, 20, 2]} intensity={0.5} />
      <spotLight color={theme.pink} position={[15, 10, -2]} intensity={2} />
      <spotLight color={theme.pink} position={[15, 10, 5]} intensity={1} />
      <spotLight color={theme.pink} position={[5, -10, 5]} intensity={0.8} />
    </>
  );
}

export function Sphere() {
  return (
    <motion.mesh position={[-0.5, -0.5, 0]} variants={{ hover: { z: 2 } }}>
      <sphereGeometry args={[0.4]} />
      <Material />
    </motion.mesh>
  );
}

export function Cone() {
  return (
    <motion.mesh
      position={[-0.8, 0.4, 0]}
      rotation={[-0.5, 0, -0.3]}
      variants={{
        hover: {
          z: 1.1,
          x: -1.5,
          rotateX: -0.2,
          rotateZ: 0.4,
        },
      }}
    >
      <coneGeometry args={[0.3, 0.6, 20]} />
      <Material />
    </motion.mesh>
  );
}

export function Torus() {
  return (
    <motion.mesh
      position={[0.1, 0.4, 0]}
      rotation={[-0.5, 0.5, 0]}
      variants={{
        hover: {
          y: 0.5,
          z: 2,
          rotateY: -0.2,
        },
      }}
    >
      <torusGeometry args={[0.2, 0.1, 10, 50]} />
      <Material />
    </motion.mesh>
  );
}

export function Icosahedron() {
  return (
    <motion.mesh
      position={[1.1, 0, 0]}
      rotation-z={0.5}
      variants={{
        hover: {
          x: 1.8,
          z: 0.6,
          y: 0.6,
          rotateZ: -0.5,
        },
      }}
    >
      <icosahedronGeometry args={[0.7, 0]} />
      <Material />
    </motion.mesh>
  );
}

export function Material() {
  return <meshPhongMaterial color="#fff" specular="#1677FF" shininess={10} />;
}

// Adapted from https://github.com/pmndrs/drei/blob/master/src/core/PerspectiveCamera.tsx
function Camera({ mouseX, mouseY, ...props }) {
  const cameraX = useSmoothTransform(mouseX, spring, (x) => x / 350);
  const cameraY = useSmoothTransform(mouseY, spring, (y) => (-1 * y) / 350);

  const set = useThree(({ set }) => set);
  const camera = useThree(({ camera }) => camera);
  const size = useThree(({ size }) => size);
  const scene = useThree(({ scene }) => scene);
  const cameraRef = useRef();

  useLayoutEffect(() => {
    const { current: cam } = cameraRef;
    if (cam) {
      cam.aspect = size.width / size.height;
      cam.updateProjectionMatrix();
    }
  }, [size, props]);

  useLayoutEffect(() => {
    if (cameraRef.current) {
      const oldCam = camera;
      set(() => ({ camera: cameraRef.current }));
      return () => set(() => ({ camera: oldCam }));
    }
  }, [camera, cameraRef, set]);

  useLayoutEffect(() => {
    return cameraX.onChange(() => camera.lookAt(scene.position));
  }, [cameraX]);

  return <motion.perspectiveCamera ref={cameraRef} fov={90} position={[cameraX, cameraY, 3.8]} />;
}

const spring = { stiffness: 600, damping: 30 };

const mouseToLightRotation = (v) => (-1 * v) / 140;
