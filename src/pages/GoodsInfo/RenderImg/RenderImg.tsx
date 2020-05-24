import React, { useState, useEffect } from 'react'
import { Image, Dimensions, ActivityIndicator } from 'react-native'


export default function renderImg(props: { node: any }) {
  const { node } = props

  let imgWidth = Dimensions.get('window').width
  const [imgHeight, setImageHeight] = useState(0)
  const [attr] = useState(node.attribs)
  const [complete, setComplete] = useState(false)

  useEffect(() => {
    Image.getSize(
      attr.src,
      (originalWidth, originalHeight) => {
        setImageHeight((imgWidth * originalHeight) / originalWidth)
        setComplete(true)
      },
      () => { }
    )
  }, [])

  if (!complete) return <ActivityIndicator />

  return (
    <Image
      resizeMode='cover'
      source={{ uri: attr.src }}
      style={{ width: imgWidth, height: imgHeight }}
    />
  )
}