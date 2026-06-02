<?php
session_start();
include "../config/db.php";

header("Content-Type: application/json");

// check login
if (!isset($_SESSION['user_id'])) {
    echo json_encode([
        "status" => "error",
        "message" => "Please login first"
    ]);
    exit;
}

$user_id = $_SESSION['user_id'];

// validate input
if (!isset($_POST['product_id'])) {
    echo json_encode([
        "status" => "error",
        "message" => "Product ID missing"
    ]);
    exit;
}

$product_id = intval($_POST['product_id']);
$quantity = 1;

// check product exists (IMPORTANT FIX for foreign key errors)
$checkProduct = "SELECT id FROM products WHERE id = $product_id";
$productResult = mysqli_query($conn, $checkProduct);

if (mysqli_num_rows($productResult) == 0) {
    echo json_encode([
        "status" => "error",
        "message" => "Product does not exist"
    ]);
    exit;
}

// check if already in cart
$check = "SELECT * FROM cart 
          WHERE user_id = $user_id 
          AND product_id = $product_id";

$result = mysqli_query($conn, $check);

if (mysqli_num_rows($result) > 0) {

    $update = "UPDATE cart 
               SET quantity = quantity + 1 
               WHERE user_id = $user_id 
               AND product_id = $product_id";

    mysqli_query($conn, $update);

} else {

    $insert = "INSERT INTO cart (user_id, product_id, quantity)
               VALUES ($user_id, $product_id, $quantity)";

    mysqli_query($conn, $insert);
}

echo json_encode([
    "status" => "success",
    "message" => "Added to cart"
]);
?>