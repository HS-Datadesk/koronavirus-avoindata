const toolkit = require('jsonstat-toolkit')
const _ = require('lodash')
const fs = require('fs')

const thlBaseUrl = 'https://sampo.thl.fi/pivot/prod/fi/epirapo/covid19case/fact_epirapo_covid19case.json'
const dailyQueryParameters = 'row=hcd-444832&column=dateweek2020010120201231-443702L'

const hcdNameMap = {
  Ahvenanmaa: 'Ahvenanmaa',
  'Varsinais-Suomen SHP': 'Varsinais-Suomi',
  'Satakunnan SHP': 'Satakunta',
  'Kanta-Hämeen SHP': 'Kanta-Häme',
  'Pirkanmaan SHP': 'Pirkanmaa',
  'Päijät-Hämeen SHP': 'Päijät-Häme',
  'Kymenlaakson SHP': 'Kymenlaakso',
  'Etelä-Karjalan SHP': 'Etelä-Karjala',
  'Etelä-Savon SHP': 'Etelä-Savo',
  'Itä-Savon SHP': 'Itä-Savo',
  'Pohjois-Karjalan SHP': 'Pohjois-Karjala',
  'Pohjois-Savon SHP': 'Pohjois-Savo',
  'Keski-Suomen SHP': 'Keski-Suomi',
  'Etelä-Pohjanmaan SHP': 'Etelä-Pohjanmaa',
  'Vaasan SHP': 'Vaasa',
  'Keski-Pohjanmaan SHP': 'Keski-Pohjanmaa',
  'Pohjois-Pohjanmaan SHP': 'Pohjois-Pohjanmaa',
  'Kainuun SHP': 'Kainuu',
  'Länsi-Pohjan SHP': 'Länsi-Pohja',
  'Lapin SHP': 'Lappi',
  'Helsingin ja Uudenmaan SHP': 'HUS',
  'Kaikki sairaanhoitopiirit': 'Kaikki sairaanhoitopiirit'

}

// Daily query
toolkit(thlBaseUrl + '?' + dailyQueryParameters).then(
  function(result){
    const objects = result.Dataset( 0 ).toTable({ type: 'arrobj' })
    const cleanedObjects = _.map(objects, object => ({
      value: object.value === null ? 0 : parseInt(object.value, 10),
      healthCareDistrict: hcdNameMap[object.hcd],
      date: new Date(new Date(object.dateweek2020010120201231).setHours(15)).toISOString()
    }))
    const grouped = _.groupBy(cleanedObjects, 'healthCareDistrict')
    const today = new Date()
    today.setHours(20)
    const filtered = _.mapValues(grouped, group => _.sortBy(_.filter(group, item => item.date < today.toISOString()), item => item.date))
    fs.writeFileSync('thlFinlandConfirmed.json', JSON.stringify(filtered))
  }
)
