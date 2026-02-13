import PropTypes from 'prop-types';
import { ActionBarContainer } from '../styles';

function ActionBar({ children }) {
    return <ActionBarContainer>{children}</ActionBarContainer>;
}

ActionBar.propTypes = {
    children: PropTypes.node,
};

export default ActionBar;
