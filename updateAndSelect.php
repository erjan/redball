<?php
require_once "DBconnect.php";
$postData = file_get_contents('php://input');
$data = json_decode($postData, true);
$id = $data['id'];
$redball = $data['redball'];
$blueball = $data['blueball'];
mysqli_query($conn, "UPDATE user SET redball = $redball, blueball=$blueball WHERE id = $id;");
$result = mysqli_query($conn, "SELECT * from user");
$myArray = array();
while($row = $result->fetch_array(MYSQLI_ASSOC)) {
    $myArray[] = $row;
}
echo json_encode($myArray);
mysqli_close($conn);
?>