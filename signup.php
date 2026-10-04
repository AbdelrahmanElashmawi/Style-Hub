<?php
// معلومات الاتصال بقاعدة البيانات
$host = 'localhost'; // اسم المضيف
$dbname = 'style_hub'; // اسم قاعدة البيانات
$username = 'root'; // اسم المستخدم
$password = ''; // كلمة المرور

try {
    // إنشاء اتصال PDO
    $conn = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // معالجة البيانات المرسلة من الفورم
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $first_name = $_POST['first_name'];
        $last_name = $_POST['last_name'];
        $email = $_POST['email'];
        $password = $_POST['password'];
        $confirm_password = $_POST['confirm-password'];

        // التحقق من أن الحقول غير فارغة
        if (empty($first_name) || empty($last_name) || empty($email) || empty($password) || empty($confirm_password)) {
            die("Please fill out all fields.");
        }

        // التحقق من صحة البريد الإلكتروني
        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            die("Invalid email format.");
        }

        // التحقق من تطابق كلمة المرور وتأكيدها
        if ($password !== $confirm_password) {
            die("Passwords do not match.");
        }

        // تشفير كلمة المرور
        $hashed_password = password_hash($password, PASSWORD_DEFAULT);

        // إدخال البيانات في قاعدة البيانات
        $sql = "INSERT INTO users (first_name, last_name, email, password) VALUES (:first_name, :last_name, :email, :password)";
        $stmt = $conn->prepare($sql);

        $stmt->bindParam(':first_name', $first_name);
        $stmt->bindParam(':last_name', $last_name);
        $stmt->bindParam(':email', $email);
        $stmt->bindParam(':password', $hashed_password);

        $stmt->execute();

        echo "Registration successful!";
    }
} catch (PDOException $e) {
    if ($e->getCode() == 23000) { // خطأ في حالة وجود بريد إلكتروني مكرر
        die("Email already exists.");
    } else {
        die("Error: " . $e->getMessage());
    }
}
?>