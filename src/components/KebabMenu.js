import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
    KebabMenuButton,
    KebabMenuContainer,
    KebabMenuDropdown,
    KebabMenuItem
} from '../styles';

function KebabMenu({  items, onItemClick }) {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef(null);

    const handleClickOutside = (e) => {
        if (containerRef.current && !containerRef.current.contains(e.target)) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        if (!isOpen) return;

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isOpen]);

    const handleItemClick = (item) => {
        onItemClick(item);
        setIsOpen(false);
    };

    return (
        <KebabMenuContainer ref={containerRef}>
            <KebabMenuButton onClick={() => setIsOpen(!isOpen)}>
                ⋮
            </KebabMenuButton>
            {isOpen && (
                <KebabMenuDropdown>
                    {items.map((item) => (
                        <KebabMenuItem
                        key={item.id}
                        onClick={() => handleItemClick(item)}
                        >
                            {item.label}
                        </KebabMenuItem>
                    ))}
                </KebabMenuDropdown>
            )}
        </KebabMenuContainer>
    );
}

KebabMenu.propTypes = {
    items: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            label: PropTypes.string.isRequired
        })
    ).isRequired,
    onItemClick: PropTypes.func.isRequired
};

export default KebabMenu;
