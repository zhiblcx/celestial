import { format, register } from 'timeago.js'
import getReadingTime from 'reading-time'
import { toString } from 'mdast-util-to-string'

const TimeAgoConfiguration: string[][] = [
    ['today', 'today'],
    ['%s seconds ago', 'in %s seconds'],
    ['1 minute ago', 'in 1 minute'],
    ['%s minutes ago', 'in %s minutes'],
    ['1 hour ago', 'in 1 hour'],
    ['%s hours ago', 'in %s hours'],
    ['1 day ago', 'in 1 day'],
    ['%s days ago', 'in %s days'],
    ['1 week ago', 'in 1 week'],
    ['%s weeks ago', 'in %s weeks'],
    ['1 month ago', 'in 1 month'],
    ['%s months ago', 'in %s months'],
    ['1 year ago', 'in 1 year'],
    ['%s years ago', 'in %s years'],
]

function formatDate(date: Date): string {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')

    return `${year}/${month}/${day}`
}

function formatDateFull(date: Date): string {
    const yyyy = date.getFullYear()
    const mm = String(date.getMonth() + 1).padStart(2, '0')
    const dd = String(date.getDate()).padStart(2, '0')

    const hh = String(date.getHours()).padStart(2, '0')
    const mi = String(date.getMinutes()).padStart(2, '0')
    const ss = String(date.getSeconds()).padStart(2, '0')

    return `${yyyy}-${mm}-${dd} ${hh}:${mi}:${ss}`
}

function timeago(date?: Date): string {
    if (!date) {
        return 'today'
    }

    const localeFunc = (number: number, index: number, _?: number): [string, string] => {
        return TimeAgoConfiguration[index] as [string, string]
    }

    register('timeago', localeFunc)

    return format(date, 'timeago')
}

function remarkReadingTime() {
    // eslint-disable-next-line ts/ban-ts-comment
    // @ts-expect-error
    return function (tree, { data }) {
        const textOnPage = toString(tree)
        const readingTime = getReadingTime(textOnPage)

        data.astro.frontmatter.minutesRead = readingTime.text
    }
}

export { formatDate, timeago, formatDateFull, remarkReadingTime }
