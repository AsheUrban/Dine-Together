// import React from 'react';
// import Place from './Place';
// import PropTypes from 'prop-types';
// import { FeedContainer, H1 } from '../styles';

// function PlaceList(props){
//     return (
//         <React.Fragment>
//             <FeedContainer>
//                 {props.placeList.length > 0 ? (
//                     props.placeList.map((place) =>
//                         <Place
//                             whenPlaceClicked={props.onPlaceSelection}
//                             restaurantName={place.restaurantName}
//                             restaurantAddress={place.restaurantAddress}
//                             priceLevel={place.priceLevel}
//                             rating={place.rating}
//                             userRatingsTotal={place.userRatingsTotal}
//                             timeOpen={place.timeOpen}
//                             id={place.id}
//                             key={place.id}/>
//                     )
//                 ) : (
//                     <H1>No restaurants have been added yet. Explore restaurants to get started!</H1>
//                 )}
//             </FeedContainer>
//         </React.Fragment>
//     );
// }

// PlaceList.propTypes = {
//     placeList: PropTypes.array,
//     onPlaceSelection: PropTypes.func
// };

// export default PlaceList;
