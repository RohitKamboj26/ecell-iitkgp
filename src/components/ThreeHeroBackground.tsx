import { useEffect, useRef } from "react";
import * as THREE from "three";

interface Props {
  text: string;
  className?: string;
}

/**
 * 3D Text Hero with Three.js particle system
 * Creates an immersive floating particles effect behind text
 */
export default function ThreeHeroBackground({ text, className = "" }: Props) {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      mount.clientWidth / mount.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0); // Transparent
    mount.appendChild(renderer.domElement);

    // Create particle system
    const particleCount = 1500;
    const positions = new Float32Array(particleCount * 3);
    const velocities = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      
      // Random positions
      positions[i3] = (Math.random() - 0.5) * 15;
      positions[i3 + 1] = (Math.random() - 0.5) * 15;
      positions[i3 + 2] = (Math.random() - 0.5) * 10;

      // Random velocities
      velocities[i3] = (Math.random() - 0.5) * 0.02;
      velocities[i3 + 1] = (Math.random() - 0.5) * 0.02;
      velocities[i3 + 2] = (Math.random() - 0.5) * 0.02;

      // Gradient colors (cyan to violet to amber)
      const colorChoice = Math.random();
      if (colorChoice < 0.33) {
        colors[i3] = 0.13; // cyan
        colors[i3 + 1] = 0.83;
        colors[i3 + 2] = 0.93;
      } else if (colorChoice < 0.66) {
        colors[i3] = 0.55; // violet
        colors[i3 + 1] = 0.36;
        colors[i3 + 2] = 0.96;
      } else {
        colors[i3] = 0.96; // amber
        colors[i3 + 1] = 0.62;
        colors[i3 + 2] = 0.04;
      }
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 0.05,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    // Mouse interaction
    const mouse = { x: 0, y: 0 };
    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", handleMouseMove);

    // Resize handler
    const handleResize = () => {
      const width = mount.clientWidth;
      const height = mount.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height, false);
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    // Animation loop
    let rafId = 0;
    const clock = new THREE.Clock();
    const animate = () => {
      const elapsed = clock.getElapsedTime();

      // Update particle positions
      const posAttr = geometry.getAttribute("position");
      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        
        // Apply velocity
        posAttr.array[i3] += velocities[i3];
        posAttr.array[i3 + 1] += velocities[i3 + 1];
        posAttr.array[i3 + 2] += velocities[i3 + 2];

        // Boundary wrapping
        if (Math.abs(posAttr.array[i3]) > 8) velocities[i3] *= -1;
        if (Math.abs(posAttr.array[i3 + 1]) > 8) velocities[i3 + 1] *= -1;
        if (Math.abs(posAttr.array[i3 + 2]) > 5) velocities[i3 + 2] *= -1;
      }
      posAttr.needsUpdate = true;

      // Rotate particles based on mouse
      particles.rotation.y = mouse.x * 0.2;
      particles.rotation.x = mouse.y * 0.2;
      particles.rotation.z = elapsed * 0.05;

      renderer.render(scene, camera);
      rafId = requestAnimationFrame(animate);
    };
    animate();

    // Cleanup
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      if (renderer.domElement.parentElement === mount) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div ref={mountRef} className={`absolute inset-0 ${className}`} />
  );
}
