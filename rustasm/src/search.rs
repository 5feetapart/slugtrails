
use geoutils::Location;
struct Weights<'a> {
    tags: f64,
    weather: f64,
    open: f64,
    distance: f64,
}

const WEIGHTS: Weights<'static> = Weights {
    tags: 1,    
    weather: 5,
    open: 5,
    distance: -1
};

/**
 * locationArray: 
 * [
 *      title, 
 *      condition, 
 *      location, 
 *      monday?, tuesday?, wednesday?, thursday?, friday?, 
 *      tags: string[], 
 *      
 * ][]
 * userArray: [location, temperature, condition, time ]
 * DayTimes: [start, end] or [start, end, start, end] decimal 24 hour relative to Santa Cruz time
 */

#[wasm_bindgen]
fn search(locationArray: Array, userArray: Array, search: &str) -> Array
{

}