import requests as req

url = "https://api4.binance.com/api/v3/ticker/price?symbol=BTCUSDT"
res = req.get(url).text
r = res.find("price")
bc = res[29:34]
print("비트코인 가격(달러): $" + bc)
won = str(int(res[29:34]) * 1450) 
print("비트코인 가격(원): " + won[:1] + '억 ' + won[1:5] + '만 ' + won[5:9] + '원')