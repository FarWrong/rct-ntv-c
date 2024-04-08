@ -0,0 +1,140 @@
import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, ScrollView } from 'react-native';
import CalendarStrip from 'react-native-calendar-strip';
import moment from 'moment'; // Make sure moment is installed

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#f7f7f7',
  },
  headerText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
  content: {
    padding: 20,
  },
  userStats: {
    marginBottom: 20,
    padding: 20, // Increased padding for a larger box
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    // You might also consider adjusting these for a bigger box
    marginHorizontal: 1, // Adjust as needed to control width
    marginTop: 20, // Adjust for more space above the box
  },
  statText: {
    fontSize: 18, // Larger font size for better readability
    marginBottom: 10, // Space between each stat line
    fontWeight: 'bold', // Optional: Makes text bold for emphasis
  },
  leaderboardContainer: {
    marginTop: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
  },
  leaderboardHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  leaderboardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
  },
  highlightedRow: {
    backgroundColor: '#e6f7ff', // Light blue to highlight the user
  },
  leaderboardText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  boldText: {
    fontWeight: 'bold',
  },
});

export default function WorkoutPage() {
    const customDateStyles = [
        {
          startDate: moment(), // Today's date
          dateNameStyle: { color: 'red' }, // Style for the day of the week
          dateNumberStyle: { color: 'red' }, // Style for the date number
          // For even more emphasis, you could customize the date container as well:
          dateContainerStyle: { backgroundColor: 'lightgrey' },
        },
      ];
  const [leaderboardData, setLeaderboardData] = useState([]);
  // Assuming 'currentUser' identifies the logged-in user's position in the leaderboard
  const currentUser = 'User';
  const currentUserStats = { caloriesBurned: 500, milesWalked: 4.38 };

  useEffect(() => {
    const mockLeaderboardData = [
      { name: 'Diana', caloriesBurned: 600 },
      { name: 'USER', caloriesBurned: 500 },
      { name: 'Charlie', caloriesBurned: 450 },
      { name: 'Bob', caloriesBurned: 300 },
    ];
    setLeaderboardData(mockLeaderboardData);
  }, []);

  return (
    
    <ScrollView style={styles.container}>
    <View style={styles.header}>
      <Text style={styles.headerText}>Health Data</Text>
    </View>
    <CalendarStrip
  style={{ height: 80, paddingTop: 5, paddingBottom: 5 }} // Reduced height and padding
  calendarColor={'#f7f7f7'}
  customDatesStyles={customDateStyles}
  iconContainer={{ flex: 0.1 }}
  dateNumberStyle={{ fontSize: 20 }} // Smaller date numbers
  dateNameStyle={{ fontSize: 10 }} // Smaller day names
  highlightDateNumberStyle={{ color: 'red', fontSize: 20 }} // Ensure highlighted date numbers match
  highlightDateNameStyle={{ color: 'red', fontSize: 20 }} // Ensure highlighted day names match
/>

      {/* User's Own Stats */}
      <View style={styles.content}>
      <View style={styles.userStats}>
  <Text style={styles.statText}>Your Stats:</Text>
  <Text style={styles.statText}>Calories Burned: {currentUserStats.caloriesBurned}</Text>
  <Text style={styles.statText}>Miles Walked: {currentUserStats.milesWalked}</Text>
</View>
        {/* Leaderboard */}
        <View style={styles.leaderboardContainer}>
          <Text style={styles.leaderboardHeader}>Leaderboard</Text>
          {leaderboardData.map((user, index) => (
            <View key={index} style={[styles.leaderboardRow, user.name === currentUser && styles.highlightedRow]}>
              <Text style={[styles.leaderboardText, user.name === currentUser && styles.boldText]}>
                {index + 1}. {user.name}
              </Text>
              <Text style={[styles.leaderboardText, user.name === currentUser && styles.boldText]}>
                {user.caloriesBurned} calories
              </Text>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}