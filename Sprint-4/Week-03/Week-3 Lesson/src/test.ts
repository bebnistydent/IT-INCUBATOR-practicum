// any vs unknown

// function f1(a: unknown) {
//   if (typeof a === "number") {
//     console.log(a * 10)
//   }
//
//   if (typeof a === "string") {
//     console.log(a.length)
//   }
// }
//
// f1("valera")

// export function f1(arg: number): number {
//   return arg
// }
//
// export function f2(arg: string): string {
//   return arg
// }
//
// export function f3(arg: boolean[]): boolean[] {
//   return arg
// }
//
// // ❌
// export function f4(arg: number | string | boolean[]): number | string | boolean[] {
//   return arg
// }
//
// // ✅
// export function f5<T>(arg: T): T {
//   return arg
// }
//
// const a: number = 100
// const b = { age: 100 }
// f5(b)

// const getFirstElement1 = (array: number[]): number => {
//   return array[0]
// }
//
// const getFirstElement2 = (array: string[]): string => {
//   return array[0]
// }

// const getFirstElement3 = <P>(array: P[]): P => {
//   return array[0]
// }
//
// // Пример 1: Массив чисел
// const numbers = [1, 2, 3, 4, 5]
// console.log(getFirstElement3(numbers)) // 1
//
// // // Пример 2: Массив строк
// const words = ["hello", "world", "typescript"]
// console.log(getFirstElement3(words)) // 'hello'

// const filterArray1 = (arr: number[], predicate: (arg: number) => boolean): number[] => {
//   return arr.filter(predicate)
// }
//
// const filterArray2 = (arr: string[], predicate: (arg: string) => boolean): string[] => {
//   return arr.filter(predicate)
// }
//
// const filterArray3 = <T>(arr: T[], predicate: (arg: T) => boolean): T[] => {
//   return arr.filter(predicate)
// }
//
// // Пример 1: Фильтрация чисел
// const numbers = [1, 2, 3, 4, 5]
// const isEven = (num: number) => num % 2 === 0
//
// console.log(filterArray3(numbers, isEven)) // [2, 4]
//
// // // Пример 2: Фильтрация строк
// const words = ["hello", "world", "typescript"]
// const startsWithT = (word: string) => word.startsWith("t")
//
// console.log(filterArray3(words, startsWithT)) // ["typescript"]

const mapArray1 = (arr: number[], transformer: (val: number) => string): string[] => {
  return arr.map(transformer)
}

const mapArray2 = (arr: string[], transformer: (val: string) => number): number[] => {
  return arr.map(transformer)
}

const mapArray = <T, D>(arr: T[], transformer: (val: T) => D): D[] => {
  return arr.map(transformer)
}

// Пример 1: Преобразование чисел в строки
const numbers = [1, 2, 3, 4]
const transformNumberToString = (num: number) => `Number: ${num}`

console.log(mapArray(numbers, transformNumberToString)) // ["Number: 1", "Number: 2", "Number: 3", "Number: 4"]

// Пример 2: Преобразование строк в их длины
const words = ["hello", "world", "typescript"]
const getLength = (word: string) => word.length

console.log(mapArray(words, getLength)) // [5, 5, 10]
//
// // Пример 3: Преобразование объектов в строки
// type Person = { name: string; age: number }
// const people: Person[] = [
//   { name: 'Agnes', age: 25 },
//   { name: 'Robert', age: 30 },
// ]
// const toDescription = (person: Person) => `${person.name} is ${person.age} years old`
//
// console.log(mapArray(people, toDescription)) // ["Agnes is 25 years old", "Robert is 30 years old"]
