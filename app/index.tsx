import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const { width } = Dimensions.get('window');

export default function Onboarding() {
  const router = useRouter();

  return (
    <LinearGradient colors={['#7dd3fc', '#38bdf8']} style={{ flex: 1 }}>
      <View style={styles.container}>
        {/* App Icon */}
        <View style={styles.iconWrapper}>
          <Ionicons name="construct" size={40} color="#0C4A6E" />
        </View>

        {/* Title */}
        <Text style={styles.title}>Concrete Calculator</Text>
        <Text style={styles.subtitle}>
          Fast, accurate construction estimates in your pocket
        </Text>

        {/* Feature Highlights */}
        <View style={styles.features}>
          <Feature icon="cube-outline" text="Slab, Footing & Concrete Tools" />
          <Feature
            icon="calculator-outline"
            text="Accurate Material Estimates"
          />
          <Feature icon="flash-outline" text="Instant Calculations" />
        </View>

        {/* CTA Button */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => router.replace('/(tabs)/footing')}
        >
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

function Feature({ icon, text }: any) {
  return (
    <View style={styles.featureItem}>
      <Ionicons name={icon} size={20} color="#0C4A6E" />
      <Text style={styles.featureText}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },

  iconWrapper: {
    backgroundColor: '#E0F2FE',
    padding: 20,
    borderRadius: 30,
    marginBottom: 20,
  },

  title: {
    fontSize: 26,
    fontWeight: '700',
    color: '#0C4A6E',
    marginBottom: 8,
  },

  subtitle: {
    fontSize: 14,
    color: '#075985',
    textAlign: 'center',
    marginBottom: 30,
  },

  features: {
    width: '100%',
    marginBottom: 30,
  },

  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E0F2FE',
    padding: 12,
    borderRadius: 12,
    marginBottom: 10,
  },

  featureText: {
    marginLeft: 10,
    color: '#0C4A6E',
    fontSize: 14,
  },

  dots: {
    flexDirection: 'row',
    marginBottom: 30,
  },

  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#bae6fd',
    marginHorizontal: 4,
  },

  activeDot: {
    backgroundColor: '#0C4A6E',
    width: 16,
  },

  button: {
    backgroundColor: '#0C4A6E',
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 25,
  },

  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});
