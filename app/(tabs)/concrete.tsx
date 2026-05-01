import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const features = [
  { name: 'Slab', icon: 'grid-outline', route: '/features/slab' },
  { name: 'Footing', icon: 'cube-outline', route: '/features/footing' },
  { name: 'Column', icon: 'apps-outline', route: '/features/column' },
  { name: 'Beam', icon: 'remove-outline', route: '/features/beam' },
  { name: 'Mortar', icon: 'flask-outline', route: '/features/mortar' },
  { name: 'Plaster', icon: 'layers-outline', route: '/features/plaster' },
  {
    name: 'Wall Footing',
    icon: 'square-outline',
    route: '/features/wall-footing',
  },
  { name: 'CHB', icon: 'cube', route: '/features/chb' },
];

export default function Concrete() {
  const router = useRouter();

  return (
    <LinearGradient colors={['#bae6fd', '#7dd3fc']} style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }} edges={['top']}>
        <View style={styles.container}>
          <Text style={styles.title}>Concrete Calculators</Text>

          <View style={styles.grid}>
            {[0, 1, 2, 3].map((row, index) => (
              <View
                key={row}
                style={[styles.row, index === 3 && { marginBottom: 0 }]}
              >
                {features.slice(row * 2, row * 2 + 2).map((feature: any) => (
                  <TouchableOpacity
                    key={feature.name}
                    style={styles.card}
                    onPress={() => router.push(feature.route)}
                  >
                    <Ionicons
                      name={feature.icon as any}
                      size={28}
                      color="#334155"
                    />
                    <Text style={styles.cardText}>{feature.name}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            ))}
          </View>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flex: 1,
  },

  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#334155',
    marginBottom: 16,
  },

  cardText: {
    marginTop: 10,
    fontSize: 14,
    color: '#334155',
    fontWeight: '500',
  },

  grid: {
    flex: 1,
  },

  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },

  card: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 6,

    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
});
