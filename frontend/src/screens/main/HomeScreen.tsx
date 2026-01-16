import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Dimensions, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useAuth } from '../../hooks/useAuth';
import Svg, { Path, Circle, G, Rect, Defs, LinearGradient as SvgGradient, Stop } from 'react-native-svg';

const { width } = Dimensions.get('window');

// Ícone Home
const HomeIcon = ({ active = false, size = 24 }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z"
      stroke={active ? "#FF6B9D" : "#636E72"}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill={active ? "#FF6B9D" : "none"}
    />
  </Svg>
);

// Ícone Mensagens/Bate-papo
const MessageIcon = ({ active = false, size = 24, hasNew = false }) => (
  <Svg width={size + 4} height={size + 4} viewBox="0 0 28 28" fill="none">
    <Path
      d="M21 11.5C21.0034 12.8199 20.6951 14.1219 20.1 15.3C19.3944 16.7118 18.3098 17.8992 16.9674 18.7293C15.6251 19.5594 14.0782 19.9994 12.5 20C11.1801 20.0035 9.87812 19.6951 8.7 19.1L3 21L4.9 15.3C4.30493 14.1219 3.99656 12.8199 4 11.5C4.00061 9.92179 4.44061 8.37488 5.27072 7.03258C6.10083 5.69028 7.28825 4.6056 8.7 3.90003C9.87812 3.30496 11.1801 2.99659 12.5 3.00003H13C15.0843 3.11502 17.053 3.99479 18.5291 5.47089C20.0052 6.94699 20.885 8.91568 21 11V11.5Z"
      stroke={active ? "#FF6B9D" : "#636E72"}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill={active ? "#FF6B9D" : "none"}
    />
    {hasNew && <Circle cx="22" cy="6" r="5" fill="#FF3B30" />}
  </Svg>
);

// Ícone Criar Momento
const CreateMomentIcon = ({ size = 32 }) => (
  <Svg width={size} height={size} viewBox="0 0 32 32" fill="none">
    <Defs>
      <SvgGradient id="createGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <Stop offset="0%" stopColor="#FF6B9D" stopOpacity="1" />
        <Stop offset="100%" stopColor="#C44569" stopOpacity="1" />
      </SvgGradient>
    </Defs>
    <Rect width="32" height="32" rx="16" fill="url(#createGrad)" />
    <Path
      d="M16 11V21M11 16H21"
      stroke="#FFFFFF"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

// Ícone Explorar
const ExploreIcon = ({ active = false, size = 24 }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Circle
      cx="10"
      cy="10"
      r="7"
      stroke={active ? "#FF6B9D" : "#636E72"}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M21 21L15 15"
      stroke={active ? "#FF6B9D" : "#636E72"}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

// Ícone Perfil
const ProfileIcon = ({ active = false, size = 24 }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21"
      stroke={active ? "#FF6B9D" : "#636E72"}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Circle
      cx="12"
      cy="7"
      r="4"
      stroke={active ? "#FF6B9D" : "#636E72"}
      strokeWidth="2"
      fill={active ? "#FF6B9D" : "none"}
    />
  </Svg>
);

// Ícone Foto/Galeria
const GalleryIcon = ({ size = 20, color = "#FFFFFF" }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Rect x="3" y="3" width="18" height="18" rx="2" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <Circle cx="8.5" cy="8.5" r="1.5" fill={color} />
    <Path d="M21 15L16 10L5 21" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

// Ícone Vídeo
const VideoIcon = ({ size = 20, color = "#FFFFFF" }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M23 7L16 12L23 17V7Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <Rect x="1" y="5" width="15" height="14" rx="2" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

// Ícone Relógio (tempo)
const ClockIcon = ({ size = 16, color = "#636E72" }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Circle cx="12" cy="12" r="10" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <Path d="M12 6V12L16 14" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

// Ícone Privacidade
const PrivacyIcon = ({ size = 16, color = "#636E72" }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Rect x="3" y="11" width="18" height="11" rx="2" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <Path d="M7 11V7C7 5.67392 7.52678 4.40215 8.46447 3.46447C9.40215 2.52678 10.6739 2 12 2C13.3261 2 14.5979 2.52678 15.5355 3.46447C16.4732 4.40215 17 5.67392 17 7V11" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

// Mock de dados
const mockMoments = [
  {
    id: 1,
    user: { name: 'Ana Silva', avatar: 'https://i.pravatar.cc/150?img=1' },
    content: 'Que dia incrível! Aproveitando cada segundo',
    timeLeft: '22h',
    privacy: 'Público',
    reactions: 45,
  },
  {
    id: 2,
    user: { name: 'João Pedro', avatar: 'https://i.pravatar.cc/150?img=2' },
    content: 'Começando a semana com energia positiva',
    timeLeft: '18h',
    privacy: 'Amigos',
    reactions: 28,
  },
  {
    id: 3,
    user: { name: 'Maria Clara', avatar: 'https://i.pravatar.cc/150?img=3' },
    content: 'Feliz demais com essa conquista!',
    timeLeft: '12h',
    privacy: 'Público',
    reactions: 89,
  },
];

export const HomeScreen = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('home');
  const [showCreateMoment, setShowCreateMoment] = useState(false);

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />

      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Olá, {user?.name?.split(' ')[0]}</Text>
          <Text style={styles.subGreeting}>Veja os momentos especiais</Text>
        </View>
        <TouchableOpacity style={styles.createButton} onPress={() => setShowCreateMoment(true)}>
          <CreateMomentIcon size={28} />
        </TouchableOpacity>
      </View>

      {/* Modal Criar Momento */}
      {showCreateMoment && (
        <View style={styles.modalOverlay}>
          <View style={styles.createMomentModal}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Criar Momento</Text>
              <TouchableOpacity onPress={() => setShowCreateMoment(false)}>
                <Text style={styles.modalClose}>✕</Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.modalDescription}>
              Compartilhe um momento que desaparecerá em 24 horas
            </Text>

            <View style={styles.modalOptions}>
              <TouchableOpacity style={styles.modalOption}>
                <View style={styles.modalOptionIcon}>
                  <GalleryIcon size={24} color="#FF6B9D" />
                </View>
                <Text style={styles.modalOptionText}>Adicionar Foto</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.modalOption}>
                <View style={styles.modalOptionIcon}>
                  <VideoIcon size={24} color="#FF6B9D" />
                </View>
                <Text style={styles.modalOptionText}>Adicionar Vídeo</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.privacySelector}>
              <Text style={styles.privacyLabel}>Privacidade:</Text>
              <View style={styles.privacyOpt