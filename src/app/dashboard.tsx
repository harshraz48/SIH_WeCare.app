import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Image,
  Dimensions,
  Platform,
  StatusBar,
} from 'react-native';
import { Feather, MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';
import { router } from 'expo-router';

/**
 * WeCare Mobile Dashboard Screen - React Native
 * Optimized for Smart India Hackathon (SIH) Project
 */

const { width } = Dimensions.get('window');

const MobileDashboard = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.logoRow}>
          <View style={styles.logoContainer}>
            <Image 
              source={{ uri: 'https://ui-avatars.com/api/?name=We+Care&background=0d9488&color=fff&rounded=true' }} 
              style={styles.logo}
              resizeMode="contain"
            />
            <Text style={styles.logoText}>Home</Text>
          </View>
          <View style={styles.headerActions}>
            <TouchableOpacity style={styles.iconButton}>
              <Feather name="bell" size={24} color="#0f172a" />
              <View style={styles.notificationDot} />
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.avatarButton}
              onPress={() => router.push('/profile')}
            >
              <View style={styles.avatarPlaceholder}>
                <Image 
                   source={{ uri: 'https://ui-avatars.com/api/?name=Arnav+Sharma&background=0d9488&color=fff' }} 
                   style={{ width: '100%', height: '100%', borderRadius: 19 }} 
                 />
              </View>
            </TouchableOpacity>
          </View>
        </View>
        
        <View style={styles.welcomeSection}>
          <Text style={styles.welcomeTitle}>Good morning, Arnav👋</Text>
          <Text style={styles.welcomeSubtitle}>Here's your health overview.</Text>
        </View>
      </View>

      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Active Case Card */}
        <View style={styles.activeCaseCard}>
          <View style={styles.caseBadge}>
            <View style={styles.statusDot} />
            <Text style={styles.caseBadgeText}>Active Case</Text>
          </View>
          
          <Text style={styles.caseTitle}>Type 1 Diabetes Management</Text>
          <View style={styles.doctorRow}>
            <MaterialCommunityIcons name="stethoscope" size={16} color="#64748b" />
            <Text style={styles.doctorName}>Dr. Sarah Anderson</Text>
          </View>

          <View style={styles.progressHeader}>
            <Text style={styles.progressLabel}>Registration</Text>
            <Text style={styles.progressValue}>Follow-up (15 Sept)</Text>
          </View>
          
          <View style={styles.progressBarBg}>
            <View style={[styles.progressBarFill, { width: '70%' }]} />
          </View>
        </View>

        {/* Quick Actions */}
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.actionGrid}>
          <TouchableOpacity style={styles.actionCard}>
            <View style={styles.actionIconContainer}>
              <MaterialCommunityIcons name="clipboard-plus-outline" size={24} color="#0d9488" />
            </View>
            <Text style={styles.actionText}>Add History</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.actionCard}>
            <View style={styles.actionIconContainer}>
              <Feather name="calendar" size={24} color="#0d9488" />
            </View>
            <Text style={styles.actionText}>Appointment</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.actionCard}>
            <View style={styles.actionIconContainer}>
              <Feather name="message-square" size={24} color="#0d9488" />
            </View>
            <Text style={styles.actionText}>Contact Doctor</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.actionCard}>
            <View style={styles.actionIconContainer}>
              <Feather name="upload" size={24} color="#0d9488" />
            </View>
            <Text style={styles.actionText}>Upload Report</Text>
          </TouchableOpacity>
        </View>

        {/* Health Summary */}
        <Text style={styles.sectionTitle}>Health Summary</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.vitalsScroll}>
          <View style={[styles.vitalCard, { backgroundColor: '#60a5fa' }]}>
            <View style={styles.vitalHeader}>
              <Feather name="activity" size={20} color="white" />
              <Text style={styles.vitalLabel}>Avg Glucose</Text>
            </View>
            <View style={styles.vitalValueContainer}>
              <Text style={styles.vitalValueText}>118</Text>
              <Text style={styles.vitalUnitText}>mg/dL</Text>
            </View>
            <Text style={styles.vitalStatusText}>In Range</Text>
          </View>

          <View style={[styles.vitalCard, { backgroundColor: '#64748b' }]}>
            <View style={styles.vitalHeader}>
              <MaterialCommunityIcons name="gauge" size={20} color="white" />
              <Text style={styles.vitalLabel}>Blood Pressure</Text>
            </View>
            <View style={styles.vitalValueContainer}>
              <Text style={styles.vitalValueText}>118/76</Text>
              <Text style={styles.vitalUnitText}>mmHg</Text>
            </View>
            <Text style={styles.vitalStatusText}>Stable</Text>
          </View>
          
          <View style={[styles.vitalCard, { backgroundColor: '#cfdaf2' }]}>
            <View style={styles.vitalHeader}>
              <FontAwesome5 name="weight" size={18} color="#0f172a" />
              <Text style={[styles.vitalLabel, { color: '#0f172a' }]}>Weight</Text>
            </View>
            <View style={styles.vitalValueContainer}>
              <Text style={[styles.vitalValueText, { color: '#0f172a' }]}>64.0</Text>
              <Text style={[styles.vitalUnitText, { color: '#0f172a' }]}>kg</Text>
            </View>
            <Text style={[styles.vitalStatusText, { color: '#64748b' }]}>Target maintained</Text>
          </View>
        </ScrollView>

        {/* Upcoming Consultation */}
        <View style={styles.consultationCard}>
          <View style={styles.consultationInfo}>
            <Text style={styles.consultationLabel}>Upcoming Follow-up</Text>
            <Text style={styles.consultationTime}>15 Sept, 10:30 AM</Text>
            <Text style={styles.consultationType}>Video Consultation</Text>
          </View>
          <TouchableOpacity style={styles.videoButton}>
            <Feather name="video" size={24} color="#0d9488" />
          </TouchableOpacity>
        </View>

        {/* Recent History */}
        <Text style={styles.sectionTitle}>Recent History</Text>
        <View style={styles.timelineContainer}>
          <View style={styles.timelineItem}>
            <View style={styles.timelineDotActive} />
            <View style={styles.timelineLine} />
            <View style={styles.timelineCard}>
              <Text style={styles.historyDate}>3 Sept, 2026</Text>
              <Text style={styles.historyTitle}>Routine Management Update</Text>
              <Text style={styles.historyDesc}>Patient is maintaining good glucose levels. Adjusted evening basal dose slightly.</Text>
            </View>
          </View>
          
          <View style={styles.timelineItem}>
            <View style={styles.timelineDot} />
            <View style={styles.timelineLine} />
            <View style={styles.timelineCard}>
              <Text style={styles.historyDate}>28 Aug, 2026</Text>
              <Text style={styles.historyTitle}>Diet Plan Adjusted</Text>
              <Text style={styles.historyDesc}>Nutritional review with dietary team.</Text>
            </View>
          </View>
          
          <View style={styles.timelineItem}>
            <View style={styles.timelineDot} />
            <View style={styles.timelineCard}>
              <Text style={styles.historyDate}>12 Aug, 2026</Text>
              <Text style={styles.historyTitle}>Initial Consultation</Text>
              <Text style={styles.historyDesc}>Case opened for Type 1 Diabetes Management.</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* FAB */}
      <TouchableOpacity style={styles.fab} activeOpacity={0.8}>
        <Feather name="plus" size={32} color="white" />
      </TouchableOpacity>

      {/* Bottom Tabs */}
      <View style={styles.bottomTabs}>
        <TouchableOpacity style={styles.tabItem}>
          <Feather name="home" size={24} color="#0d9488" />
          <Text style={[styles.tabLabel, styles.tabLabelActive]}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.tabItem}
          onPress={() => router.push('/case')}
        >
          <Feather name="clipboard" size={24} color="#64748b" />
          <Text style={styles.tabLabel}>My Case</Text>
        </TouchableOpacity>
        {/* Replace your existing History tab with this: */}
<TouchableOpacity 
  style={styles.tabItem}
  onPress={() => router.push('/history')}
>
  <Feather name="clock" size={24} color="#64748b" />
  <Text style={styles.tabLabel}>History</Text>
</TouchableOpacity>
        {/* Replace the existing Appts tab with this: */}
<TouchableOpacity 
  style={styles.tabItem}
  onPress={() => router.push('/appointment')}
>
  <Feather name="calendar" size={24} color="#64748b" />
  <Text style={styles.tabLabel}>Appts</Text>
</TouchableOpacity>
        <TouchableOpacity 
          style={styles.tabItem}
          onPress={() => router.push('/profile')}
        >
          <Feather name="user" size={24} color="#64748b" />
          <Text style={styles.tabLabel}>Profile</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
    backgroundColor: '#ffffff',
  },
  logoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 36,
    height: 36,
    marginRight: 10,
  },
  logoText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#0d9488',
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  notificationDot: {
    position: 'absolute',
    top: 10,
    right: 12,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ef4444',
    borderWidth: 1.5,
    borderColor: 'white',
  },
  avatarButton: {
    marginLeft: 4,
  },
  avatarPlaceholder: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#0d9488',
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcomeSection: {
    marginTop: 10,
  },
  welcomeTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#0f172a',
    marginBottom: 4,
  },
  welcomeSubtitle: {
    fontSize: 15,
    color: '#64748b',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 100,
    paddingTop: 15,
  },
  activeCaseCard: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 20,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    ...Platform.select({
      ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 10 },
      android: { elevation: 2 },
    }),
  },
  caseBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ccfbf1',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    alignSelf: 'flex-start',
    marginBottom: 16,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#0d9488',
    marginRight: 6,
  },
  caseBadgeText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#0d9488',
  },
  caseTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#0f172a',
    marginBottom: 8,
  },
  doctorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  doctorName: {
    fontSize: 14,
    color: '#64748b',
    marginLeft: 6,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  progressLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#0f172a',
  },
  progressValue: {
    fontSize: 12,
    fontWeight: '600',
    color: '#0d9488',
  },
  progressBarBg: {
    height: 8,
    backgroundColor: '#f1f5f9',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#0d9488',
    borderRadius: 4,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0f172a',
    marginBottom: 16,
    marginTop: 8,
  },
  actionGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  actionCard: {
    width: (width - 56) / 2,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    paddingVertical: 20,
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#f1f5f9',
  },
  actionIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#f0fdfa',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  actionText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0f172a',
  },
  vitalsScroll: {
    marginBottom: 24,
    marginHorizontal: -20,
    paddingLeft: 20,
  },
  vitalCard: {
    width: 150,
    borderRadius: 16,
    padding: 16,
    marginRight: 12,
    justifyContent: 'space-between',
    minHeight: 120,
  },
  vitalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  vitalLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: 'white',
    marginLeft: 8,
  },
  vitalValueContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginTop: 12,
  },
  vitalValueText: {
    fontSize: 24,
    fontWeight: '700',
    color: 'white',
  },
  vitalUnitText: {
    fontSize: 12,
    fontWeight: '600',
    color: 'rgba(255, 255, 255, 0.8)',
    marginLeft: 4,
  },
  vitalStatusText: {
    fontSize: 11,
    color: 'rgba(255, 255, 255, 0.9)',
    marginTop: 8,
  },
  consultationCard: {
    backgroundColor: '#0d9488',
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 32,
  },
  consultationInfo: {
    flex: 1,
  },
  consultationLabel: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.8)',
    fontWeight: '600',
    marginBottom: 4,
  },
  consultationTime: {
    fontSize: 18,
    color: 'white',
    fontWeight: '700',
    marginBottom: 4,
  },
  consultationType: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
  },
  videoButton: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  timelineContainer: {
    paddingLeft: 8,
  },
  timelineItem: {
    flexDirection: 'row',
    paddingBottom: 24,
  },
  timelineDotActive: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#0d9488',
    zIndex: 2,
    marginTop: 4,
  },
  timelineDot: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#cfdaf2',
    zIndex: 2,
    marginTop: 4,
  },
  timelineLine: {
    position: 'absolute',
    left: 6.5,
    top: 18,
    bottom: 0,
    width: 1,
    backgroundColor: '#e2e8f0',
  },
  timelineCard: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    marginLeft: 20,
    borderWidth: 1,
    borderColor: '#f1f5f9',
  },
  historyDate: {
    fontSize: 12,
    fontWeight: '700',
    color: '#0d9488',
    marginBottom: 4,
  },
  historyTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0f172a',
    marginBottom: 4,
  },
  historyDesc: {
    fontSize: 13,
    color: '#64748b',
    lineHeight: 18,
  },
  fab: {
    position: 'absolute',
    bottom: 90,
    right: 20,
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#0d5d56',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  bottomTabs: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 80,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingBottom: 20,
    borderTopWidth: 1,
    borderTopColor: '#f1f5f9',
  },
  tabItem: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabLabel: {
    fontSize: 11,
    color: '#64748b',
    marginTop: 4,
    fontWeight: '600',
  },
  tabLabelActive: {
    color: '#0d9488',
  },
});

export default MobileDashboard;