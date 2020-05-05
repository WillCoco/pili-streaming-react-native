const calcStrLength = (str: string) => {
  let realLength = 0
  let charCode = -1

  for (var i = 0; i < str.length; i++) {
    charCode = str.charCodeAt(i)
    if (charCode >= 0 && charCode <= 128)
      realLength += 1
    else
      realLength += 2
  }
  return realLength
}

export default calcStrLength