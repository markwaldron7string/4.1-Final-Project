      const searchInput = document.getElementById('searchInput');
      const searchButton = document.getElementById('searchButton');
      const resultsDiv = document.getElementById('results');

      searchButton.addEventListener('click', searchRecipes);

      searchInput.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
          searchRecipes();
        }
      });

      function searchRecipes() {
        const query = searchInput.value.trim();
        if (!query) {
          alert('Please enter a search term.');
          return;
        }
        const apiKey = '8fd10763769f47de8d36549896f64e86';
        const apiUrl = `https://api.spoonacular.com/recipes/complexSearch?query=${encodeURIComponent(query)}&number=5&addRecipeNutrition=true&apiKey=${apiKey}`;

        resultsDiv.innerHTML = '<p>Searching for recipes...</p>';

        fetch(apiUrl)
          .then(response => response.json())
          .then(data => {
            resultsDiv.innerHTML = '';
            if (!data.results || data.results.length === 0) {
              resultsDiv.innerHTML = '<div class="no-results">No recipes found. Try a different search term!</div>';
              return;
            }
            data.results.forEach(recipe => {
              const title = recipe.title;
              const image = recipe.image;
              let calories = '', protein = '', fat = '', carbs = '';
              if (recipe.nutrition && recipe.nutrition.nutrients) {
                const nutrients = recipe.nutrition.nutrients;
                const calInfo = nutrients.find(n => n.name === 'Calories');
                const proteinInfo = nutrients.find(n => n.name === 'Protein');
                const fatInfo = nutrients.find(n => n.name === 'Fat');
                const carbsInfo = nutrients.find(n => n.name === 'Carbohydrates');
                if (calInfo) calories = Math.round(calInfo.amount) + ' ' + calInfo.unit;
                if (proteinInfo) protein = Math.round(proteinInfo.amount) + ' ' + proteinInfo.unit;
                if (fatInfo) fat = Math.round(fatInfo.amount) + ' ' + fatInfo.unit;
                if (carbsInfo) carbs = Math.round(carbsInfo.amount) + ' ' + carbsInfo.unit;
              }
              const recipeDiv = document.createElement('div');
              recipeDiv.className = 'recipe';
              recipeDiv.innerHTML = `
            <h3>${title}</h3>
            <img src="${image}" alt="${title}">
            <p><strong>Calories:</strong> ${calories}</p>
            <p><strong>Carbs:</strong> ${carbs}</p>
            <p><strong>Protein:</strong> ${protein}</p>
            <p><strong>Fat:</strong> ${fat}</p>
          `;
              resultsDiv.appendChild(recipeDiv);
            });
          })
          .catch(error => {
            console.error('Error fetching recipes:', error);
            resultsDiv.innerHTML = '<div class="error">Error fetching recipes. Please try again later.</div>';
          });
      }

    const calorieSlider = document.getElementById('calorie-range');
    const calorieDisplay = document.getElementById('calorie-display');
    calorieDisplay.textContent = calorieSlider.value;
    calorieSlider.oninput = function() {
    calorieDisplay.textContent = this.value;
};











