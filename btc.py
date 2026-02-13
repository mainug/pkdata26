import requests as req

url = "https://api4.binance.com/api/v3/ticker/price?symbol=BTCUSDT"
res = req.get(url).text
r = res.find("price")
bc = res[29:34]
print("비트코인 가격(달러): $" + bc)
won = str(int(res[29:34]) * 1450) 
print("비트코인 가격(원):", ((won[-12:-8] + "억") if won[-12:-8] else ""), won[-8:-4], '만', won[-4:], '원')