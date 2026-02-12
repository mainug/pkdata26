import requests as r
btc = "https://api4.binance.com/api/v3/ticker/price?symbol=BTCUSDT"
usd = "https://www.koreaexim.go.kr/site/program/financial/exchangeJSON?authkey=3spOQb36RyxH4cbtYdC1igtjlbe6K1YU&data=AP01"
r1 = r.get(btc).json()
r2 = r.get(usd).json()
r3 = float(r1['price']) * float(r2[-1]['deal_bas_r'].replace(',', ''))
print(f"{int(r3):,}", "원")