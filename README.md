# Suomen koronavirus-tartuntatilanne avoimena datana

Helsingin Sanomat julkaisee Suomen koronavirus-tartunnat ja niiden tiedossa olevat lähteet avoimena datana. HS on kerännyt aineiston julkisista lähteistä: tiedotustilaisuuksista, mediasta ja haastatteluista. Dataa päivitetään sitä mukaa kun uusia tietoja tulee. 

Dataa saa käyttää vapaasti niin kaupallisiin kuin yksityisiin tarpeisiin. Toivomme, että data tallennetaan paikallisesti tai välimuistitetaan, mikäli se on tarkoitus julkaista laajalle yleisölle.

HS avaa datan julkiseksi, jotta muut tiedotusvälineet, kehittäjät ja datavisualistit pystyisivät paremmin hahmottamaan koronaviruksen leviämistä Suomessa. Toiveena on, että yleisön tietoisuus viruksesta paranisi ja mahdollisuudet suojautua tartunnoilta sekä arvioida tartunnan riskejä perustuisivat mahdollisimman tarkkaan aineistoon.

# Suora rajapinta HS:n dataan (see in English [below](#direct-interface-to-hs-data))

Viimeisimmän HS:n datan voi lukea osoitteesta https://w3qa5ydb4l.execute-api.eu-west-1.amazonaws.com/prod/finnishCoronaData
(kyllä, se on suora osoite AWS Lambdan API-gatewayhyn). `GET`-pyynnöllä pääsee.

## Datan formaatti

Rajapinta palauttaa JSONia, joka näyttää tältä (formaatti voi vaihtua, mutta pyritään seuraamaan hyviä API-suunnittelun periaatteita
eikä poisteta tai muuteta kenttien nimiä). Esimerkkidataa myös [täällä](exampleData.json). Ajat UTC:ssa.

```
{
  confirmed: [
    {
      id: <numeerinen id, juokseva numerointi>,
      date: <havainnon aika ISO 8601 -formaatissa>,
      healthCareDistrict: <sairaanhoitopiiri>,
      infectionSource: <tartunnan lähteen id (eli tästä listasta), "unknown" jos ei tiedetä ja "related to earlier" jos tarkkaa lähdettä ei tiedetä mutta tiedetään että liittyy johonkin aiempaan tapaukseen>,
      infectionSourceCountry: <jos tiedossa, infection lähdemaa ISO 3166-1 alpha-3 -formaatissa>
    },
    .
    .
    .
  ],
  deaths: [
    {
      id: <numeerinen id, juokseva numerointi>,
      date: <havainnon aika ISO 8601 -formaatissa>,
      healthCareDistrict: <sairaanhoitopiiri>,
    },
    .
    .
    .
  ],
  recovered: [
    {
      id: <numeerinen id, juokseva numerointi. ei liity muihin id:ihin>,
      date: <havainnon aika ISO 8601 -formaatissa>,
      healthCareDistrict: <sairaanhoitopiiri>,
    },
    .
    .
    .
  ]
}
```

Sairaanhoitopiirien nimet kuten [täällä](https://www.kuntaliitto.fi/sosiaali-ja-terveysasiat/sairaanhoitopiirien-jasenkunnat), sillä erotuksella
että Helsingin ja Uudenmaan sairaanhoitopiiri on esitetty muodossa HUS.

`infectionSource` -kenttää voidaan käyttää tartuntaketjujen havainnollistamiseen.

`recovered`-kentän listaus parantuneista tapauksista on hyvin best effort -tyyppinen tätä kirjoittaessa. Katso lisää keskustelua aiheesta
[täältä](https://github.com/HS-Datadesk/koronavirus-avoindata/issues/12). Jos haluat kokeilla jonkinlaista kaavaa (esimerkiksi yli kaksi viikkoa
vanhat havainnot oletetaan parantuneiksi), niin voit sen itse tehdä - tarjottuun dataan ei tulla tekemään tällaisia laskelmia, vaan siinä ilmoitetaan
tiedot sellaisina kuin ne on lähteistä saatu ja luotettavaksi arvioitu.

# Dataa on käytetty täällä

## HS:n grafiikat

HS on käyttänyt ja käyttää dataa ainakin näissä grafiikoissa:
- https://dynamic.hs.fi/2020/corona-embed-finland/?scope=Global

- https://dynamic.hs.fi/2020/corona-embed-grid/?composition=[%22header%22,%22buttons%22,%22totals%22,%22chart%22,%22grid%22,%22map%22,%22tracking%22,%22credits%22]

## Muiden visualisoinnit datan pohjalta

(Tee pull request jos haluat omasi tänne.)

[Corona Monitor](https://github.com/Matsuuu/finnish-corona-statistics) ([Matsuuu](https://github.com/Matsuuu))

[Sairaanhoitopiirit kartalla](https://github.com/VuokkoH/koronavirus-avoindata) ([VuokkoH](https://github.com/VuokkoH))

[Suomen koronavirus-tartuntatilanne](https://korona.kans.io/) ([valstu](https://github.com/valstu/korona-info))

[Koronavirus-twitterbotti](https://twitter.com/Koronabotti) ([Duukkis](http://www.palomaki.info/))

[Koronavirus-tilanne maittain](https://projects.databyro.fi/korona/) ([Julleht](https://twitter.com/Julleht))

[Koronaviruksen tartutukset](https://observablehq.com/@kallehjerppe/koronatartunnat-suomessa) ([kallehj](https://github.com/kallehjerppe))

[Verkkograafi Koronatartuntaketjuista](https://github.com/Miksus/corona_cases_finland) ([Miksus](https://github.com/Miksus))

[Aktiiviset tartunnat kartalla](https://koronatartunnat.netlify.com/) ([Jonniek](https://github.com/jonniek))

[Koronavirus-Telegrambotti](https://t.me/coronavirusfinland) ([source](https://gitlab.com/ultsi-projects/coronafinbot)) ([ultsi](https://gitlab.com/ultsi))

[Koronapaniikki.fi - Koronavirustilanne kartalla maakunnittain](https://koronapaniikki.fi/) ([source](https://gitlab.com/mouhgang/koronapaniikki)) ([mouhgang](https://gitlab.com/groups/mouhgang/))

[State of corona in Finland](https://coronainfinland.herokuapp.com/) ([pauliinasol](https://github.com/pauliinasol/corona-in-finland/))

[Hoitsubotti - telegram-botti](https://t.me/Hoitsubot) ([Karvaporsas](https://github.com/Karvaporsas/hoitsubotti))

# Huomautus

Tämä data on peräisin julkisista lähteistä. HS pyrkii kasaamaan sen mahdollisimman paikkansa pitävänä. Emme takaa, että päivitämme dataa jatkuvasti ja saatamme lopettaa datan päivittämisen ennalta ilmoittamatta, esimerkiksi tartuntatilanteen tai julkisten lähteiden muuttuessa. Saatamme myös muuttaa datarakennetta tai osoitteita ennalta ilmoittamatta.


# Direct interface to HS data

The latest data used by HS can be read from https://w3qa5ydb4l.execute-api.eu-west-1.amazonaws.com/prod/finnishCoronaData
(yes, a direct address to an AWS Lambda API gateway). `GET` request works.

## Data format

The API returns JSON, which is structured as follows (the format may change, but good API development practices will be considered
and field names should remain the same and fields shouldn't be removed for example). Example data [here](exampleData.json).
All times in UTC.

```
{
  confirmed: [
    {
      id: <numeric, sequential id>,
      date: <date when this observation was made, ISO 8601 -format>,
      healthCareDistrict: <health care district>,
      infectionSource: <id of the infection source (from this array), "unknown" if unknown and "related to earlier" if we cannot pinpoint the exact source but know it's from known exposure>,
      infectionSourceCountry: <if known, infection source country in ISO 3166-1 alpha-3 format>
    },
    .
    .
    .
  ],
  deaths: [
    {
      id: <numeric, sequential id>,
      date: <date when this observation was made, ISO 8601 -format>,
      healthCareDistrict: <health care district>,
    },
    .
    .
    .
  ],
  recovered: [
    {
      id: <numeric, sequential id. not related to other ids>,
      date: <date when this observation was made, ISO 8601 -format>,
      healthCareDistrict: <health care district>,
    },
    .
    .
    .
  ]
}
```

The health care distrticts follow naming conventions from [here](https://www.kuntaliitto.fi/sosiaali-ja-terveysasiat/sairaanhoitopiirien-jasenkunnat), with the
difference that the health care district of Helsinki and Uusimaa is called HUS.

`infectionSource` field can be used to inspect infection chains.

The list in `recovered` field is very much a best effort attempt at showing the recovered numbers. The topic has been discussed [here](https://github.com/HS-Datadesk/koronavirus-avoindata/issues/12). If you want to try out a formula (for example, counting all confirmed
cases that are older than two weeks as recovered) feel free to do so. The data offered here will not be subject to such calculations, but will instead provide information as obtained from the sources considered to be reliable.

# Lisenssi: MIT-lisenssi

Copyright 2020 Helsingin Sanomat

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
