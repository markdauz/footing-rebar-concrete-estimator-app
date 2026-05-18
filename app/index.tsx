import Constants from 'expo-constants';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function Onboarding() {
  const router = useRouter();

  const version =
    Constants.expoConfig?.version ||
    Constants.manifest2?.extra?.expoClient?.version;

  return (
    <LinearGradient colors={['#f1f5f9', '#e2e8f0']} style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.glow} />

        <View style={styles.iconWrapper}>
          <Image
            source={require('../assets/images/icon.png')}
            style={styles.iconImage}
            resizeMode="contain"
          />
        </View>

        <Text style={styles.title}>Build Smarter</Text>

        <Text style={styles.subtitle}>
          Accurate material estimates in seconds
        </Text>

        <Text style={styles.featureInline}>
          Slab • Footing • Concrete • CHB
        </Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => router.replace('/(tabs)/footing')}
        >
          <Text style={styles.buttonText}>Start Calculating</Text>
        </TouchableOpacity>
        <Text style={styles.version}>Version {version}</Text>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },

  iconImage: {
    width: 80,
    height: 80,
  },

  glow: {
    position: 'absolute',
    width: 220,
    height: 220,
    borderRadius: 110,
    backgroundColor: '#94a3b8',
    opacity: 0.15,
    top: '20%',
  },

  iconWrapper: {
    backgroundColor: '#ffffff',
    padding: 18,
    borderRadius: 24,
    marginBottom: 30,
    elevation: 10,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 10 },
  },

  title: {
    fontSize: 30,
    fontWeight: '800',
    color: '#1e293b',
    marginBottom: 6,
    letterSpacing: 0.5,
  },

  subtitle: {
    fontSize: 15,
    color: '#475569',
    textAlign: 'center',
    marginBottom: 18,
  },

  featureInline: {
    fontSize: 13,
    color: '#334155',
    marginBottom: 50,
    opacity: 0.85,
  },

  button: {
    backgroundColor: '#475569',
    paddingVertical: 16,
    paddingHorizontal: 48,
    borderRadius: 30,
    elevation: 4,
  },

  buttonText: {
    color: '#ffffff',
    fontWeight: '700',
    fontSize: 16,
  },
  version: {
    position: 'absolute',
    bottom: 40,
    fontSize: 12,
    color: '#64748b',
    opacity: 0.8,
  },
});
