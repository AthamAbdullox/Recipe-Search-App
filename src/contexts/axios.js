import axios from "axios";

const options = {
  method: 'GET',
  url: 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/100/information',
  headers: {
    'x-rapidapi-key': '79d55e6135msh32b4af25cbeedd5p14a581jsn1c7792f0f9df',
    'x-rapidapi-host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com'
  }
};

const requests = axios.request(options)

export default requests;