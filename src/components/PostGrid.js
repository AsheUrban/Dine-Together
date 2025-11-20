import React from 'react';
import Place from './Place';
import PropTypes from 'prop-types';
import { H1 } from '../styles';

function PostGrid(props) {
    const { postList, onPostSelection } = props;

    return (
        <>
            {postList.length > 0 ? (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', width: '100%' }}>
                    {postList.map((post) => (
                        <div key={post.id}>
                            <Place
                                whenPlaceClicked={onPostSelection}
                                restaurantName={post.restaurantName}
                                restaurantAddress={post.restaurantAddress}
                                priceLevel={post.priceLevel}
                                rating={post.rating}
                                userRatingsTotal={post.userRatingsTotal}
                                timeOpen={post.timeOpen}
                                id={post.id}
                            />
                        </div>
                    ))}
                </div>
            ) : (
                <H1>No restaurants have been added yet. Explore restaurants to get started!</H1>
            )}
        </>
    );
}

PostGrid.propTypes = {
    postList: PropTypes.array.isRequired,
    onPostSelection: PropTypes.func.isRequired
};

export default PostGrid;
