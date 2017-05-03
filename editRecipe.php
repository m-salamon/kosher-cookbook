<?php

require 'db.php';

function getParam($param, $p) {
    if (!empty($_POST[$param][$p])) {
        return $_POST[$param][$p];
    }
    return 'UNKNOWN';
}

$name = getParam('recipe','name');
//$picture = getParam('recipe','picture');
$ingredients = getParam('recipe','ingredients');
$instructions = getParam('recipe','instructions');
$category = getParam('recipe','category');
$notes = getParam('recipe','notes');
$phone = getParam('recipe','phone');
$id = $_POST['recipeID'];

$query = 'UPDATE recipes SET name = :name, /*picture = :picture,*/ ingredients = :ingredients, 
          instructions = :instructions, category = :category, notes = :notes
          WHERE id = :id';

$statement = $db->prepare($query);
$statement->bindParam(':name', $name);
//$statement->bindParam(':picture', $picture);
$statement->bindParam(':ingredients', $ingredients);
$statement->bindParam(':instructions', $instructions);
$statement->bindParam(':category', $category);
$statement->bindParam(':notes', $notes);
$statement->bindParam(':id', $id);

// $statement->bindParam(':phone', $phone);
$rowsInserted = $statement->execute();


        // -- SET @last_id_in_recipes = LAST_INSERT_ID(); 
        // -- INSERT INTO users (id, phone) VALUES (NULL, :phone); 
        // -- SET @last_id_in_users = LAST_INSERT_ID(); 
        // -- INSERT INTO recipesMapping (recipesId, usersId) 
        // -- VALUES (@last_id_in_recipes,@last_id_in_users)';


if(!$rowsInserted) {
    http_response_code(500);
    exit('Unable to add recipe');
}

?>