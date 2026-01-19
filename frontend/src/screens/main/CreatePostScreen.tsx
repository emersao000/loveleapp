import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Image,
  Platform,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { BottomNavigation } from '@/components/common/BottomNavigation';
import { usePostPrivacy } from '@/context/PostPrivacyContext';

export const CreatePostScreen = () => {
  const [postText, setPostText] = useState('');
  const [activeTab, setActiveTab] = useState('create');
  const { defaultPrivacy } = usePostPrivacy();

  const handlePost = () => {
    if (postText.trim()) {
      // Handle post creation
      console.log(`Criando post: "${postText}" com privacidade: ${defaultPrivacy}`);
      setPostText('');
    }
  };

  const PRIVACY_LABELS = {
    publico: { label: 'Público', icon: 'globe-outline' },
    amigos: { label: 'Amigos', icon: 'people-outline' },
    privado: { label: 'Privado', icon: 'lock-closed-outline' },
  };

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />

      <SafeAreaView style={styles.safeAreaTop} edges={['top']}>
        <View style={styles.header}>
          <View>
            <Text style={styles.headerTitle}>Criar Momento</Text>
            <Text style={styles.headerSubtitle}>Compartilhe com {PRIVACY_LABELS[defaultPrivacy].label}</Text>
          </View>
        </View>
      </SafeAreaView>

      <ScrollView style={styles.content}>
        {/* Privacy Info */}
        <View style={styles.privacyBanner}>
          <View style={styles.privacyIconContainer}>
            <Ionicons
              name={PRIVACY_LABELS[defaultPrivacy].icon as any}
              size={20}
              color="#FF6B9D"
            />
          </View>
          <View style={styles.privacyText}>
            <Text style={styles.privacyLabel}>
              Privacidade: {PRIVACY_LABELS[defaultPrivacy].label}
            </Text>
            <Text style={styles.privacyDesc}>
              Configure na engrenagem se desejar mudar
            </Text>
          </View>
        </View>

        {/* Author Info */}
        <View style={styles.authorSection}>
          <Image
            source={{ uri: 'https://i.pravatar.cc/100?img=8' }}
            style={styles.authorAvatar}
          />
          <View>
            <Text style={styles.authorName}>Seu Nome</Text>
            <Text style={styles.authorUsername}>@seu_usuario</Text>
          </View>
        </View>

        {/* Post Input */}
        <View style={styles.postContainer}>
          <TextInput
            style={styles.textInput}
            placeholder="O que você está pensando?"
            value={postText}
            onChangeText={setPostText}
            multiline
            placeholderTextColor="#999"
          />
        </View>

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.actionBtn} activeOpacity={0.7}>
            <Ionicons name="image-outline" size={22} color="#8E8E93" />
            <Text style={styles.actionBtnText}>Foto</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionBtn} activeOpacity={0.7}>
            <Ionicons name="videocam-outline" size={22} color="#8E8E93" />
            <Text style={styles.actionBtnText}>Vídeo</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionBtn} activeOpacity={0.7}>
            <Ionicons name="smile-outline" size={22} color="#8E8E93" />
            <Text style={styles.actionBtnText}>Emoji</Text>
          </TouchableOpacity>
        </View>

        {/* Post Button */}
        <TouchableOpacity
          style={[styles.postButton, !postText.trim() && styles.postButtonDisabled]}
          onPress={handlePost}
          disabled={!postText.trim()}
        >
          <Text style={styles.postButtonText}>
            {postText.trim() ? 'Publicar' : 'Digite algo para publicar'}
          </Text>
        </TouchableOpacity>
      </ScrollView>

      <BottomNavigation
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    paddingTop: 16,
    paddingHorizontal: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  postContainer: {
    marginBottom: 16,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    minHeight: 200,
    textAlignVertical: 'top',
  },
  postButton: {
    backgroundColor: '#FF6B6B',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 8,
  },
  postButtonDisabled: {
    opacity: 0.5,
  },
  postButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
