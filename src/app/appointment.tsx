import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  Image,
  Platform,
} from 'react-native';
import { Feather, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';

/**
 * WeCare Mobile Appointments & Consultations Screen
 * Adapted for Mobile Clinical Design System
 */

const AppointmentsScreen = () => {
  const [activeTab, setActiveTab] = useState('Upcoming');
  const [searchQuery, setSearchQuery] = useState('');

  const tabs = [
    { id: 'Upcoming', label: 'Upcoming (2)' },
    { id: 'Past', label: 'Past Visits (12)' },
    { id: 'Cancelled', label: 'Cancelled (1)' },
    { id: 'Labs', label: 'Lab Appts (3)' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Feather name="arrow-left" size={24} color="#0f172a" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Appointments</Text>
        <TouchableOpacity style={styles.headerAction}>
          <Feather name="calendar" size={20} color="#0d9488" />
          <View style={styles.headerBadge} />
        </TouchableOpacity>
      </View>

      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        stickyHeaderIndices={[2]} 
      >
        {/* Page Context */}
        <View style={styles.pageContext}>
          <Text style={styles.breadcrumbText}>Schedule / <Text style={styles.breadcrumbActive}>Arnav Sharma</Text></Text>
          <Text style={styles.pageDescription}>
            Manage your clinical visits, teleconsultations, laboratory bookings, and upcoming follow-ups.
          </Text>
          <TouchableOpacity style={styles.bookNewBtn} activeOpacity={0.8}>
            <Feather name="plus-circle" size={18} color="white" />
            <Text style={styles.bookNewText}>Book New Appointment</Text>
          </TouchableOpacity>
        </View>

        {/* KPI Grid */}
        <View style={styles.kpiGrid}>
          <View style={styles.kpiCard}>
            <View style={styles.kpiHeader}>
              <Text style={styles.kpiLabel}>Upcoming</Text>
              <View style={[styles.kpiIcon, { backgroundColor: '#e0f2fe' }]}>
                <MaterialIcons name="event" size={16} color="#0284c7" />
              </View>
            </View>
            <Text style={styles.kpiValue}>2 Scheduled</Text>
            <Text style={styles.kpiSubtitle}>Next: 15 Sept 2026</Text>
          </View>
          
          <View style={styles.kpiCard}>
            <View style={styles.kpiHeader}>
              <Text style={styles.kpiLabel}>Completed</Text>
              <View style={[styles.kpiIcon, { backgroundColor: '#dcfce7' }]}>
                <MaterialIcons name="check-circle" size={16} color="#16a34a" />
              </View>
            </View>
            <Text style={styles.kpiValue}>8 Visits</Text>
            <Text style={styles.kpiSubtitle}>This Year</Text>
          </View>

          <View style={styles.kpiCard}>
            <View style={styles.kpiHeader}>
              <Text style={styles.kpiLabel}>Telehealth</Text>
              <View style={[styles.kpiIcon, { backgroundColor: '#f3e8ff' }]}>
                <MaterialIcons name="videocam" size={16} color="#db2777" />
              </View>
            </View>
            <Text style={styles.kpiValue}>3 Calls</Text>
            <Text style={styles.kpiSubtitle}>Virtual Clinic Active</Text>
          </View>

          <View style={[styles.kpiCard, { borderColor: '#fecaca', backgroundColor: '#fff5f5' }]}>
            <View style={styles.kpiHeader}>
              <Text style={[styles.kpiLabel, { color: '#ef4444' }]}>Pending Labs</Text>
              <View style={[styles.kpiIcon, { backgroundColor: '#fee2e2' }]}>
                <MaterialCommunityIcons name="test-tube" size={16} color="#ef4444" />
              </View>
            </View>
            <Text style={[styles.kpiValue, { color: '#ef4444' }]}>1 Test</Text>
            <Text style={[styles.kpiSubtitle, { color: '#ef4444' }]}>Fasting Lipid Panel</Text>
          </View>
        </View>

        {/* Sticky Filters & Search */}
        <View style={styles.filterSection}>
          <View style={styles.searchBar}>
            <Feather name="search" size={20} color="#94a3b8" style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search doctor or clinic..."
              placeholderTextColor="#94a3b8"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tabsScroll}>
            {tabs.map((tab) => (
              <TouchableOpacity 
                key={tab.id}
                style={[
                  styles.tabChip, 
                  activeTab === tab.id && styles.tabChipActive
                ]}
                onPress={() => setActiveTab(tab.id)}
              >
                <Text style={[
                  styles.tabChipText,
                  activeTab === tab.id && styles.tabChipTextActive
                ]}>
                  {tab.label}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <View style={styles.mainContent}>
          
          {/* Card 1: Upcoming In-Person Visit */}
          <View style={styles.apptCard}>
            <View style={styles.cardAccentBar} />
            
            <View style={styles.apptHeaderRow}>
              <View style={styles.apptBadgePrimary}>
                <Text style={styles.apptBadgeTextPrimary}>CONFIRMED • IN-PERSON</Text>
              </View>
              <Text style={styles.apptRef}>Ref: APT-2026-9812</Text>
            </View>

            <View style={styles.dateLocationBox}>
              <View style={styles.dateIconBox}>
                <Text style={styles.dateMonth}>SEP</Text>
                <Text style={styles.dateDay}>15</Text>
              </View>
              <View style={styles.dateDetails}>
                <Text style={styles.dateTimeText}>Tue, 15 Sept 2026 • 10:30 AM</Text>
                <View style={styles.locationRow}>
                  <Feather name="map-pin" size={12} color="#0d9488" />
                  <Text style={styles.locationText}>Apex Hospital, Suite 402</Text>
                </View>
              </View>
            </View>

            <View style={styles.doctorInfoRow}>
              <Image 
                source={{ uri: 'https://ui-avatars.com/api/?name=Dr+Priya+Mehta&background=ccfbf1&color=0d9488' }} 
                style={styles.doctorAvatar}
              />
              <View style={styles.doctorDetails}>
                <Text style={styles.doctorName}>Dr. Priya Mehta, MD</Text>
                <Text style={styles.doctorSpec}>Endocrinology & Metabolism</Text>
                <Text style={styles.doctorCase}>Case: Type 1 Diabetes</Text>
              </View>
            </View>

            <View style={styles.checklistContainer}>
              <Text style={styles.checklistTitle}>Pre-Visit Checklist (2/3)</Text>
              <View style={styles.checklistItem}>
                <Feather name="check-circle" size={16} color="#0d9488" />
                <Text style={styles.checklistText}>Fasting 10 hrs prior</Text>
              </View>
              <View style={styles.checklistItem}>
                <Feather name="check-circle" size={16} color="#0d9488" />
                <Text style={styles.checklistText}>Logged glucose readings</Text>
              </View>
              <View style={styles.checklistItem}>
                <Feather name="clock" size={16} color="#f59e0b" />
                <Text style={styles.checklistText}>Bring physical ID card</Text>
              </View>
            </View>

            <View style={styles.actionRow}>
              <TouchableOpacity style={styles.btnPrimary}>
                <Feather name="navigation" size={16} color="white" />
                <Text style={styles.btnPrimaryText}>Directions</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.btnSecondary}>
                <Feather name="edit-2" size={16} color="#0f172a" />
                <Text style={styles.btnSecondaryText}>Reschedule</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Card 2: Upcoming Teleconsult */}
          <View style={styles.apptCard}>
            <View style={[styles.cardAccentBar, { backgroundColor: '#3b82f6' }]} />
            
            <View style={styles.apptHeaderRow}>
              <View style={[styles.apptBadgePrimary, { backgroundColor: '#eff6ff' }]}>
                <Text style={[styles.apptBadgeTextPrimary, { color: '#2563eb' }]}>VIDEO TELECONSULT</Text>
              </View>
              <Text style={styles.apptRef}>Ref: TLC-2026-1044</Text>
            </View>

            <View style={styles.dateLocationBox}>
              <View style={[styles.dateIconBox, { backgroundColor: '#3b82f6' }]}>
                <Text style={styles.dateMonth}>OCT</Text>
                <Text style={styles.dateDay}>03</Text>
              </View>
              <View style={styles.dateDetails}>
                <Text style={styles.dateTimeText}>Sat, 03 Oct 2026 • 04:00 PM</Text>
                <View style={styles.locationRow}>
                  <Feather name="video" size={12} color="#3b82f6" />
                  <Text style={[styles.locationText, { color: '#3b82f6' }]}>WeCare Virtual Room</Text>
                </View>
              </View>
            </View>

            <View style={styles.doctorInfoRow}>
              <Image 
                source={{ uri: 'https://ui-avatars.com/api/?name=Dr+Ananya+Roy&background=e0e7ff&color=4f46e5' }} 
                style={styles.doctorAvatar}
              />
              <View style={styles.doctorDetails}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Text style={styles.doctorName}>Dr. Ananya Roy, MD</Text>
                  <MaterialIcons name="verified" size={14} color="#3b82f6" style={{ marginLeft: 4 }} />
                </View>
                <Text style={styles.doctorSpec}>Internal Medicine</Text>
                <Text style={styles.doctorCase}>Reason: Seasonal Check review</Text>
              </View>
            </View>

            <View style={styles.actionRow}>
              <TouchableOpacity style={[styles.btnPrimary, { backgroundColor: '#3b82f6', flex: 1.5 }]}>
                <Feather name="video" size={16} color="white" />
                <Text style={styles.btnPrimaryText}>Test Audio/Video</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.btnSecondary, { flex: 1 }]}>
                <Text style={styles.btnSecondaryText}>Reschedule</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Quick Care Team Bookings */}
          <View style={styles.careTeamContainer}>
            <Text style={styles.sectionTitle}>Assigned Care Team</Text>
            
            <TouchableOpacity style={styles.careTeamRow}>
              <View style={styles.careTeamLeft}>
                <View style={styles.careAvatarInitials}>
                  <Text style={styles.careInitialsText}>PM</Text>
                </View>
                <View>
                  <Text style={styles.careDocName}>Dr. Priya Mehta</Text>
                  <Text style={styles.careDocSpec}>Endocrinology</Text>
                </View>
              </View>
              <Feather name="chevron-right" size={20} color="#94a3b8" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.careTeamRow}>
              <View style={[styles.careAvatarInitials, { backgroundColor: '#e0e7ff' }]}>
                <Text style={[styles.careInitialsText, { color: '#4f46e5' }]}>AR</Text>
              </View>
              <View>
                <Text style={styles.careDocName}>Dr. Ananya Roy</Text>
                <Text style={styles.careDocSpec}>Internal Medicine</Text>
              </View>
              <Feather name="chevron-right" size={20} color="#94a3b8" />
            </TouchableOpacity>
          </View>

          {/* Emergency Banner */}
          <View style={styles.emergencyBanner}>
            <View style={styles.emergencyIconBg}>
              <Feather name="alert-triangle" size={20} color="white" />
            </View>
            <View style={styles.emergencyTextContent}>
              <Text style={styles.emergencyTitle}>Need Urgent Support?</Text>
              <Text style={styles.emergencyDesc}>Dial 1-800-432-273 for 24x7 triage.</Text>
            </View>
          </View>

        </View>
      </ScrollView>

      {/* Bottom Tabs */}
      <View style={styles.bottomTabs}>
        <TouchableOpacity 
          style={styles.bottomTabItem}
          onPress={() => router.push('/dashboard')}
        >
          <Feather name="home" size={24} color="#64748b" />
          <Text style={styles.bottomTabLabel}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.bottomTabItem}
          onPress={() => router.push('/case')}
        >
          <Feather name="clipboard" size={24} color="#64748b" />
          <Text style={styles.bottomTabLabel}>My Case</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.bottomTabItem}
          onPress={() => router.push('/history')}
        >
          <Feather name="clock" size={24} color="#64748b" />
          <Text style={styles.bottomTabLabel}>History</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.bottomTabItem}>
          <Feather name="calendar" size={24} color="#0d9488" />
          <Text style={[styles.bottomTabLabel, styles.bottomTabLabelActive]}>Appts</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.bottomTabItem}
          onPress={() => router.push('/profile')}
        >
          <Feather name="user" size={24} color="#64748b" />
          <Text style={styles.bottomTabLabel}>Profile</Text>
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    height: 60,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  backButton: {
    padding: 4,
    marginLeft: -4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0f172a',
  },
  headerAction: {
    padding: 4,
    marginRight: -4,
    position: 'relative',
  },
  headerBadge: {
    position: 'absolute',
    top: 4,
    right: 4,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ef4444',
    borderWidth: 1.5,
    borderColor: 'white',
  },
  scrollContent: {
    paddingBottom: 100,
  },
  pageContext: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 16,
  },
  breadcrumbText: {
    fontSize: 12,
    color: '#64748b',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 8,
  },
  breadcrumbActive: {
    color: '#0d9488',
  },
  pageDescription: {
    fontSize: 14,
    color: '#64748b',
    lineHeight: 20,
    marginBottom: 16,
  },
  bookNewBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0d9488',
    paddingVertical: 12,
    borderRadius: 10,
    gap: 8,
  },
  bookNewText: {
    color: 'white',
    fontSize: 15,
    fontWeight: '600',
  },
  kpiGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  kpiCard: {
    width: '48%',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#f1f5f9',
    ...Platform.select({
      ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.03, shadowRadius: 8 },
      android: { elevation: 2 },
    }),
  },
  kpiHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  kpiLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: '#64748b',
    textTransform: 'uppercase',
  },
  kpiIcon: {
    width: 28,
    height: 28,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  kpiValue: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0f172a',
    marginBottom: 2,
  },
  kpiSubtitle: {
    fontSize: 11,
    color: '#94a3b8',
    fontWeight: '500',
  },
  filterSection: {
    backgroundColor: '#f8fafc',
    paddingHorizontal: 20,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    paddingHorizontal: 12,
    height: 44,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    marginBottom: 12,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: '#0f172a',
  },
  tabsScroll: {
    flexDirection: 'row',
  },
  tabChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    marginRight: 8,
  },
  tabChipActive: {
    backgroundColor: '#ccfbf1',
    borderColor: '#ccfbf1',
  },
  tabChipText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#64748b',
  },
  tabChipTextActive: {
    color: '#0f766e',
  },
  mainContent: {
    paddingHorizontal: 20,
    paddingTop: 16,
  },
  apptCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#f1f5f9',
    position: 'relative',
    overflow: 'hidden',
    ...Platform.select({
      ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.04, shadowRadius: 10 },
      android: { elevation: 3 },
    }),
  },
  cardAccentBar: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 4,
    backgroundColor: '#0d9488',
  },
  apptHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    marginTop: 4,
  },
  apptBadgePrimary: {
    backgroundColor: '#ccfbf1',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  apptBadgeTextPrimary: {
    fontSize: 10,
    fontWeight: '700',
    color: '#0f766e',
  },
  apptRef: {
    fontSize: 11,
    color: '#94a3b8',
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
  },
  dateLocationBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8fafc',
    padding: 12,
    borderRadius: 10,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#f1f5f9',
  },
  dateIconBox: {
    width: 48,
    height: 48,
    borderRadius: 8,
    backgroundColor: '#0d9488',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  dateMonth: {
    fontSize: 11,
    fontWeight: '700',
    color: 'white',
    textTransform: 'uppercase',
  },
  dateDay: {
    fontSize: 18,
    fontWeight: '800',
    color: 'white',
  },
  dateDetails: {
    flex: 1,
  },
  dateTimeText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0f172a',
    marginBottom: 4,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  locationText: {
    fontSize: 12,
    color: '#64748b',
    fontWeight: '500',
  },
  doctorInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  doctorAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 12,
  },
  doctorDetails: {
    flex: 1,
  },
  doctorName: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0f172a',
    marginBottom: 2,
  },
  doctorSpec: {
    fontSize: 13,
    color: '#64748b',
    marginBottom: 2,
  },
  doctorCase: {
    fontSize: 12,
    color: '#0d9488',
    fontWeight: '500',
  },
  checklistContainer: {
    backgroundColor: '#f8fafc',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  checklistTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: '#0f172a',
    marginBottom: 8,
  },
  checklistItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
    gap: 8,
  },
  checklistText: {
    fontSize: 13,
    color: '#334155',
  },
  actionRow: {
    flexDirection: 'row',
    gap: 12,
  },
  btnPrimary: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0d9488',
    paddingVertical: 10,
    borderRadius: 8,
    gap: 6,
  },
  btnPrimaryText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  btnSecondary: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f1f5f9',
    paddingVertical: 10,
    borderRadius: 8,
    gap: 6,
  },
  btnSecondaryText: {
    color: '#0f172a',
    fontSize: 14,
    fontWeight: '600',
  },
  careTeamContainer: {
    marginTop: 8,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0f172a',
    marginBottom: 12,
  },
  careTeamRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    padding: 12,
    borderRadius: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#f1f5f9',
  },
  careTeamLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  careAvatarInitials: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#ccfbf1',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  careInitialsText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0d9488',
  },
  careDocName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0f172a',
  },
  careDocSpec: {
    fontSize: 12,
    color: '#64748b',
    marginTop: 2,
  },
  emergencyBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fef2f2',
    padding: 16,
    borderRadius: 12,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#fee2e2',
  },
  emergencyIconBg: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#ef4444',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  emergencyTextContent: {
    flex: 1,
  },
  emergencyTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#991b1b',
    marginBottom: 2,
  },
  emergencyDesc: {
    fontSize: 12,
    color: '#b91c1c',
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
  bottomTabItem: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomTabLabel: {
    fontSize: 11,
    color: '#64748b',
    marginTop: 4,
    fontWeight: '600',
  },
  bottomTabLabelActive: {
    color: '#0d9488',
  },
});

export default AppointmentsScreen;