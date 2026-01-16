import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  ScrollView, 
  Image 
} from 'react-native';
import { 
  Bell, 
  Heart, 
  Plus, 
  Home, 
  User, 
  MessageCircle 
} from 'react-native-feather';
import { useAuth } from '../../hooks/useAuth';

export const HomeScreen = ({ navigation }) => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('home');

  const renderNavigation = () => (
    <View style={styles.navigationBar}>
      <TouchableOpacity 
        style={styles.navItem}
        onPress={() => setActiveTab('home')}
      >
        <Home 
          color={activeTab === 'home' ? '#FF6B6B' : '#8E8E8E'} 
          width={24} 
          height={24} 
        />
      </TouchableOpacity>
      <TouchableOpacity 
        style={styles.navItem}
        onPress={() => setActiveTab('messages')}
      >
        <MessageCircle 
          color={activeTab === 'messages' ? '#FF6B6B' : '#8E8E8E'} 
          width={24} 
          height={24} 
        />
      </TouchableOpacity>
      <TouchableOpacity 
        style={styles.createPostButton}
        onPress={() => navigation.navigate('CreateMoment')}
      >
        <Plus color="white" width={32} height={32} />
      </TouchableOpacity>
      <TouchableOpacity 
        style={styles.navItem}
        onPress={() => setActiveTab('notifications')}
      >
        <Bell 
          color={activeTab === 'notifications' ? '#FF6B6B' : '#8E8E8E'} 
          width={24} 
          height={24} 
        />
      </TouchableOpacity>
      <TouchableOpacity 
        style={styles.navItem}
        onPress={() => setActiveTab('profile')}
      >
        <User 
          color={activeTab === 'profile' ? '#FF6B6B' : '#8E8E8E'} 
          width={24} 
          height={24} 
        />
      </TouchableOpacity>
    </View>
  );

  const renderFeedItem = (item) => (
    <View key={item.id} style={styles.feedItem}>
      <View style={styles.feedHeader}>
        <Image 
          source={{ uri: item.userAvatar }} 
          style={styles.userAvatar} 
        />
        <View>
          <Text style={styles.userName}>{item.userName}</Text>
          <Text style={styles.postTime}>{item.timestamp}</Text>
        </View>
        <TouchableOpacity style={styles.moreOptions}>
          <Text style={styles.moreOptionsText}>...</Text>
        </TouchableOpacity>
      </View>
      
      {item.image && (
        <Image 
          source={{ uri: item.image }} 
          style={styles.postImage} 
        />
      )}
      
      <Text style={styles.postContent}>{item.content}</Text>
      
      <View style={styles.postActions}>
        <TouchableOpacity style={styles.actionButton}>
          <Heart width={20} height={20} color="#8E8E8E" />
          <Text style={styles.actionText}>{item.likes}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <MessageCircle width={20} height={20} color="#8E8E8E" />
          <Text style={styles.actionText}>{item.comments}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.appName}>Lovele</Text>
        <TouchableOpacity onPress={logout}>
          <Text style={styles.logoutText}>Sair</Text>
        </TouchableOpacity>
      </View>

      <ScrollView 
        style={styles.feedContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Exemplo de feed - substituir por dados reais */}
        {[
          {
            id: '1',
            userName: 'João Silva',
            userAvatar: 'https://exemplo.com/avatar.jpg',
            timestamp: '2 horas atrás',
            content: 'Momento incrível hoje!',
            image: 'https://exemplo.com/imagem.jpg',
            likes: 42,
            comments: 7
          }
        ].map(renderFeedItem)}
      </ScrollView>

      {renderNavigation()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'white',
  },
  appName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FF6B6B',
  },
  logoutText: {
    color: '#FF6B6B',
  },
  feedContainer: {
    flex: 1,
  },
  feedItem: {
    backgroundColor: 'white',
    marginBottom: 15,
    borderRadius: 15,
    padding: 15,
  },
  feedHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  userAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  userName: {
    fontWeight: 'bold',
  },
  postTime: {
    color: '#8E8E8E',
  },
  moreOptions: {
    marginLeft: 'auto',
  },
  moreOptionsText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  postImage: {
    width: '100%',
    height: 300,
    borderRadius: 15,
    marginBottom: 10,
  },
  postContent: {
    marginBottom: 10,
  },
  postActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionText: {
    marginLeft: 5,
    color: '#8E8E8E',
  },
  navigationBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  navItem: {
    alignItems: 'center',
  },
  createPostButton: {
    backgroundColor: '#FF6B6B',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
});