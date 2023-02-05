mod utils;
mod favorite_activity;

use std::{array, convert::TryInto, vec, ops::IndexMut, collections::HashMap};

use favorite_activity::Place;
use js_sys::{Array, Float32Array};
use wasm_bindgen::prelude::*;

extern crate chrono;
use chrono::{prelude::DateTime, Timelike};
use chrono::Utc;
use std::time::{SystemTime, UNIX_EPOCH, Duration};

// When the `wee_alloc` feature is enabled, use `wee_alloc` as the global
// allocator.
#[cfg(feature = "wee_alloc")]
#[global_allocator]
static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;

/*
Example Data: [0, 23812324, 21387372, 1, 2371823, 8391238]
        - Example Data has 2 visits.

        - Each visit contains three different key values:
                - visit ID
                - start time
                - end time

Output:
        - Streak length (at least once per day, for however many days)
    X   - How many hours per day (on average)
    X   - Favorite Activities (sort by frequency)
    X   - The hour(s) the person is most active
    ?   - Calender day and number of hours each day for a month
*/

pub struct Visit
{
    id: usize,
    start: usize,
    end: usize
}

fn js_option_to_int(option: Option<JsValue>) -> Option<usize>
{
    if let Some(val) = option
    {
        let val = val.as_f64();
        match val 
        {
            Some(num) => return Some(num.round() as usize),
            None => return None,
        }
    }
    return None;
}

pub fn package_visits(data: Array) -> Vec<Visit>
{
    let mut vec: Vec<Visit>= Vec::new();

    let mut iter = data.iter();
    loop 
    {
        let [id, start, end] = [iter.next(), iter.next(), iter.next()].map(|elem| js_option_to_int(elem));
        if let (Some(id), Some(start), Some(end)) = (id, start, end) 
        {
            vec.push(Visit { id, start, end })
        }
        else 
        {
            break;
        }
    }
    return vec;
}

#[wasm_bindgen]
pub fn average_daily_hours(data: Array) -> f32
{
    let visits = package_visits(data);

    let mut sum: usize = 0;
    let mut num: usize = 0;

    for visit in visits
    {
        sum += visit.end - visit.start;
        num += 1;
    }

    return (sum as f32) / (num as f32);
}

#[wasm_bindgen]
pub fn active_hours(data: Array) -> u32
{
    const HOURS_IN_DAY: usize = 24;

    let visits = package_visits(data);
    let mut hours: [usize; HOURS_IN_DAY] = [0; HOURS_IN_DAY];

    for visit in visits
    {
        let trueStart = UNIX_EPOCH + Duration::from_secs(visit.start as u64);
        let dateTime = DateTime::<Utc>::from(trueStart);

        hours[dateTime.hour() as usize] += 1;
    }

    let mut max: usize = 0;
    for i in 0..hours.len()
    {
        if hours[i] > hours[max]
        {
            max = i;
        }
    }

    return max as u32;
}

// #[wasm_bindgen]
// pub fn streak_length(data: Array) -> u32
// {
//     let visits = package_visits(data);
// }