<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%
    // 상품 데이터 정의
    // 각 상품은 {용도, 중량, 단가} 배열로 둠, 개수는 사용자 입력값과 별도로 처리
    String[][] products = {
            {"선물용", "3kg", "38000"},
            {"선물용", "5kg", "52000"},
            {"가정용", "3kg", "30000"},
            {"가정용", "4kg", "47000"}
    };

    // 사용자로부터 입력받은 개수, 기본 1로 설정
    int inputCount = 1;
    if(request.getParameter("count") != null){
        try{
            inputCount = Integer.parseInt(request.getParameter("count"));
            if(inputCount < 1) inputCount = 1; // 1 이상만 허용
        }catch(NumberFormatException e){
            inputCount = 1;
        }
    }
%>
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <title>상품 가격 계산</title>
    <style>
        table { width: 100%; border-collapse: collapse; }
        caption { font-weight: bold; margin-bottom: 10px; }
        th, td { border: 1px solid #ccc; padding: 8px; text-align: center; }
        colgroup col:nth-child(1) { background-color: lightcoral; }
        colgroup col:nth-child(2), colgroup col:nth-child(3) { background-color: lightblue; }
        colgroup col:nth-child(4), colgroup col:nth-child(5) { background-color: lightgreen; }
    </style>
</head>
<body>

<h2>상품 가격 계산기</h2>

<form method="get">
    <label>상자 개수 입력 (1 이상): 
        <input type="number" name="count" value="<%= inputCount %>" min="1" />
    </label>
    <button type="submit">계산</button>
</form>

<table>
    <caption>선물용과 가정용 상품 구성</caption>
    <colgroup>
        <col/>
        <col/>
        <col/>
        <col/>
        <col/>
    </colgroup>
    <thead>
    <tr>
        <th>용도</th>
        <th>중량</th>
        <th>개수</th>
        <th>단가 (원)</th>
        <th>토탈 가격 (원)</th>
    </tr>
    </thead>
    <tbody>
    <%
        for(int i=0; i<products.length; i++){
            String use = products[i][0];
            String weight = products[i][1];
            int price = Integer.parseInt(products[i][2]);
            int totalPrice = price * inputCount;
    %>
    <tr>
        <td><%= use %></td>
        <td><%= weight %></td>
        <td><%= inputCount %> 상자</td>
        <td><%= String.format("%,d", price) %></td>
        <td><%= String.format("%,d", totalPrice) %></td>
    </tr>
    <% } %>
    </tbody>
</table>

</body>
</html>