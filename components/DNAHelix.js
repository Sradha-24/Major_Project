import React, { useEffect, useRef } from "react";
import * as THREE from "three";

function DNAHelix() {
  const mountRef = useRef(null);

  useEffect(() => {
    if (!mountRef.current) return;

    const width = mountRef.current.clientWidth;
    const height = mountRef.current.clientHeight;

    while (mountRef.current.firstChild) {
      mountRef.current.removeChild(mountRef.current.firstChild);
    }

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    mountRef.current.appendChild(renderer.domElement);

    const dnaGroup = new THREE.Group();
    scene.add(dnaGroup);

    const material1 = new THREE.MeshBasicMaterial({ color: 0x6a0dad }); 
    const material2 = new THREE.MeshBasicMaterial({ color: 0xbb86fc }); 
    const lineMaterial = new THREE.LineBasicMaterial({ color: 0xffffff, opacity: 0.3, transparent: true });

    const radius = 2;
    const turns = 100;
    const step = 0.3;

    // We will store the spheres and rungs in an array so we can animate them individually
    const elements = [];

    for (let i = 0; i < turns; i++) {
      const yOffset = i * step - (turns * step) / 2;
      const initialAngle = i * 0.3;

      const sphere1 = new THREE.Mesh(new THREE.SphereGeometry(0.15, 16, 16), material1);
      const sphere2 = new THREE.Mesh(new THREE.SphereGeometry(0.15, 16, 16), material2);
      
      const rungGeom = new THREE.BufferGeometry();
      const rung = new THREE.Line(rungGeom, lineMaterial);

      dnaGroup.add(sphere1);
      dnaGroup.add(sphere2);
      dnaGroup.add(rung);

      elements.push({ sphere1, sphere2, rung, yOffset, initialAngle });
    }

    // Static Strands (Backbones)
    const points1 = [];
    const points2 = [];

    // Scale and Camera
    dnaGroup.scale.set(1.5, 1.5, 1.5);
    camera.position.z = 18;

    // --- STATIC POSITION ---
    // This locks the DNA in the diagonal position (top-left to bottom-right)
    dnaGroup.rotation.z = 0.8; 

    let rotationAngle = 0;
    let requestID;

    const animate = () => {
      requestID = requestAnimationFrame(animate);
      rotationAngle += 0.02; // Speed of rotation

      elements.forEach((el) => {
        const currentAngle = el.initialAngle + rotationAngle;
        
        const x1 = Math.cos(currentAngle) * radius;
        const z1 = Math.sin(currentAngle) * radius;
        const x2 = Math.cos(currentAngle + Math.PI) * radius;
        const z2 = Math.sin(currentAngle + Math.PI) * radius;

        // Move spheres
        el.sphere1.position.set(x1, el.yOffset, z1);
        el.sphere2.position.set(x2, el.yOffset, z2);

        // Update horizontal rungs
        const positions = new Float32Array([x1, el.yOffset, z1, x2, el.yOffset, z2]);
        el.rung.geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        el.rung.geometry.attributes.position.needsUpdate = true;
      });

      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      if (!mountRef.current) return;
      camera.aspect = mountRef.current.clientWidth / mountRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(requestID);
      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} className="dna-bottom"></div>;
}

export default DNAHelix;