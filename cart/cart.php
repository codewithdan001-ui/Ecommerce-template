<?php
session_start();
include "../config/db.php";

$user_id = $_SESSION['user_id'];

$sql = "SELECT cart.*, products.name, products.price, products.image
        FROM cart
        JOIN products ON cart.product_id = products.id
        WHERE cart.user_id='$user_id'";

$result = mysqli_query($conn, $sql);
?>

<h2>Your Cart</h2>

<?php while ($row = mysqli_fetch_assoc($result)) { ?>

    <div>
        <img src="../assets/images/<?php echo $row['image']; ?>" width="100">
        <h3><?php echo $row['name']; ?></h3>
        <p>Price: <?php echo $row['price']; ?></p>
        <p>Qty: <?php echo $row['quantity']; ?></p>

        <a href="remove.php?id=<?php echo $row['id']; ?>">Remove</a>
    </div>

<?php } ?>