<?php
try {
    $dbh = new PDO('mysql:host=localhost;dbname=pv113', "root", "123456");
} catch (PDOException $e) {
    echo "Проблема підключення до БД ". $e;
    exit();
}