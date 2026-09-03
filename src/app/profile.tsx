import React, { useState } from 'react';
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
  Switch,
} from 'react-native';
import { Feather, MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';
import { router } from 'expo-router';

/**
 * WeCare Mobile Patient Profile - React Native
 * Optimized for Smart India Hackathon (SIH)
 */

const { width } = Dimensions.get('window');

const ProfileScreen = () => {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Feather name="arrow-left" size={24} color="#0f172a" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Profile</Text>
        <TouchableOpacity style={styles.settingsButton}>
          <Feather name="settings" size={24} color="#0f172a" />
        </TouchableOpacity>
      </View>

      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Profile Card */}
        <View style={styles.profileCard}>
          <View style={styles.avatarContainer}>
             <Image 
               source={{ uri: 'https://ui-avatars.com/api/?name=Arnav+Sharma&background=0d9488&color=fff&size=256' }} 
               style={styles.avatar} 
             />
             <View style={styles.statusIndicator} />
          </View>
          <Text style={styles.userName}>Arnav Sharma</Text>
          <View style={styles.badgeRow}>
            <View style={styles.idBadge}>
              <Text style={styles.idBadgeText}>PRN: 20250802313</Text>
            </View>
            <View style={styles.activeBadge}>
              <View style={styles.dot} />
              <Text style={styles.activeBadgeText}>Active</Text>
            </View>
          </View>

          <TouchableOpacity style={styles.editProfileBtn}>
            <Feather name="edit-2" size={16} color="white" />
            <Text style={styles.editProfileText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>

        {/* Quick Info Grid */}
        <View style={styles.quickInfoGrid}>
          <InfoCard icon="user" label="AGE" value="20" color="#0d9488" />
          <InfoCard icon="droplet" label="BLOOD" value="B+" color="#ef4444" />
          <InfoCard icon="smartphone" label="PHONE" value="Verified" color="#3b82f6" />
          <InfoCard icon="briefcase" label="CASE" value="Active" color="#8b5cf6" />
        </View>

        {/* Expandable Sections */}
        <SectionItem icon="user" title="Personal Info" />
        <SectionItem icon="star" title="Emergency Contact" color="#ef4444" />
        <SectionItem icon="activity" title="Health Information" />

        <Text style={styles.sectionLabel}>ACCOUNT & SETTINGS</Text>

        <View style={styles.settingsList}>
          <SettingRow icon="lock" title="Change Password" />
          <SettingRow icon="shield" title="Privacy & Data" />
          <SettingRow icon="bell" title="Notifications" />
          <SettingRow icon="clock" title="Reminders" />
          <SettingRow icon="globe" title="Language" value="English" />
          
          <View style={styles.settingRow}>
            <View style={styles.settingMain}>
              <View style={styles.settingIconContainer}>
                <Feather name="moon" size={20} color="#64748b" />
              </View>
              <Text style={styles.settingTitle}>Dark Mode</Text>
            </View>
            <Switch 
              value={darkMode} 
              onValueChange={setDarkMode}
              trackColor={{ false: '#cbd5e1', true: '#0d9488' }}
              thumbColor="white"
            />
          </View>
        </View>

        {/* Support Card */}
        <View style={styles.supportCard}>
          <View style={styles.supportHeader}>
            <View style={styles.supportIconBg}>
               <Feather name="help-circle" size={24} color="white" />
            </View>
            <Text style={styles.supportTitle}>Need Help?</Text>
          </View>
          <Text style={styles.supportDesc}>
            Our clinical support team is available 24/7 for urgent inquiries.
          </Text>
          <TouchableOpacity style={styles.supportBtnPrimary}>
            <Feather name="headphones" size={18} color="white" />
            <Text style={styles.supportBtnText}>Contact Support</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.supportBtnSecondary}>
            <Feather name="book-open" size={18} color="#0d9488" />
            <Text style={styles.supportBtnSecondaryText}>Help Center</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity 
          style={styles.logoutBtn}
          onPress={() => router.replace('/login' as any)}
        >
          <Feather name="log-out" size={18} color="#ef4444" />
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>

        <Text style={styles.footerText}>WECARE</Text>
        <Text style={styles.versionText}>Version 1.0.4 (SIH Build)</Text>

      </ScrollView>

      {/* FAB - Floating Action Button */}
      <TouchableOpacity style={styles.fab}>
        <Feather name="plus" size={30} color="white" />
      </TouchableOpacity>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <NavItem icon="home" label="Home" onPress={() => router.push('/dashboard')} active={false} />
        <NavItem icon="briefcase" label="My Case" onPress={() => router.push('/case')} active={false} />
        <NavItem icon="clock" label="History" onPress={() => router.push('/history')} active={false} />
        <NavItem icon="calendar" label="Appts" onPress={() => router.push('/appointment')} active={false} />
        <NavItem icon="user" label="Profile" active onPress={() => router.push('/profile')} />
      </View>
    </SafeAreaView>
  );
};

const InfoCard: React.FC<{ icon: React.ComponentProps<typeof Feather>["name"]; label: string; value?: string | number | null; color: string }> = ({ icon, label, value, color }) => (
  <View style={styles.infoCard}>
    <View style={[styles.infoIconContainer, { backgroundColor: color + '15' }]}>
      <Feather name={icon} size={18} color={color} />
    </View>
    <View style={styles.infoTextContainer}>
      <Text style={styles.infoLabel}>{label}</Text>
      <Text style={styles.infoValue}>{value}</Text>
    </View>
  </View>
);

const SectionItem: React.FC<{ icon: React.ComponentProps<typeof Feather>["name"]; title: string; color?: string }> = ({ icon, title, color = "#0d9488" }) => (
  <TouchableOpacity style={styles.sectionItem}>
    <View style={styles.sectionMain}>
      <Feather name={icon} size={20} color={color} />
      <Text style={styles.sectionTitle}>{title}</Text>
    </View>
    <Feather name="chevron-down" size={20} color="#94a3b8" />
  </TouchableOpacity>
);

const SettingRow: React.FC<{ icon: React.ComponentProps<typeof Feather>["name"]; title: string; value?: string | null }> = ({ icon, title, value = null }) => (
  <TouchableOpacity style={styles.settingRow}>
    <View style={styles.settingMain}>
      <View style={styles.settingIconContainer}>
        <Feather name={icon} size={20} color="#64748b" />
      </View>
      <Text style={styles.settingTitle}>{title}</Text>
    </View>
    <View style={styles.settingRight}>
      {value && <Text style={styles.settingValue}>{value}</Text>}
      <Feather name="chevron-right" size={20} color="#cbd5e1" />
    </View>
  </TouchableOpacity>
);

const NavItem: React.FC<{ icon: React.ComponentProps<typeof Feather>["name"]; label: string; active?: boolean; onPress?: () => void }> = ({ icon, label, active, onPress }) => (
  <TouchableOpacity style={styles.navItem} onPress={onPress}>
    <Feather name={icon} size={22} color={active ? '#0d9488' : '#94a3b8'} />
    <Text style={[styles.navLabel, active && styles.navLabelActive]}>{label}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9ff',
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
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0f172a',
  },
  backButton: {
    padding: 8,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  settingsButton: {
    padding: 8,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContent: {
    paddingBottom: 120,
  },
  profileCard: {
    alignItems: 'center',
    paddingVertical: 30,
    backgroundColor: 'white',
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.03,
    shadowRadius: 10,
    elevation: 2,
    marginBottom: 20,
  },
  avatarContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 16,
  },
  avatar: {
    width: '100%',
    height: '100%',
    borderRadius: 50,
  },
  statusIndicator: {
    position: 'absolute',
    bottom: 5,
    right: 5,
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: '#0d9488',
    borderWidth: 3,
    borderColor: 'white',
  },
  userName: {
    fontSize: 24,
    fontWeight: '800',
    color: '#0f172a',
    marginBottom: 8,
  },
  badgeRow: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  idBadge: {
    backgroundColor: '#f1f5f9',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
    marginRight: 8,
  },
  idBadgeText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#64748b',
  },
  activeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0d948820',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#0d9488',
    marginRight: 6,
  },
  activeBadgeText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#0d9488',
  },
  editProfileBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#60a5fa',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
  },
  editProfileText: {
    color: 'white',
    fontSize: 15,
    fontWeight: '700',
    marginLeft: 8,
  },
  quickInfoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  infoCard: {
    width: (width - 60) / 2,
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    margin: 10,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#f1f5f9',
  },
  infoIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  infoTextContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  infoLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: '#94a3b8',
    letterSpacing: 0.5,
  },
  infoValue: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0f172a',
  },
  sectionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#f1f5f9',
    marginHorizontal: 20,
    marginBottom: 12,
    padding: 18,
    borderRadius: 16,
  },
  sectionMain: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0f172a',
    marginLeft: 12,
  },
  sectionLabel: {
    fontSize: 12,
    fontWeight: '800',
    color: '#94a3b8',
    marginHorizontal: 20,
    marginTop: 24,
    marginBottom: 16,
  },
  settingsList: {
    backgroundColor: '#f1f5f9',
    marginHorizontal: 20,
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 24,
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  settingMain: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingIconContainer: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  settingTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#0f172a',
    marginLeft: 8,
  },
  settingRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingValue: {
    fontSize: 14,
    color: '#64748b',
    marginRight: 8,
  },
  supportCard: {
    backgroundColor: '#0d9488',
    marginHorizontal: 20,
    borderRadius: 24,
    padding: 24,
    marginBottom: 32,
  },
  supportHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  supportIconBg: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  supportTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: 'white',
  },
  supportDesc: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.9)',
    lineHeight: 20,
    marginBottom: 24,
  },
  supportBtnPrimary: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0a756b',
    paddingVertical: 14,
    borderRadius: 12,
    marginBottom: 12,
  },
  supportBtnText: {
    color: 'white',
    fontSize: 15,
    fontWeight: '700',
    marginLeft: 8,
  },
  supportBtnSecondary: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff20',
    paddingVertical: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  supportBtnSecondaryText: {
    color: 'white',
    fontSize: 15,
    fontWeight: '700',
    marginLeft: 8,
  },
  logoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fee2e2',
    marginHorizontal: 20,
    paddingVertical: 16,
    borderRadius: 16,
    marginBottom: 40,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#ef4444',
    marginLeft: 8,
  },
  footerText: {
    textAlign: 'center',
    fontSize: 12,
    fontWeight: '800',
    color: '#94a3b8',
    letterSpacing: 1,
  },
  versionText: {
    textAlign: 'center',
    fontSize: 12,
    color: '#cbd5e1',
    marginTop: 4,
    marginBottom: 60,
  },
  fab: {
    position: 'absolute',
    bottom: 90,
    right: 20,
    width: 60,
    height: 60,
    borderRadius: 16,
    backgroundColor: '#0d5d56',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 75,
    backgroundColor: 'white',
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#f1f5f9',
    paddingBottom: Platform.OS === 'ios' ? 20 : 0,
  },
  navItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  navLabel: {
    fontSize: 10,
    color: '#94a3b8',
    marginTop: 4,
    fontWeight: '700',
  },
  navLabelActive: {
    color: '#0d9488',
  },
});

export default ProfileScreen;