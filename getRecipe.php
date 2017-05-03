<?php

require 'db.php';


$id = $_GET['id'];
    
$query = 'SELECT * FROM recipes WHERE id = :id';
$stmt = $db->prepare($query);
$stmt->bindValue('id', $id);
$stmt->execute();
$rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
$stmt->closeCursor();

echo json_encode($rows);

?>