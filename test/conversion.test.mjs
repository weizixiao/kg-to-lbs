import assert from "node:assert/strict"
import test from "node:test"

import {
  convertWeight,
  kgToLbs,
  lbsToKg,
  parseWeightValue,
  poundsToPoundsAndOunces,
  poundsToStones,
  toPoundsAndOunces,
  toStones,
} from "../dist/index.js"

test("converts kilograms to pounds", () => {
  assert.equal(kgToLbs(1), 2.2046226218487757)
  assert.equal(convertWeight(80, "kg-lbs").formattedOutput, "176.37")
})

test("converts pounds to kilograms", () => {
  assert.equal(lbsToKg(1), 0.45359237)
  assert.equal(convertWeight(176.37, "lbs-kg").formattedOutput, "80.00")
})

test("formats compound pounds and ounces", () => {
  const compound = poundsToPoundsAndOunces(176.36980974790205)
  assert.equal(compound.whole, 176)
  assert.equal(compound.remainder, 5.92)
  assert.equal(toPoundsAndOunces(176.36980974790205), "176 lb 5.92 oz")
})

test("formats stones and remaining pounds", () => {
  const compound = poundsToStones(176.36980974790205)
  assert.equal(compound.whole, 12)
  assert.equal(compound.remainder, 8.37)
  assert.equal(toStones(176.36980974790205), "12 st 8.37 lb")
})

test("parses user-entered weight values", () => {
  assert.equal(parseWeightValue("1,234.5"), 1234.5)
  assert.equal(parseWeightValue(""), null)
  assert.equal(parseWeightValue("-1"), null)
  assert.equal(parseWeightValue("abc"), null)
})
