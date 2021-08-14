export default function getImageSize(ref, imageWidth, imageHeight) {
  try {
    const offsetWidth = ref?.current?.offsetWidth
    const height = (offsetWidth * imageHeight) / imageWidth
    return [offsetWidth, height]
  } catch (e) {
  }
  return [imageWidth, imageHeight]
}