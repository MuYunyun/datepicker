(() => {
  const datepicker = window.datepicker

  let monthData, $wrapper
  datepicker.buildUi = (year, month) => {
    monthData = datepicker.getMonthData(year, month)
    let html = `<div class="ui-datepicker-header" >
                    <a href="#" class="ui-datepicker-btn ui-datepicker-prev-btn">&lt;</a>
                    <a href="#" class="ui-datepicker-btn ui-datepicker-next-btn">&gt;</a>
                    <span class="ui-datepicker-curr-month">${monthData.year}-${monthData.month}</span>
                  </div >
                  <div class="ui-datepicker-body">
                    <table>
                      <thead>
                        <tr>
                          <th>一</th>
                          <th>二</th>
                          <th>三</th>
                          <th>四</th>
                          <th>五</th>
                          <th>六</th>
                          <th>日</th>
                        </tr>
                      </thead>
                    <tbody>`

    for(let i = 0; i < monthData.days.length; i++) {
      let date = monthData.days[i]
      if (i % 7 === 0) {
        html += '<tr>'
      }
      html += `<td data-date=${date.date}>${date.showDate}</td>`
      if (i % 7 === 6) {
        html += '</tr>'
      }
    }
    html += `</tbody>
        </table>
      </div>`

    return html
  }

  datepicker.render = () => {
    let year, month
    const innerHtml = datepicker.buildUi(year, month)
    $wrapper = document.createElement('div')
    $wrapper.className = 'ui-datepicker-wrapper'
    $wrapper.innerHTML = innerHtml

    document.body.appendChild($wrapper)
  }

  datepicker.init = (input) => {
    datepicker.render()
    const $input = document.querySelector(input)
    let isOpen = true

    $input.addEventListener('click', () => {
      if (isOpen) {
        // 显示日历
        $wrapper.classList.remove('ui-datepicker-wrapper-show')
        // 获取输入框位置
        const left = $input.offsetLeft
        const top = $input.offsetTop
        const height = $input.offsetHeight
        // 写入日历本的位置
        $wrapper.style.top = top + height + 2 + 'px'
        $wrapper.style.left = left + 'px'
        isOpen = false
      } else {
        // 隐藏日历
        $wrapper.classList.add('ui-datepicker-wrapper-show')
        isOpen = true
      }
    }, false)
  }

})()