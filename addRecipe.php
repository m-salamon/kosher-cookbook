<?php

require 'db.php';

function getParam($param) {
    if (!empty($_POST[$param])) {
        return $_POST[$param];
    }
    return 'UNKNOWN';
}
    
$name = getParam('name');
$picture = getParam('picture');
$ingredients = getParam('ingredients');
$instructions = getParam('instructions');
$category = getParam('category');
$notes = getParam('notes');
$phone = getParam('phone');

// //setting up users table and inserting phone as password. making a join table connecting recipes and users.
$query = 'INSERT INTO recipes (name, picture, ingredients, instructions, category, notes) 
        VALUES (:name, :picture, :ingredients, :instructions, :category, :notes); 
        SET @last_id_in_recipes = LAST_INSERT_ID(); 
        INSERT INTO users (id, phone) VALUES (NULL, :phone); 
        SET @last_id_in_users = LAST_INSERT_ID(); 
        INSERT INTO recipesMapping (recipesId, usersId) 
        VALUES (@last_id_in_recipes,@last_id_in_users)';

$statement = $db->prepare($query);
$statement->bindParam(':name', $name);
$statement->bindParam(':picture', $picture);
$statement->bindParam(':ingredients', $ingredients);
$statement->bindParam(':instructions', $instructions);
$statement->bindParam(':category', $category);
$statement->bindParam(':notes', $notes);

$statement->bindParam(':phone', $phone);

$rowsInserted = $statement->execute();

if(!$rowsInserted) {
    http_response_code(500);
    exit('Unable to add recipe');
}

            
           

// // original query without setting up users & phone.     
//$query = 'INSERT INTO recipes (name, picture, ingredients, instructions, category, notes) 
//            VALUES (:name, :picture, :ingredients, :instructions, :category, :notes)';
//$statement = $db->prepare($query);
//$statement->bindParam(':name', $name);
//$statement->bindParam(':picture', $picture);
//$statement->bindParam(':ingredients', $ingredients);
//$statement->bindParam(':instructions', $instructions);
//$statement->bindParam(':category', $category);
//$statement->bindParam(':notes', $notes);
//$rowsInserted = $statement->execute();
//
//if(!$rowsInserted) {
//    http_response_code(500);
//    exit('Unable to add recipe');
//}


?>