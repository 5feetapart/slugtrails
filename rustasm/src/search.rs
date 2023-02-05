use std::{collections::HashMap, convert::TryInto};

use geoutils::Location;
use js_sys::{parse_float, Array};
use wasm_bindgen::{prelude::wasm_bindgen, JsCast, JsValue};
struct Weights {
    tags: f64,
    weather: f64,
    open: f64,
    distance: f64,
}

const WEIGHTS: Weights = Weights {
    tags: 1.0,
    weather: 5.0,
    open: 5.0,
    distance: -1.0,
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
struct Activity {
    title: String,
    condition: String,
    location: geoutils::Location,
    tags: Vec<String>,
    temperature: f64,
    weather: String,
    week_times: [Option<Vec<(f64, f64)>>; 7],
}

#[wasm_bindgen]
struct User {
    location: geoutils::Location,
    temperature: f64,
    weather: String,
    time: f64,
}

impl From<Array> for Activity {
    fn from(array: Array) -> Self {
        let iter = array.iter();

        let title = iter.next().unwrap().as_string().unwrap();
        let condition = iter.next().unwrap().as_string().unwrap();

        let location = iter.next().unwrap().as_string().unwrap();
        let location = location.split(',').map(|e| parse_float(e));
        let location = Location::new(location.next().unwrap(), location.next().unwrap());

        let tags: Array = iter.next().unwrap().into();
        let tags: Vec<String> = tags
            .to_vec()
            .iter()
            .map(|tag| tag.as_string().unwrap())
            .collect();

        let temperature = iter.next().unwrap().as_f64();

        let weather = iter.next().unwrap().as_string().unwrap();

        let week_times: Vec<JsValue> = (0..6).map(|_| iter.next().unwrap()).collect();
    }
}

#[wasm_bindgen]
pub fn search(locationArray: Array, userArray: Array, search: &str) -> Array {
    let mut activities: Vec<Activity> = Vec::new();
    let mut user: User = User {
        location: geoutils::Location::new(0.0, 0.0),
        temperature: 0.0,
        weather: String::new(),
        time: 0.0,
    };
}
