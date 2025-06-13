// File: app/components/Sneaker.tsx
// Purpose: Represents a falling sneaker in the "Click The Sneaker" game.

import React, { useRef } from 'react';
import { Animated, TouchableOpacity, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

/**
 * Sneaker Component
 * @param {Object} props - Component properties.
 * @param {{x: number, y: number}} props.position - The x and y coordinates of the sneaker.
 * @param {() => void} props.onClick - Callback function triggered when the sneaker is clicked.
 */
function Sneaker({ position, onClick }: { position: { x: number; y: number }; onClick: () => void }) {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePress = () => {
    // Trigger scaling animation for feedback
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 1.2,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start(() => onClick());
  };

  return (
    <Animated.View
      style={[
        styles.sneaker,
        { top: position.y, left: position.x, transform: [{ scale: scaleAnim }] },
      ]}
    >
      <TouchableOpacity onPress={handlePress}>
        <Icon name="shoe-sneaker" size={50} color="#000" />
      </TouchableOpacity>
    </Animated.View>
  );
}

Sneaker.propTypes = {
  position: PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
  }).isRequired,
  onClick: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  sneaker: {
    position: 'absolute',
  },
});

export default Sneaker;
