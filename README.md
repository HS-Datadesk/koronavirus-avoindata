# Suomen koronavirus-tartuntatilanne avoimena datana

Helsingin Sanomat julkaisee Suomen koronavirus-tartunnat ja niiden tiedossa olevat lähteet avoimena datana. HS on kerännyt aineiston julkisista lähteistä: tiedotustilaisuuksista, mediasta ja haastatteluista. Tällä hetkellä datan päälähde on THL:n [tartuntatietorekisteri]((https://thl.fi/fi/tilastot-ja-data/aineistot-ja-palvelut/avoin-data/varmistetut-koronatapaukset-suomessa-covid-19-)) tartuntojen osalta, ja sairaanhoitopiirien, kuolemien sekä rokotusten osalta osalta HS:n oma datan keräys.

Jos THL:n rajapinnan käyttö kiinnostaa, kannattaa katsoa `example-thl-parser`-kansioon.

Dataa saa käyttää vapaasti niin kaupallisiin kuin yksityisiin tarpeisiin. Toivomme, että data tallennetaan paikallisesti tai välimuistitetaan, mikäli se on tarkoitus julkaista laajalle yleisölle.

HS avaa datan julkiseksi, jotta muut tiedotusvälineet, kehittäjät ja datavisualistit pystyisivät paremmin hahmottamaan koronaviruksen leviämistä Suomessa. Toiveena on, että yleisön tietoisuus viruksesta paranisi ja mahdollisuudet suojautua tartunnoilta sekä arvioida tartunnan riskejä perustuisivat mahdollisimman tarkkaan aineistoon.

## Rajapinnan eri versiot

THL on julkaissut omat datansa avoimena [täällä](https://thl.fi/fi/tilastot-ja-data/aineistot-ja-palvelut/avoin-data/varmistetut-koronatapaukset-suomessa-covid-19-).
Datan julkaisun seurauksena suurin osa sairaanhoitopiireistä ei enää julkaise omia lukujaan, minkä johdosta HS:n aloittama tiedonkeruu ei enää kannata. Lisäksi THL:n
rajapinnassa havainnot esitetään testauspäivän perusteella, kun HS:n alun perin keräämässä datassa havainnot olivat ilmoituspäivän mukaan.

Tämän johdosta HS:n data HS:n ensimmäisen rajapinnan takan ei enää päivity - sen synkronointi eri tavalla ilmoitetun datan kanssa ei käy järkeen. HS tarjoaa
yhteensopivan rajapinnan THL:n datan päälle vanhan rajapinnan korvaajaksi. Lisäksi HS tarjoaa oman versionsa THL:n tartuntadatasta ja keräämänsä tiedot
sairaalahoidossa olevista.

# Suora rajapinta HS:n dataan (see in English [below](#direct-interface-to-hs-data))

## Ei-päivittyvät rajapinnat

Viimeisimmän HS:n alun perin datan voi lukea osoitteesta https://w3qa5ydb4l.execute-api.eu-west-1.amazonaws.com/prod/finnishCoronaData
(kyllä, se on suora osoite AWS Lambdan API-gatewayhyn). `GET`-pyynnöllä pääsee. Tästä rajapinnasta voit lukea havaintoja
tartunnan saaneista, kuolleista ja parantuneista. Tieto kerätään eri lähteistä (THL:n raportit, sairaanhoitopiirien raportit).

## Päivittyvät rajapinnat

Osoitteesta (https://w3qa5ydb4l.execute-api.eu-west-1.amazonaws.com/prod/finnishCoronaHospitalData) voit lukea
tietoja sairaalahoidossa olevista. Tämä tieto on talletettu THL:n päivän raporteista. Esimerkkidataa [täällä](exampleObservationData.json).

Osoitteesta (https://w3qa5ydb4l.execute-api.eu-west-1.amazonaws.com/prod/finnishCoronaData/v2) voit lukea HS:n muokkaaman, aiemman
`finnishCoronaData`-rajapinnan kanssa yhteensopivan dataobjektin havaistuista tartunnoista. kuolleista ja parantunteista.
Esimerkki dataa [täällä](exampleObservationDataV2.json)

Osoitteesta (https://w3qa5ydb4l.execute-api.eu-west-1.amazonaws.com/prod/finnishVaccinationData) voit lukea tuoreimmat tiedot 
Suomen rokotustilanteesta. HS:n toimitus päivittää tietoa käsin sitä mukaa kun THL sitä julkaisee.

**Päivitys 28.12.2020**

Ylläoleva v2-osoite on päivitetty poistamalla siitä `infectionSource` ja `infectionSourceCountry` -kentät. Muutos tehtiin, jotta rajapinnan 
vastaukset mahtuisivat AWS-lambdan rajoihin. Suosittelemme siirtymään käyttämään yllä olevaa osoitetta sairaaladataan ja alla olevaa THL:n
tartuntadataan.

Suoraan itse käyttämämme THL:n data on luettavissa osoitteesta (https://w3qa5ydb4l.execute-api.eu-west-1.amazonaws.com/prod/processedThlData).
Esimerkkidata [täällä](exampleProcessedThlData.json).

Testaukseen liittyvää dataa on tarjolla Suomen tasolla aikasarjana (https://w3qa5ydb4l.execute-api.eu-west-1.amazonaws.com/prod/thlTestData)
ja viimeisin tieto sairaanhoitopiireittäin (https://w3qa5ydb4l.execute-api.eu-west-1.amazonaws.com/prod/hcdTestData).

## Datan formaatti

Rajapinnat palauttavat JSONia.

Havaintodata joka näyttää tältä (formaatti voi vaihtua, mutta pyritään seuraamaan hyviä API-suunnittelun periaatteita
eikä poisteta tai muuteta kenttien nimiä). Ajat UTC:ssa.

Sekä uusi että vanha havaintodatarajapinta toteuttavat tämän rajapinnan - sillä erotuksella että uudessa rajapinnassa
kuolematiedot ovat sairaanhoidon erityisvastuualueiden mukaan jaoteltu, kuten THL:n datassa. Uudessa rajapinnassa ei
myöskään ole saatavilla tietoa tartuntamaista tai tartuntaketjuista - niitä varten kannattaa katsoa vanhaa rajapintaa.

Uudessa rajapinassa id on muotoiltu muotoon `<sairaanhoitopiiri>_<havainnon_päivämäärä>_<monesko_havainto_päivässä>`.
Syy siihen on se, että THL:n data päivittyy takautuvasti (testien valmistuminen kestää 2-4 päivää), joten juoksevan
numeroinnin käyttö ei käy järkeen. Tämän id:n pitäisi olla vakaa THL:n datojen päivitysten yli.

```
{
  confirmed: [
    {
      id: <numeerinen id merkkijonomuodossa (kuten "1"), juokseva numerointi, tai kuten yllä kuvattu>,
      date: <havainnon aika ISO 8601 -formaatissa>,
      healthCareDistrict: <sairaanhoitopiiri. null jos ei tiedossa>,
      infectionSource: <tartunnan lähteen id (eli tästä listasta), "unknown" jos ei tiedetä ja "related to earlier" jos tarkkaa lähdettä ei tiedetä mutta tiedetään että liittyy johonkin aiempaan tapaukseen>,
      infectionSourceCountry: <jos tiedossa, infection lähdemaa ISO 3166-1 alpha-3 -formaatissa>
    },
    .
    .
    .
  ],
  deaths: [
    {
      id: <numeerinen id merkkijonomuodossa (kuten "1"), juokseva numerointi, tai kuten yllä kuvattu>,
      date: <havainnon aika ISO 8601 -formaatissa>,
      healthCareDistrict: <sairaanhoitopiiri>,
      area: <erityissairaanhoitopiiri uudessa rajapinnassa, vanhas>
    },
    .
    .
    .
  ],
  recovered: [
    {
      id: <numeerinen id merkkijonomuodossa (kuten "1"), juokseva numerointi. ei liity muihin id:ihin>,
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

Sairaaladata näyttää tältä ([esimerkki](exampleHospitalData.json)):

```
{
  hospitalised: [
    {
      "date": "2020-03-25T13:00:00.000Z", // Aikaleima (jolloin tieto lisätty)
      "area": "HYKS", // Erityisvastuualue, Finland jos koko suomi ja "Other whan HYKS" kun kerran näin oli datassa
      "totalHospitalised": 63, // Kokonaismäärä sairaalahoidossa, numero
      "inWard": 45, // Osastolla olevat
      "inIcu": 18, // Tehohoidossa olevat
      "dead": 2 // Kuolleiden määrä
    },
    .
    .
    .
  ]
}
```

Erityisvastuualueiden nimistä käytetään pelkkiä lyhenteitä kuten [täällä](https://www.kuntaliitto.fi/sosiaali-ja-terveysasiat/terveydenhuolto/erikoissairaanhoito).

Tämä data on snapshotteja THL:n julkaisemista kokonaisluvuista, minkä johdosta formaatti on ei ole paras mahdollinen. Seuraamme miten tilanne kehittyy ja parannamme
jos parempaa vaihtoehtoa ilmaantuu / keksimme miten / ilmoitustapa vakiintuu.

Prosessoidusta THL-datasta saa parhaan kuvan [esimerkkidatasta](exampleProcessedThlData.json). `value`-kenttä kertoo, kuinka monta tartuntatapausta testien perusteella
on havaittu päivänä.

Testidatan esimerkit ovat [täällä Suomen aikasarjasta](exampleFinlandTimeseriesTestData.json) ja
[täällä viimeisimmästä sairaanhoitopiirin tiedosta](latestHcdTestData.json).

# Dataa on käytetty täällä

## HS:n grafiikat

HS on käyttänyt ja käyttää dataa ainakin näissä grafiikoissa:
- https://dynamic.hs.fi/2020/corona-embed-finland/?scope=Global

- https://dynamic.hs.fi/2020/corona-embed-grid/?composition=[%22header%22,%22buttons%22,%22totals%22,%22chart%22,%22grid%22,%22map%22,%22tracking%22,%22credits%22]

## Muiden visualisoinnit datan pohjalta

(Tee pull request jos haluat omasi tänne.)

[Korona-visual](https://demoproject-218708.ey.r.appspot.com/) ([Petrimus](https://github.com/Petrimus/korona-visual))

[Corosim](https://corosim.fi/) ([Futurice](https://www.futurice.com))

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

[COVID-19 Finland: Discord & Telegram Bot](https://github.com/jhamberg/fi-corona-bot) ([jhamberg](https://github.com/jhamberg))

[A Map of the Coronavirus disease (COVID-19) outbreak in Finland](https://finland-coronavirus-map.netlify.com/) ([Lovell D'souza](https://github.com/lovelldies))

[Korona-animaatio](https://github.com/AnttiHaerkoenen/korona-animaatio) ([Antti Härkönen](https://github.com/AnttiHaerkoenen))

[Finland COVID-19 data](https://finlandcovid.com) ([Avicted](https://github.com/Avicted/covid-19-finland-react))

[koronakartta.info - Korona suomessa, historiallinen leviäminen](https://koronakartta.info/) ([source](https://github.com/Marantle/KoronaKartta)) ([Marantle](https://github.com/Marantle))

[Excel makro](https://github.com/jussivirkkala/excel) ([Jussi Virkkala](https://twitter.com/jussivirkkala))

[Koronatartunnat Suomessa](https://eevis.codes/covid-19/) ([source](https://github.com/eevajonnapanula/covid-19)) ([Eevis Panula](https://github.com/eevajonnapanula))

[Finland Corona Info](https://jingzhe.github.io/contribute/) ([source](https://github.com/jingzhe/contribute)) ([Jingzhe Yu](https://github.com/jingzhe))

[Covid-19 per 100,000 people](https://observablehq.com/@lounjukk/covid-19-per-capita-visualisation-test#FIN) ([lounjukk](https://github.com/lounjukk))

[COVID19 Bot a.k.a Corona-chan - Discord Botti](https://github.com/Tatatofly/COVID19-Bot) ([Tatatofly](https://github.com/Tatatofly))

[Covid-19 forecaster](https://www.datarion.fi/corona/) ([Datarion](https://www.datarion.fi/))

[CovidJSON Data](https://data.covidjson.org/) ([Ilkka Rinne](https://github.com/ilkkarinne))

[Finland Corona Stat updates](https://finlandcoronastats.com/) ([source](https://github.com/Boochoo/finland-conora-stats)) ([Ermias Hailemicheal](https://www.linkedin.com/in/ermi/))

[COVID-19 Stats Finland mobile app](https://github.com/secretwpn/covid_stats_finland) ([secretwpn](https://github.com/secretwpn))

[Short term forecasts of Covid-19 cases in Finland](https://corona-finland-hcd.herokuapp.com/)

[ECDC data](https://www.ecdc.europa.eu/en/publications-data/download-data-hospital-and-icu-admission-rates-and-current-occupancy-covid-19)

# Huomautus

Tämä data on peräisin julkisista lähteistä. HS pyrkii kasaamaan sen mahdollisimman paikkansa pitävänä. Emme takaa, että päivitämme dataa jatkuvasti ja saatamme lopettaa datan päivittämisen ennalta ilmoittamatta, esimerkiksi tartuntatilanteen tai julkisten lähteiden muuttuessa. Saatamme myös muuttaa datarakennetta tai osoitteita ennalta ilmoittamatta.

# Direct interface to HS data

## Non-updateing interfaces

The old style (HS gathered) latest observation data used by HS can be read from https://w3qa5ydb4l.execute-api.eu-west-1.amazonaws.com/prod/finnishCoronaData
(yes, a direct address to an AWS Lambda API gateway). `GET` request works. Here you can get the published amount of infected, dead and
recovered by health care district. Reason this is not updated is that THL is publishing their own data, it's reporter differently from the past times
and data collection from the health care districts doesn't work too well anymore since THL is publishing their data and the districts don't anymore (
which makes total sense).

## Updating interfaces

From the endpoint (https://w3qa5ydb4l.execute-api.eu-west-1.amazonaws.com/prod/finnishCoronaHospitalData) you can read
the amount of people in hospital care. This data has been scraped of THL reports. Example data [here](exampleObservationData.json).

For observations, we offer now (https://w3qa5ydb4l.execute-api.eu-west-1.amazonaws.com/prod/finnishCoronaData/v2). It's compatible with the old
observations endpoint, but uses the THL data as a source. See example data [here](exampleObservationDataV2.json).

**Update 28.12.2020**

In the v2 endpoint above we have now removed the `infectionSource` and `infectionSourceCountry` fields. This was done in order to get the
HTTP response to fit the AWS lambda limits. We strongly suggest to migrating to the separate hospital data endpoint above and the processed
THL data below.

Our processed THL data can be read from (https://w3qa5ydb4l.execute-api.eu-west-1.amazonaws.com/prod/processedThlData). Example data [here](exampleProcessedThlData.json).

Testing related data is offered for Finland level in a timeseries (https://w3qa5ydb4l.execute-api.eu-west-1.amazonaws.com/prod/thlTestData)
and the latest information on health carea area level (https://w3qa5ydb4l.execute-api.eu-west-1.amazonaws.com/prod/hcdTestData).

## Data format

The APIs return JSON.

The observation data which is structured as follows (the format may change, but good API development practices will be considered
and field names should remain the same and fields shouldn't be removed for example).
All times in UTC.

Bot the new and old observation API adhere to the following schema. The difference is that in the new API the deaths are
split the special health care areas (as per THL). Additionally, the new API doesn't have the information about source
countries or the infection chains. Those can be still read from the old API.

In the new API the id is formatted as `<health_care_district>_<date>_<nth_observastion_on_date>`. This is due to the 
fact that the THL data updates with a delay (since the data there is reported according to the testing date, whereas
the old way was to report when the tests were published and the tests take 2-4 days to update). Sequential number
doesn't make sense here and this schema should be stable accross THL data updates.

```
{
  confirmed: [
    {
      id: <numeric, sequential id in string format (such as "1"), or as above>,
      date: <date when this observation was made, ISO 8601 -format>,
      healthCareDistrict: <health care district. null if unknown>,
      infectionSource: <id of the infection source (from this array), "unknown" if unknown and "related to earlier" if we cannot pinpoint the exact source but know it's from known exposure>,
      infectionSourceCountry: <if known, infection source country in ISO 3166-1 alpha-3 format>
    },
    .
    .
    .
  ],
  deaths: [
    {
      id: <numeric, sequential id in string format (such as "1"), or as above>,
      date: <date when this observation was made, ISO 8601 -format>,
      healthCareDistrict: <health care district>,
      area: <the special health care district in the new API>
    },
    .
    .
    .
  ],
  recovered: [
    {
      id: <numeric, sequential id in string format (such as "1"). not related to other ids>,
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

The hospitalisation data looks like this ([example]((exampleHospitalData.json)))

```
{
  hospitalised: [
    {
      "date": "2020-03-25T13:00:00.000Z", // Timestamp (when the item was added)
      "area": "HYKS", // The health care area, Finland if whole Finland and "Other whan HYKS" since a data point like this exists
      "totalHospitalised": 63, // Total amount of hospitalised people in the area
      "inWard": 45, // In a regular hospital ward
      "inIcu": 18, // In intensive care
      "dead": 2 // Amount of deaths in the area
    },
    .
    .
    .
  ]
}
```

The areas are abbreviated like [this](https://www.kuntaliitto.fi/sosiaali-ja-terveysasiat/terveydenhuolto/erikoissairaanhoito).

This data is snapshots from THL published reports, which makes the format a little weird. We'll follow how the data format develops and will improve it once we
have time / figure out how / the way it's reprted stabilises.

Best idea about the processed THL data is in [the example data](exampleProcessedThlData.json). `value` field tells how many infections were found in tests on that date.

Test data examples are [here for Finnish timeseries test data](exampleFinlandTimeseriesTestData.json) and
[here for the latest health care district test data](latestHcdTestData.json).

# Lisenssi: MIT-lisenssi

Copyright 2020 Helsingin Sanomat

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
