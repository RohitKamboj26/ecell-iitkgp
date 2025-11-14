import { useEffect, useRef } from "react";
import * as THREE from "three";

type Props = {
  className?: string;
};

// Lightweight Three.js gradient shader background for menus
export default function ThreeDropdownBg({ className }: Props) {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0); // transparent
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1); // screen-space

    const geometry = new THREE.PlaneGeometry(2, 2);
    const uniforms = {
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
      uResolution: { value: new THREE.Vector2(1, 1) },
      uColorA: { value: new THREE.Color("#1e293b") }, // slate-800 - professional deep blue-gray
      uColorB: { value: new THREE.Color("#334155") }, // slate-700 - sophisticated gray
      uColorC: { value: new THREE.Color("#475569") }, // slate-600 - subtle accent
    };

    const material = new THREE.ShaderMaterial({
      uniforms,
      transparent: true,
      vertexShader: /* glsl */ `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = vec4(position, 1.0);
        }
      `,
      fragmentShader: /* glsl */ `
        precision highp float;
        varying vec2 vUv;
        uniform vec2 uResolution;
        uniform vec2 uMouse;
        uniform float uTime;
        uniform vec3 uColorA;
        uniform vec3 uColorB;
        uniform vec3 uColorC;

        // simple pseudo noise
        float noise(vec2 p){
          return sin(p.x)*sin(p.y);
        }

        void main(){
          vec2 uv = vUv;
          // aspect correction
          uv -= 0.5;
          uv.x *= uResolution.x / uResolution.y;

          // mouse attraction field
          vec2 m = uMouse - 0.5;
          m.x *= uResolution.x / uResolution.y;
          float dist = length(uv - m);

          // layered waves
          float n = 0.0;
          n += noise(uv * 3.0 + uTime * 0.3);
          n += noise(uv.yx * 4.0 - uTime * 0.25);
          n += noise(uv * 6.0 + uTime * 0.15);
          n = n * 0.33;

          // radial falloff from mouse
          float glow = smoothstep(0.6, 0.0, dist);

          // mix three colors with subtle variations
          vec3 base = mix(uColorA, uColorB, 0.5 + 0.2 * sin(uTime*0.3));
          vec3 color = mix(base, uColorC, 0.15 + 0.15 * n + 0.1 * glow);

          // stronger vignette for elegance
          float vignette = smoothstep(1.2, 0.3, length(uv));
          color *= 0.85 + 0.15 * vignette;

          gl_FragColor = vec4(color, 0.4); // more subtle transparency
        }
      `,
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    const setSize = () => {
      const { clientWidth, clientHeight } = mount;
      renderer.setSize(clientWidth, clientHeight, false);
      uniforms.uResolution.value.set(clientWidth, clientHeight);
    };
    setSize();

    let rafId = 0;
    const clock = new THREE.Clock();
    const animate = () => {
      uniforms.uTime.value += clock.getDelta();
      renderer.render(scene, camera);
      rafId = requestAnimationFrame(animate);
    };
    animate();

    const handlePointer = (e: PointerEvent) => {
      const rect = mount.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      uniforms.uMouse.value.set(x, 1.0 - y);
    };

    window.addEventListener("resize", setSize);
    mount.addEventListener("pointermove", handlePointer);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", setSize);
      mount.removeEventListener("pointermove", handlePointer);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      if (renderer.domElement.parentElement === mount) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={mountRef} className={className ?? ""} />;
}
