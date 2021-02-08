import { url } from './Constants'

// takes the string and splits it into an array by log entry
export function stringToArray(value) {
    const splitString = value.split(/\n/g)
    const formattedString = splitString.map((stringSection) => {
        return `${stringSection}`
    })
    return formattedString
}

// takes the array and extracts only the necessary data from the log
export function extractData(values) {

    let ipAddresses = []
    let datesVisited = []
    let urlAddresses = []

    for (const value of values) {
        if (value) {
            ipAddresses.push(value.split(/[ ]/)[0])
            datesVisited.push(value.split(/\[(.*?)\]/)[1])
            urlAddresses.push(value.split(/(.*?)"/)[3].split(' ')[1].replace(url, ""))
        }
    }
    return { ipAddresses, datesVisited, urlAddresses }
}

// counts and returns only the unique ips
export function countUniqueIps(data) {
    {
        const ips = new Set(data.ipAddresses)
        return ips.size
    }
}

// takes the urls then adds them to an object and counts/sorts them by most visited
export function countTopThreeUrls(data) {

    const urlCount = data.urlAddresses.reduce((prev, curr) => {
        const url = curr.includes('redirect') || curr.includes('moved') ? 'redirect' : curr
        if (prev[url]) {
            prev[url].count += 1
        } else {
            prev[url] = { url, count: 1 }
        }
        return prev
    }, {})

    const urlsSorted = Object.values(urlCount).sort(function (a, b) {
        return b.count - a.count
    }).slice(0, 3).map((item) => item.url).join(', ')

    return urlsSorted
}

// takes the urls and ips then adds them to an object and counts/sorts ips by most visited
export function countTopThreeIps(data) {

    const ips = data.ipAddresses
    const urls = data.urlAddresses

    const ipsAndUrls = ips.map((ip, index) => {
        return { ip: ip, url: urls[index] }
    })
    
    // remove the possible extra files that got loaded when person went to website
    const filteredIpsAndUrls = ipsAndUrls.filter((ip) => {
        return !ip.url.includes(".js") || ip.url.includes(".css")
    })

    const ipCount = filteredIpsAndUrls.reduce((prev, curr) => {
        if (prev[curr.ip]) {
            prev[curr.ip].count += 1
        } else {
            prev[curr.ip] = { ip: curr.ip, count: 1 }
        }
        return prev
    }, {})

    const sortedIps = Object.values(ipCount).sort(function (a, b) {
        return b.count - a.count
    }).slice(0, 3).map((item) => item.ip).join(', ')

    return sortedIps
}
