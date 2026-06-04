import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';

type Route =
  | '/features/concrete/slab'
  | '/features/concrete/footing'
  | '/features/concrete/column'
  | '/features/concrete/beam'
  | '/features/concrete/mortar'
  | '/features/concrete/plaster'
  | '/features/concrete/wall-footing'
  | '/features/concrete/chb';

type Feature = {
  name: string;
  icon: keyof typeof Ionicons.glyphMap;
  route: Route;
};

const features: Feature[] = [
  { name: 'Slab', icon: 'grid-outline', route: '/features/concrete/slab' },
  {
    name: 'Footing',
    icon: 'cube-outline',
    route: '/features/concrete/footing',
  },
  { name: 'Column', icon: 'apps-outline', route: '/features/concrete/column' },
  { name: 'Beam', icon: 'remove-outline', route: '/features/concrete/beam' },
  {
    name: 'Mortar',
    icon: 'flask-outline',
    route: '/features/concrete/mortar',
  },
  {
    name: 'Plaster',
    icon: 'layers-outline',
    route: '/features/concrete/plaster',
  },
  {
    name: 'Wall Footing',
    icon: 'square-outline',
    route: '/features/concrete/wall-footing',
  },
  { name: 'CHB', icon: 'cube', route: '/features/concrete/chb' },
];

export default function Concrete() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <LinearGradient colors={['#f1f5f9', '#e2e8f0']} style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={[styles.container, { paddingTop: insets.top + 10 }]}>
          {/* HEADER */}
          <View style={styles.header}>
            <View style={styles.iconBox}>
              <Ionicons name="apps-outline" size={26} color="#1e293b" />
            </View>

            <Text style={styles.title}>Concrete Calculator</Text>
            <Text style={styles.subtitle}>Select a calculator to begin</Text>
          </View>

          {/* GRID */}
          <View style={styles.grid}>
            {features.map((feature, i) => (
              <TouchableOpacity
                key={feature.name}
                style={[styles.card, i === 0 && { marginRight: 12 }]}
                activeOpacity={0.85}
                onPress={() => router.push(feature.route)}
              >
                <View style={styles.cardIconBox}>
                  <Ionicons
                    name={feature.icon as any}
                    size={22}
                    color="#1e293b"
                  />
                </View>

                <Text style={styles.cardText}>{feature.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    flex: 1,
  },

  header: {
    alignItems: 'center',
    marginBottom: 24,
  },

  iconBox: {
    width: 56,
    height: 56,
    borderRadius: 14,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
  },

  title: {
    fontSize: 20,
    fontWeight: '700',
    marginTop: 10,
    color: '#1e293b',
  },

  subtitle: {
    fontSize: 13,
    color: '#64748b',
    marginTop: 4,
  },

  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },

  card: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 24,
    marginBottom: 12,
    elevation: 3,
  },

  cardIconBox: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#f1f5f9',
    alignItems: 'center',
    justifyContent: 'center',
  },

  cardText: {
    marginTop: 10,
    fontSize: 14,
    color: '#334155',
    fontWeight: '600',
    textAlign: 'center',
  },
});
