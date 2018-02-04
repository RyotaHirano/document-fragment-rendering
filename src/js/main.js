import '../html/index.pug'
import '../css/style.scss'
import '../images/01.jpg'

document.addEventListener('DOMContentLoaded', () => {
  new Table({
    target: '.js-table-a',
    mode: 0
  })

  new Table({
    target: '.js-table-b',
    mode: 1
  })
})

class Table {
  constructor(options) {
    this.options = {
      target: '.js-table',
      mode: 0 // 0: normal, 1: slow
    }
    Object.assign(this.options, options)
    this.table = document.querySelector(this.options.target)
    this.tbody = this.table.querySelector('tbody')
    this.dispTime = document.querySelector(`${this.options.target}-time`)

    this.data = []
    for(let i = 0; i < 2000; i++) {
      this.data.push(
        {
          id: `${i}`,
          name: `test${i}`,
          img: 'assets/images/01.jpg',
          price: `${i}yen`
        }
      )
    }

    performance.mark('start')
    this.options.mode === 1 ? this.slowCreate(this.data) : this.create(this.data)
    performance.mark('end')
    performance.measure('measure', 'start', 'end')
    this.dispTime.textContent = performance.getEntriesByType('measure')[0]['duration']
    performance.clearMarks()
    performance.clearMeasures()

    // setInterval(() => {
    //   this.shuffleRow()
    // }, 1000)
  }

  create(data) {
    const tr = document.createElement('tr')
    const td = document.createElement('td')
    const img = document.createElement('img')

    data.forEach((items) => {
      const _tr = tr.cloneNode(false)
      const fragmentTr = document.createDocumentFragment()

      for(const k in items) {
        const _td = td.cloneNode(false)
        if(k === 'img') {
          const _img = img.cloneNode(false)
          _img.setAttribute('src', items[k])
          _td.appendChild(_img)
        } else {
          _td.innerHTML = this.escapeHtml(items[k])
        }

        _tr.appendChild(_td)
        fragmentTr.appendChild(_tr)
        this.tbody.appendChild(fragmentTr)
      }
    })
  }

  slowCreate(data) {
    data.forEach((items, i) => {
      const _tr = document.createElement('tr')
      this.tbody.appendChild(_tr)

      for(const k in items) {
        const _td = document.createElement('td')
        if(k === 'img') {
          const _img = document.createElement('img')
          _img.setAttribute('src', items[k])
          _td.appendChild(_img)
        } else {
          _td.innerHTML = this.escapeHtml(items[k])
        }

        this.tbody.querySelectorAll('tr')[i].appendChild(_td)
      }
    })
  }

  shuffle(array) {
    const _array = [...array]
    const length = _array.length
    let index = -1
    const lastIndex = length - 1

    while(index++ < length) {
      const ran = Math.floor(Math.random() * (lastIndex - index + 1))
      const random = index + ran
      const tmp = _array[random]
      _array[random] = _array[index]
      _array[index] = tmp
    }

    return _array
  }

  shuffleRow() {
    const randomData = this.shuffle(this.data)
    this.tbody.innerHTML = ''
    this.options.mode === 1 ? this.slowCreate(randomData) : this.create(randomData)
  }

  escapeHtml(str) {
    str = str.replace(/&/g, '&amp;')
    str = str.replace(/</g, '&lt;')
    str = str.replace(/>/g, '&gt;')
    str = str.replace(/"/g, '&quot;')
    str = str.replace(/'/g, '&#39;')
    return str
  }
}