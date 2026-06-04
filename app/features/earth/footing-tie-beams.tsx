import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Stack } from 'expo-router';
import { useEffect, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';

export default function FootingTieBeams() {
  const insets = useSafeAreaInsets();

  const [isLoading, setIsLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const [excavationHeight, setExcavationHeight] = useState('');
  const [width, setWidth] = useState('');
  const [depth, setDepth] = useState('');
  const [length, setLength] = useState('');
  const [noOfBeams, setNoOfBeams] = useState('');

  const gravelBed = 0.1;

  const handleNumberInput = (
    value: string,
    setter: (value: string) => void,
  ) => {
    const sanitized = value.replace(/[^0-9.]/g, '');

    const parts = sanitized.split('.');

    if (parts.length > 2) {
      return;
    }

    setter(sanitized);
  };

  const totalExcavation = useMemo(() => {
    const excavationHeightValue = parseFloat(excavationHeight || '0') || 0;

    const widthValue = parseFloat(width || '0') || 0;

    const lengthValue = parseFloat(length || '0') || 0;

    const beams = parseFloat(noOfBeams || '0') || 0;

    if (!beams) {
      return 0;
    }

    return (
      beams *
      (excavationHeightValue * (widthValue + 0.3) * lengthValue +
        (widthValue + 0.3) * lengthValue * gravelBed)
    );
  }, [excavationHeight, width, length, noOfBeams]);

  const totalBackfill = useMemo(() => {
    const widthValue = parseFloat(width || '0') || 0;

    const depthValue = parseFloat(depth || '0') || 0;

    const lengthValue = parseFloat(length || '0') || 0;

    const beams = parseFloat(noOfBeams || '0') || 0;

    return totalExcavation - widthValue * depthValue * lengthValue * beams;
  }, [totalExcavation, width, depth, length, noOfBeams]);

  useEffect(() => {
    const hasRequiredValues =
      excavationHeight && width && depth && length && noOfBeams;

    if (!hasRequiredValues) {
      setShowResults(false);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setShowResults(false);

    const timer = setTimeout(() => {
      setIsLoading(false);
      setShowResults(true);
    }, 500);

    return () => clearTimeout(timer);
  }, [excavationHeight, width, depth, length, noOfBeams]);

  const reset = () => {
    setExcavationHeight('');
    setWidth('');
    setDepth('');
    setLength('');
    setNoOfBeams('');

    setShowResults(false);
    setIsLoading(false);
  };

  return (
    <LinearGradient colors={['#f1f5f9', '#e2e8f0']} style={{ flex: 1 }}>
      <Stack.Screen
        options={{
          headerShown: true,
          title: '',
          headerTransparent: true,
        }}
      />

      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{
            paddingTop: insets.top + 10,
            paddingHorizontal: 16,
            paddingBottom: 40,
          }}
        >
          <View style={styles.header}>
            <View style={styles.iconBox}>
              <Ionicons name="remove-outline" size={26} color="#1e293b" />
            </View>

            <Text style={styles.title}>Footing Tie Beams Earthwork</Text>

            <Text style={styles.subtitle}>Excavation Volume Calculator</Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.sectionTitle}>Excavation Details</Text>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Excavation Height (m)</Text>

              <TextInput
                value={excavationHeight}
                onChangeText={(v) => handleNumberInput(v, setExcavationHeight)}
                keyboardType="decimal-pad"
                style={styles.input}
                placeholder="Enter value"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Width (m)</Text>

              <TextInput
                value={width}
                onChangeText={(v) => handleNumberInput(v, setWidth)}
                keyboardType="decimal-pad"
                style={styles.input}
                placeholder="Enter value"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Depth (m)</Text>

              <TextInput
                value={depth}
                onChangeText={(v) => handleNumberInput(v, setDepth)}
                keyboardType="decimal-pad"
                style={styles.input}
                placeholder="Enter value"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Length (m)</Text>

              <TextInput
                value={length}
                onChangeText={(v) => handleNumberInput(v, setLength)}
                keyboardType="decimal-pad"
                style={styles.input}
                placeholder="Enter value"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>No. of Beams</Text>

              <TextInput
                value={noOfBeams}
                onChangeText={(v) => handleNumberInput(v, setNoOfBeams)}
                keyboardType="decimal-pad"
                style={styles.input}
                placeholder="Enter value"
              />
            </View>

            <View style={styles.infoBox}>
              <Ionicons
                name="information-circle-outline"
                size={18}
                color="#2563eb"
              />

              <Text style={styles.infoText}>
                Gravel bed is fixed to 0.1m.
                {'\n'}
                15mm on both sides of beam width is automatically added as
                excavation allowance.
              </Text>
            </View>

            <TouchableOpacity style={styles.reset} onPress={reset}>
              <Text style={styles.resetText}>Reset</Text>
            </TouchableOpacity>
          </View>

          {isLoading && (
            <View style={styles.loaderContainer}>
              <ActivityIndicator size="large" color="#2563eb" />
              <Text style={styles.loaderText}>Calculating...</Text>
            </View>
          )}

          {showResults && (
            <View style={styles.resultCard}>
              <Text style={styles.resultTitle}>Computed Quantity</Text>

              <Result
                label="Total Excavation"
                value={`${totalExcavation.toFixed(3)} m³`}
              />

              <Result
                label="Total Backfill"
                value={`${totalBackfill.toFixed(3)} m³`}
              />
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}

function Result({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.resultRow}>
      <Text style={styles.resultLabel}>{label}</Text>

      <Text style={styles.resultValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
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
    color: '#0f172a',
    marginTop: 10,
    textAlign: 'center',
  },

  subtitle: {
    fontSize: 13,
    color: '#64748b',
    marginTop: 4,
  },

  card: {
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 18,
    marginBottom: 18,
    elevation: 3,
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0f172a',
    marginBottom: 14,
  },

  inputGroup: {
    marginBottom: 16,
  },

  label: {
    color: '#334155',
    marginBottom: 6,
    fontSize: 13,
    fontWeight: '600',
  },

  input: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: '#cbd5e1',
    fontWeight: '600',
    color: '#0f172a',
  },

  infoBox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#eff6ff',
    borderRadius: 12,
    padding: 14,
    marginBottom: 16,
  },

  infoText: {
    flex: 1,
    marginLeft: 10,
    fontSize: 12,
    lineHeight: 18,
    color: '#1e40af',
  },

  reset: {
    marginTop: 8,
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
    backgroundColor: '#475569',
  },

  resetText: {
    color: '#fff',
    fontWeight: '600',
  },

  resultCard: {
    backgroundColor: '#0f172a',
    borderRadius: 18,
    padding: 18,
  },

  resultTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 12,
    color: '#e2e8f0',
  },

  resultRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },

  resultLabel: {
    color: '#94a3b8',
  },

  resultValue: {
    fontWeight: '700',
    color: '#fff',
    fontSize: 15,
  },
  loaderContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 30,
  },

  loaderText: {
    marginTop: 10,
    color: '#64748b',
    fontSize: 14,
  },
});
