import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom"
import { Card, OverlayTrigger, Tooltip } from "react-bootstrap"
import axios from "axios";

export default function CardsBar(props) {
    const [recipeInform,SetRecipeInform] = useState([])

    const [options] = useState({
        method: 'GET',
        url: `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/${props.recipeData.id}/information`,
        headers: {
        'x-rapidapi-key': '79d55e6135msh32b4af25cbeedd5p14a581jsn1c7792f0f9df',
        'x-rapidapi-host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com'
        }
    });

     useEffect(()=>{
        const requests = axios.request(options)
        async function fetchData() {
            requests.then(function (response) {
            SetRecipeInform(response.data)
            }).catch(function (error) {
            console.error(error);
            });
        }
        fetchData()
     },[options])
    
    const renderTooltip = () => {
        return(
        <Tooltip id="button-tooltip" >
            <h5>Ingredients</h5>
            <ul className="list-group">{recipeInform.extendedIngredients && recipeInform.extendedIngredients.map((ingredients)=>(
                <li key={ingredients.name} className="list-group-item">{ingredients.name}</li>
            ))}</ul>
        </Tooltip>
       );
       }
    
       
    return (
        <Card style={{ width: '18rem' }} className="Card">
            <Card.Img variant="top" src={`https://spoonacular.com/recipeImages/${props.recipeData.image}`} />
            <Card.Body className="CardBody">
                <OverlayTrigger
                    placement="right"
                    delay={{ show: 250, hide: 400 }}
                    overlay={renderTooltip()}
                >
                    <Card.Title><Link
                                    to={{pathname:"recipe-Inform",
                                        search:`${props.recipeData.id}`
                                        }} >
                                            {props.recipeData.title}
                                </Link>
                    </Card.Title>  
                </OverlayTrigger>        
            </Card.Body>
        </Card>
    )
}
