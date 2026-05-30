export const KG_TO_LBS = 2.2046226218487757
export const LB_TO_KG = 0.45359237
export const OUNCES_PER_POUND = 16
export const POUNDS_PER_STONE = 14

export const popularKgValues = [
  1, 2, 3, 4, 5, 7, 7.5, 10, 12, 14, 15, 16, 20, 23, 25, 30, 32, 40, 45,
  48, 49, 50, 52, 53, 54, 55, 56, 57, 58, 59, 60, 62, 63, 64, 65, 66, 67,
  68, 69, 70, 72, 73, 74, 75, 76, 77, 78, 80, 82, 84, 85, 86, 87, 90, 95,
  100, 105, 110, 120, 130, 150, 160, 180, 200, 500,
] as const

export type WeightDirection = "kg-lbs" | "lbs-kg"

export type FormatNumberOptions = {
  digits?: number
  locale?: string
}

export type CompoundWeight = {
  whole: number
  remainder: number
  formatted: string
}

export type ConversionResult = {
  input: number
  output: number
  direction: WeightDirection
  inputUnit: "kg" | "lb"
  outputUnit: "lb" | "kg"
  formattedInput: string
  formattedOutput: string
}

export function kgToLbs(kilograms: number) {
  assertFiniteWeight(kilograms, "kilograms")
  return kilograms * KG_TO_LBS
}

export function lbsToKg(pounds: number) {
  assertFiniteWeight(pounds, "pounds")
  return pounds * LB_TO_KG
}

export function convertWeight(
  value: number,
  direction: WeightDirection,
  options: FormatNumberOptions = {},
): ConversionResult {
  const locale = options.locale ?? "en-US"
  const digits = options.digits ?? 2

  if (direction === "kg-lbs") {
    const output = kgToLbs(value)
    return {
      input: value,
      output,
      direction,
      inputUnit: "kg",
      outputUnit: "lb",
      formattedInput: trimNumber(value, locale),
      formattedOutput: round(output, digits, locale),
    }
  }

  const output = lbsToKg(value)
  return {
    input: value,
    output,
    direction,
    inputUnit: "lb",
    outputUnit: "kg",
    formattedInput: trimNumber(value, locale),
    formattedOutput: round(output, digits, locale),
  }
}

export function round(value: number, digits = 2, locale = "en-US") {
  assertFiniteNumber(value, "value")
  return Number(value).toLocaleString(locale, {
    maximumFractionDigits: digits,
    minimumFractionDigits: digits,
  })
}

export function trimNumber(value: number, locale = "en-US") {
  assertFiniteNumber(value, "value")
  return Number(value).toLocaleString(locale, {
    maximumFractionDigits: 10,
  })
}

export function poundsToPoundsAndOunces(pounds: number, locale = "en-US"): CompoundWeight {
  assertFiniteWeight(pounds, "pounds")

  let whole = Math.trunc(pounds)
  let remainder = Math.round((pounds - whole) * OUNCES_PER_POUND * 100) / 100
  if (remainder >= OUNCES_PER_POUND) {
    whole += 1
    remainder = 0
  }

  return {
    whole,
    remainder,
    formatted: `${whole.toLocaleString(locale)} lb ${round(remainder, 2, locale)} oz`,
  }
}

export function poundsToStones(pounds: number, locale = "en-US"): CompoundWeight {
  assertFiniteWeight(pounds, "pounds")

  let whole = Math.trunc(pounds / POUNDS_PER_STONE)
  let remainder = Math.round((pounds - whole * POUNDS_PER_STONE) * 100) / 100
  if (remainder >= POUNDS_PER_STONE) {
    whole += 1
    remainder = 0
  }

  return {
    whole,
    remainder,
    formatted: `${whole.toLocaleString(locale)} st ${round(remainder, 2, locale)} lb`,
  }
}

export function toPoundsAndOunces(pounds: number, locale = "en-US") {
  return poundsToPoundsAndOunces(pounds, locale).formatted
}

export function toStones(pounds: number, locale = "en-US") {
  return poundsToStones(pounds, locale).formatted
}

export function parseWeightValue(raw: string) {
  const normalized = raw.replace(/,/g, "").trim()
  if (!normalized) return null
  const value = Number(normalized)
  return Number.isFinite(value) && value >= 0 ? value : null
}

function assertFiniteWeight(value: number, name: string) {
  assertFiniteNumber(value, name)
  if (value < 0) {
    throw new RangeError(`${name} must be greater than or equal to 0`)
  }
}

function assertFiniteNumber(value: number, name: string) {
  if (!Number.isFinite(value)) {
    throw new TypeError(`${name} must be a finite number`)
  }
}
