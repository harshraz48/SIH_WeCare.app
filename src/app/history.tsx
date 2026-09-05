import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  Platform,
} from 'react-native';
import { Feather, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';

/**
 * WeCare Mobile Medical History & Records Screen
 * Adapted from Web Dashboard to React Native Clinical Design System
 */

const HistoryScreen = () => {
  const [activeCategory, setActiveCategory] = useState('All Records');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const categories = ['All Records', 'Consultations', 'Lab Diagnostics', 'Prescriptions', 'Procedures'];

  const toggleAccordion = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Feather name="arrow-left" size={24} color="#0f172a" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Medical History</Text>
        <TouchableOpacity style={styles.headerAction}>
          <Feather name="download" size={20} color="#0d9488" />
        </TouchableOpacity>
      </View>

      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        stickyHeaderIndices={[2]} // Makes the search/filter section sticky
      >
        {/* Page Context */}
        <View style={styles.pageContext}>
          <Text style={styles.breadcrumbText}>Patient Ledger / <Text style={styles.breadcrumbActive}>PT-2026-0182</Text></Text>
          <Text style={styles.pageDescription}>
            Comprehensive chronological health ledger, verified consultations, diagnostic labs, and hospital admissions.
          </Text>
        </View>

        {/* Summary Stats Grid */}
        <View style={styles.statsGrid}>
          <View style={styles.statCard}>
            <View style={[styles.statIconBg, { backgroundColor: '#e0e7ff' }]}>
              <MaterialIcons name="verified-user" size={20} color="#4f46e5" />
            </View>
            <Text style={styles.statLabel}>Verified Encounters</Text>
            <Text style={styles.statValue}>18</Text>
          </View>
          
          <View style={styles.statCard}>
            <View style={[styles.statIconBg, { backgroundColor: '#ccfbf1' }]}>
              <MaterialCommunityIcons name="stethoscope" size={20} color="#0d9488" />
            </View>
            <Text style={styles.statLabel}>Major Diagnoses</Text>
            <Text style={styles.statValue}>2</Text>
          </View>

          <View style={styles.statCard}>
            <View style={[styles.statIconBg, { backgroundColor: '#fef3c7' }]}>
              <MaterialCommunityIcons name="pill" size={20} color="#d97706" />
            </View>
            <Text style={styles.statLabel}>Active Regimens</Text>
            <Text style={styles.statValue}>2 Rx</Text>
          </View>

          <View style={styles.statCard}>
            <View style={[styles.statIconBg, { backgroundColor: '#fce7f3' }]}>
              <MaterialIcons name="vaccines" size={20} color="#db2777" />
            </View>
            <Text style={styles.statLabel}>Vaccination</Text>
            <Text style={[styles.statValue, { color: '#db2777', fontSize: 16 }]}>Up-to-Date</Text>
          </View>
        </View>

        {/* Search and Filters (Sticky) */}
        <View style={styles.filterSection}>
          <View style={styles.searchBar}>
            <Feather name="search" size={20} color="#94a3b8" style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search conditions, labs..."
              placeholderTextColor="#94a3b8"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesScroll}>
            {categories.map((category) => (
              <TouchableOpacity 
                key={category}
                style={[
                  styles.categoryChip, 
                  activeCategory === category && styles.categoryChipActive
                ]}
                onPress={() => setActiveCategory(category)}
              >
                <Text style={[
                  styles.categoryChipText,
                  activeCategory === category && styles.categoryChipTextActive
                ]}>
                  {category}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Timeline Section */}
        <View style={styles.timelineContainer}>
          <View style={styles.timelineHeaderRow}>
            <View style={styles.timelineTitleGroup}>
              <MaterialCommunityIcons name="timeline-clock-outline" size={22} color="#0d9488" />
              <Text style={styles.timelineMainTitle}>Verified Clinical Chronology</Text>
            </View>
            <View style={styles.abdmBadge}>
              <View style={styles.abdmDot} />
              <Text style={styles.abdmText}>ABDM Synced</Text>
            </View>
          </View>

          {/* Month Block: August 2026 */}
          <View style={styles.monthBlock}>
            <View style={styles.monthHeader}>
              <Text style={styles.monthTitle}>August 2026</Text>
              <View style={styles.monthDivider} />
              <Text style={styles.monthCount}>3 ENCOUNTERS</Text>
            </View>

            <View style={styles.timelineTrack}>
              <View style={styles.verticalLine} />

              {/* Encounter 1 */}
              <View style={styles.timelineItem}>
                <View style={[styles.timelineNode, { backgroundColor: '#0d9488' }]} />
                <View style={styles.timelineCard}>
                  <View style={styles.cardMetaRow}>
                    <Text style={styles.cardDate}>28 Aug • 10:30 AM</Text>
                    <View style={styles.verifiedBadge}>
                      <MaterialIcons name="verified" size={12} color="#0d9488" />
                      <Text style={styles.verifiedText}>Verified</Text>
                    </View>
                  </View>
                  <Text style={styles.cardTitle}>Follow-up Consultation: Endocrinology</Text>
                  <Text style={styles.cardSubtitle}>Dr. Priya Mehta, MD • Apex Multispecialty</Text>
                  
                  <View style={styles.noteBox}>
                    <Text style={styles.noteText}>
                      <Text style={{fontWeight: '700'}}>Assessment: </Text>
                      Glycemic metrics stabilizing. Metformin 500mg BID continued without GI distress. Self-monitoring log reviewed and validated.
                    </Text>
                  </View>

                  <View style={styles.inlineLabCard}>
                    <View style={styles.inlineLabLeft}>
                      <MaterialCommunityIcons name="test-tube" size={20} color="#4f46e5" />
                      <View style={{ marginLeft: 8 }}>
                        <Text style={styles.inlineLabTitle}>HbA1c Test</Text>
                        <Text style={styles.inlineLabSubtitle}>Target: &lt;7.0%</Text>
                      </View>
                    </View>
                    <View style={styles.inlineLabRight}>
                      <Text style={styles.inlineLabValue}>6.8%</Text>
                      <Text style={styles.inlineLabStatus}>In Range</Text>
                    </View>
                  </View>

                  <TouchableOpacity style={styles.downloadButton}>
                    <Feather name="download" size={16} color="#0d9488" />
                    <Text style={styles.downloadButtonText}>Clinical Note (PDF)</Text>
                  </TouchableOpacity>
                </View>
              </View>

              {/* Encounter 2 */}
              <View style={styles.timelineItem}>
                <View style={[styles.timelineNode, { backgroundColor: '#3b82f6' }]} />
                <View style={styles.timelineCard}>
                  <View style={styles.cardMetaRow}>
                    <Text style={styles.cardDate}>20 Aug • 07:45 AM</Text>
                    <View style={[styles.verifiedBadge, { backgroundColor: '#eff6ff' }]}>
                      <Text style={[styles.verifiedText, { color: '#3b82f6' }]}>Lab Report - Normal</Text>
                    </View>
                  </View>
                  <Text style={styles.cardTitle}>Diagnostic Workup: Lipid & Renal Panel</Text>
                  <Text style={styles.cardSubtitle}>Apex Diagnostics Core Lab • Ref: #LBN-89211</Text>

                  <View style={styles.labGrid}>
                    <View style={styles.labGridItem}>
                      <Text style={styles.labGridLabel}>Cholesterol</Text>
                      <Text style={styles.labGridValue}>185</Text>
                    </View>
                    <View style={styles.labGridItem}>
                      <Text style={styles.labGridLabel}>Triglycerides</Text>
                      <Text style={styles.labGridValue}>142</Text>
                    </View>
                    <View style={styles.labGridItem}>
                      <Text style={styles.labGridLabel}>Creatinine</Text>
                      <Text style={styles.labGridValue}>0.9</Text>
                    </View>
                  </View>
                </View>
              </View>

              {/* Encounter 3 */}
              <View style={styles.timelineItem}>
                <View style={[styles.timelineNode, { backgroundColor: '#8b5cf6' }]} />
                <View style={styles.timelineCard}>
                  <View style={styles.cardMetaRow}>
                    <Text style={styles.cardDate}>12 Aug • 02:15 PM</Text>
                  </View>
                  <Text style={styles.cardTitle}>Case Registration & Clinical Triage</Text>
                  <Text style={styles.cardSubtitle}>Attending: Dr. Priya Mehta</Text>
                  <View style={styles.noteBox}>
                    <Text style={styles.noteText}>Baseline Metrics Recorded: HbA1c 7.4%, Fasting 134 mg/dL. ICD-10: E11.9 (Type 2 Diabetes).</Text>
                  </View>
                </View>
              </View>

            </View>
          </View>

          {/* Month Block: July 2026 */}
          <View style={styles.monthBlock}>
            <View style={styles.monthHeader}>
              <Text style={styles.monthTitle}>July 2026</Text>
              <View style={styles.monthDivider} />
              <Text style={styles.monthCount}>1 ENCOUNTER</Text>
            </View>

            <View style={styles.timelineTrack}>
              <View style={styles.verticalLine} />

              <View style={styles.timelineItem}>
                <View style={[styles.timelineNode, { backgroundColor: '#10b981' }]} />
                <View style={styles.timelineCard}>
                  <View style={styles.cardMetaRow}>
                    <Text style={styles.cardDate}>18 Jul • Annual Screening</Text>
                  </View>
                  <Text style={styles.cardTitle}>Annual Executive Health Screening</Text>
                  <Text style={styles.cardSubtitle}>Apex Multispecialty • Preventive Health</Text>
                  <TouchableOpacity style={[styles.downloadButton, { marginTop: 12 }]}>
                    <Feather name="download" size={16} color="#0d9488" />
                    <Text style={styles.downloadButtonText}>Download Executive Dossier</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>

          {/* Archived Records Accordions */}
          <View style={styles.archivedSection}>
            <Text style={styles.archivedTitle}>Earlier History & Archived</Text>

            {/* 2025 Accordion */}
            <TouchableOpacity 
              style={styles.accordionHeader} 
              onPress={() => toggleAccordion('2025')}
              activeOpacity={0.7}
            >
              <View style={styles.accordionHeaderLeft}>
                <View style={styles.accordionIcon}>
                  <Feather name="folder" size={18} color="#64748b" />
                </View>
                <View>
                  <Text style={styles.accordionTitle}>2025 Clinical Records</Text>
                  <Text style={styles.accordionSubtitle}>6 items: 2 Consults, 3 Labs, 1 Dental</Text>
                </View>
              </View>
              <Feather 
                name={expandedSection === '2025' ? "chevron-up" : "chevron-down"} 
                size={20} 
                color="#64748b" 
              />
            </TouchableOpacity>
            
            {expandedSection === '2025' && (
              <View style={styles.accordionContent}>
                <View style={styles.archivedRow}>
                  <View>
                    <Text style={styles.archivedItemTitle}>12 Nov: Dental Scaling & Prophylaxis</Text>
                    <Text style={styles.archivedItemSubtitle}>Apex Dental Care</Text>
                  </View>
                  <Text style={styles.archivedStatus}>Verified</Text>
                </View>
                <View style={styles.archivedRow}>
                  <View>
                    <Text style={styles.archivedItemTitle}>04 Aug: Routine Metabolic Panel</Text>
                    <Text style={styles.archivedItemSubtitle}>Apex Core Lab</Text>
                  </View>
                  <Text style={[styles.archivedStatus, { color: '#64748b' }]}>Archived</Text>
                </View>
              </View>
            )}

            {/* Vaccines Accordion */}
            <TouchableOpacity 
              style={[styles.accordionHeader, { marginTop: 12 }]} 
              onPress={() => toggleAccordion('vaccines')}
              activeOpacity={0.7}
            >
              <View style={styles.accordionHeaderLeft}>
                <View style={styles.accordionIcon}>
                  <MaterialIcons name="vaccines" size={18} color="#64748b" />
                </View>
                <View>
                  <Text style={styles.accordionTitle}>Immunization Registry (Pre-2025)</Text>
                  <Text style={styles.accordionSubtitle}>4 items: MMR, Hepatitis B, Tdap</Text>
                </View>
              </View>
              <Feather 
                name={expandedSection === 'vaccines' ? "chevron-up" : "chevron-down"} 
                size={20} 
                color="#64748b" 
              />
            </TouchableOpacity>

            {expandedSection === 'vaccines' && (
              <View style={styles.accordionContent}>
                <View style={styles.archivedRow}>
                  <View>
                    <Text style={styles.archivedItemTitle}>15 Oct 2024: Adult Tdap Booster</Text>
                    <Text style={styles.archivedItemSubtitle}>Batch #TD-9021</Text>
                  </View>
                  <Text style={styles.archivedStatus}>Current</Text>
                </View>
              </View>
            )}

          </View>

        </View>
      </ScrollView>

      {/* Bottom Tabs */}
      <View style={styles.bottomTabs}>
        <TouchableOpacity 
          style={styles.tabItem}
          onPress={() => router.push('/dashboard')}
        >
          <Feather name="home" size={24} color="#64748b" />
          <Text style={styles.tabLabel}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.tabItem}
          onPress={() => router.push('/case')}
        >
          <Feather name="clipboard" size={24} color="#64748b" />
          <Text style={styles.tabLabel}>My Case</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem}>
          <Feather name="clock" size={24} color="#0d9488" />
          <Text style={[styles.tabLabel, styles.tabLabelActive]}>History</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem}>
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
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  statCard: {
    width: '48%',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#f1f5f9',
    ...Platform.select({
      ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.03, shadowRadius: 8 },
      android: { elevation: 2 },
    }),
  },
  statIconBg: {
    width: 36,
    height: 36,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  statLabel: {
    fontSize: 12,
    color: '#64748b',
    fontWeight: '500',
    marginBottom: 4,
  },
  statValue: {
    fontSize: 22,
    fontWeight: '800',
    color: '#0f172a',
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
  categoriesScroll: {
    flexDirection: 'row',
  },
  categoryChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    marginRight: 8,
  },
  categoryChipActive: {
    backgroundColor: '#ccfbf1',
    borderColor: '#ccfbf1',
  },
  categoryChipText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#64748b',
  },
  categoryChipTextActive: {
    color: '#0f766e',
  },
  timelineContainer: {
    paddingHorizontal: 20,
    paddingTop: 24,
  },
  timelineHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  timelineTitleGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  timelineMainTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0f172a',
  },
  abdmBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f1f5f9',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
  },
  abdmDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#10b981',
  },
  abdmText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#475569',
  },
  monthBlock: {
    marginBottom: 24,
  },
  monthHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  monthTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0f172a',
  },
  monthDivider: {
    flex: 1,
    height: 1,
    backgroundColor: '#e2e8f0',
    marginHorizontal: 12,
  },
  monthCount: {
    fontSize: 10,
    fontWeight: '700',
    color: '#64748b',
    letterSpacing: 0.5,
  },
  timelineTrack: {
    paddingLeft: 12,
    position: 'relative',
  },
  verticalLine: {
    position: 'absolute',
    left: 17,
    top: 8,
    bottom: -16,
    width: 2,
    backgroundColor: '#e2e8f0',
  },
  timelineItem: {
    flexDirection: 'row',
    marginBottom: 24,
    position: 'relative',
  },
  timelineNode: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginTop: 24,
    marginRight: 16,
    zIndex: 2,
    borderWidth: 3,
    borderColor: '#f8fafc',
  },
  timelineCard: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#f1f5f9',
    ...Platform.select({
      ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.03, shadowRadius: 8 },
      android: { elevation: 2 },
    }),
  },
  cardMetaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  cardDate: {
    fontSize: 12,
    color: '#64748b',
    fontWeight: '600',
  },
  verifiedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ccfbf1',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    gap: 4,
  },
  verifiedText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#0f766e',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0f172a',
    marginBottom: 4,
  },
  cardSubtitle: {
    fontSize: 13,
    color: '#64748b',
    marginBottom: 12,
  },
  noteBox: {
    backgroundColor: '#f8fafc',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  noteText: {
    fontSize: 13,
    color: '#334155',
    lineHeight: 20,
  },
  inlineLabCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f8fafc',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    marginBottom: 12,
  },
  inlineLabLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  inlineLabTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: '#0f172a',
  },
  inlineLabSubtitle: {
    fontSize: 11,
    color: '#64748b',
    marginTop: 2,
  },
  inlineLabRight: {
    alignItems: 'flex-end',
  },
  inlineLabValue: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0d9488',
  },
  inlineLabStatus: {
    fontSize: 10,
    color: '#0d9488',
    fontWeight: '600',
    marginTop: 2,
  },
  downloadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f1f5f9',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    alignSelf: 'flex-start',
    gap: 6,
  },
  downloadButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#0f172a',
  },
  labGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
  },
  labGridItem: {
    flex: 1,
    backgroundColor: '#f8fafc',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  labGridLabel: {
    fontSize: 10,
    color: '#64748b',
    marginBottom: 4,
  },
  labGridValue: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0f172a',
  },
  archivedSection: {
    marginTop: 16,
    marginBottom: 40,
  },
  archivedTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0f172a',
    marginBottom: 16,
  },
  accordionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#f1f5f9',
    ...Platform.select({
      ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.03, shadowRadius: 8 },
      android: { elevation: 2 },
    }),
  },
  accordionHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  accordionIcon: {
    width: 36,
    height: 36,
    borderRadius: 8,
    backgroundColor: '#f1f5f9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  accordionTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#0f172a',
  },
  accordionSubtitle: {
    fontSize: 12,
    color: '#64748b',
    marginTop: 2,
  },
  accordionContent: {
    backgroundColor: '#f8fafc',
    padding: 16,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    borderWidth: 1,
    borderTopWidth: 0,
    borderColor: '#f1f5f9',
    marginTop: -4,
  },
  archivedRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  archivedItemTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: '#0f172a',
    marginBottom: 2,
  },
  archivedItemSubtitle: {
    fontSize: 11,
    color: '#64748b',
  },
  archivedStatus: {
    fontSize: 11,
    fontWeight: '700',
    color: '#0d9488',
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

export default HistoryScreen;