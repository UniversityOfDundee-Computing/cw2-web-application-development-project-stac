const cocktailLookup = "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=";
var searchString = document.URL.split('?cocktail=');
cocktailId = searchString[1]


const nutrionIxURL = "https://trackapi.nutritionix.com/v2/natural/nutrients"
const appId = "b7b5026c"
const appKey = "41069590f031cbec6925acafe29900ad"
const ingredientsRow = document.getElementById('ingredients');


function createNode(element) {
    return document.createElement(element);
}

function append(parent, el) {
    return parent.appendChild(el);
}



fetch(`${cocktailLookup}${cocktailId}`)
    .then(response => response.json())
    .then(data => {
        const results = data.drinks || [];

        const resultsContainer = document.getElementById('results');
        resultsContainer.innerHTML = '';
        results.forEach(drink => {


            ingredientsArrTemp = [drink.strIngredient1, drink.strIngredient2, drink.strIngredient3, drink.strIngredient4, drink.strIngredient5, drink.strIngredient6, drink.strIngredient7, drink.strIngredient8, drink.strIngredient9, drink.strIngredient10, drink.strIngredient11, drink.strIngredient12, drink.strIngredient13, drink.strIngredient14, drink.strIngredient15];
            ingredientsArr = []
            for (let i = 0; i < ingredientsArrTemp.length; i++) {
                currentIngredient = ingredientsArrTemp[i]
                if (currentIngredient == null) {
                    break
                } else {
                    ingredientsArr.push(currentIngredient)
                }
            }

            console.log(ingredientsArr)
            for (let i = 0; i < ingredientsArr.length; i++) {
                createCards(nutrionIxURL, ingredientsArr[i])
            }

        });
    })
    .catch(error => {
        console.error('Error:', error);
        alert('An error occurred while searching for the cocktail.');
    });





function createCards(url, ingredient) {
    fetch(nutrionIxURL, {
        method: "POST",
        body: JSON.stringify({
            "query": ingredient
        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8",
            "x-app-id": appId,
            "x-app-key": appKey
        }
    })
        .then((resp) => resp.json())
        .then(function (data) {
            let foods = data.foods;

            return foods.map(function (food) {

                const card = createNode('div');
                card.classList.add('card');
                card.classList.add('col-md-4');
                // card.innerHTML = `
                //     <img class="" src="${food.photo.highres}" alt="${food.food_name}">
                //     <h2>${food.food_name}</h2>
                //     <p>${food.serving_unit}</p>
                // `;
                card.innerHTML = `
                    <img class="" src="sample.jpg" alt="${food.food_name}">
                    <h2>${food.food_name}</h2>
                    <p>${food.serving_unit}</p>
                `;
                // resultsContainer.appendChild(card);


                // // let li = createNode('li'),
                // let img = createNode('img'),
                //     p = createNode('p'),
                //     h5 = createNode('h5');

                // let card = createNode('div'),
                //     cardBody = createNode('div')
                //     // column = createNode('div')
                //     ;

                // img.src = food.photo.highres;
                // // img.src = food.photo.thumb;
                // h5.innerHTML = `${food.food_name}`;
                // p.innerHTML = `${food.serving_unit}`;


                // img.setAttribute('class', 'card-img-top');
                // img.setAttribute('style', 'width: 18rem;')
                // h5.setAttribute('class', 'card-title');
                // p.setAttribute('class', 'card-text');

                // card.setAttribute('class', 'card');
                // card.setAttribute('class', 'col-md-4');

                // card.setAttribute('style', 'width: 18rem;');
                // cardBody.setAttribute('class', 'card-body');
                // // column.setAttribute('class', 'col-3');


                // append(cardBody, h5);
                // append(cardBody, p);
                // append(card, img);
                // append(card, cardBody);
                // // append(column, card);
                // // append(ingredientsRow, column);

                append(ingredientsRow, card);

            })
        })
        .catch(function (error) {
            console.log(error);
            console.error('Error:', error);
            alert('An error occurred while searching for the cocktail.');
        });
}


