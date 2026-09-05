import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Image,
  Platform,
} from 'react-native';
import { Feather, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';

/**
 * WeCare Mobile Case Details Screen
 * Translated from Web Dashboard to React Native Clinical Design System
 */

const CaseScreen = () => {
  const [tasks, setTasks] = useState({
    fastingTest: false,
    nutritionDiary: false,
  });

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Feather name="arrow-left" size={24} color="#0f172a" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Case Details</Text>
        <TouchableOpacity style={styles.headerAction}>
          <Feather name="share" size={20} color="#0d9488" />
        </TouchableOpacity>
      </View>

      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Navigation Breadcrumb & ID */}
        <View style={styles.breadcrumbRow}>
          <Text style={styles.breadcrumbText}>Active Cases / </Text>
          <Text style={styles.breadcrumbActive}>CASE-20250802313</Text>
        </View>

        {/* Case Title & Badges */}
        <View style={styles.titleSection}>
          <Text style={styles.caseTitle}>Type 1 Diabetes Management & Glycemic Control</Text>
          <View style={styles.badgeRow}>
            <View style={styles.primaryBadge}>
              <Text style={styles.primaryBadgeText}>ACTIVE CASE</Text>
            </View>
            <View style={styles.secondaryBadge}>
              <View style={[styles.dot, { backgroundColor: '#3b82f6' }]} />
              <Text style={styles.secondaryBadgeText}>Severity: Moderate</Text>
            </View>
          </View>
          
          <View style={styles.doctorInfoRow}>
            <View style={styles.doctorInfoItem}>
              <MaterialCommunityIcons name="hospital-building" size={16} color="#0d9488" />
              <Text style={styles.doctorInfoText}>Endocrinology</Text>
            </View>
            <View style={styles.doctorInfoItem}>
              <MaterialCommunityIcons name="stethoscope" size={16} color="#0d9488" />
              <Text style={styles.doctorInfoText}>Dr. Priya Mehta</Text>
            </View>
          </View>
        </View>

        {/* Care Continuum Roadmap - Phase 3 */}
        <View style={styles.card}>
          <View style={styles.cardHeaderRow}>
            <View>
              <Text style={styles.cardEyebrow}>CARE CONTINUUM ROADMAP</Text>
              <Text style={styles.cardTitle}>Phase 3: Medication Optimization</Text>
            </View>
            <View style={styles.progressBadge}>
              <Text style={styles.progressBadgeText}>75%</Text>
            </View>
          </View>
          
          <View style={styles.stepperContainer}>
            <View style={styles.activeStepCard}>
              <View style={styles.stepHeader}>
                <View style={styles.stepNumberActive}>
                  <Text style={styles.stepNumberTextActive}>3</Text>
                </View>
                <Text style={styles.stepStatusActive}>ACTIVE</Text>
              </View>
              <Text style={styles.stepTitle}>Metformin Titration</Text>
              <View style={styles.progressBarBg}>
                <View style={[styles.progressBarFill, { width: '75%' }]} />
              </View>
              <Text style={styles.stepSubtitle}>Targeting 500mg BID</Text>
            </View>
          </View>
        </View>

        {/* Key Clinical Metrics Bento Grid */}
        <View style={styles.bentoGrid}>
          {/* Fasting Blood Sugar */}
          <View style={styles.bentoCard}>
            <View style={styles.bentoHeader}>
              <View style={[styles.bentoIcon, { backgroundColor: '#ccfbf1' }]}>
                <MaterialCommunityIcons name="water-outline" size={20} color="#0d9488" />
              </View>
              <View style={styles.trendBadge}>
                <Feather name="trending-down" size={12} color="#0d9488" />
                <Text style={styles.trendText}>12% drop</Text>
              </View>
            </View>
            <Text style={styles.bentoLabel}>FASTING SUGAR</Text>
            <View style={styles.bentoValueRow}>
              <Text style={styles.bentoValue}>118</Text>
              <Text style={styles.bentoUnit}>mg/dL</Text>
            </View>
            <Text style={styles.bentoFooter}>Target: &lt; 100 mg/dL</Text>
          </View>

          {/* HbA1c */}
          <View style={styles.bentoCard}>
            <View style={styles.bentoHeader}>
              <View style={[styles.bentoIcon, { backgroundColor: '#e0e7ff' }]}>
                <MaterialCommunityIcons name="test-tube" size={20} color="#4f46e5" />
              </View>
              <View style={[styles.trendBadge, { backgroundColor: '#e0e7ff' }]}>
                <Text style={[styles.trendText, { color: '#4f46e5' }]}>Controlled</Text>
              </View>
            </View>
            <Text style={styles.bentoLabel}>HbA1c</Text>
            <View style={styles.bentoValueRow}>
              <Text style={styles.bentoValue}>6.8</Text>
              <Text style={styles.bentoUnit}>%</Text>
            </View>
            <Text style={styles.bentoFooter}>Previous: 7.4%</Text>
          </View>

          {/* Blood Pressure */}
          <View style={styles.bentoCard}>
            <View style={styles.bentoHeader}>
              <View style={[styles.bentoIcon, { backgroundColor: '#fce7f3' }]}>
                <MaterialCommunityIcons name="heart-pulse" size={20} color="#db2777" />
              </View>
              <View style={[styles.trendBadge, { backgroundColor: '#fce7f3' }]}>
                <Text style={[styles.trendText, { color: '#db2777' }]}>Optimal</Text>
              </View>
            </View>
            <Text style={styles.bentoLabel}>BLOOD PRESSURE</Text>
            <View style={styles.bentoValueRow}>
              <Text style={styles.bentoValue}>120/80</Text>
              <Text style={styles.bentoUnit}>mmHg</Text>
            </View>
            <Text style={styles.bentoFooter}>Normotensive</Text>
          </View>

          {/* BMI */}
          <View style={styles.bentoCard}>
            <View style={styles.bentoHeader}>
              <View style={[styles.bentoIcon, { backgroundColor: '#f3f4f6' }]}>
                <MaterialCommunityIcons name="weight" size={20} color="#4b5563" />
              </View>
              <View style={[styles.trendBadge, { backgroundColor: '#f3f4f6' }]}>
                <Text style={[styles.trendText, { color: '#4b5563' }]}>Normal</Text>
              </View>
            </View>
            <Text style={styles.bentoLabel}>BMI INDEX</Text>
            <View style={styles.bentoValueRow}>
              <Text style={styles.bentoValue}>23.4</Text>
              <Text style={styles.bentoUnit}>kg/m²</Text>
            </View>
            <Text style={styles.bentoFooter}>Current Weight: 64 kg</Text>
          </View>
        </View>

        {/* Clinical Notes */}
        <View style={styles.card}>
          <View style={styles.sectionHeader}>
            <Feather name="file-text" size={20} color="#0d9488" />
            <Text style={styles.sectionTitle}>Physician Clinical Notes</Text>
          </View>
          
          <View style={styles.noteBox}>
            <View style={styles.noteHeader}>
              <View style={styles.noteAuthorRow}>
                <View style={styles.authorAvatar}>
                  <Text style={styles.authorInitials}>PM</Text>
                </View>
                <View>
                  <Text style={styles.authorName}>Dr. Priya Mehta</Text>
                  <Text style={styles.authorRole}>Endocrinology Specialist</Text>
                </View>
              </View>
              <Text style={styles.noteDate}>28 Aug 2026</Text>
            </View>
            <Text style={styles.noteText}>
              Patient tolerating Metformin 500mg BID well with minimal GI symptoms. Morning fasting readings stabilizing between 110-125 mg/dL. Advised strict adherence to a low-glycemic dietary regimen and daily 30-minute brisk aerobic walks.
            </Text>
            <View style={styles.tagRow}>
              <View style={styles.tag}>
                <Feather name="check-circle" size={12} color="#0d9488" />
                <Text style={styles.tagText}>Metformin Tolerated</Text>
              </View>
              <View style={[styles.tag, { backgroundColor: '#f1f5f9' }]}>
                <Text style={[styles.tagText, { color: '#475569' }]}>Low-Glycemic Protocol</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Prescriptions */}
        <View style={styles.card}>
          <View style={styles.sectionHeader}>
            <MaterialCommunityIcons name="pill" size={20} color="#0d9488" />
            <Text style={styles.sectionTitle}>Prescriptions & Regimen</Text>
            <Text style={styles.sectionCount}>3 Active</Text>
          </View>

          <View style={styles.prescriptionRow}>
            <View style={[styles.medIcon, { backgroundColor: '#ccfbf1' }]}>
              <MaterialCommunityIcons name="pill" size={24} color="#0d9488" />
            </View>
            <View style={styles.medDetails}>
              <View style={styles.medTitleRow}>
                <Text style={styles.medName}>Metformin HCl 500mg</Text>
                <View style={styles.primaryBadgeSmall}>
                  <Text style={styles.primaryBadgeTextSmall}>Primary</Text>
                </View>
              </View>
              <Text style={styles.medInstructions}>Oral Tablet • Take twice daily (BID)</Text>
              <Text style={styles.medRefills}>Refills remaining: 2</Text>
            </View>
          </View>

          <View style={styles.prescriptionRow}>
            <View style={[styles.medIcon, { backgroundColor: '#e0e7ff' }]}>
              <MaterialCommunityIcons name="medication" size={24} color="#4f46e5" />
            </View>
            <View style={styles.medDetails}>
              <View style={styles.medTitleRow}>
                <Text style={styles.medName}>Atorvastatin 10mg</Text>
              </View>
              <Text style={styles.medInstructions}>Oral Tablet • 1x daily at bedtime</Text>
              <Text style={styles.medRefills}>Refills remaining: 3</Text>
            </View>
          </View>

          <View style={[styles.prescriptionRow, { borderBottomWidth: 0, paddingBottom: 0 }]}>
            <View style={[styles.medIcon, { backgroundColor: '#f1f5f9' }]}>
              <MaterialCommunityIcons name="water" size={24} color="#475569" />
            </View>
            <View style={styles.medDetails}>
              <View style={styles.medTitleRow}>
                <Text style={styles.medName}>Blood Glucose Monitoring</Text>
              </View>
              <Text style={styles.medInstructions}>Fasting measurement 3x weekly</Text>
              <Text style={[styles.medRefills, { color: '#3b82f6' }]}>Synced Today via Bluetooth</Text>
            </View>
          </View>
        </View>

        {/* Upcoming Action / Appointment */}
        <View style={styles.card}>
          <View style={styles.sectionHeader}>
            <MaterialIcons name="event-available" size={20} color="#3b82f6" />
            <Text style={styles.sectionTitle}>Upcoming Clinical Action</Text>
          </View>

          <View style={styles.appointmentBox}>
            <Text style={styles.appointmentEyebrow}>SCHEDULED CONSULTATION</Text>
            <Text style={styles.appointmentTitle}>Quarterly Follow-up & Evaluation</Text>
            <View style={styles.appointmentDetailRow}>
              <Feather name="calendar" size={14} color="#0d9488" />
              <Text style={styles.appointmentDetailText}>15 Sept 2026 • 10:30 AM</Text>
            </View>
            <View style={styles.appointmentDetailRow}>
              <Feather name="map-pin" size={14} color="#0d9488" />
              <Text style={styles.appointmentDetailText}>Room 402, Apex Endocrinology</Text>
            </View>
            <TouchableOpacity style={styles.rescheduleButton}>
              <Text style={styles.rescheduleText}>Reschedule</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.checklistTitle}>REQUIRED ACTION ITEMS</Text>
          
          <TouchableOpacity 
            style={styles.checklistItem}
            onPress={() => setTasks({...tasks, fastingTest: !tasks.fastingTest})}
          >
            <View style={[styles.checkbox, tasks.fastingTest && styles.checkboxActive]}>
              {tasks.fastingTest && <Feather name="check" size={14} color="white" />}
            </View>
            <View style={styles.checklistTextContainer}>
              <Text style={styles.checklistTask}>Fasting Blood Glucose Test</Text>
              <Text style={styles.checklistDesc}>Perform test 72 hours prior to visit</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.checklistItem}
            onPress={() => setTasks({...tasks, nutritionDiary: !tasks.nutritionDiary})}
          >
            <View style={[styles.checkbox, tasks.nutritionDiary && styles.checkboxActive]}>
              {tasks.nutritionDiary && <Feather name="check" size={14} color="white" />}
            </View>
            <View style={styles.checklistTextContainer}>
              <Text style={styles.checklistTask}>Log Weekly Nutrition Diary</Text>
              <Text style={styles.checklistDesc}>Log carbohydrate intakes for 7 days</Text>
            </View>
          </TouchableOpacity>
        </View>

      </ScrollView>
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
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 40,
  },
  breadcrumbRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  breadcrumbText: {
    fontSize: 12,
    color: '#64748b',
    fontWeight: '500',
  },
  breadcrumbActive: {
    fontSize: 12,
    color: '#0f172a',
    fontWeight: '700',
  },
  titleSection: {
    marginBottom: 24,
  },
  caseTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#0f172a',
    lineHeight: 32,
    marginBottom: 12,
  },
  badgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 12,
  },
  primaryBadge: {
    backgroundColor: '#ccfbf1',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  primaryBadgeText: {
    color: '#0f766e',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  secondaryBadge: {
    backgroundColor: '#f1f5f9',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  secondaryBadgeText: {
    color: '#475569',
    fontSize: 11,
    fontWeight: '600',
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 6,
  },
  doctorInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 16,
  },
  doctorInfoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8fafc',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#f1f5f9',
  },
  doctorInfoText: {
    fontSize: 12,
    color: '#475569',
    fontWeight: '500',
    marginLeft: 6,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#f1f5f9',
    ...Platform.select({
      ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.03, shadowRadius: 8 },
      android: { elevation: 2 },
    }),
  },
  cardHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  cardEyebrow: {
    fontSize: 11,
    fontWeight: '700',
    color: '#0d9488',
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0f172a',
  },
  progressBadge: {
    backgroundColor: '#ccfbf1',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  progressBadgeText: {
    color: '#0f766e',
    fontSize: 12,
    fontWeight: '700',
  },
  stepperContainer: {
    marginTop: 4,
  },
  activeStepCard: {
    backgroundColor: '#f8fafc',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  stepHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  stepNumberActive: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#0d9488',
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepNumberTextActive: {
    color: 'white',
    fontSize: 12,
    fontWeight: '700',
  },
  stepStatusActive: {
    fontSize: 11,
    fontWeight: '700',
    color: '#0d9488',
    letterSpacing: 0.5,
  },
  stepTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0f172a',
    marginBottom: 10,
  },
  progressBarBg: {
    height: 6,
    backgroundColor: '#e2e8f0',
    borderRadius: 3,
    marginBottom: 8,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#0d9488',
    borderRadius: 3,
  },
  stepSubtitle: {
    fontSize: 12,
    color: '#64748b',
    fontWeight: '500',
  },
  bentoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  bentoCard: {
    width: '48%',
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#f1f5f9',
    ...Platform.select({
      ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.03, shadowRadius: 8 },
      android: { elevation: 2 },
    }),
  },
  bentoHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  bentoIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  trendBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ccfbf1',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
    gap: 2,
  },
  trendText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#0f766e',
  },
  bentoLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: '#94a3b8',
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  bentoValueRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 12,
  },
  bentoValue: {
    fontSize: 24,
    fontWeight: '800',
    color: '#0f172a',
  },
  bentoUnit: {
    fontSize: 12,
    color: '#64748b',
    fontWeight: '600',
    marginLeft: 4,
  },
  bentoFooter: {
    fontSize: 11,
    color: '#64748b',
    fontWeight: '500',
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0f172a',
    marginLeft: 8,
    flex: 1,
  },
  sectionCount: {
    fontSize: 12,
    color: '#64748b',
    fontWeight: '600',
  },
  noteBox: {
    backgroundColor: '#f8fafc',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  noteHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  noteAuthorRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  authorAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#ccfbf1',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  authorInitials: {
    fontSize: 12,
    fontWeight: '700',
    color: '#0d9488',
  },
  authorName: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0f172a',
  },
  authorRole: {
    fontSize: 11,
    color: '#64748b',
    marginTop: 2,
  },
  noteDate: {
    fontSize: 11,
    color: '#64748b',
    fontWeight: '500',
  },
  noteText: {
    fontSize: 14,
    color: '#334155',
    lineHeight: 22,
    marginBottom: 16,
  },
  tagRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  tag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ccfbf1',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    gap: 4,
  },
  tagText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#0f766e',
  },
  prescriptionRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  medIcon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    marginTop: 2,
  },
  medDetails: {
    flex: 1,
  },
  medTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  medName: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0f172a',
    marginRight: 8,
  },
  primaryBadgeSmall: {
    backgroundColor: '#ccfbf1',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  primaryBadgeTextSmall: {
    fontSize: 9,
    fontWeight: '700',
    color: '#0d9488',
    textTransform: 'uppercase',
  },
  medInstructions: {
    fontSize: 13,
    color: '#475569',
    marginBottom: 4,
  },
  medRefills: {
    fontSize: 12,
    color: '#0d9488',
    fontWeight: '600',
  },
  appointmentBox: {
    backgroundColor: '#f8fafc',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    marginBottom: 20,
  },
  appointmentEyebrow: {
    fontSize: 10,
    fontWeight: '700',
    color: '#3b82f6',
    letterSpacing: 0.5,
    marginBottom: 6,
  },
  appointmentTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0f172a',
    marginBottom: 12,
  },
  appointmentDetailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
    gap: 8,
  },
  appointmentDetailText: {
    fontSize: 13,
    color: '#475569',
    fontWeight: '500',
  },
  rescheduleButton: {
    marginTop: 12,
    alignSelf: 'flex-start',
  },
  rescheduleText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#0d9488',
  },
  checklistTitle: {
    fontSize: 11,
    fontWeight: '700',
    color: '#64748b',
    letterSpacing: 0.5,
    marginBottom: 12,
  },
  checklistItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#f8fafc',
    padding: 12,
    borderRadius: 10,
    marginBottom: 8,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#cbd5e1',
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 2,
  },
  checkboxActive: {
    backgroundColor: '#0d9488',
    borderColor: '#0d9488',
  },
  checklistTextContainer: {
    flex: 1,
  },
  checklistTask: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0f172a',
    marginBottom: 2,
  },
  checklistDesc: {
    fontSize: 12,
    color: '#64748b',
  },
});

export default CaseScreen;