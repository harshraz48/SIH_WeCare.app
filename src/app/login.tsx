import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Pressable,
} from 'react-native';

import { Feather, MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleSignIn = () => {
    
    router.replace('/dashboard' as any);

    
  };

  return (


    
    <SafeAreaView style={styles.container}>



      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >

          {/* Header */}
          <View style={styles.header}>

            {/* Temporary text logo */}
            <View style={styles.logoContainer}>
              <Text style={styles.logo}>WeCare</Text>
            </View>

            {/* Simple health graphic */}
            <View style={styles.heroGraphic}>
              <View style={styles.abstractCircle}>
                <Feather
                  name="heart"
                  size={32}
                  color="#0d9488"
                />
              </View>
            </View>

            <Text style={styles.title}>
              Welcome back
            </Text>

            <Text style={styles.subtitle}>
              Sign in to continue to your healthcare dashboard.
            </Text>
          </View>

          {/* Form */}
          <View style={styles.form}>

            {/* Email */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>
                EMAIL OR EMPLOYEE ID
              </Text>

              <View style={styles.inputWrapper}>
                <Feather
                  name="user"
                  size={18}
                  color="#64748b"
                  style={styles.inputIcon}
                />

                <TextInput
                  style={styles.input}
                  placeholder="Enter your email or ID"
                  placeholderTextColor="#94a3b8"
                  value={email}
                  onChangeText={setEmail}
                  autoCapitalize="none"
                  keyboardType="email-address"
                />
              </View>
            </View>

            
            <View style={styles.inputGroup}>
              <Text style={styles.label}>
                PASSWORD
              </Text>

              <View style={styles.inputWrapper}>
                <Feather
                  name="lock"
                  size={18}
                  color="#64748b"
                  style={styles.inputIcon}
                />

                <TextInput
                  style={styles.input}
                  placeholder="Enter your password"
                  placeholderTextColor="#94a3b8"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                />

                <TouchableOpacity
                  onPress={() =>
                    setShowPassword(!showPassword)
                  }
                  style={styles.eyeIcon}
                >
                  <Feather
                    name={showPassword ? 'eye' : 'eye-off'}
                    size={18}
                    color="#64748b"
                  />
                </TouchableOpacity>
              </View>
            </View>

            {/* Remember + Forgot */}
            <View style={styles.formOptions}>

              <TouchableOpacity
                style={styles.checkboxContainer}
                onPress={() =>
                  setRememberMe(!rememberMe)
                }
              >
                <View
                  style={[
                    styles.checkbox,
                    rememberMe && styles.checkboxChecked,
                  ]}
                >
                  {rememberMe && (
                    <Feather
                      name="check"
                      size={12}
                      color="white"
                    />
                  )}
                </View>

                <Text style={styles.optionText}>
                  Remember me
                </Text>
              </TouchableOpacity>

              <TouchableOpacity>
                <Text style={styles.forgotText}>
                  Forgot password?
                </Text>
              </TouchableOpacity>

            </View>

            
            <TouchableOpacity
              style={styles.signInButton}
              onPress={handleSignIn}
              activeOpacity={0.8}
            >
              <Text style={styles.signInButtonText}>
                Sign In
              </Text>

              <Feather
                name="arrow-right"
                size={18}
                color="white"
                style={styles.buttonIcon}
              />
            </TouchableOpacity>

            <Text style={styles.orText}>
              OR
            </Text>

           
            <TouchableOpacity
              style={styles.orgButton}
              activeOpacity={0.7}
            >
              <MaterialIcons
                name="business"
                size={18}
                color="#0d9488"
                style={styles.buttonIcon}
              />

              <Text style={styles.orgButtonText}>
                Hospital / Organization ID
              </Text>
            </TouchableOpacity>

          </View>

          {/* Footer */}
          <View style={styles.footer}>

            <View style={styles.securityBanner}>
              <Feather
                name="lock"
                size={14}
                color="#64748b"
              />

              <Text style={styles.securityTitle}>
                {' '}SECURE & CONFIDENTIAL
              </Text>
            </View>

            <Text style={styles.securityText}>
              Your healthcare data is protected and accessible
              only to authorized users.
            </Text>

            <Text style={styles.copyright}>
              © 2026 WeCare
            </Text>

          </View>

        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9ff',
  },

  keyboardView: {
    flex: 1,
  },

  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 40,
    paddingBottom: 24,
  },

  header: {
    alignItems: 'center',
    marginBottom: 32,
  },

  logoContainer: {
    marginBottom: 20,
  },

  logo: {
    fontSize: 30,
    fontWeight: '700',
    color: '#0d9488',
  },

  heroGraphic: {
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },

  abstractCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#dcefeb',
    justifyContent: 'center',
    alignItems: 'center',
  },

  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#0f172a',
    marginBottom: 8,
    textAlign: 'center',
  },

  subtitle: {
    fontSize: 15,
    color: '#64748b',
    textAlign: 'center',
    lineHeight: 22,
    paddingHorizontal: 20,
  },

  form: {
    width: '100%',
  },

  inputGroup: {
    marginBottom: 20,
  },

  label: {
    fontSize: 12,
    fontWeight: '600',
    color: '#64748b',
    marginBottom: 8,
    letterSpacing: 0.5,
  },

  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 12,
    height: 52,
    paddingHorizontal: 16,
  },

  inputIcon: {
    marginRight: 12,
  },

  input: {
    flex: 1,
    fontSize: 16,
    color: '#0f172a',
    height: '100%',
  },

  eyeIcon: {
    padding: 4,
  },

  formOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },

  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 1.5,
    borderColor: '#cbd5e1',
    marginRight: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },

  checkboxChecked: {
    backgroundColor: '#0d9488',
    borderColor: '#0d9488',
  },

  optionText: {
    fontSize: 14,
    color: '#64748b',
  },

  forgotText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0d9488',
  },

  signInButton: {
    backgroundColor: '#0d9488',
    height: 52,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
  },

  signInButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
  },

  buttonIcon: {
    marginLeft: 8,
  },

  orText: {
    textAlign: 'center',
    marginVertical: 20,
    color: '#94a3b8',
    fontSize: 13,
    fontWeight: '600',
  },

  orgButton: {
    height: 52,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: '#0d9488',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  orgButtonText: {
    color: '#0d9488',
    fontSize: 16,
    fontWeight: '700',
  },

  footer: {
    marginTop: 40,
    alignItems: 'center',
  },

  securityBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },

  securityTitle: {
    fontSize: 11,
    fontWeight: '700',
    color: '#64748b',
    letterSpacing: 1,
  },

  securityText: {
    fontSize: 12,
    color: '#94a3b8',
    textAlign: 'center',
    lineHeight: 18,
    paddingHorizontal: 40,
    marginBottom: 24,
  },

  copyright: {
    fontSize: 12,
    color: '#cbd5e1',
  },
});

export default LoginScreen;