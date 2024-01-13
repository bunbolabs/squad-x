// import { Canvas } from '@react-three/fiber'
// import { SpriteAnimator } from '@react-three/drei'
// import { Canvas } from '@react-three/fiber'
import { useEffect } from 'react'

// import Dino from '@/shared/components/dino'

export default function App() {
  useEffect(() => {
    console.log('content view loaded')
  }, [])

  // const onClick = () => {
  // console.log('clicked')
  // // call jsonplaceholder api
  // fetch('https://jsonplaceholder.typicode.com/posts')
  //   .then(response => response.json())
  //   .then(data => {
  //     // Handle the API response here
  //     console.log(data)
  //   })
  //   .catch(error => {
  //     // Handle any errors here
  //     console.error(error)
  //   })
  // }

  // const [frameName, setFrameName] = useState('idle')

  // const onClick = () => {
  //   console.log('clicked')
  //   setFrameName('celebration')
  // }

  // const onEnd = ({ currentFrameName }) => {
  //   if (currentFrameName === 'celebration') {
  //     setFrameName('idle')
  //   }
  // }

  return (
    <div className="full-screen">
      {/* <Canvas> */}
      {/* <group onClick={onClick}>
          <SpriteAnimator
            scale={[4, 4, 4]}
            position={[0.0, -2.0, -1.5]}
            onLoopEnd={onEnd}
            frameName={frameName}
            fps={24}
            animationNames={['idle', 'celebration']}
            autoPlay={true}
            loop={true}
            alphaTest={0.01}
            textureImageURL={'https://ddlmkkdkpamjibyltves.supabase.co/storage/v1/object/public/dino/boy_hash.png'}
            textureDataURL={'https://ddlmkkdkpamjibyltves.supabase.co/storage/v1/object/public/dino/boy_hash.json'}
          />
        </group> */}
      {/* </Canvas> */}
    </div>
  )
}
