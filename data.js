// 用法： datepicker.getMonthData(2017, 11) 返回 2017.11 出现的日期
(() => {
  const datepicker = {}
  datepicker.getMonthData = (year = new Date().getFullYear(), month = new Date().getMonth() + 1) => {
    const ret = []

    const firstDay = new Date(year, month - 1, 1) // 这个月的第一天
    const firstDayWeekDay = firstDay.getDay() === 0 ? 7 : firstDay.getDay() // 获取当月 1 号是星期几 1-7

    const lastDayOfLastMonth = new Date(year, month - 1, 0) // 上个月的最后一天
    const lastDateOfLastMonth = lastDayOfLastMonth.getDate() // 上个月最后一天日期

    const lastDay = new Date(year, month, 0) // 本月最后一天
    const lastDate = lastDay.getDate() // 本月最后一天日期

    for (let i = 0; i < 42; i++) {
      const date = i + 2 - firstDayWeekDay // 中间变量
      let thisMonth = month
      let showDate = date

      if (date <= 0) { // 上一个月
        thisMonth = month - 1
        showDate = lastDateOfLastMonth + date
      } else if (date > lastDate) { // 下一个月
        thisMonth = month + 1
        showDate = showDate - lastDate
      }
      if (thisMonth === 0) thisMonth = 12
      if (thisMonth === 13) thisMonth = 1
      ret.push({
        date: date,
        month: thisMonth,
        showDate: showDate,
      })
    }
    return {
      year: year,
      month: month,
      days: ret,
    }
  }

  window.datepicker = datepicker
})()