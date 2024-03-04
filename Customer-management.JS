<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>إدارة بيانات العملاء</title>
    <link rel="stylesheet" href="Customer-management.css">
    <script src="Customer-management.JS"></script>
</head>

<body>

   
    <div class="container">
        <div class="form-container">
            <h1>تسجيل جديد</h1>
            <label for="name">الاسم:</label>
            <input type="text" id="name" required>

            <label for="phone">رقم الجوال:</label>
            <input type="text" id="phone" required>

            <label for="email">البريد الإلكتروني:</label>
            <input type="email" id="email" required>

            <label for="cost">التكلفة:</label>
            <input type="text" id="cost" required>

            <label for="sales">المبيعات:</label>
            <input type="text" id="sales" required>

            <button onclick="calculateProfit()">اضافه</button>
            
        </div>

        <div class="table-container">
            <h2>بيانات العملاء</h2>
            <div class="search-container">
            <input type="text" id="searchInput" oninput="searchCustomers()" placeholder="البحث باسم العميل، رقم الجوال، أو البريد الإلكتروني">
            </div>
            <label for="startDate">بداية الفترة:</label>
            <input type="date" id="startDate">
            <label for="endDate">نهاية الفترة:</label>
            <input type="date" id="endDate">
            <button id="showDataButton" onclick="showDataInTimeRange()">عرض البيانات في الفترة الزمنية</button>
            <div class="actions-container">
                <button id="red" onclick="deleteSelected()">حذف</button>
                <button onclick="editSelected()">تعديل</button>
            </div>

            <table id="customersTable">
                <thead>
                    <tr>
                        <th>الرقم</th>
                        <th>الاسم</th>
                        <th>رقم الجوال</th>
                        <th>البريد الإلكتروني</th>
                        <th>التكلفة</th>
                        <th>المبيعات</th>
                        <th>الربح</th>
                        <th>تاريخ الإضافة</th>
                    </tr>
                </thead>
                <tbody>
                    
                </tbody>
            </table>
        </div>
       
        
    
</body>

</html>
