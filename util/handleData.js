const treeData = (data, key, parentKey, childName) => {
  let cloneData = data.concat()
  return cloneData.filter(father => {
    let newArr = cloneData.filter(child => {
      return father[key] === child[parentKey]
    })
    father[childName] = newArr
    return father[parentKey] === '0'
  })
}

const flatData = data => {
  let result = []
  data.forEach(v => {
    if (Array.isArray(v)) {
      result = result.concat(flatData(v))
    } else {
      result.push(v)
    }
  })
  return result
}
const noRepeatArr = (arr, key) => {
  let len = arr.length
  for (let i = 0; i < len; i++) {
    for (let j = i + 1; j < len; j++) {
      if (arr[i][key] === arr[j][key]) {
        arr.splice(i, 1)
        i--
        len--
        break;
      }
    }
  }
  return arr
}
module.exports = {
  treeData,
  flatData,
  noRepeatArr
}
