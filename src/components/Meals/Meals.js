import { Fragment } from "react";
import MealsSummary from "./MealsSummary";
import AvailableMeals from "./AvailabeMeals";

const Meals = () => {
    return ( 
        <Fragment>
            <MealsSummary/>
            <AvailableMeals/>
        </Fragment>
     );
}
 
export default Meals;