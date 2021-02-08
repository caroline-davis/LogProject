import { stringToArray, extractData, countUniqueIps, countTopThreeUrls, countTopThreeIps } from './Utils/Helpers'

import { testData, emptyTestData } from "./Tests"

const reformatTestString = stringToArray(testData)
const extractTestValues = extractData(reformatTestString)

const reformatEmptyTestString = stringToArray(emptyTestData)
const extractEmptyTestValues = extractData(reformatEmptyTestString)

describe('Formatting the data', () => {
  test('We should extract the neccessary test values', () => {
    expect(extractTestValues.ipAddresses.length).toBe(7)
  })
})

describe('IP address', () => {
  test('We should return successfully with 4 unique ips', () => {
    expect(countUniqueIps(extractTestValues)).toBe(5)
  })
  test('We should return successfully with the top 3 active IP addresses', () => {
    expect(countTopThreeIps(extractTestValues)).toEqual('177.71.128.21, 168.41.191.40, 168.41.191.41')
  })
  test('We should return unique ips with 0 if there is no data', () => {
    expect(countUniqueIps(extractEmptyTestValues)).toEqual(0)
  })
  test('We should return an empty string for the top 3 ips if there is no data', () => {
    expect(countTopThreeIps(extractEmptyTestValues)).toEqual('')
  })
})

describe('Visited URLs', () => {
  test('We should return successfully with the top 3 most visited URLs', () => {
    expect(countTopThreeUrls(extractTestValues)).toEqual('/user/home/, /portal, /blog/2018/')
  })
  test('We should return an empty string for top 3 most visited URLs if there is no data', () => {
    expect(countTopThreeUrls(extractEmptyTestValues)).toEqual('')
  })
})