import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  BackHandler,
  ScrollView,
} from "react-native";
import { useRouter } from "expo-router";
import ProfilePostsGrid from "../ProfilePostsGrid.tsx";
import ProfileInfo from "../ProfileInfo";
import ProfileTabs from "../ProfileTabs";

export default function ProfileHeader(){
  const router = useRouter();

  useEffect(() => {
    const backAction = () => {
      router.replace("/Home");
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <ProfileInfo
  userId={1}
  username="Bakaz"
  bio="Développeur Full Stack & Data Science"
/>

        <View style={styles.tabsContainer}>
          <ProfileTabs />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },

  tabsContainer: {
    flexDirection: "row",
    marginTop: 10,
    borderTopWidth: 1,
    paddingTop: 12,
    borderTopColor: "#eee",
  },

  
});