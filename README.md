# koronavirus-avoindata

HS julkaisee Suomen koronavirus-tartunnat avoimena datana. K


# Suora rajapinta HS:n dataan (see in English below)

Viimeisimmän HS:n datan voi lukea osoitteesta https://w3qa5ydb4l.execute-api.eu-west-1.amazonaws.com/prod/finnishCoronaData
(kyllä, se on suora osoite AWS Lambdan API-gatewayhyn). `GET`-pyynnöllä pääsee.

## Datan formaatti

Rajapinta palauttaa JSONia, joka näyttää tältä (formaatti voi vaihtua, mutta pyritään seuraamaan hyviä API-suunnittelun periaatteita
eikä poisteta tai muuteta kenttien nimiä).

```
{
  confirmed: [
    {
      id: <numeerinen id, juokseva numerointi>,
      date: <havainnon aika ISO 8601 -formaatissa>,
      healthCareDistrict: <sairaanhoitopiiri>
    },
    .
    .
    .
  ],
  deaths: [
    <samanmuotoisia objekteja kuin yllä>
  ]
}
```

Sairaanhoitopiirien nimet kuten [täällä](https://www.kuntaliitto.fi/sosiaali-ja-terveysasiat/sairaanhoitopiirien-jasenkunnat), sillä erotuksella
että Helsingin ja Uudenmaan sairaanhoitopiiri on esitetty muodossa HUS.

# Dataa on käytetty täällä

(Tee pull request jos haluat omasi tänne.)

# Huomautus

Tämä data on peräisin julkisista lähteistä. HS pyrkii kasaamaan sen mahdollisimman paikkansa pitävänä. Emme takaa, että päivitämme dataa jatkuvasti ja saatamme lopettaa datan päivittämisen ennalta ilmoittamatta.


# Direct interface to HS data

The latest data used by HS can be read from https://w3qa5ydb4l.execute-api.eu-west-1.amazonaws.com/prod/finnishCoronaData
(yes, a direct adress to a AWS Lambda API gateway). `GET` request works.

## Data format

The API returns JSON, whixh is structured as follows (the format may change, but good API development practices will be considered
and field names should remain the same and fields shouldn't be removed for example).

```
{
  confirmed: [
    {
      id: <numeric, sequential id>,
      date: <date when this observation was made, ISO 8601 -format>,
      healthCareDistrict: <health care district>
    },
    .
    .
    .
  ],
  deaths: [
    <samanmuotoisia objekteja kuin yllä>
  ]
}
```

The health care distrticts follow naming conventions from here [täällä](https://www.kuntaliitto.fi/sosiaali-ja-terveysasiat/sairaanhoitopiirien-jasenkunnat), with the
difference that the health care district of Helsinki and Uusimaa is called HUS.

# Lisenssi: MIT-lisenssi

Copyright 2020 Helsingin Sanomat

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
