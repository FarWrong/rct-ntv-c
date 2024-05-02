import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, View, FlatList, ScrollView } from 'react-native';
import { useApiContext } from '../../api/ApiContext';
import { defaultPageTheme} from '../utility/style';
import { feedType, getFriendFeed } from '../../api/Feed';
import { workout_category } from '../../api/Workouts';


export default function FriendsPage() {
  const { authToken,userData } = useApiContext();
  const [friendFeed, setFriendFeed] = useState<feedType[]>([]);

  useEffect(() => {
    const fetchFeed = async () => {
      try {
        const feed = await getFriendFeed(authToken);
        setFriendFeed(feed);
      } catch (error) {
        console.error('Error fetching friend feed:', error);
      }
    };
    fetchFeed();
  }, [userData]);

  const formatDuration = (duration: number) => {
    console.log("DURRR",duration)
    const hours = Math.floor(duration / 3600);
    const minutes = Math.floor((duration % 3600) / 60);
    const seconds = duration % 60;

    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const getCategoryColor = (category: workout_category) => {
    switch (category) {
      case workout_category.flexibility:
        return '#F9A825';
      case workout_category.cardio:
        return '#64B5F6';
      case workout_category.strength:
        return '#81C784';
      default:
        return '#BDBDBD';
    }
  };

  const renderFeedItem = (item:feedType) => {
    console.log("END TIME", item.end.toISOString());
    console.log(item.expectedTime);
    const actualDuration = (item.end && item.start) ? Math.floor((item.end.getTime() - item.start.getTime()) / 1000) : 0;
    const expectDuration =item.expectedTime * 60
    const isFulfilled = actualDuration >= item.expectedTime;

    return (
      <View style={[styles.feedItem, { backgroundColor: isFulfilled ? '#C8E6C9' : getCategoryColor(item.workout_type.category) }]}>
        <Text style={styles.username}>{item.user}</Text>
        <Text style={styles.workoutType}>{item.workout_type.name}</Text>
        <Text style={styles.category}>Category: {item.workout_type.category ? item.workout_type.category : "d"}</Text>
        <Text style={styles.category}>Heartrate: {item.avg_heartrate ? item.avg_heartrate : "N/A"}</Text>
        <Text style={styles.duration}>Expected Duration: {formatDuration(expectDuration)}</Text>
        <Text style={styles.actualDuration}>Actual Duration: {formatDuration(actualDuration)}</Text>
      </View>
    );
  };

  return (
    <>
    <ScrollView style = {styles.heading}>
      <Text style = {styles.headerText} >Feed</Text>

      {friendFeed?.map((val,idx)=>{return renderFeedItem(val)})}
  

    </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  feedContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  feedTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  feedList: {
    paddingBottom: 20,
  },
  feedItem: {
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  },
  username: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  workoutType: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  category: {
    fontSize: 14,
    marginBottom: 5,
  },
  duration: {
    fontSize: 14,
    marginBottom: 5,
  },
  actualDuration: {
    fontSize: 14,
    marginBottom: 5,
  },
  fulfilled: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold'
  },
  heading: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: 24,
    paddingLeft: 12,
    paddingRight: 12
  },
  header: {
    padding: 24,
    justifyContent: 'space-between',
    flexDirection : 'row', 
    alignItems: 'center'
  },
});