use std::collections::HashMap;

use js_sys::Array;
use wasm_bindgen::{prelude::wasm_bindgen, JsValue};

use crate::package_visits;

#[derive(Debug, Eq, Ord, PartialEq, PartialOrd)]
#[wasm_bindgen]
pub struct Place 
{
    visit_ct: usize,
    id: usize
}


impl Place {
    pub fn new(id: usize, visit_ct: usize) -> Place
    {
        Place{id, visit_ct}
    }
}

#[wasm_bindgen]
pub fn favorite_activity(data: Array) -> Array
{
    let visits = package_visits(data);
    let mut freq: HashMap<usize, Place> = HashMap::new();

    for visit in visits
    {
        if let Some(value) = freq.get_mut(&visit.id)
        {
            value.visit_ct += 1;
        }
        else
        {
            freq.insert(visit.id, Place::new(visit.id, 1));
        }
    }

    let vals = freq.drain();
    let mut vec: Vec<Place> = vals.map(|(_, val)| val).collect();

    vec.sort();
    vec.into_iter().map(JsValue::from).collect()
}

#[test]
fn test_favorite_activity()
{
    let arr = Array::new();
    let test_data = [0, 23812324, 21387372, 1, 2371823, 8391238];

    for num in test_data {
        arr.push(&num.into());
    }
    
    favorite_activity(arr);
}