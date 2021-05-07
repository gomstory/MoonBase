module.exports.exchange_thbt_moon = (thbt, moonRate, sold_n) => {
    let money = thbt;
    let totalCoin = 0
    let nextIncreaseRate =  Math.ceil((Math.floor(sold_n) + 1)/10) * 10;

    while (money > 0) {
        let coin = 0;

        if (money < moonRate) {
            coin = money/moonRate
            money -= (coin * moonRate) 
        } else if (money >= moonRate) {
            coin++;
            money -= moonRate;    
        }
        
        if (coin) {
            sold_n += 1;
            totalCoin += coin;
        }

        if (sold_n >= nextIncreaseRate) {
            moonRate += (moonRate * 10) / 100
            nextIncreaseRate += 10;
        }
    }
    
    return totalCoin
}

module.exports.exchange_moon_thbt = (moon, moonRate, sold_n) => {
    let coin = moon;
    let totalThbt = 0;
    let nextIncreaseRate =  Math.ceil((Math.floor(sold_n) + 1)/10) * 10;

    while (coin > 0) {
        let thbt = 0;

        if (coin < 1) {
            thbt = coin * moonRate;
            coin = 0;
        } else if (coin >= 1) {
            thbt = 1 * moonRate
            coin = coin - 1;
        }

        if (thbt) {
            sold_n += 1;
            totalThbt += thbt
        }

        if (sold_n >= nextIncreaseRate) {
            moonRate += (moonRate * 10) / 100
            nextIncreaseRate += 10;
        }
    }

    return totalThbt;
}

module.exports.calculateMoonRate = (sold_n) => {
    let rate = 50;

    while (sold_n > 0) {
        if (sold_n >= 10) {
            sold_n -= 10;
            rate += (rate *  10/ 100 )
        } else {
            sold_n = 0
        }
    }

    return rate;
}