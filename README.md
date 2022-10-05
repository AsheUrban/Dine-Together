# CAPSTONE PROJECT: Dine-Together

#### A simple react based web application using google places api.

#### By Ashe Urban

## Technologies Used

* _JavaScript_
* _React_
* _Places API_
* _CSS_
* _JSX_
* _Markdown_

## Description

_My minimum viable product for this project will be a react based app with a robust UI that allows users to login, update a profile, and create a wishlist of places they want to eat by connecting with the OpenTable API or the google places API._

## Goals

* _Making organizing dinners out with other people easy_
* _Local restauant exposure_

## Setup/Installation Requirements

* _TBD_

## Known Bugs

* _TBD_

## License

* MIT

## Contact Information

_Please contact me with any questions or contribuitions, ashe@goldentongue.com_

Copyright(c) July 2022 Ashe Urban

### Research & Planning Log
See AltApproach branch for full commit history.

#### Friday, 09/16 

* 7:50: Start organizing project README.md and capstone-proposal. 
        review epicenter instructions.
* 8:15: Start research how/ why/ when to use webpack with react.
* 9:15: Research cont.

https://www.apexon.com/blog/webpack-and-react-no-need-to-fear/
https://www.arrowhitech.com/webpack-the-advantages-and-how-to-set-it-up-for-react/
https://www.toptal.com/react/webpack-react-tutorial-pt-1
https://www.youtube.com/watch?v=WDpxqopXd9U - repo linked

* 10:05: Start research how/ why/ when to use mysql with React and webpack.

https://www.youtube.com/watch?v=t4ZAdwPZe9A - uses some tech I don't know I need/ want to use
https://www.youtube.com/watch?v=kHmbg4Z7Ihw - seems doable, repo linked 

https://dev.to/nasreenkhalid/simple-react-js-and-mysql-integration-crud-app-backend-5aom

https://blog.logrocket.com/how-use-typescript-react-tutorial-examples/
https://www.typescriptlang.org/docs/handbook/jsx.html
https://reactjs.org/docs/static-type-checking.html

* 11:30: Cont. research.

Look ahead at firebase and apis hw.
Research places api

https://developers.google.com/maps/documentation/places/web-service/search
https://stackoverflow.com/questions/16308357/google-api-for-restaurants-places

* 12:30: Begin initial project set up.
* 1:15: Research Cont.

https://reactjs.org/docs/thinking-in-react.html
https://reactjs.org/docs/thinking-in-react.html#step-4-identify-where-your-state-should-live
https://reactjs.org/docs/hooks-rules.html
https://reactjs.org/docs/hooks-intro.html

* 2:15: Sketch out app UI ideas.
* 3:00: Research social media platform best practices. Cont. research and planning.
* 4:00: Research other restaurant api options.
* 4:30: Sketch more app UI ideas.
        Consider aesthetics and branding.
        Color pallette and font research.
        https://drive.google.com/drive/u/0/folders/1HbbrEm5jMQ_hqv6xNt3sWV4F7oj4QDZf

#### Sunday, 9/18

* 3:30: Wrap up capstone proposal.

#### Friday, 9/23

* 11:30: Organizing to-dos!
* 12:20: Start initial coding - componenet set up.

See commits for remaining time.

#### Sunday, 9/25

* 10:00: Research & Planning, using API with react.
* 10:30-12:30: API HW (hours not counted).
* 12:30: Start working on adding API to app.

https://developers.google.com/maps/documentation/places/web-service/overview

* 1:00: Create API key for google places.
  
  will try to use 'dine_in' boolean to filter for restaurants that would be applicable and 'locality'.

  would like to start by simply returning a list of restaurants with the following fields:
         name
         formatted address or address component
         dine_in

* 2:00:  looking for endpoint documentation and how to use it...

https://maps.googleapis.com/maps/api/place/details/output?parameters
https://www.youtube.com/watch?v=5iE4kqbEKoY
https://www.telerik.com/blogs/integrating-google-places-autocomplete-api-react-app
https://www.youtube.com/watch?v=WZcxJGmLbSo

Quick Overview:
 * .env created and key added
 * actions and reducers folders created
 * RestaurantList file added - idea is to first pull in API and return a list of restaurants based on location.
 * API key created
 * Lots of research on how to use API

* 3:00: end -

#### Friday, 9/30

* 11:30: Initial commit - was at the dr. this morning and not feeling great.

#### Saturday, 10/1

* 2:00 - 4:00: API testing in postman and reading through documentation I wish I could make this thing work!!!
* 4:00 - 5:00: Styling
* 5:00 - 6:00: build out powerpoint color guide

#### Sunday, 10/2

* 3:00: WIP API connection
* 4:00 - 5:00: Discovered google maps API isn't pointed at end users; identified React module "Google Places Autocomplete" for better-supported location API. TODO: RestaurantList.js useEffect() URL needs to be updated/method of calling API needs to use react module instead (as defined in AutoComplete.js, see tintef.github.io/react-google-places-autocomplete)

See AltApproach branch for full commit history.

#### Tuesday, 10/4

* 9:00: Move back to main branch to work on implementing styles. See commit history.
* 12:00-1:30: Lunch
* 2:30: Cont. apply styling
* 5:00: End for day

#### Wednesday, 10/5

Sick and some styling

