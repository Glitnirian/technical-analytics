import { s_avg, avg, s_highest, s_lowest, offset, s_sma, sma, s_stdev, s_ema, s_rma, s_add, s_substr, s_multiply, s_divide, s_operate, s_minLength, s_cross, s_change, s_op, s_rsi, s_wma, wma, Sum, s_psar } from './index'

test('s_avg', () => {

});

test('avg', () => {

});

test('s_highest', () => {
    // test: period >=2
    let serie = [10, 20, 30, 40, 30, 20, 10, 20, 16, 29, 15];
    let period = 3;

    let expectResult = [30, 40, 40, 40, 30, 20, 20, 29, 29];

    expect(s_highest(serie, period)).toEqual(expectResult);

    // test: period = 1
    expect(s_highest(serie, 1)).toEqual(serie);
});

test('s_lowest', () => {
    // test: period >=2
    let serie = [10, 20, 30, 40, 30, 20, 10, 20, 16, 29, 15];
    let period = 3;

    let expectResult = [10, 20, 30, 20, 10, 10, 10, 16, 15];

    expect(s_lowest(serie, period)).toEqual(expectResult);

    // test: period = 1
    expect(s_lowest(serie, 1)).toEqual(serie);
});

test('offset', () => {
    let serie = [10, 20, 30, 40, 30, 20, 10, 20, 16, 29, 15];
    let _offset = 4;

    let expectResult = [10, 20, 30, 40, 30, 20, 10];

    expect(offset(serie, _offset)).toEqual(expectResult);
});


test('s_sma', () => {
    let serie = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
    let len = 8;

    let expectResult = [4.5, 5.5, 6.5, 7.5, 8.5, 9.5];

    expect(s_sma(serie, len)).toEqual(expectResult);
});

test('sma', () => {
    let serie = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
    let len = 8;

    let expectResult = [4.5, 5.5, 6.5, 7.5, 8.5, 9.5];

    for (let back = 0; back < serie.length - len; back++) {
        expect(sma(serie, len, back)).toBe(expectResult[expectResult.length - back - 1])

    }
});

test('s_stdev', () => {
    let serie = [11, 12, 13, 14, 15, 16, 18, 19, 22, 23, 23];
    let len = 5;

    let expectResult = [
        1.4142135623730951,
        1.4142135623730951,
        1.7204650534085253,
        1.854723699099141,
        2.449489742783178,
        2.576819745345025,
        2.0976176963403033
    ]

    expect(s_stdev(serie, len)).toEqual(expectResult);
});

test('s_ema', () => {
    let serie = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
    let len = 8;

    let expectResult = [
        0.222222222222222,
        0.617283950617284,
        1.14677640603567,
        1.7808260935833,
        2.49619807278701,
        3.27482072327878,
        4.10263834032794,
        4.96871870914396,
        5.86455899600085,
        6.78354588577844,
        7.72053568893879,
        8.6715277580635,
        9.63341047849384,
        10.6037637054952,
        11.5807051042741
    ];

    const result = s_ema(serie, len);

    result.forEach((val, i) => {
        expect(val).toBeCloseTo(expectResult[i]);
    });
});

test('s_rma', () => {
    let serie = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
    let len = 8;

    let expectResult = [
        0.125,
        0.359375,
        0.689453125,
        1.103271484375,
        1.59036254882813,
        2.14156723022461,
        2.74887132644653,
        3.40526241064072,
        4.10460460931063,
        4.8415290331468,
        5.61133790400345,
        6.40992066600302,
        7.23368058275264,
        8.07947050990856,
        8.94453669616999
    ];

    const result = s_rma(serie, len);

    result.forEach((val, i) => {
        expect(val).toBeCloseTo(expectResult[i]);
    });
});


test('s_add', () => {
    let serie1 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]; // 13 els
    let serie2 = [11, 12, 13, 14, 15, 16, 17, 18, 19, 20]; // 9 els

    let expectResult = [15, 17, 19, 21, 23, 25, 27, 29, 31, 33]; // 9 els

    expect(s_add(serie1, serie2)).toEqual(expectResult);
});

test('s_minLength', () => {
    let serie1 = [999999999, 999999999, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
    let serie2 = [11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
    let serie3 = [16, 17, 18, 19, 20, 16, 17, 18, 19, 20, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 16, 17, 18, 19, 20];

    expect(s_minLength(serie1, serie2, serie3)).toBe(serie2.length);
});

test('s_add|multiply|divide|substr|operate return size', () => {
    let serie1 = [999999999, 999999999, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
    let serie2 = [11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
    let serie3 = [16, 17, 18, 19, 20, 16, 17, 18, 19, 20, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 16, 17, 18, 19, 20];

    expect(s_add(serie1, serie2, serie3).length).toBe(serie2.length);
    expect(s_substr(serie1, serie2, serie3).length).toBe(serie2.length);
    expect(s_multiply(serie1, serie2, serie3).length).toBe(serie2.length);
    expect(s_divide(serie1, serie2, serie3).length).toBe(serie2.length);
    expect(s_operate([serie1, serie2, serie3], ([n1, n2, n3], access) => n1 - n2 * n3 % n1 - access(0, 1)).length).toBe(serie2.length);
});

test('s_cross', () => {
    let serie1 = [1, 2, 3, 4, 5, 6, 5, 5, 8, 9, 14, 13, 12, 9, 5];
    let serie2 = [3, 3, 3, 3, 4, 5, 5, 6, 9, 10, 10, 11, 12, 13, 15];
    let expectResult = [0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0];

    expect(s_cross(serie1, serie2)).toEqual(expectResult);
});

test('s_change', () => {
    let serie1 = [1, 2, 5, 4, 51, 6, 10, 8, 90, 10, 11, 22, 13, 14, 15];
    let expectResult = [1, 3, -1, 47, -45, 4, -2, 82, -80, 1, 11, -9, 1, 1];

    expect(s_change(serie1)).toEqual(expectResult);
});

test('s_psar', () => {
    let s_high = [45.3125, 46.3125, 46.9375, 47, 47.5312, 47.5938, 47.5, 47.1562, 46.5625, 46.1172, 44.9062, 44, 44.625, 46.1875, 46.5625, 46.9375, 46.7812, 47.625, 45.8125, 45.4375, 47, 47.0938, 47.25, 46.75, 46.375, 46.4375, 45.375, 44.9375, 44.5625, 45.2188, 45, 44.25, 43.875, 43.5312, 42.9062, 43.2812, 45.1875, 45.6875, 46.125, 46.6875, 46.0312, 46.4375, 46.9688, 47.625, 48.5625, 48.5938, 47.4375, 47.1562, 46.6562, 47.0625, 48.4688, 50.5625, 54.375, 57.5, 58.5625, 57.5, 58.3125, 59, 59.625, 59.625, 59.4062, 59.1875, 59.9688, 58.875, 59.3125, 58.5625, 58.1875, 56.9375, 56.125, 56.8438, 57.125, 54.4375, 54.3125, 56.9688, 58.0312, 55.75, 54.8438, 53.625, 52.8438, 51.9375, 51.75, 50.5938, 50.125, 49.0938, 51.625, 51.9688, 52.0938];
    let s_low = [44.1562, 45.125, 44.75, 46.0312, 46.3438, 46.0625, 47.0625, 46.1875, 45.1562, 44.8438, 43.6562, 42.5312, 42.625, 45.125, 45.25, 45.875, 45.5625, 46.1328, 44.8438, 44.6562, 45.625, 46.0625, 45.9688, 45.75, 45.1562, 45.25, 42.1875, 43.2188, 43.2188, 44.125, 43.5312, 43.4688, 42.9375, 42.5, 42.25, 42.1875, 44.2188, 44.1875, 44.75, 45.5, 44.75, 44.7812, 45.4375, 46.4375, 47.8672, 47.375, 46.4375, 45.8438, 45.7188, 46.125, 46.375, 47.6562, 49.25, 54.4688, 56.8125, 55.5938, 55.3125, 57.5625, 58.375, 58.0625, 58.5312, 58.4062, 58.5625, 58.125, 56, 56.125, 54.6875, 54.1875, 53.6562, 55.6875, 54.3438, 52.2188, 50.75, 52.875, 55.875, 53, 52.9375, 51.625, 50.4062, 49.7812, 49.5625, 48.625, 48.625, 47.4375, 48.8438, 50.25, 50.0625];
    let start = 0.02;
    let step = 0.02;
    let max = 0.2;

    let expectResult = [44.1562, 44.1562, 44.323078, 44.53723176, 44.83662858, 45.16748915, 45.45864646, 47.5938, 47.545048, 47.43699808, 47.2101502, 46.83583418, 46.49146345, 42.5312, 42.611826, 42.78485296, 42.95095884, 43.23140131, 43.49501723, 43.7428162, 43.97574723, 44.19470239, 44.40052025, 44.59398903, 44.77584969, 47.625, 47.51625, 47.409675, 47.3052315, 47.20287687, 47.10256933, 47.00426795, 46.90793259, 46.81352394, 46.72100346, 46.63033339, 46.54147672, 46.45439719, 42.1875, 42.2775, 42.3657, 42.452136, 42.63280256, 42.93233441, 43.38274765, 43.90385289, 44.3728476, 44.79494284, 45.17482856, 45.5167257, 45.82443313, 46.375, 47.495, 49.0958, 50.799806, 52.19709092, 53.34286455, 54.47429164, 55.50443331, 56.32854665, 56.98783732, 57.51526986, 58.00597589, 59.9688, 59.889424, 59.81163552, 59.6066701, 59.28151989, 58.8314943, 58.41747076, 58.0365691, 57.45479219, 50.75, 50.75, 51.041248, 51.32084608, 51.58926024, 58.0312, 57.8787, 57.5548, 57.075262, 56.39924104, 55.77730176, 54.94332158, 54.19273942, 53.51721548];

    console.log('expected.length = ' + expectResult.length + ' s_psar.length = ' + s_psar(s_high, s_low, start, step, max).length)
    // expect(s_psar(s_high, s_low, start, step, max)).toEqual(expectResult);

    s_psar(s_high, s_low, start, step, max)
        .forEach((sar, index) => {
            expect(sar).toBeCloseTo(expectResult[index], 0.3);
        });
});

// test('s_multiGet', () => {
//     let serie1 =        [1,2,5,4,51,6,10,8,90,10,11,22,13,14,15];
//     let expectResult = [1,3,-1,47,-45,4,-2,82,-80,1,11,-9,1,1];

//     expect(s_change(serie1)).toEqual(expectResult);
// });

// test('s_min', () => {
//     let serie1 =        [1,2,5,4,51,6,10,8,90,10,11,22,13,14,15];
//     let expectResult = [1,3,-1,47,-45,4,-2,82,-80,1,11,-9,1,1];

//     expect(s_change(serie1)).toEqual(expectResult);
// });

// test('s_max', () => {
//     let serie1 =        [1,2,5,4,51,6,10,8,90,10,11,22,13,14,15];
//     let expectResult = [1,3,-1,47,-45,4,-2,82,-80,1,11,-9,1,1];

//     expect(s_change(serie1)).toEqual(expectResult);
// });


// test('s_stoch', () => {
//     let serie1 =        [1,2,5,4,51,6,10,8,90,10,11,22,13,14,15];
//     let expectResult = [1,3,-1,47,-45,4,-2,82,-80,1,11,-9,1,1];

//     expect(s_change(serie1)).toEqual(expectResult);
// });

// test('stoch', () => {
//     let serie1 =        [1,2,5,4,51,6,10,8,90,10,11,22,13,14,15];
//     let expectResult = [1,3,-1,47,-45,4,-2,82,-80,1,11,-9,1,1];

//     expect(s_change(serie1)).toEqual(expectResult);
// });

// test('s_op', () => { // try to test different combination [specially when you get some real data]
//     let serie1 =        [1,2,5,4,51,6,10,8,90,10,11,22,13,14,15];
//     let expectResult = [1,3,-1,47,-45,4,-2,82,-80,1,11,-9,1,1];

//     expect(s_change(serie1)).toEqual(expectResult);
// });

test('s_rsi', () => { // try to test different combination [specially when you get some real data]
    let serie1 = [127.75, 129.02, 132.75, 145.40, 148.98, 137.52, 147.38, 139.05, 137.23, 149.30, 162.45, 178.95, 200.35, 221.90, 243.23, 243.52, 286.42, 280.27, 277.35, 269.02, 263.23, 214.90];
    let period = 14;

    let expectResult = [
        86.41, 86.43, 89.65, 86.50, 84.96, 80.54, 77.56, 58.06
    ];


    const result = s_rsi(serie1, period);
    // console.log('expected =======');
    // console.log(expectResult);
    // console.log('got');
    // console.log(result);

    result.forEach((val, index) => { expect(val).toBeCloseTo(expectResult[index], 0) });
});
test('s_rsi2', () => { // try to test different combination [specially when you get some real data]
    let serie1 = [127.75, 129.02, 132.75, 145.40, 148.98, 137.52, 147.38, 139.05, 137.23, 149.30, 162.45, 178.95, 200.35, 221.90, 243.23, 243.52, 286.42, 280.27, 277.35, 269.02, 263.23, 214.90];
    let period = 8;

    let expectResult = [
        59.03, 67.54, 74.25, 80.13, 85.19, 88.55, 90.86, 90.89, 94.04, 89.01, 86.47, 79.17, 74.19, 46.33
    ];


    const result = s_rsi(serie1, period);
    // console.log('expected =======');
    // console.log(expectResult);
    // console.log('got');
    // console.log(result);


    result.forEach((val, index) => { expect(val).toBeCloseTo(expectResult[index], 0) });
});
test('s_rsi3', () => { // try to test different combination [specially when you get some real data]
    let serie1 = [37.875, 39.5, 38.75, 39.8125, 40, 39.875, 40.1875, 41.25, 41.125, 41.625, 41.25, 40.1875, 39.9375, 39.9375, 40.5, 41.9375, 42.25, 42.25, 41.875, 41.875];
    let period = 5;

    let expectResult = [
        76.6667, 78.8679, 84.9158, 81.4863, 84.5968, 73.0851, 49.3173, 45.0119, 45.0119, 57.9252, 75.9596, 78.4676, 78.4676, 65.6299, 65.6299
    ];


    const result = s_rsi(serie1, period);
    // console.log('expected =======');
    // console.log(expectResult);
    // console.log('got');
    // console.log(result);


    result.forEach((val, index) => { expect(val).toBeCloseTo(expectResult[index]) });
});


// test('Cum class', () => { // try to test different combination [specially when you get some real data]
//     let serie1 =        [1,2,5,4,51,6,10,8,90,10,11,22,13,14,15];
//     let expectResult = [1,3,-1,47,-45,4,-2,82,-80,1,11,-9,1,1];

//     expect(s_rsi(serie1)).toEqual(expectResult);
// });


// test('s_cum', () => { // try to test different combination [specially when you get some real data]
//     let serie1 =        [1,2,5,4,51,6,10,8,90,10,11,22,13,14,15];
//     let expectResult = [1,3,-1,47,-45,4,-2,82,-80,1,11,-9,1,1];

//     expect(s_rsi(serie1)).toEqual(expectResult);
// });

test('wma', () => { // try to test different combination [specially when you get some real data]
    let serie1 = [1, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
    const period = 8;

    let expectResult = [6.64, 7.67, 8.67, 9.67, 10.67, 11.67, 12.67];

    for (let i = 0; i < serie1.length - period; i++) {
        expect(wma(serie1, period, i)).toBeCloseTo(expectResult[expectResult.length - i - 1])
    }
});

test('s_wma', () => { // try to test different combination [specially when you get some real data]
    let serie1 = [1, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
    const period = 8;

    let expectResult = [6.64, 7.67, 8.67, 9.67, 10.67, 11.67, 12.67];

    s_wma(serie1, period).forEach((wma, index) => {
        expect(wma).toBeCloseTo(expectResult[index]);
    });
});


test('Sum', () => { // try to test different combination [specially when you get some real data]
    let serie1 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
    const period = 4;

    let expectResult = [10, 14, 18, 22, 26, 30, 34, 38, 42, 46, 50, 54];

    const sum = new Sum(serie1, period).get();

    expect(sum).toEqual(expectResult);
});

// test('dev', () => { // try to test different combination [specially when you get some real data]
//     let serie1 = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
//     const period = 4;

//     let expectResult = [10,14,18,22,26,30,34,38,42,46,50,54];

//     const sum = new Sum(serie1, period).get();

//     expect(sum).toEqual(expectResult);
// });

// test('s_dev', () => { // try to test different combination [specially when you get some real data]
//     let serie1 = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
//     const period = 4;

//     let expectResult = [10,14,18,22,26,30,34,38,42,46,50,54];

//     const sum = new Sum(serie1, period).get();

//     expect(sum).toEqual(expectResult);
// });

// test('s_fixnan', () => {

// });

// test('fixnan', () => {

// });

// test('s_cleanFirstNaNs', () => {

// });


// test('rising', () => {

// });

// test('s_rising', () => {

// });