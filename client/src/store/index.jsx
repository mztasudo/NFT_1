import { createGlobalState } from 'react-hooks-global-state'

const { setGlobalState, useGlobalState, getGlobalState } = createGlobalState({
 connectedAccount: '',
 contract: null,
 nfts: [],
 loading: {show: false, msg: ''}
})

const truncate = (text = '', startChars, endChars, maxLength) => {
  if (!text) return ''
  if (text.length > maxLength) {
    let start = text.substring(0, startChars)
    let end = text.substring(text.length - endChars)
    while (start.length + end.length < maxLength) {
      start += '.'
    }
    return start + end
  }
  return text
}
const setAlert = (msg, color = 'green') => {
 setGlobalState('alert', { show: true, msg, color })
 setTimeout(() => {
   setGlobalState('alert', { show: false, msg: '', color })
   setGlobalState('loading', false)
 }, 5000)
}

const setLoadingMsg = (msg) => {
 const loading = getGlobalState('loading')
 setGlobalState('loading', { ...loading, msg })
}

export { useGlobalState, setGlobalState, getGlobalState, truncate, setAlert,
 setLoadingMsg }