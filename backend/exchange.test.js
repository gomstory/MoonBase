var {  exchange_thbt_moon, calculateMoonRate, exchange_moon_thbt } = require('./exchange')

describe('Convert THBT to MOON correctly', () =>  {
  test('When 0 of MOON sold, 50 thbt should get 1 coin', () =>  {
    const thbtBalance = 50;
    const moonRate = 50;
    const totalSold = 0;
    const coin = exchange_thbt_moon(thbtBalance, moonRate, totalSold);
    expect(coin).toBe(1);
  });

  test('When 9 of MOON sold, 75 thbt should get 1.4545454545454546 coin', () =>  {
    const thbtBalance = 75;
    const moonRate = 50;
    const totalSold = 9;
    const coin = exchange_thbt_moon(thbtBalance, moonRate, totalSold);
    expect(coin).toBe(1.4545454545454546);
  });
});


describe('Convert MOON to THBT correctly', () =>  {
  test('1 thbt should get 50 thbt', () =>  {
    const moon = 1;
    const moonRate = 50;
    const totalSold = 0;
    const thbt = exchange_moon_thbt(moon, moonRate, totalSold);
    expect(thbt).toBe(50);
  });

  test('When 9 of MOON sold, 1.4545 coin should get 55 thbt', () =>  {
    const moon = 1.4545454545454546;
    const moonRate = 50;
    const totalSold = 9;
    const thbt = exchange_moon_thbt(moon, moonRate, totalSold);
    expect(thbt).toBe(75);
  });
});

describe('Should callculate Moon Rate correcly', () =>  {
  test("When 0 of MOON sold, then the price still be 50 THBT", () =>  {
    const totalSold = 0;
    const moonRate = calculateMoonRate(totalSold);
    expect(moonRate).toBe(50);
  });

  test("When 9 of MOON sold, then the price still be 50 THBT", () =>  {
    const totalSold = 9;
    const moonRate = calculateMoonRate(totalSold);
    expect(moonRate).toBe(50);
  });

  test("When 10 of MOON sold, then the price will be 55 THBT", () =>  {
    const totalSold = 10;
    const moonRate = calculateMoonRate(totalSold);
    expect(moonRate).toBe(55);
  });

  test("When 20 of MOON sold, then the price will be 60.5 THBT", () =>  {
    const totalSold = 20;
    const moonRate = calculateMoonRate(totalSold);
    expect(moonRate).toBe(60.5);
  });

  test("When 30 of MOON sold, then the price will be 66.55 THBT", () =>  {
    const totalSold = 30;
    const moonRate = calculateMoonRate(totalSold);
    expect(moonRate).toBe(66.55);
  });

  if ("When 40 of MOON sold, then the price will be 66.55 THBT", () =>  {
    const totalSold = 40;
    const moonRate = calculateMoonRate(totalSold);
    expect(moonRate).toBe(73.205);
  });
})