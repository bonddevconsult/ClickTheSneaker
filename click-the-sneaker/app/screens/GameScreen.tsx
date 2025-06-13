// File: app/screens/GameScreen.tsx
// Purpose: Manages the game state and renders the falling sneakers in the "Click The Sneaker" game.

import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Dimensions, Text } from 'react-native';
import Sneaker from '../components/Sneaker';

const { width, height } = Dimensions.get('window');

/**
 * GameScreen Component
 * Manages the game state, spawns sneakers, and handles user interactions.
 */
type SneakerType = {
  id: string;
  position: {
    x: number;
    y: number;
  };
};

function GameScreen() {
  const [sneakers, setSneakers] = useState<SneakerType[]>([]);
  const [score, setScore] = useState(0);

  // Spawn a new sneaker every 2 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      const newSneaker = {
        id: Date.now().toString(),
        position: {
          x: Math.random() * (width - 50), // Random x position within screen width
          y: 0, // Start at the top of the screen
        },
      };
      setSneakers((prev) => [...prev, newSneaker]);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  // Update sneaker positions
  useEffect(() => {
    const interval = setInterval(() => {
      setSneakers((prev) =>
        prev
          .map((sneaker) => ({
            ...sneaker,
            position: { ...sneaker.position, y: sneaker.position.y + 5 },
          }))
          .filter((sneaker) => sneaker.position.y < height) // Remove sneakers that go off-screen
      );
    }, 50);

    return () => clearInterval(interval);
  }, []);

  // Handle sneaker click
  const handleSneakerClick = (id) => {
    setSneakers((prev) => prev.filter((sneaker) => sneaker.id !== id));
    setScore((prev) => prev + 1);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.score}>Score: {score}</Text>
      {sneakers.map((sneaker) => (
        <Sneaker
          key={sneaker.id}
          position={sneaker.position}
          onClick={() => handleSneakerClick(sneaker.id)}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  score: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 10,
  },
});

export default GameScreen;
