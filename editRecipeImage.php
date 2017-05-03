<?php

require 'db.php';

// // get max id to set the image to that name and then the image gets saved to the folder 
// $query = 'SELECT MAX(id) AS max FROM recipes';
// $stmt = $db->prepare($query);
// $stmt->execute();
// $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
// $stmt->closeCursor();


// $imgName = $_POST['imgName'];
// echo $imgName;


if ( 0 < $_FILES['file']['error'] ) {
       echo 'Error: ' . $_FILES['file']['error'] . '<br>';
   }
   else {
       move_uploaded_file($_FILES['file']['tmp_name'], 'pictures/' . $_FILES['file']['name']);
   }



// // save image to folder
// if ( 0 < $_FILES['file']['error'] ) {
//     echo 'Error: ' . $_FILES['file']['error'] . '<br>';
// }
// else {
//     move_uploaded_file($_FILES['file']['tmp_name'], 'pictures/' . $counter . '.png');
// }


// // // make array $row into a string
// $picture = implode(',', $rows[0]);
// $picture = $picture . '.png';

// // // update the last inserted picture addRecipe.php to the same name as the image that gets saved to folder
// $query = "UPDATE recipes r SET r.picture = (:picture) WHERE r.id = '".$counter."'"; 

// $statement = $db->prepare($query);
// $statement->bindParam(':picture', $picture);
// $rowsInserted = $statement->execute();



// // original query inserting a img into a folder
//if ( 0 < $_FILES['file']['error'] ) {
//        echo 'Error: ' . $_FILES['file']['error'] . '<br>';
//    }
//    else {
//        move_uploaded_file($_FILES['file']['tmp_name'], 'pictures/' . $_FILES['file']['name']);
//    }

?>