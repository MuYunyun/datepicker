(() => {
  const datepicker = window.datepicker

  let monthData, $wrapper
  datepicker.buildUi = (year, month, value = '') => {
    monthData = datepicker.getMonthData(year, month)
    const dateValue = value.split('-')
    let html = `<div class="ui-datepicker-header" >
                    <a href="#" class="ui-datepicker-btn ui-datepicker-prev-btn">&lt;</a>
                    <a href="#" class="ui-datepicker-btn ui-datepicker-next-btn">&gt;</a>
                    <span class="ui-datepicker-curr-month">${monthData.year}年 ${monthData.month}月</span>
                  </div>
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
      if ((new Date().getMonth() + 1) === date.month && new Date().getDate() === date.showDate) { // 今天的日期特殊显示
        html += `<td><div class="ui-datepicker-date ui-datepicker-date-today" data-date=${date.date}>${date.showDate}</div></td>`
      } else if (parseInt(dateValue[1], 10) === date.month && parseInt(dateValue[2], 10) === date.showDate) { // 当前选中的日期
        html += `<td><div class="ui-datepicker-date ui-datepicker-date-select" data-date=${date.date}>${date.showDate}</div></td>`
      } else if (monthData.month !== date.month) { // 不是当前月份的日期置灰
        html += `<td class="not"><div class="ui-datepicker-date" data-date=${date.date}>${date.showDate}</div></td>`
      } else {
        html += `<td><div class="ui-datepicker-date" data-date=${date.date}>${date.showDate}</div></td>`
      }
      if (i % 7 === 6) {
        html += '</tr>'
      }
    }
    html += `</tbody>
        </table>
      </div>`

    return html
  }

  datepicker.render = (direction, value) => {
    let year, month
    if (monthData) {
      year = monthData.year
      month = monthData.month
    }
    if (direction === 'prev') {
      month--
      if (month === 0) {
        month = 12,
        year = year - 1
      }
    }
    if (direction === 'next') {
      month++
      if (month === 13) {
        month = 1
        year = year + 1
      }
    }

    const innerHtml = datepicker.buildUi(year, month, value)

    $wrapper = document.querySelector('.ui-datepicker-wrapper')

    if (!$wrapper) {
      $wrapper = document.createElement('div')
      $wrapper.className = 'ui-datepicker-wrapper'
      document.body.appendChild($wrapper)
    }

    $wrapper.innerHTML = innerHtml
  }

  datepicker.init = (input) => {
    datepicker.render()
    const $input = document.querySelector(input)
    let isOpen = false

    $input.addEventListener('click', () => {
      if (isOpen) {
        // 隐藏日历
        $wrapper.classList.remove('ui-datepicker-wrapper-show')
        isOpen = false
      } else {
        datepicker.render(null, $input.value)
        // 显示日历
        $wrapper.classList.add('ui-datepicker-wrapper-show')
        // 获取输入框位置
        const left = $input.offsetLeft
        const top = $input.offsetTop
        const height = $input.offsetHeight
        // 写入日历本的位置
        $wrapper.style.top = top + height + 'px'
        $wrapper.style.left = left + 'px'
        isOpen = true
      }
    }, false)

    // 切换月份
    $wrapper.addEventListener('click', (e) => {
      const $target = e.target
      if ($target.classList.contains('ui-datepicker-prev-btn')) {
        datepicker.render('prev', $input.value)
      } else if ($target.classList.contains('ui-datepicker-next-btn')) {
        datepicker.render('next', $input.value)
      }
    }, false)

    // 点击事件
    $wrapper.addEventListener('click', (e) => {
      const $target = e.target
      if ($target.className !== 'ui-datepicker-date') return false
      datepicker.render(null, $input.value)

      const date = new Date(monthData.year, monthData.month - 1, $target.dataset.date)
      $input.value = format(date)
      $wrapper.classList.remove('ui-datepicker-wrapper-show')  // 隐藏日历
      isOpen = false
    }, false)
  }

  function format(date) {
    let ret = ''
    const padding = (num) => {
      return num <= 9 ? ('0' + num) : num
    }
    ret += date.getFullYear() + '-'
    ret += padding(date.getMonth() + 1) + '-'
    ret += padding(date.getDate())
    return ret
  }

})()