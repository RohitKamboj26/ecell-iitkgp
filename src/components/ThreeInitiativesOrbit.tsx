import { useEffect, useRef } from "react";
import * as THREE from "three";

interface Props {
  className?: string;
}

/**
 * 3D Geometric shapes floating in space
 * Represents innovation and entrepreneurship visually
 */
export default function ThreeInitiativesOrbit({ className = "" }: Props) {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      50,
      mount.clientWidth / mount.clientHeight,
      0.1,
      100
    );
    camera.position.z = 8;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    // Create geometric shapes
    const shapes: THREE.Mesh[] = [];
    
    // Wireframe materials with gradient colors
    const materials = [
      new THREE.MeshBasicMaterial({ color: 0x22d3ee, wireframe: true }), // cyan
      new THREE.MeshBasicMaterial({ color: 0x8b5cf6, wireframe: true }), // violet
      new THREE.MeshBasicMaterial({ color: 0xf59e0b, wireframe: true }), // amber
      new THREE.MeshBasicMaterial({ color: 0x06b6d4, wireframe: true }), // cyan-600
    ];

    // Create different geometries
    const geometries = [
      new THREE.IcosahedronGeometry(1, 0),
      new THREE.OctahedronGeometry(1),
      new THREE.TetrahedronGeometry(1),
      new THREE.TorusGeometry(0.7, 0.3, 16, 100),
    ];

    geometries.forEach((geometry, i) => {
      const mesh = new THREE.Mesh(geometry, materials[i]);
      const angle = (i / geometries.length) * Math.PI * 2;
      const radius = 3.5;
      mesh.position.x = Math.cos(angle) * radius;
      mesh.position.y = Math.sin(angle) * radius;
      mesh.position.z = -2;
      shapes.push(mesh);
      scene.add(mesh);
    });

    // Add ambient light effect (points)
    const pointLight1 = new THREE.PointLight(0x22d3ee, 1, 10);
    pointLight1.position.set(3, 3, 3);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0x8b5cf6, 1, 10);
    pointLight2.position.set(-3, -3, 3);
    scene.add(pointLight2);

    // Mouse interaction
    const mouse = { x: 0, y: 0 };
    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", handleMouseMove);

    const handleResize = () => {
      const width = mount.clientWidth;
      const height = mount.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height, false);
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    // Animation
    let rafId = 0;
    const clock = new THREE.Clock();
    const animate = () => {
      const elapsed = clock.getElapsedTime();

      // Rotate shapes individually
      shapes.forEach((shape, i) => {
        shape.rotation.x = elapsed * (0.3 + i * 0.1);
        shape.rotation.y = elapsed * (0.2 + i * 0.1);
        
        // Orbit around center
        const angle = elapsed * 0.3 + (i / shapes.length) * Math.PI * 2;
        const radius = 3.5;
        shape.position.x = Math.cos(angle) * radius;
        shape.position.y = Math.sin(angle) * radius;
        
        // Subtle float up/down
        shape.position.z = -2 + Math.sin(elapsed + i) * 0.5;
      });

      // Camera sway with mouse
      camera.position.x = mouse.x * 0.5;
      camera.position.y = mouse.y * 0.5;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
      rafId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      geometries.forEach(g => g.dispose());
      materials.forEach(m => m.dispose());
      renderer.dispose();
      if (renderer.domElement.parentElement === mount) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={mountRef} className={className} />;
}
