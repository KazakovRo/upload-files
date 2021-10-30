export function upload(selector) {
  const input = document.querySelector(selector)

  const open = document.createElement('button')
  open.classList.add('btn')
  open.textContent = 'Open'

  input.insertAdjacentElement('afterend', open)

  const openInput = () => input.click()

  open.addEventListener('click', openInput)
}
