import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function Onboarding() {
  const router = useRouter();

  return (
    <LinearGradient colors={['#0ea5e9', '#0369a1']} style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.glow} />

        <View style={styles.iconWrapper}>
          <Ionicons name="construct" size={42} color="#0369a1" />
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

  glow: {
    position: 'absolute',
    width: 220,
    height: 220,
    borderRadius: 110,
    backgroundColor: '#38bdf8',
    opacity: 0.25,
    top: '20%',
  },

  iconWrapper: {
    backgroundColor: '#ffffff',
    padding: 22,
    borderRadius: 28,
    marginBottom: 30,
    elevation: 10,
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 10 },
  },

  title: {
    fontSize: 30,
    fontWeight: '800',
    color: '#e0f2fe',
    marginBottom: 6,
    letterSpacing: 0.5,
  },

  subtitle: {
    fontSize: 15,
    color: '#bae6fd',
    textAlign: 'center',
    marginBottom: 18,
  },

  featureInline: {
    fontSize: 13,
    color: '#e0f2fe',
    marginBottom: 50,
    opacity: 0.85,
  },

  button: {
    backgroundColor: '#ffffff',
    paddingVertical: 16,
    paddingHorizontal: 48,
    borderRadius: 30,
    elevation: 6,
  },

  buttonText: {
    color: '#0369a1',
    fontWeight: '700',
    fontSize: 16,
  },
});
