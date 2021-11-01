const bytesToSize = bytes => {
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
  if (!bytes) return '0 Byte'
  const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)))
  return Math.round(bytes / Math.pow(1024, i)) + ' ' + sizes[i]
}

const element = (tag, classes = [], content) => {
  const node = document.createElement(tag)

  if (classes.length) {
    node.classList.add(...classes)
  }

  if (content) {
    node.textContent = content
  }

  return node
}

export function upload(selector, options = {}) {
  let files = []
  const input = document.querySelector(selector)
  const preview = element('div', ['preview'])
  // const preview = document.createElement('div')
  // preview.classList.add('preview')

  const upload = element('button', ['btn', 'primary'], 'Upload')
  upload.style.display = 'none'

  const open = element('button', ['btn'], 'Open')
  // const open = document.createElement('button')
  // open.classList.add('btn')
  // open.textContent = 'Open'

  //add multiple change Files
  options.multi ? input.setAttribute('multiple', true) : null

  // files with which you can work
  if (options.accept && Array.isArray(options.accept)) {
    input.setAttribute('accept', options.accept.join(','))
  }

  input.insertAdjacentElement('afterend', preview)
  input.insertAdjacentElement('afterend', open)
  input.insertAdjacentElement('afterend', upload)

  const openInput = () => input.click()
  const changeFiles = e => {
    // data about selected file
    console.log(e.target.files)

    // if no files are selected, nothing needs to be done
    if (!e.target.files.length) {
      return
    }

    // data about selected file (multi select)
    files = Array.from(e.target.files)
    upload.style.display = 'inline'

    // очистка выбраных файлов - preview.innerHTML = ''
    // то есть при каждом открытии модалки, отображаться будут
    // только выбраные файлы в текущий раз
    preview.innerHTML = ''
    files.forEach(file => {
      // console.log(file)

      if (!file.type.match('image')) {
        return
      }

      // создаем ридер - new FileReader()
      const reader = new FileReader()

      // перед тем как ничинем что-либо считывать, добавляем обработчик - onload, который говорит
      // как только мы считаем файл с ридера, тогда мы выполняем log, и после этого, считываем сам файл
      reader.onload = e => {
        // код картинки для превю в base64
        // console.log(e.target.result)

        const src = e.target.result

        preview.insertAdjacentHTML(
          'afterbegin',
          `
            <div class="preview-image">
              <div class="preview-remove common-settings" data-name="${file.name}">&times;</div>
              <img src="${src}" alt="${file.name}" />
              <div class="preview-info common-settings">
                <span>${file.name}</span>
                ${bytesToSize(file.size)}
              </div>
            </div>
          `
        )
      }

      // если добавить обработчик в конце, то он может не сработать, потому что readAsDataURL может выполниться быстрее
      // потому что она асинхронная
      reader.readAsDataURL(file)
    })
  }

  const removeSelectedFile = e => {
    if (!e.target.dataset.name) {
      return
    }

    const { name } = e.target.dataset
    // delete file in array
    files = files.filter(file => file.name !== name)

    if (!files.length) {
      upload.style.display = 'none'
    }

    const block = preview.querySelector(`[data-name='${name}']`).closest('.preview-image')

    block.classList.add('removing')
    setTimeout(() => block.remove(), 300)
  }

  const uploadHandler = e => {}

  open.addEventListener('click', openInput)
  input.addEventListener('change', changeFiles)
  preview.addEventListener('click', removeSelectedFile)
  upload.addEventListener('click', uploadHandler)
}
