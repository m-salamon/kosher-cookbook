(function() {
    "use strict";
    /* global $ */

    var recipeNames = $('#recipeNames'),
        recipeCategorys = $('#recipeCategorys'),
        printRecipe = $('#printRecipe'),
        printCategorys = $('#printCategorys'),
        addRecipeForm = $('#addRecipeForm'),
        nameInput = $('#nameInput'),
        pictureInput = $('#pictureInput'),
        ingredientsLabel = $('#ingredientsLabel'),
        ingredientsInput = $('.ingredientsInput'),
        instructionsInput = $('#instructionsInput'),
        categoryInput = $('#categoryInput'),
        notesInput = $('#notesInput'),
        phoneInput = $('#phoneInput'),
        addRecipes = $('#addRecipe'),
        beingEdited = false,
        ingredientsArray = [];
    /*=============================================
             info Alerts            
    =============================================*/
    $('#infoAlerts').hide();

    function infoAlerts(e) {
        $('#infoAlerts').empty();
        var infoAlertsArray = []; //alerts with information to user when functions get executed
        infoAlertsArray.push(e);
        infoAlertsArray.forEach(function(e) {
            $('#infoAlerts').show();
            $("#infoAlerts").addClass("in");
            $('#infoAlerts').append('<p>' + e + '</p>');
            infoAlertsArray = [];

            setInterval(function() {
                $("#infoAlerts").removeClass("in").addClass("out");
            }, 4000);
        });
    }
    /*=============================================
              selector display categorys             
    =============================================*/
    function getRecipeCategory() { //recipe category from db
        $.getJSON('getRecipeCategory.php', function(rc) {
            rc.forEach(function(recipeCategory) {
                listCategorys(recipeCategory);
            });
        }).fail(function(jqxhr) {
            alert("Invalid, Try again!");
        });
    }
    getRecipeCategory();
    var categorysArray = [];

    function listCategorys(recipeCategory) {
        categorysArray.push(recipeCategory);
        recipeCategorys.append('<option id=' + recipeCategory.category + '>' + recipeCategory.category + '</option>');
    }

    /*=============================================
          display selected category to user            
    =============================================*/
    $('#recipeCategorys').change(function() {
        printRecipe.empty();
        var id = $(this).children(":selected").attr("id");
        $.getJSON('printCategorys.php', { id: id }, function(printRecipe) {
            printRecipe.forEach(function(pc) {
                printCategorysFunction(pc);
            });
        }).fail(function(jqxhr) {
            alert("Invalid Option, Try again!");
        });
    });

    function printCategorysFunction(recipe) {
        ingredientsArray = [];
        var picture = recipe.picture.split('\\').pop();
        var ingredients = recipe.ingredients.split(',');
        ingredients.forEach(function(array) {
            ingredientsArray += '<li>' + array + '</li>';
        });
        var notes = recipe.notes;
        if (notes === "UNKNOWN") {
            notes = "";
        }
        printRecipe.append(
            '<div class="parentDiv col-xs-10 col-xs-offset-1 col-sm-6 col-sm-offset-0" id="' + recipe.id + '" name="' + recipe.name + '">' +
            '<img id="picture" src=" pictures/' + picture + ' "/>' +
            '<div id="name">' + recipe.name + '</div>' +
            '<label>Ingredients</label><div id="ingredients"><ol>' + ingredientsArray + '</ol></div>' +
            '<label>Instructions</label><div id="instructions">' + recipe.instructions + '</div>' +
            '<label>Notes & Tips</label><div id="notes">' + notes + '</div>' +
            '<hr>' +
            '<button class="btn btn-default" id="editRecipe"><i class="fa fa-pencil" aria-hidden="true"></i> Edit</button>' +
            '<button class="btn btn-danger" id="deleteRecipe"><i class="fa fa-trash-o" aria-hidden="true"></i> Delete</button>' +
            '</div>'
        );
        ingredientsArray = [];
    }
    $(document).on('click', '#deleteRecipe', function() {
        var id = $(event.target).closest('.parentDiv').attr('id'); // // get the specific targeted id thats clicked
        var name = $(event.target).closest('.parentDiv').attr('name'); // // get the specific targeted name thats clicked
        deleteRecipe(id, name);
        $("html, body").animate({ scrollTop: 0 }, "slow");
    });
    $(document).on('click', '#editRecipe', function(event) {
        var id = $(event.target).closest('.parentDiv').attr('id'); // // get the specific targeted id thats clicked
        var name = $(event.target).closest('.parentDiv').attr('name'); // // get the specific targeted name thats clicked
        editRecipe(id, name);
        $("html, body").animate({ scrollTop: 0 }, "slow");
    });
    /*=============================================
             selector display recipes             
    =============================================*/
    function getRecipeName() {
        $.getJSON('getRecipeName.php', function(recipeNames) {
            recipeNames.forEach(function(recipeName) {
                listNames(recipeName);
            });
        }).fail(function(jqxhr) {
            alert("Invalid, reload the page, Try again!");
        });
    }
    getRecipeName();

    var namesArray = [];

    function listNames(recipeName) {
        if (namesArray.find(function(r) {
                return r.id === recipeName.id;
            })) {
            return;
        }
        namesArray.push(recipeName);
        recipeNames.append('<option id=' + recipeName.id + '>' + recipeName.name + '</option>');
    }

    /*=============================================
              display selected recipe to user            
    =============================================*/
    $('#recipeNames').change(function() {
        printRecipe.empty();
        var id = $(this).children(":selected").attr("id");

        $.getJSON('getRecipe.php', { id: id }, function(printRecipe) {
            printRecipe.forEach(function(pr) {
                printRecipeFunction(pr);
            });
        }).fail(function(jqxhr) {
            alert("Invalid, Try again!");
        });
    });

    function printRecipeFunction(recipe) {
        ingredientsArray = [];
        var picture = recipe.picture.split('\\').pop();
        var ingredients = recipe.ingredients.split(',');
        ingredients.forEach(function(array) {
            ingredientsArray += '<li>' + array + '</li>';
        });
        var notes = recipe.notes;
        if (notes === "UNKNOWN") {
            notes = "";
        }
        printRecipe.append(
            '<div class="parentDiv col-xs-10 col-xs-offset-1 col-sm-6 col-sm-offset-3" id="' + recipe.id + '" name="' + recipe.name + '">' +
            '<img id="picture" src=" pictures/' + picture + ' "/>' +
            '<div id="name">' + recipe.name + '</div>' +
            '<label>Ingredients</label><div id="ingredients"><ol>' + ingredientsArray + '</ol></div>' +
            '<label>Instructions</label><div id="instructions">' + recipe.instructions + '</div>' +
            '<label>Notes & Tips</label><div id="notes">' + notes + '</div>' +
            '<hr>' +
            '<button class="btn btn-default" id="editRecipe"><i class="fa fa-pencil" aria-hidden="true"></i> Edit</button>' +
            '<button class="btn btn-danger" id="deleteRecipe"><i class="fa fa-trash-o" aria-hidden="true"></i> Delete</button>' +
            '</div>'
        );
        ingredientsArray = [];
    }
    /*=============================================
                    delete recipe            
    =============================================*/
    function deleteRecipe(recipeID, recipeName) {
        $.post('deleteRecipe.php', { id: recipeID }, function() {
            recipeCategorys.find('option:not(:first)').remove();
            // recipeNames.find('option:not(:first)').remove();
            getRecipeName(); // get recipes again.. as in refresh, does use a lot of bandwith need to find a better solution
            getRecipeCategory(); // get recipes again.. as in refresh, does use a lot of bandwith need to find a better solution
            infoAlerts('Your <strong>' + recipeName + '</strong> recipe was successfully deleted');
            printRecipe.empty();
            recipeCategorys.find('option:not(:first)').remove();
        }).fail(function(jqxhr) {
            alert("Invalid Option, Try again!");
        });
    }

    /*=============================================
              add recipe            
    =============================================*/
    var validationArray;
    var file_data;
    var form_data;
    var ingredientsInputArray = [];
    $('#inputErrors').hide();

    function recipeForm() {
        $('.ingredientsInput').empty();
        ingredientsInputArray = [];
        $('.ingredientsInput').each(function() {
            ingredientsInputArray.push($(this).val());
        });

        var recipe = {
            name: nameInput.val(),
            picture: pictureInput.val(),
            ingredients: ingredientsInputArray.toString(), // //the toString will put a comma(,) between each recipe
            instructions: instructionsInput.val(),
            category: $(categoryInput).children(":selected").attr("id"),
            notes: notesInput.val(),
            phone: phoneInput.val()
        };

        $('#inputErrors').empty();
        validationArray = [];

        if (!recipe.name.trim()) {
            validationArray.push('Name is Required');
        }
        if (!recipe.picture.trim()) {
            if (!beingEdited) { // //only when not being beingEdited do we require a picture
                validationArray.push('Picture is Required');
            }
        }
        if (!recipe.ingredients.trim()) {
            validationArray.push('Ingredients is Required');
        }
        if (!recipe.instructions.trim()) {
            validationArray.push('instructions is Required');
        }
        if (recipe.category === "undefined") {
            validationArray.push('category is Required');
        }
        if (!recipe.phone.trim()) {
            validationArray.push('phone number (password) is Required');
        }
        /*if (!recipe.notes.trim()){
            validationArray.push('notes is Required');
        }*/
        validationArray.forEach(function(e) {
            $('#inputErrors').show();
            $("#inputErrors").addClass("in");
            $('#inputErrors').append('<p>' + e + '</p>');
            $("html, body").animate({ scrollTop: 0 }, "slow");
        });

        if (validationArray.length > 0) {
            return; // // there was a error   
        }
        if (beingEdited) {
            updateRecipe(recipe); // //edit recipe in db
        } else {
            addRecipe(recipe); // //add recipe for the first time to db
        }

        ingredientsInputArray = [];
    }

    /*=============================================
    display picture on the dialog while user adds a recipe            
    =============================================*/
    $('#visualImage').hide(); // // hide the img tab when no image was selected

    function readURL(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();
            reader.onload = function(e) {
                $('#visualImage').attr('src', e.target.result).show();
            };
            reader.readAsDataURL(input.files[0]);
        }
    }
    $(".displayImg").change(function() {
        readURL(this);
    });
    /*=====  End display pic while user adds a recipe  ======*/

    /*=============================================
                   add recipe            
    =============================================*/
    function addRecipe(recipe) {
        printRecipe.empty();
        recipeCategorys.find('option:not(:first)').remove();
        $.post('addRecipe.php', recipe, function() {
            getRecipeName(); // get recipes again.. as in refresh, does use a lot of bandwith need to find a better solution
            getRecipeCategory(); // get recipes again.. as in refresh, does use a lot of bandwith need to find a better solution
            infoAlerts('Thanks for sharing your <strong>' + recipe.name + '</strong> recipe');
        }).fail(function(jqXHR, a, b) {
            console.log('Error:', jqXHR, a, b);
        });

        file_data = $('#pictureInput').prop('files')[0];
        form_data = new FormData();
        form_data.append('file', file_data);
        $.ajax({
            url: 'addRecipeImage.php', // point to server-side PHP script 
            dataType: 'text', // what to expect back from the PHP script, if anything
            cache: false,
            contentType: false,
            processData: false,
            data: form_data,
            type: 'post',
            success: function() {}
        });
    }
    /*=====  End function addRecipe()  ======*/

    $('#ok').click(function(event) {
        event.preventDefault();
        recipeForm();

        if (validationArray.length < 1) {
            hideDialog();
        }
    });

    /*=============================================
                 edit recipe           
    =============================================*/
    $('#edit').click(function(event) {
        beingEdited = true;
        recipeForm();
        if (validationArray.length < 1) {
            hideDialog();
        }
    });

    var recipeid;
    var recipePicture;

    function editRecipe(recipeID, recipeName) {
        $("tr").empty();
        $.get('getRecipe.php', { id: recipeID }, function() { // //get the recipe info to populate the edit form
            $.getJSON('getRecipe.php', { id: recipeID }, function(getRecipe) {
                getRecipe.forEach(function(r) {
                    populateForm(r);
                    recipeid = r.id;
                    recipePicture = r.picture;
                });

                function populateForm(r) {
                    categoryInput.append('<option id=' + r.category + '>' + r.category + '</option>');
                    /* categorysArray.forEach(function(ca){ */ // //get categorys from db
                    hardCodedCategorysArray.forEach(function(ca) {
                        categoryInput.append('<option id=' + ca + '>' + ca + '</option>');
                    });

                    $('#dialog').show();
                    $('.model').show();
                    $('#ok').hide();
                    $('#edit').show();

                    var picture = r.picture;
                    var ingredients = r.ingredients.trim();
                    $('#visualImage').attr('src', 'pictures/' + picture).show();
                    nameInput.val(r.name);
                    ingredients = ingredients.split(' ').join(''); // delete ingredients white-space if any
                    // console.log("ingredients", ingredients);
                    ingredientsInputArray = ingredients.split(',');
                    ingredientsInputArray.forEach(function(item) {
                        ingredientsInputFunction(item);
                        // console.log(item);
                    });
                    instructionsInput.val(r.instructions);
                    $(categoryInput).children(":selected").attr("id");
                    notesInput.val(r.notes);
                    //phoneInput.val(r.phone); /** get phone number from database or user cookies or login element */
                }
            }).fail(function(jqxhr) {
                alert("Invalid, Try again!");
            });
        });
    }
    /*=====  edit recipe   ======*/

    function updateRecipe(recipe) {
        var recipeID = recipeid; // //update recipe by matching id

        $.post('editRecipe.php', { recipe: recipe, recipeID: recipeID }, function() {
            getRecipeName(); /* get recipes again.. as in refresh, does use a lot of bandwith need to find a better solution */
            getRecipeCategory(); /* get recipes again.. as in refresh, does use a lot of bandwith need to find a better solution */
            printRecipe.empty();
            recipeCategorys.find('option:not(:first)').remove();
            infoAlerts('Your <strong>' + recipe.name + '</strong> recipe was successfully updated');
        }).fail(function(jqXHR, a, b) {
            console.log('Error:', jqXHR, a, b);
            // put message here
        });

        var recipePictureName = recipePicture;

        var formData = new FormData();
        var imagefile = document.querySelector('#pictureInput');
        if (imagefile.files && imagefile.files[0]) {
            formData.append("file", imagefile.files[0], recipePictureName);
        }
        $.ajax({
            url: 'editRecipeImage.php',
            type: 'POST',
            cache: false,
            contentType: false,
            processData: false,
            data: formData,
            success: function() {}
        });
    }

    var hardCodedCategorysArray = ['appetizers', 'bread', 'breakfast', 'desserts', 'drinks', 'main dish', 'salad', 'side dish', 'soups', 'pastries', 'snacks for kids', 'wraps and rolls', 'meat', 'dips and spreads', 'challah', 'muffins', 'baked goods', 'fish', 'pasta', 'milchig', 'shabbos specials', 'other'];
    hardCodedCategorysArray.sort();


    addRecipes.click(function() {
        categoryInput.append('<option id="undefined">-- Add Category --</option>');
        //categorysArray.forEach(function(ca){ // //get categorys from db
        hardCodedCategorysArray.forEach(function(ca) {
            categoryInput.append('<option id=' + /*ca.category*/ ca + '>' + /*ca.category*/ ca + '</option>');
        });
        $('#dialog').show();
        $('.model').show();
    });

    function ingredientsInputFunction(ingredients) {
        if (!ingredients) {
            ingredients = "";
        }
        const ingredient =
            `<tr><td><input class="ingredientsInput form-control" value="${ingredients}"/></td>
        <td id="removeLineingredientsInput" class="btn btn-xs btn-warning"><i class="fa fa-minus-circle" aria-hidden="true"></i> remove line</td>
        <td id="addLineingredientsInput" class="btn btn-xs btn-info"><i class="fa fa-plus-circle" aria-hidden="true"></i> add line</td></tr>`;
        $(ingredient).appendTo('tbody');
        ingredientsInputArray = [];
        ingredientsArray = [];
    }

    $(document).on('click', '#removeLineingredientsInput', function() {
        $(this).closest('tr').remove();
    });
    $(document).on('click', '#addLineingredientsInput', function() {
        // $('tbody').append(ingredient); 
        // $(ingredient).appendTo('tbody');
        ingredientsInputFunction();
    });

    $('<div id="addIngredientButton" class="btn btn-info"><i class="fa fa-plus-circle" aria-hidden="true"></i> add ingredient</div>').appendTo('table').click(function() {
        ingredientsInputFunction();
    });

    function hideDialog() {
        $('#dialog').hide();
        $('.model').hide();
        addRecipeForm[0].reset();
        categoryInput.empty();
        $('tbody').empty('tr');
        $('#inputErrors').empty();
        $('#visualImage').hide();
    }
    $('#cancel').click(function() {
        hideDialog();
    });
    $('#clear').click(function() {
        addRecipeForm[0].reset();
        $('#inputErrors').empty();
        $('tbody').empty('tr');
    });
    $('#close').click(function() {
        hideDialog();
    });

}());

//<!-- SITE MAP BELOW-->//

// // code explanation

/** TODO **/

/*=============================================
            Section comment block            
=============================================*/

/*=====  End of Section comment block  ======*/

// urgent continue working on this
//    | |   
//    | |
//   ------
//    \  /
//     \/