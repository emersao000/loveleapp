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
    backgroundColor: '#F8F9FA',
  },
  safeAreaTop: {
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 0.5,
    borderBottomColor: '#DBDBDB',
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1A1A1A',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#8E8E93',
    marginTop: 4,
  },
  content: {
    flex: 1,
  },

  // === PRIVACY BANNER ===
  privacyBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 16,
    backgroundColor: '#FFF9FB',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#FFE4F0',
    paddingHorizontal: 12,
    paddingVertical: 12,
    gap: 12,
  },
  privacyIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  privacyText: {
    flex: 1,
  },
  privacyLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1A1A1A',
  },
  privacyDesc: {
    fontSize: 12,
    color: '#8E8E93',
    marginTop: 2,
  },

  // === AUTHOR SECTION ===
  authorSection: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 0.5,
    borderBottomColor: '#DBDBDB',
    gap: 12,
  },
  authorAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
  },
  authorName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1A1A1A',
  },
  authorUsername: {
    fontSize: 13,
    color: '#8E8E93',
    marginTop: 2,
  },

  // === POST CONTAINER ===
  postContainer: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 0.5,
    borderBottomColor: '#DBDBDB',
  },
  textInput: {
    fontSize: 16,
    color: '#1A1A1A',
    minHeight: 200,
    textAlignVertical: 'top',
  },

  // === ACTION BUTTONS ===
  actionButtons: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 0.5,
    borderBottomColor: '#DBDBDB',
    gap: 12,
  },
  actionBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: '#F8F9FA',
    gap: 8,
  },
  actionBtnText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#8E8E93',
  },

  // === PUBLISH BUTTON ===
  postButton: {
    backgroundColor: '#FF6B9D',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 20,
  },
  postButtonDisabled: {
    opacity: 0.6,
    backgroundColor: '#FFB8D1',
  },
  postButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
});
