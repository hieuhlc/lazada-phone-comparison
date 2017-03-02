function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response
  } else {
    const error = new Error(response.statusText)
    error.response = response
    throw error
  }
}

export function crawl(url) {
  return fetch(`/start-crawling?url=${encodeURI(url)}`)
    .then(checkStatus)
    .then(response => response.text())
}
