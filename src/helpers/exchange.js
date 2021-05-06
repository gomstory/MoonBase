export function exchange_thbt_moon(thbt, moonRate, sold_n, nextRate) {
    let money = thbt;
    let totalCoin = 0

    while (money > 0) {
        let coin = 0;

        if (money < moonRate) {
            coin = money/moonRate
            money -= (coin * moonRate) 
        } else if (money%moonRate == 0) {
            coin = money/moonRate
            money -= (coin * moonRate) 
        } else if (money%moonRate > 0) {
            coin++;
            money = money%moonRate;
        } else if (money%moonRate < 0) {
            coin = money/moonRate;
            money -= (coin * moonRate) 
        }
        
        if (coin) {
            sold_n += coin;
            totalCoin += coin;
        }

        if (sold_n >= nextRate) {
            moonRate += (moonRate * 10) / 100
            nextRate += 10;
        }       
        
    }
    

    return {
        totalCoin,
        sold_n,
        moonRate,
        nextRate
    };

}

export function exchange_moon_thbt(moon, moonRate) {
    return moon * moonRate
}