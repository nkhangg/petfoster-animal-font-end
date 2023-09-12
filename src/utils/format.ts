import moment from 'moment';

const floor = Math.floor,
    abs = Math.abs,
    log = Math.log,
    round = Math.round,
    min = Math.min;
const abbrev = ['K', 'Mil', 'Bil']; // abbreviations in steps of 1000x; extensible if need to edit

export const toCurrency = (price: number): string => {
    return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
    })
        .format(price)
        .replace('₫', 'VND');
};

export const stringToUrl = (string: string) => {
    return string.toLowerCase().replaceAll(' ', '-');
};

export const toFromNow = (time: string) => {
    return moment(time, 'DDMMYYYY h:mm:ss a').fromNow();
};

export const toFullname = (firstName: string | null, lastName: string | null, email: string) => {
    if (!firstName || !lastName) return email;

    return `${firstName} ${lastName}`;
};

function rnd(n: number, precision: number) {
    const prec = 10 ** precision;
    return round(n * prec) / prec;
}

export function toAbbrevNumber(n: number) {
    let base = floor(log(abs(n)) / log(1000));
    const suffix = abbrev[min(abbrev.length - 1, base - 1)];
    base = abbrev.indexOf(suffix) + 1;
    return suffix ? rnd(n / 1000 ** base, 2) + suffix : '' + n;
}
