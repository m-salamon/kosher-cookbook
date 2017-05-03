<?php

require 'db.php';
    
$id = $_POST['id'];

// //setting up users table and inserting phone as password. making a join table connecting recipes and users.
$query = 'DELETE FROM recipes WHERE id = :id';
$stmt = $db->prepare($query);
$stmt->bindValue('id', $id);
$stmt->execute();

$rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
$stmt->closeCursor();

echo json_encode($rows);

?>