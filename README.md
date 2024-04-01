# Web Development Project 5 - Magic the Gathering Data Dashboard
Submitted by: Harshita Bhardwaj

This web app: This web app retrieves 50 random cards fron the Magic the Gathering API and features their key elements on the data dashboard. The user is also able to apply various filters to the data shown in order to filter what cards they see.

Time spent: 18-20 hours spent in total

## Required Features

The following **required** functionality is completed:

- [✅] **The list displays a list of data fetched using an API call**
- [✅] **Data uses the useEffect React hook and async/await syntax**
- [✅] **The app dashboard includes at least three summary statistics about the data such as**
  * The total number of cards shown
  * The number of Creatures in the cards displayed
  * the number of Sorceries in the cards displayed
  * the number of Enchantments in the cards displayed
- [✅] **A search bar allows the user to search for an item in the fetched data**
- [✅] **Multiple different filters (2+) allow the user to filter items in the database by specified categories**

The following **optional** features are implemented:

- [✅] Multiple filters can be applied simultaneously
- [✅] Filters use different input types such as a text input, a selection, or a slider
- [ ] The user can enter specific bounds for filter values

The following **additional** features are implemented:

* I Added a Refresh button to my filters div in case the user wants to refresh the data they have

## Video Walkthrough

Here's a walkthrough of implemented user stories:

<!-- Replace this with whatever GIF tool you used! -->

## Notes
For this project, I ran into several challenges. Here are the challenges I faced
* Difficulty figuring out how to remove the filters from the filtered list. It was easier to figure out how to remove all the filters but removing individual ones was difficult
* Determining what URL parameters I had to use to randomize the cards that are fetched every time and the number of cards fetched because the MTG API documentation was a little confusing
* Making sure the right state values were passed through properly because I lifted the state up to the App-level component
* Figuring out the best way to organize the data in a table setup (I ended up utilizing a flexbox to do this)

## License

    Copyright [2024] [Harshita Bhardwaj]

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

        http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
