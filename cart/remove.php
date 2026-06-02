<?php
session_start();
include "../config/db.php";

$id = $_GET['id'];

$sql = "DELETE FROM cart WHERE id='$id'";
mysqli_query($conn, $sql);

header("Location: cart.php");
exit;
?>