<?php
require_once "DBconnect.php";
mysqli_query($conn, "INSERT INTO user VALUES(NULL, 0,0)");
echo mysqli_insert_id($conn);
mysqli_close($conn);
?>