import React, { useEffect, useRef } from 'react'
import { useThree, useFrame } from '@react-three/fiber'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import * as THREE from 'three'

gsap.registerPlugin(ScrollTrigger)

export default function CameraControls() {
  const { camera, gl } = useThree()
  const targetPosition = useRef(new THREE.Vector3(0, 1.6, 6))
  const targetLookAt = useRef(new THREE.Vector3(0, 0, 0))

  useEffect(() => {
    // Create a timeline for camera animations tied to scroll
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '.app-root',
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1,
        // markers: true, // Uncomment for debugging
      },
    })

    // Define camera positions for each section
    // Hero section
    tl.to(targetPosition.current, {
      x: 0,
      y: 1.6,
      z: 6,
      duration: 0.5,
    })

    // About section - camera moves closer and slightly left
    tl.to(targetPosition.current, {
      x: -1,
      y: 1.2,
      z: 4,
      duration: 1,
    }, '+=0.5')

    // Skills section - camera pulls back and pans right
    tl.to(targetPosition.current, {
      x: 2,
      y: 2,
      z: 7,
      duration: 1,
    }, '+=0.5')

    // Projects section - camera moves up and center
    tl.to(targetPosition.current, {
      x: 0,
      y: 2.5,
      z: 5,
      duration: 1,
    }, '+=0.5')

    // Contact section - camera pulls back for final view
    tl.to(targetPosition.current, {
      x: 0,
      y: 1.8,
      z: 8,
      duration: 1,
    }, '+=0.5')

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [camera])

  // Smooth camera movement each frame
  useFrame(() => {
    camera.position.lerp(targetPosition.current, 0.05)
    
    // Smooth look-at
    const currentLookAt = new THREE.Vector3()
    camera.getWorldDirection(currentLookAt)
    currentLookAt.multiplyScalar(10).add(camera.position)
    currentLookAt.lerp(targetLookAt.current, 0.05)
    camera.lookAt(targetLookAt.current)
  })

  return null
}
