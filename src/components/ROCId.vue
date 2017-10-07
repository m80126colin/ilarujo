<template>
<div id="rocid" class="container">
  <textarea v-model="text"></textarea>
  <table>
    <thead>
      <tr><th>Identa Nombro</th><th>Rezulto</th></tr>
    </thead>
    <tbody>
      <tr v-for="l in listo">
        <td>{{ l[0] }}</td>
        <td v-if="l[1].statuso">{{ l[1].statuso }}</td>
        <td v-else>{{ l[1].kialo }}</td>
      </tr>
    </tbody>
  </table>
</div>
</template>

<script>
import $ from 'jquery'
import _ from 'lodash'

const datumojPriAlfabeto = [
  { alfabeto: 'A', valoro: 10, valido: 1, nomo: '臺北市' },
  { alfabeto: 'B', valoro: 11, valido: 0, nomo: '臺中市' },
  { alfabeto: 'C', valoro: 12, valido: 9, nomo: '基隆市' },
  { alfabeto: 'D', valoro: 13, valido: 8, nomo: '臺南市' },
  { alfabeto: 'E', valoro: 14, valido: 7, nomo: '高雄市' },
  { alfabeto: 'F', valoro: 15, valido: 6, nomo: '新北市' },
  { alfabeto: 'G', valoro: 16, valido: 5, nomo: '宜蘭縣' },
  { alfabeto: 'H', valoro: 17, valido: 4, nomo: '桃園市' },
  { alfabeto: 'I', valoro: 34, valido: 9, nomo: '嘉義市' },
  { alfabeto: 'J', valoro: 18, valido: 3, nomo: '新竹縣' },
  { alfabeto: 'K', valoro: 19, valido: 2, nomo: '苗栗縣' },
  { alfabeto: 'L', valoro: 20, valido: 2, nomo: '臺中縣' },
  { alfabeto: 'M', valoro: 21, valido: 1, nomo: '南投縣' },
  { alfabeto: 'N', valoro: 22, valido: 0, nomo: '彰化縣' },
  { alfabeto: 'O', valoro: 35, valido: 8, nomo: '新竹市' },
  { alfabeto: 'P', valoro: 23, valido: 9, nomo: '雲林縣' },
  { alfabeto: 'Q', valoro: 24, valido: 8, nomo: '嘉義縣' },
  { alfabeto: 'R', valoro: 25, valido: 7, nomo: '臺南縣' },
  { alfabeto: 'S', valoro: 26, valido: 6, nomo: '高雄縣' },
  { alfabeto: 'T', valoro: 27, valido: 5, nomo: '屏東縣' },
  { alfabeto: 'U', valoro: 28, valido: 4, nomo: '花蓮縣' },
  { alfabeto: 'V', valoro: 29, valido: 3, nomo: '臺東縣' },
  { alfabeto: 'W', valoro: 32, valido: 1, nomo: '金門縣' },
  { alfabeto: 'X', valoro: 30, valido: 3, nomo: '澎湖縣' },
  { alfabeto: 'Y', valoro: 31, valido: 2, nomo: '陽明山管理局' },
  { alfabeto: 'Z', valoro: 33, valido: 0, nomo: '連江縣' }
]

const kialo = {
  mallonga: 'too short',
  longa:    'too long',
  formato:  'format error',
  kodo:     'code error'
}

const isUpper = str => _.chain(str)
  .split('')
  .every(ch => ('a' <= ch && ch <= 'z') || ('A' <= ch && ch <= 'Z') )
  .value()

const isDigit = str => _.chain(str)
  .split('')
  .every(ch => '0' <= ch && ch <= '9')
  .value()

/**
  @funkcio: validigasIdentaNombro
 */
const validigasIdentaNombro = identaNombro => {
  const tabeloDeNombro = _.chain(identaNombro).toUpper().split('').value()
  //
  if (tabeloDeNombro.length < 10)
    return { statuso: false, kialo: kialo.mallonga }
  //
  if (tabeloDeNombro.length > 10)
    return { statuso: false, kialo: kialo.longa    }
  //
  if ( !(isUpper(_.head(tabeloDeNombro)) && _.chain(tabeloDeNombro).tail().every(isDigit).value()) )
    return { statuso: false, kialo: kialo.formato  }
  //
  const tabelo  = [1, 8, 7, 6, 5, 4, 3, 2, 1, 1]
  const rezulto = _
    .chain(tabeloDeNombro)
    .map(alfo => {
      const indekso = _.findIndex(datumojPriAlfabeto, o => o.alfabeto === alfo)
      if (indekso < 0)
        return parseFloat(alfo)
      return datumojPriAlfabeto[indekso].valido
    })
    .zipWith(tabelo, (a, b) => a * b)
    .sum()
    .value() % 10
  //
  if (rezulto !== 0)
    return { statuso: false, kialo: kialo.kodo, kodo: rezulto }
  //
  return { statuso: true, kodo: rezulto }
}

window.validigasIdentaNombro = validigasIdentaNombro

window._ = _

export default {
  nomo: 'ROCId',
  data () {
    return {
      text: ''
    }
  },
  computed: {
    listo() {
      const app     = this
      const datumoj = _.split(app.text, /\r?\n/)
      return _
        .chain(datumoj)
        .zip( _.map(datumoj, validigasIdentaNombro) )
        .value()
    }
  }
}
</script>