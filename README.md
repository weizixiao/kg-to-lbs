# kg-to-lbs

Small TypeScript utilities for kilogram, pound, ounce, and stone conversions.

Website: [kg to lbs converter](https://kgtolbs.org)

## Install

```sh
npm install kg-to-lbs
```

## Usage

```ts
import {
  convertWeight,
  kgToLbs,
  lbsToKg,
  toPoundsAndOunces,
  toStones,
} from "kg-to-lbs"

kgToLbs(80)
// 176.36980974790205

lbsToKg(176.37)
// 80.0008956969

convertWeight(80, "kg-lbs")
// {
//   input: 80,
//   output: 176.36980974790205,
//   direction: "kg-lbs",
//   inputUnit: "kg",
//   outputUnit: "lb",
//   formattedInput: "80",
//   formattedOutput: "176.37"
// }

toPoundsAndOunces(kgToLbs(80))
// "176 lb 5.92 oz"

toStones(kgToLbs(80))
// "12 st 8.37 lb"
```

## API

- `KG_TO_LBS`, `LB_TO_KG`, `OUNCES_PER_POUND`, `POUNDS_PER_STONE`
- `kgToLbs(kilograms)`
- `lbsToKg(pounds)`
- `convertWeight(value, direction, options?)`
- `round(value, digits?, locale?)`
- `trimNumber(value, locale?)`
- `poundsToPoundsAndOunces(pounds, locale?)`
- `poundsToStones(pounds, locale?)`
- `toPoundsAndOunces(pounds, locale?)`
- `toStones(pounds, locale?)`
- `parseWeightValue(raw)`
- `popularKgValues`

## Publish

```sh
cd npm
npm test
npm pack --dry-run
npm publish --access public --registry https://registry.npmjs.org/
```

The package is ESM and includes generated TypeScript declarations.
