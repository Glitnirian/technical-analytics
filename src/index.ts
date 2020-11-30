// NOTE: later you can organize the functions and tools on different categories and so folders !!!!! [to do]


export function s_avg(...series: number[][]) {
    const serieLength = series[0].length; // 2 elements at least are required (no safe function  [but safe if used the right way (no validation for better performance)])
    const s_result: number[] = new Array(serieLength);


    let avg: number;
    for (let si = 0; si < serieLength; si++) { // si = serie index
        avg = 0;
        series.forEach(serie => {
            avg += serie[si];
        });

        s_result[si] = avg / series.length;
    }

    return s_result;
}

export function avg(...args: (number[] | number)[]) {
    // treat case when an element is just a number and not a serie 
    if (args.length === 1) {
        const serie: number[] = args[0] as number[];

        let sum: number = 0;
        for (let val of serie) {
            sum += val;
        }

        return sum / serie.length;
    } else {

    }
}

export function highest(serie: number[], len: number, backInd: number): number {
    const elIndex: number = serie.length - backInd - 1;
    let highest: number = serie[elIndex];
    let val: number;
    for (let i = 0; i < len; i++) {
        val = serie[elIndex - len + 1 + i];
        if (val > highest) {
            highest = val;
        }
    }

    return highest;
}

export function s_highest(serie: number[], len: number) {
    const resultSerie: number[] = [];

    for (let i = serie.length - len; i >= 0; i--) {
        resultSerie.push(
            highest(serie, len, i)
        )
    }

    return resultSerie;
}

export function lowest(serie: number[], len: number, backInd: number): number {
    const elIndex: number = serie.length - backInd - 1;
    let lowest: number = serie[elIndex];
    let val: number;
    for (let i = 0; i < len; i++) {
        val = serie[elIndex - len + 1 + i];
        if (val < lowest) {
            lowest = val;
        }
    }
    return lowest;
}

export function s_lowest(serie: number[], len: number): number[] {
    const resultSerie: number[] = [];

    for (let i = serie.length - len; i >= 0; i--) {
        resultSerie.push(
            lowest(serie, len, i)
        )
    }

    return resultSerie;
}


export function offset(serie: number[], offset: number): number[] {
    return serie.slice(0, serie.length - offset);
}



/**
 * sma one calculation version
 * 
 * serie.length - back must be greater then len
 *
 * @export
 * @param {number[]} serie
 * @param {number} len
 * @param {number} [back=0]
 * @returns {number}
 */
export function sma(serie: number[], len: number, back: number = 0): number {
    let sum: number = 0;
    let currentIndex: number = (serie.length - back - 1);

    for (let j = currentIndex - len + 1; j <= currentIndex; j++) {
        sum += serie[j];
    }

    return sum / len;
}

export function s_sma(serie: number[], len: number): number[] {
    let resultSerie: number[] = [];

    for (let back = serie.length - len; back >= 0; back--) {
        resultSerie.push(sma(serie, len, back));
    }
    return resultSerie;
}




/**
 * Standard deviation
 *
 * @export
 * @param {number[]} serie
 * @param {number} len
 * @returns {number[]}
 */
export function s_stdev(serie: number[], len: number): number[] {
    let resultSerie: number[] = [];
    let stdev: number;
    let sum: number;
    let mean: number;

    for (let i = len - 1; i < serie.length; i++) {
        stdev = 0;
        sum = 0;
        for (let j = i - len + 1; j <= i; j++) {
            sum += serie[j];
        }

        mean = sum / len;

        for (let j = i - len + 1; j <= i; j++) {
            stdev += Math.pow(serie[j] - mean, 2);
        }

        stdev = Math.sqrt(stdev / len);

        resultSerie.push(stdev);
    }

    return resultSerie;
}


// moving averages

export function ema(prevEma: number | undefined, serieVal: number, len: number): number {
    const alpha: number = 2 / (len + 1);

    return alpha * serieVal + (1 - alpha) * (prevEma ? prevEma : 0);
}

export class Ema { // implement it if needed !!!!!! [NOTE!!]
    private _serie: number[];
    private _len: number;
    private _ema: number[];

    constructor(
        serie: number[],
        len: number
    ) {
        this._serie = serie;
        this._len = len;
        this._ema = [];
    }
    get ema() {
        return this._ema;
    }

    calculate(back: number = 0): Ema {

        return this;
    }

    get(back?: number): number | number[] {
        if (back) {
            return this.calculate(back).ema[0];
        } else {
            return this.calculate().ema;
        }
    }
}

export function s_ema(serie: number[], len: number): number[] {
    const alpha: number = 2 / (len + 1);

    let val: number = alpha * serie[0];
    let resultSerie: number[] = [val];

    for (let i = 1; i < serie.length; i++) {
        val = alpha * serie[i] + (1 - alpha) * resultSerie[resultSerie.length - 1];
        resultSerie.push(val);
    }
    return resultSerie;
}


/**
 *Moving average used in RSI. It is the exponentially weighted moving average with alpha = 1 / length
 *
 * @export
 * @param {(number | undefined)} prevRma
 * @param {number} serieVal
 * @param {number} len
 * @returns {number}
 */
export function rma(prevRma: number | undefined, serieVal: number, len: number): number {
    const alpha: number = len;

    if (prevRma) {
        return (serieVal + (alpha - 1) * prevRma) / alpha;
    } else {
        return serieVal / alpha;
    }
    // return ema(prevRma, serieVal, 1 / len);
}

/**
 * Moving average used in RSI. It is the exponentially weighted moving average with alpha = 1 / length  
 * 
 * return a serie
 *
 * @export
 * @param {number[]} serie
 * @param {number} len
 * @returns {number[]}
 */
export function s_rma(serie: number[], len: number): number[] {
    const alpha: number = len;

    let val: number = serie[0] / alpha;
    let resultSerie: number[] = [val];

    for (let i = 1; i < serie.length; i++) {
        val = (serie[i] + (alpha - 1) * resultSerie[resultSerie.length - 1]) / alpha;
        resultSerie.push(val);
    }
    return resultSerie;
}



export function tr(high: number, low: number, previousClose: number): number {
    return Math.max(high - low, Math.abs(high - previousClose), Math.abs(low - previousClose));
}

/**
 * can be of different sizes! if so only the common sizes from the end are sommed
 * @param series 
 */
export function s_tr(high: number[], low: number[], close: number[]): number[] {
    const resultSerie = [];
    for (let i = 1; i < high.length; i++) {
        resultSerie.push(
            Math.max(high[i] - low[i], Math.abs(high[i] - close[i - 1]), Math.abs(low[i] - close[i - 1]))
        );
    }
    return resultSerie;
}


export function s_minLength(...series: number[][]): number {
    let minLength: number = series[0].length;

    for (let i = 1; i < series.length; i++) {
        if (series[i].length < minLength) {
            minLength = series[i].length;
        }
    }

    return minLength;
}


/**
 * can be of different sizes! if so only the common sizes from the end are sommed
 * @param series 
 */
export function s_add(...series: number[][]): number[] {
    const minLength = s_minLength(...series);
    const resultSerie: number[] = [];

    let sum: number;
    for (let i = 0; i < minLength; i++) {
        sum = series[0][i + series[0].length - minLength];
        for (let j = 1; j < series.length; j++) {
            const serie = series[j];
            sum += serie[i + serie.length - minLength]
        }

        resultSerie.push(
            sum
        );
    }

    return resultSerie;
}

/**
 * can be of different sizes! if so only the common sizes from the end are sommed
 * @param series 
 */
export function s_multiply(...series: number[][]): number[] {
    const minLength: number = s_minLength(...series);
    const resultSerie: number[] = [];

    let multi: number;
    for (let i = 0; i < minLength; i++) {
        multi = series[0][i + series[0].length - minLength];
        for (let j = 1; j < series.length; j++) {
            const serie = series[j];
            multi *= serie[i + serie.length - minLength]
        }

        resultSerie.push(
            multi
        );
    }

    return resultSerie;
}

/**
 * can be of different sizes! if so only the common sizes from the end are sommed
 * @param series 
 */
export function s_substr(...series: number[][]): number[] {
    const minLength: number = s_minLength(...series);
    const resultSerie: number[] = [];

    let substr: number;
    for (let i = 0; i < minLength; i++) {
        substr = series[0][i + series[0].length - minLength];
        for (let j = 1; j < series.length; j++) {
            const serie = series[j];
            substr -= serie[i + serie.length - minLength]
        }

        resultSerie.push(
            substr
        );
    }

    return resultSerie;
}



/**
 * can be of different sizes! if so only the common sizes from the end are sommed
 * @param series 
 */
export function s_divide(...series: number[][]): number[] {
    const minLength: number = s_minLength(...series);
    const resultSerie: number[] = [];

    let devision: number;
    for (let i = 0; i < minLength; i++) {
        devision = series[0][i + series[0].length - minLength];
        for (let j = 1; j < series.length; j++) {
            const serie = series[j];
            devision /= serie[i + serie.length - minLength]
        }

        resultSerie.push(
            devision
        );
    }

    return resultSerie;
}


/**
 * can be of different sizes! if so only the common sizes from the end are sommed
 * @param series 
 */
export function s_operate(series: number[][], operation: (values: Float32Array, access: (serieIndex: number, back: number) => number, minLength: number, count: number) => any): any[] {
    const minLength: number = s_minLength(...series);
    const resultSerie: number[] = [];

    const buffer: Float32Array = new Float32Array(series.length);

    for (let i = 0; i < minLength; i++) {
        buffer[0] = series[0][i + series[0].length - minLength];
        for (let j = 1; j < series.length; j++) {
            const serie = series[j];
            buffer[j] = serie[i + serie.length - minLength];
        }

        resultSerie.push(
            operation(
                buffer,
                (serieIndex: number, back: number) => {
                    const serie = series[serieIndex];
                    return <number>serie[i + serie.length - minLength - back];
                },
                minLength,
                i
            )
        );
    }

    return resultSerie;
}


export function s_op(series: number[][], backRequireLen: number, operation: (stepValues: number[], back: number, minLength: number, prevVal: number, passedData: any, passData: (data: any) => void, access: (serieIndex: number, back: number) => number) => any): any[] {
    const minLength: number = s_minLength(...series);

    const resultSerie: number[] = [];

    let passedData: any;
    let prevVal: number = NaN;

    for (let back = minLength - backRequireLen - 1; back >= 0; back--) {
        prevVal = operation(
            series.map(serie => serie[serie.length - back - 1]),
            back,
            minLength,
            prevVal,
            passedData,
            (data: any) => {
                passedData = data;
            },
            (serieIndex, _back) => {
                const serie = series[serieIndex];
                return serie[serie.length - 1 - back - _back]; // _back is to choose backward relatively to the current back position
            }
        );

        resultSerie.push(
            prevVal
        );
    }

    return resultSerie;
}

/**
 * check for two series crossing (crossing mean one getting bellow or above another after not being)
 * 1 if two series has crossed each other, otherwise 0.
 * 
 * @export
 * @param {number[]} serie1
 * @param {number[]} serie2
 * @returns {number[]}
 */
export function s_cross(serie1: number[], serie2: number[]): number[] {
    const minLength = Math.min(serie1.length, serie2.length);
    const resultSerie: number[] = [];

    let i1: number = serie1.length - minLength;
    let i2: number = serie2.length - minLength;
    let savedDiff: number = serie1[i1] - serie2[i2];
    let currentDiff: number;

    for (let i = 1; i < minLength; i++) {
        i1 = serie1.length - minLength + i;
        i2 = serie2.length - minLength + i;

        currentDiff = serie1[i1] - serie2[i2];

        if (savedDiff === 0) {
            if (currentDiff !== 0) {
                savedDiff = currentDiff;
            }

            /**
             * if the same it doesn't matter how much it continue until they get separated
             */
        } else {
            if (
                currentDiff !== 0 && // if current diff === 0 (we skip it to next)
                ((savedDiff > 0 && currentDiff < 0) || (savedDiff < 0 && currentDiff > 0)) // changed sign
            ) {
                resultSerie.push(1);
                savedDiff = currentDiff;
                continue;
            }
        }
        resultSerie.push(0);
    }

    return resultSerie;
}


/**
 *Difference current and previous value 
 *
 * @export
 * @param {number[]} serie
 * @returns {number[]}
 */
export function s_change(serie: number[]): number[] {
    const resultSerie: number[] = [];

    for (let i = 1; i < serie.length; i++) {
        resultSerie.push(
            serie[i] - serie[i - 1]
        );
    }

    return resultSerie;
}

/**
 *  The function allow us to calculate the max 
 *
 * @export
 * @param {number[][]} series
 * 
 * @param {number[]} [numbers=[]]
 * @returns {number[]}
 */
export function s_max(series: number[][], numbers: number[] = []): number[] {
    const minLength = s_minLength(...series);
    const resultSerie: number[] = [];

    for (let i = 0; i < minLength; i++) {
        resultSerie.push(
            Math.max(...s_multiGet(series, minLength - i - 1), ...numbers)
        )
    }

    return resultSerie;
}

export function s_min(series: number[][], numbers: number[] = []): number[] {
    const minLength = s_minLength(...series);
    const resultSerie: number[] = [];

    for (let i = 0; i < minLength; i++) {
        resultSerie.push(
            Math.min(...s_multiGet(series, minLength - i + 1), ...numbers)
        )
    }

    return resultSerie;
}

export function s_multiGet(series: number[][], back: number = 0): number[] {
    const levelValues: number[] = [];
    for (let i = 0; i < series.length; i++) {
        const serie = series[i];
        levelValues.push(
            serie[serie.length - back - 1]
        );
    }

    return levelValues;
}

export function stoch(s_close: number[], s_high: number[], s_low: number[], len: number, back: number = 0) {
    const close = s_close[s_close.length - back - 1];

    return 100 * (close - lowest(s_low, len, back)) / (highest(s_high, len, back) - lowest(s_low, len, back));
}

export function s_stoch(s_close: number[], s_high: number[], s_low: number[], len: number): number[] {
    const resultSerie: number[] = [];

    const minLength = s_minLength(s_close, s_high, s_low);

    for (let i = minLength - len; i >= 0; i--) {
        resultSerie.push(
            stoch(s_close, s_high, s_low, len, i)
        );
    }

    return resultSerie;
}


export function s_rsi(x: number[], y: number[] | number): number[] {
    const resultSerie: number[] = [];
    let urma: number | undefined = undefined;
    let drma: number | undefined = undefined;
    let u: number;
    let d: number;
    let xi: number;
    let yi: number;
    let rs: number;

    if (Array.isArray(y)) {
        const minLength = s_minLength(x, y);

        for (let i = x.length > minLength ? 0 : 1; i < minLength; i++) {
            xi = x.length - minLength + i;
            yi = y.length - minLength + i;
            u = Math.max(x[xi] - x[xi - 1], 0); // upward change
            d = Math.max(x[xi - 1] - x[xi], 0); // downard change
            urma = rma(urma, u, y[yi]);
            drma = rma(drma, d, y[yi]);
            rs = urma / drma;
            resultSerie.push(100 - (100 / (1 + rs)));
        }
    } else {
        // init urma (with y period)
        urma = 0;
        drma = 0;

        for (let i = 1; i <= y; i++) {
            u = Math.max(x[i] - x[i - 1], 0); // upward change
            d = Math.max(x[i - 1] - x[i], 0); // downard change

            urma += u;
            drma += d;
        }
        urma /= y;
        drma /= y;
        rs = urma / drma;

        resultSerie.push(100 - (100 / (1 + rs)));

        // rest of the serie
        for (let i = y + 1; i < x.length; i++) {
            u = Math.max(x[i] - x[i - 1], 0); // upward change
            d = Math.max(x[i - 1] - x[i], 0); // downard change
            urma = rma(urma, u, y);
            drma = rma(drma, d, y);
            rs = urma / drma;
            resultSerie.push(100 - (100 / (1 + rs)));
        }
    }
    return resultSerie;
}

export class Cum {
    private _serie: number[];
    private _cum: number[];

    constructor(
        serie: number[]
    ) {
        this._serie = serie;
        this._cum = [];
    }

    get cum() {
        return this._cum;
    }

    calculate() {
        const cl = this._cum.length;
        for (let i = cl; i < this._serie.length; i++) {
            this._cum.push(this._cum[this._cum.length - 1] + this._serie[i]);
        }
        return this;
    }

    get(back?: number): number[] | number {
        if (back) {
            const sl = this._serie.length;
            const cl = this._cum.length;
            const notCalculatedNum = sl - cl;
            const toCalculateCount = notCalculatedNum - back;

            if (toCalculateCount > 0) {
                for (let i = cl; i < cl + toCalculateCount; i++) {
                    this._cum.push(this._cum[this._cum.length - 1] + this._serie[i]);
                }
            }
            return this._cum[sl - back - 1];
        } else {
            return this.calculate().cum;
        }
    }
}

export function s_cum(serie: number[]): number[] {
    const resultSerie: number[] = [];

    let sum: number = 0;
    for (let i = 0; i < serie.length; i++) {
        sum += serie[i];
        resultSerie.push(sum);
    }

    return resultSerie;
}


export function wma(serie: number[], len: number, back: number): number {
    let norm: number = 0.0;
    let sum: number = 0.0;
    let weight: number;
    const elIndex: number = serie.length - back - 1;

    for (let i = 0; i < len; i++) {
        weight = (len - i) * len;
        norm += weight;
        sum += serie[elIndex - i] * weight;
    }

    return sum / norm;
}

export function s_wma(serie: number[], len: number): number[] {
    const resultSerie: number[] = [];

    for (let i = serie.length - len; i >= 0; i--) {
        resultSerie.push(
            wma(serie, len, i)
        );
    }

    return resultSerie;
}


/**
 *  The function return the sum of _len back value, counting the current
 * 
 *  sum(serie, 1) will return the same serie
 *  sum(serie, 2) will return the serie of the sum of the current value and the past value
 *  and so on
 * 
 * NOTE : this function is exactly the same as with sum in tradingview.com (pine script)
 * 
 *  the function can be used to calculate the hole serie, or up to a certain index, (once it calculate some value, it cache them, next time, either it return the value directly if you ask for just some index value, or it continue the calculation up to the index you asked or till the end of the serie, if you ask for the hole serie)
 * 
 * @export
 * @class Sum
 */
export class Sum {
    private _serie: number[];
    private _len: number;
    private _sum: number[];

    constructor(
        serie: number[],
        len: number
    ) {
        this._serie = serie;
        this._len = len;
        this._sum = [];
    }

    get sum() {
        return this._sum;
    }

    calculate(back: number = 0) {
        const sl = this._serie.length;
        const sml = this._sum.length;
        const notCalculatedCount = sl - this._len - sml + 1;
        const toCalculateCount = notCalculatedCount - back;

        if (sml === 0) {
            let sum = 0;
            for (let i = 0; i < this._len; i++) {
                sum += this._serie[this._len - 1 - i];
            }
            this._sum.push(sum);
        }

        /**
 * init sum already calculated
 */

        /**
         *  HANDLE CASE WHERE _len = 1 separatly !!!!!!!
         */


        /**
         * Have a get that get only what you want and doesn't calculate the prec
         */
        for (let i = sml === 0 ? 1 : 0; i < toCalculateCount; i++) {
            const currIndex = this._len - 1 + sml + i;
            const lastSum = this._sum[this._sum.length - 1];
            this._sum.push(
                lastSum + this._serie[currIndex] - this._serie[currIndex - this._len] // here the optimisation trick [the next element sum = lastSum + new el - first last computation el] (because we are shifting)
            );
        }

        return this;
    }

    get(back?: number): number[] | number {
        if (back) {
            const sumMaxLength: number = this._serie.length - this._len + 1;
            this.calculate(back);
            return this._sum[sumMaxLength - back - 1];
        } else {
            this.calculate();
            return this._sum;
        }
    }
}


export function dev(serie: number[], len: number, back: number): number {
    return serie[serie.length - 1 - back] - sma(serie, len, back);
}

export function s_dev(serie: number[], len: number): number[] {
    const resultSerie: number[] = [];

    for (let i = 0; i < serie.length - len + 1; i++) {
        resultSerie.push(
            dev(serie, len, i)
        );
    }

    return resultSerie;
}


export function fixnan(serie: number[], back: number): number {
    const si = serie.length - back - 1;

    if (serie[si] === NaN) {
        let found: number = NaN;
        let i = si - 1;
        while (found === NaN && i >= 0) {
            if (serie[i] !== NaN) {
                return serie[i];
            }
        }
        // if it reach here then there isn't any no nan, we will return NaN (case all first element are NaN)
        return NaN;
    } else {
        return serie[si];
    }
}

/**
 *  Replace the NaN by the previous no NaN value, in the hole serie 
 *
 * @export
 * @param {number[]} serie
 * @returns {number[]}
 */
export function s_fixnan(serie: number[]): number[] {
    let i = 0;
    if (isNaN(serie[0])) {
        i = 1;
        while (isNaN(serie[i]) && i < serie.length) {
            i++;
        }

        if (i === serie.length) {
            return [];
        }
    }

    const resultSerie: number[] = [serie[i]];
    // found
    for (i++; i < serie.length; i++) {
        if (isNaN(serie[i])) {
            resultSerie.push(
                resultSerie[resultSerie.length - 1]
            );
        } else {
            resultSerie.push(serie[i]);
        }
    }

    return resultSerie;
}

export function s_cleanFirstNaNs(serie: number[]): number[] {
    let i = 0;

    while (serie[i] === NaN && i < serie.length) {
        i++;
    }

    if (i !== serie.length) {
        return serie.slice(i);
    } else {
        return [];
    }
}


/**
 *  true if current x is greater than any previous x for y bars back, false otherwise.
 *
 * @export
 * @param {number[]} serie
 * @param {number} len
 * @param {number} back
 * @returns {number}
 */
export function rising(serie: number[], len: number, back: number): boolean {
    const currElIndex = serie.length - back - 1;
    const currentEl = serie[currElIndex];
    for (let i = 0; i < len; i++) {
        if (serie[currElIndex - i - 1] >= currentEl) {
            return false;
        }
    }

    return true;
}

export function s_rising(serie: number[], len: number): boolean[] {
    const resultSerie: boolean[] = [];

    for (let i = 0; i < serie.length - len; i++) {
        resultSerie.push(
            rising(serie, len, i)
        );
    }

    return resultSerie;
}

/**
 *  true if current x is less than any previous x for y bars back, false otherwise.
 *
 * @export
 * @param {number[]} serie
 * @param {number} len
 * @param {number} back
 * @returns {number}
 */
export function falling(serie: number[], len: number, back: number): boolean {
    const currElIndex = serie.length - back - 1;
    const currentEl = serie[currElIndex];
    for (let i = 0; i < len; i++) {
        if (serie[currElIndex - i - 1] <= currentEl) {
            return false;
        }
    }

    return true;
}

export function s_falling(serie: number[], len: number): boolean[] {
    const resultSerie: boolean[] = [];

    for (let i = 0; i < serie.length - len; i++) {
        resultSerie.push(
            falling(serie, len, i)
        );
    }

    return resultSerie;
}



// export function psar(prevSar: number[], start: number, step: number, max: number, back: pos) {

// }

/**
 *     if (accel_step <= 0) return TI_INVALID_OPTION;
    if (accel_max <= accel_step) return TI_INVALID_OPTION;
    if (size < 2) return TI_OKAY;
 *
 * @export
 * @param {number[]} serie
 * @param {number} start
 * @param {number} step
 * @param {number} max
 */
export function s_psar(s_high: number[], s_low: number[], start: number, step: number, max: number): number[] {
    const result: number[] = [];
    let accel: number = start;

    /* Try to choose if we start as short or long.
     * There is really no right answer here. */
    let long: boolean = s_high[0] + s_low[0] <= s_high[1] + s_low[1];


    let sar: number, extreme: number;

    if (long) {
        extreme = s_high[0];
        sar = s_low[0];
    } else {
        /** SHORTING */
        extreme = s_low[0];
        sar = s_high[0];
    }

    accel += step;

    for (let i = 1; i < s_high.length; ++i) {

        sar = (extreme - sar) * accel + sar;

        if (long) {

            if (i >= 2 && (sar > s_low[i - 2])) sar = s_low[i - 2];

            if ((sar > s_low[i - 1])) sar = s_low[i - 1];

            if (accel < max && s_high[i] > extreme) {
                accel += step;
                if (accel > max) accel = max;
            }

            if (s_high[i] > extreme) extreme = s_high[i];

        } else {

            if (i >= 2 && (sar < s_high[i - 2])) sar = s_high[i - 2];

            if ((sar < s_high[i - 1])) sar = s_high[i - 1];

            if (accel < max && s_low[i] < extreme) {
                accel += step;
                if (accel > max) accel = max;
            }

            if (s_low[i] < extreme) extreme = s_low[i];
        }



        if ((long && s_low[i] < sar) || (!long && s_high[i] > sar)) {
            accel = step;
            sar = extreme;

            long = !long;

            if (!long) extreme = s_low[i];
            else extreme = s_high[i];
        }

        result.push(sar);
    }

    return result;
}
