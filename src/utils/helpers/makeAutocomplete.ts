
export function makeAutocomplete (object: any, key = 'id', value = 'name') {
  return object.map(obj => ({
    value: obj[key],
    title: obj[value]
  }))
}
