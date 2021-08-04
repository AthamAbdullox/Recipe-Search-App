import React, { useState, useEffect } from 'react'
import axios from "axios";
import './RecipeInform.css'

export default function RecipeInform(props) {
    const [recipeInform,setRecipeInform] = useState([])
    const [ options ] = useState({
        method: 'GET',
        url: `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/${props.location.search.replace(/\D/g,"")}/information`,
        headers: {
        'x-rapidapi-key': '79d55e6135msh32b4af25cbeedd5p14a581jsn1c7792f0f9df',
        'x-rapidapi-host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com'
        }
    }) 
    useEffect(()=>{
        const requests = axios.request(options)
        async function fetchData() {
            requests.then(function (response) {
            console.log(response.data)
            setRecipeInform(response.data)
            }).catch(function (error) {
            console.error(error);
            });
        }
        fetchData()     
    }, [options])
    
    return (
        <div> 
            <section className="title">
                <h1 className="title__text">{recipeInform.title}</h1>
            </section> 
            <section className="row__column">
            <div className="list__block">
                    <ul className="list-group">
                        {recipeInform.extendedIngredients && recipeInform.extendedIngredients.map(ingredient => (
                            <li className="list-group-item"> 
                                {ingredient.originalString}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="image__block">
                    <img src={recipeInform.image} alt="recipe" />
                </div> 
            </section>
            <section className="numbered__block">
                    {recipeInform.analyzedInstructions && recipeInform.analyzedInstructions[0].steps.map(step=>
                    {if(step.number % 2 === 0)
                        return (
                            <div className="block__separator">
                            <p>{step.step}</p>
                            <div className={`number__block number-${step.number}`} >{step.number}</div>
                            </div>
                        )
                        else return (
                            <div className="block__separator">
                                <div className={`number__block number-${step.number}`} >{step.number}</div>
                                <p>{step.step}</p>
                            </div>
                        )
                    }
                    )
                }
            </section>
            <section className="info">
                <div className="info__block">
                    <h2>Agregate Likes</h2>
                    <p>❤️{recipeInform.aggregateLikes}</p>
                </div>
                <div className="info__block">
                    <h2>Health Score</h2>
                    <p>{recipeInform.healthScore}</p>
                </div>
                <div className="info__block">
                    <h2>Cooking Minutes</h2>
                    <p>{recipeInform.cookingMinutes && recipeInform.readyInMinutes}</p>
                </div>
            </section>
        </div>
    )
}
