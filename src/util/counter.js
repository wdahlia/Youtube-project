
function fixedCount(num) {
  if (num.length >= 9) {
    if (Number(num) % 1.0e+8 === 0) {
      return Math.round((Number(num) / 1.0e+8)) + '억'
    } else {
      return (Number(num) / 1.0e+8).toFixed(1) + '억'
    }
  } else if (num.length >= 6) {
    return Math.round((Number(num) / 1.0e+4)) + '만'
  } else if (num.length >= 5) {
    if (Number(num) % 1.0e+4 === 0) {
      return Math.round((Number(num) / 1.0e+4)) + '만'
    } else {
      return (Number(num) / 1.0e+4).toFixed(1) + '만'
    }
  } else if (num.length >= 4) {
    if (Number(num) % 1.0e+3 === 0) {
      return Math.round((Number(num) / 1.0e+3)) + '만'
    } else {
      return (Number(num) / 1.0e+3).toFixed(1) + '만'
    }
  } else {
    return num
  }
}

// 1000명 미만이면 + '명'
// 1000명 이상부터는 + '천명' 1620 1.62천명 divided by 1000
// 10000명 이상 + '만명' divided by 10000

// 260000 26만회
// 8640000 864만회
// 54350000 5435만회
// 43000 4.3만회


// const units = ['', '만', '억'];
// const divisor = [1, 1e4, 1e8];

// function fixedCount(num, unit) {
//   const index = unit === '회' ? 0 : units.indexOf(unit);
//   const count = num / divisor[index];
//   if (count >= 10) {
//     return Math.floor(count) + units[index];
//   } else if (count >= 1) {
//     return count.toFixed(1) + units[index];
//   } else {
//     return num + '명';
//   }
// }

export function countSubscriber(value) {
  return '구독자 ' + fixedCount(value) + '명'
}

export function countView(value) {
  return '조회수 ' + fixedCount(value) + '회'
}

export function countLike(value) {
  return fixedCount(value)
}