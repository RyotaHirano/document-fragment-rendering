import '../html/index.pug'
import '../css/style.scss'

document.addEventListener('DOMcontentLoaded', () => {
  new Table()
})

class Table {
  constructor() {
    this.table = document.querySelector('.table')
    this.tbody = this.table.querySelector('tbody')
    this.data = [
      {
        id: '5',
        name: 'test 5',
        el: '<span>5 data</span>',
        price: '100'
      },
      {
        id: '2',
        name: 'test 2',
        el: '<span onerror="alert(1)">2 data</span>',
        price: '130'
      }
    ]

    this.create(this.data)

    // setInterval(() => {
    //   this.shuffleRow()
    // }, 1000)
  }

  create(data) {
    // let appendEl = ''
    // data.forEach(item => {
    //   appendEl += `<tr>`
    //   appendEl += `<td>${item.id}</td>`
    //   appendEl += `<td>${item.name}</td>`
    //   appendEl += `<td>${item.price}</td>`
    //   appendEl += `</tr>`
    // })
    // this.tbody.innerHTML = appendEl

    const tr = document.createElement('tr')
    const td = document.createElement('td')
    const fragment = document.createDocumentFragment()

    data.forEach((item, i) => {
      const _tr = tr.cloneNode(false)
      const id = td.cloneNode(false).textContent(item.id)
      const name = td.cloneNode(false).textContent(item.name)
      const el = td.cloneNode(false).textContent(item.el)
      const price = td.cloneNode(false).textContent(item.price)

      fragment.appendChild(_tr)
      fragment.querySelectorAll('tr')[i].appendChild(id)
      fragment.querySelectorAll('tr')[i].appendChild(name)
      fragment.querySelectorAll('tr')[i].appendChild(el)
      fragment.querySelectorAll('tr')[i].appendChild(price)
    })
    this.tbody.appendChild(fragment)
  }

  slowCreate(data) {
    data.forEach(item => {
      const tr = document.createElement('tr')
      const id = document.createElement('td').textContent(item.id)
      const name = document.createElement('td').textContent(item.name)
      const el = document.createElement('td').textContent(item.el)
      const price = document.createElement('td').textContent(item.price)

      tr.appendChild(id)
      tr.appendChild(name)
      tr.appendChild(el)
      tr.appendChild(price)
      this.tbody.appendChild(tr)
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
    this.create(randomData)
  }
}