import { useNavigate, useLocation } from 'react-router-dom';
import { FooterNavContainer, FooterNavLink, FooterNavLinks } from '../styles';

function Footer({ user }) {
    const navigate = useNavigate();
    const location = useLocation();
    const path = location.pathname;

    const isFeed = path === '/';
    const isExplore = path === '/search';
    const isProfile = path.startsWith('/profile');

    return (
        <FooterNavContainer>
            <FooterNavLinks>
                <FooterNavLink $active={isFeed} onClick={() => navigate('/')}>
                    {isFeed ? '[FEED]' : 'FEED'}
                </FooterNavLink>
                <FooterNavLink
                    $active={isExplore}
                    onClick={() => navigate('/search')}
                >
                    {isExplore ? '[EXPLORE]' : 'EXPLORE'}
                </FooterNavLink>
                {user ? (
                    <FooterNavLink
                        $active={isProfile}
                        onClick={() => navigate(`/profile/${user.uid}`)}
                    >
                        {isProfile ? '[PROFILE]' : 'PROFILE'}
                    </FooterNavLink>
                ) : (
                    <FooterNavLink onClick={() => navigate('/sign-in')}>
                        SIGN IN
                    </FooterNavLink>
                )}
            </FooterNavLinks>
        </FooterNavContainer>
    );
}

export default Footer;
