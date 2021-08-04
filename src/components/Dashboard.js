import React ,{ useState }from "react"
import { Form, Button } from "react-bootstrap"
import axios from "axios";
import './Results.css'

import CardsBar from './CardsBar';


export default function Dashboard() {
  const [ recipes, setRecipes ] = useState([])
	
	// eslint-disable-next-line react-hooks/exhaustive-deps
	const options = {
		method: 'GET',
		url: 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/search',
		params:{"number":20},
		headers: {
		'x-rapidapi-key': '79d55e6135msh32b4af25cbeedd5p14a581jsn1c7792f0f9df',
		'x-rapidapi-host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com'
		}
	};
	
    function searchButton() {
			if(document.getElementById("formBasicSearch").value){
				options.params={...options.params,
												"query":document.getElementById("formBasicSearch").value,
												"diet":document.getElementById("formBasicCheckbox").checked?"vegetarian":""
					}
				document.getElementById("formBasicSearch").value=""
			const requests = axios.request(options)
			async function fetchData() {
				requests.then(function (response) {
				setRecipes(response.data.results)
				}).catch(function (error) {
				console.error(error);
				});
			}
			fetchData()
	}

    }

  return (
    <>
      <div>
				<Form className="form">
					<Form.Group className="mb-3" controlId="formBasicSearch">
					<Form.Label> Search </Form.Label>
					<Form.Control type="text" placeholder="Search" onKeyPress={event => {
                if (event.key === 'Enter') {
                  searchButton()
                }}}/>
					<Form.Text className="text-muted">
						Search recipe which you need 
					</Form.Text>
					</Form.Group>
					<Form.Group className="mb-3" controlId="formBasicCheckbox">
					<Form.Check type="checkbox" label="vegetarian" />
					</Form.Group>
					<Button variant="primary" onClick={searchButton}>
						search
					</Button>
				</Form>
				<div className="scene">
				{recipes.map((recipeData)=> (
				<CardsBar recipeData={recipeData}/>	
				))}		
				</div>	
			</div>
    </>
  )
}