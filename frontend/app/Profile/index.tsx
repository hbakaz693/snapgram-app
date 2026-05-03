import React, { useEffect } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  BackHandler,
} from 'react-native';
import { useRouter } from 'expo-router';

const ProfileHeader = () => {
  const router=useRouter();
  useEffect(()=>{
    const backAction=()=>{
      router.replace('/Home');
      return true;
    }

    const backHandler=BackHandler.addEventListener(
      'hardwareBackPress',
      backAction
    );

    return ()=>backHandler.remove();
  },[]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.statsContainer}>
        <Image
          source={require('../../assets/images/lena.png')}
          style={styles.avatar}
        />

        <View style={styles.stats}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>127</Text>
            <Text style={styles.statLabel}>Posts</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>2.5k</Text>
            <Text style={styles.statLabel}>Abonnés</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>892</Text>
            <Text style={styles.statLabel}>Suivis</Text>
          </View>
        </View>
      </View>


      <View style={styles.infoContainer}>
        <Text style={styles.name}>Votre Nom</Text>
        <Text style={styles.bio}>
          Photographe | Voyageur 🇫🇷 Paris, France FR
        </Text>
      </View>

      
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.button1}>
          <Text style={styles.buttonText}>Modifier</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Partager</Text>
        </TouchableOpacity>
      </View>

      <View  style={styles.tabsContainer}>
        <TouchableOpacity style={styles.tab}>
        <Text style={[styles.tabText, styles.tabActive]}>Posts</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tab}>
        <Text style={styles.tabText}>sauves</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tab}>
        <Text style={styles.tabText}>Tags</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({

 tabActive:{
 color:'#000',
 borderBottomWidth:2,
 borderBottomColor:'#000',
 paddingBottom:8,
},
tabText:{
fontSize:14,
fontWeight:'500',
color:'#999',
},
tab:{
flex:1,
alignItems:'center',
paddingVertical:8,
},
tabsContainer:{
flexDirection:'row',
marginTop:20,
borderTopWidth:3,
paddingTop:12,
borderTopColor:'#eee',
},



  container: {
    backgroundColor: 'white',
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 16,
  },
  
  statsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  avatar: {
    width: 85,
    height: 85,
    borderRadius: 42.5,
    backgroundColor: '#ddd',
  },
  stats: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-around',
    paddingLeft: 20,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  statLabel: {
    fontSize: 13,
    color: '#666',
    marginTop: 4,
  },
  
  infoContainer: {
    marginTop: 14,
    paddingHorizontal: 4,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 4,
  },
  bio: {
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
  },
  
  buttonsContainer: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 16,
  },
  button: {
    flex: 1,
    backgroundColor: '#efefef',
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: 'center',
  },

  button1: {
    flex: 1,
    backgroundColor: '#049353',
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: 'center',
  },
  
  buttonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
  },
});

export default ProfileHeader;